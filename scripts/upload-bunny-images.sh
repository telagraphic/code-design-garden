#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_DIR="${ROOT}/media/images/out"

DRY_RUN=0
FILTER=""

usage() {
  cat <<'EOF'
Upload optimized images from media/images/out to Bunny Storage.

Environment (required unless --dry-run):
  BUNNY_STORAGE_ZONE          Storage zone name
  BUNNY_STORAGE_ACCESS_KEY    Storage zone password (AccessKey header)
  BUNNY_STORAGE_ENDPOINT      e.g. https://storage.bunnycdn.com
  BUNNY_CDN_BASE_URL          e.g. https://code-design-garden.b-cdn.net (printed after upload)

Usage:
  ./scripts/upload-bunny-images.sh [--dry-run] [path]

  path    Optional file or subtree relative to media/images/out
          e.g. blog/gsap/grid.avif

Examples:
  ./scripts/upload-bunny-images.sh --dry-run
  ./scripts/upload-bunny-images.sh blog/gsap/grid.avif
EOF
}

content_type_for() {
  local file="$1"
  case "${file##*.}" in
    avif) echo "image/avif" ;;
    webp) echo "image/webp" ;;
    jpg|jpeg) echo "image/jpeg" ;;
    png) echo "image/png" ;;
    gif) echo "image/gif" ;;
    svg) echo "image/svg+xml" ;;
    *) echo "application/octet-stream" ;;
  esac
}

load_dotenv() {
  local env_file="${ROOT}/.env"
  if [[ -f "${env_file}" ]]; then
    set -a
    # shellcheck disable=SC1090
    source "${env_file}"
    set +a
  fi
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dry-run)
      DRY_RUN=1
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      FILTER="$1"
      shift
      ;;
  esac
done

load_dotenv

BUNNY_STORAGE_ENDPOINT="${BUNNY_STORAGE_ENDPOINT:-https://storage.bunnycdn.com}"
BUNNY_STORAGE_ENDPOINT="${BUNNY_STORAGE_ENDPOINT%/}"
BUNNY_CDN_BASE_URL="${BUNNY_CDN_BASE_URL:-${PUBLIC_BUNNY_IMAGE_BASE_URL:-}}"
BUNNY_CDN_BASE_URL="${BUNNY_CDN_BASE_URL%/}"

if [[ ! -d "${OUT_DIR}" ]]; then
  echo "Output directory not found: ${OUT_DIR}" >&2
  exit 1
fi

if [[ "${DRY_RUN}" -eq 0 ]]; then
  if [[ -z "${BUNNY_STORAGE_ZONE:-}" || -z "${BUNNY_STORAGE_ACCESS_KEY:-}" ]]; then
    echo "Missing BUNNY_STORAGE_ZONE or BUNNY_STORAGE_ACCESS_KEY." >&2
    echo "Set env vars or add them to .env (see .env.example)." >&2
    exit 1
  fi
else
  BUNNY_STORAGE_ZONE="${BUNNY_STORAGE_ZONE:-your-zone-name}"
fi

FILES=()
while IFS= read -r -d '' file; do
  FILES+=("$file")
done < <(
  if [[ -n "${FILTER}" ]]; then
    target="${OUT_DIR}/${FILTER}"
    if [[ -f "${target}" ]]; then
      printf '%s\0' "${FILTER}"
    elif [[ -d "${target}" ]]; then
      find "${target}" -type f ! -name '.*' -print0
    else
      echo "Path not found under ${OUT_DIR}: ${FILTER}" >&2
      exit 1
    fi
  else
    find "${OUT_DIR}" -type f ! -name '.*' -print0
  fi
)

if [[ "${#FILES[@]}" -eq 0 || -z "${FILES[0]:-}" ]]; then
  echo "No files to upload in ${OUT_DIR}"
  exit 0
fi

uploaded=0

for file in "${FILES[@]}"; do
  if [[ "${file}" == "${OUT_DIR}/.manifest.json" ]]; then
    continue
  fi

  if [[ "${file}" == "${OUT_DIR}"/* ]]; then
    rel="${file#"${OUT_DIR}/"}"
  else
    rel="${file}"
  fi

  remote_path="${rel}"
  upload_url="${BUNNY_STORAGE_ENDPOINT}/${BUNNY_STORAGE_ZONE}/${remote_path}"
  content_type="$(content_type_for "${rel}")"

  if [[ -n "${BUNNY_CDN_BASE_URL}" ]]; then
    cdn_url="${BUNNY_CDN_BASE_URL}/${remote_path}"
  else
    cdn_url="(set BUNNY_CDN_BASE_URL) /${remote_path}"
  fi

  if [[ "${DRY_RUN}" -eq 1 ]]; then
    echo "DRY  PUT ${upload_url}"
    echo "     ${cdn_url}"
    uploaded=$((uploaded + 1))
    continue
  fi

  http_code="$(
    curl -sS -o /dev/null -w '%{http_code}' -X PUT \
      "${upload_url}" \
      -H "AccessKey: ${BUNNY_STORAGE_ACCESS_KEY}" \
      -H "Content-Type: ${content_type}" \
      --upload-file "${OUT_DIR}/${rel}"
  )"

  if [[ "${http_code}" -lt 200 || "${http_code}" -ge 300 ]]; then
    echo "Upload failed (${http_code}): ${rel}" >&2
    exit 1
  fi

  echo "✓ ${rel}"
  echo "  ${cdn_url}"
  uploaded=$((uploaded + 1))
done

echo ""
echo "Done. ${uploaded} file(s) $([[ "${DRY_RUN}" -eq 1 ]] && echo 'would be uploaded' || echo 'uploaded')."
