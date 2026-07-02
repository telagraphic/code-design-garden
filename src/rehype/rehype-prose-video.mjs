import { visit } from "unist-util-visit";
import {
  getBunnyVideoBaseUrl,
  getBunnyVideoUrls,
} from "../config/video.mjs";

/** @param {import('hast').Properties | undefined} properties */
function getClassList(properties) {
  const raw = properties?.className ?? properties?.class;
  if (raw == null) return [];
  return Array.isArray(raw) ? raw.map(String) : [String(raw)];
}

/** @param {import('hast').Properties | undefined} properties @param {string} key */
function getDataAttr(properties, key) {
  const val = properties?.[key];
  if (val == null) return undefined;
  return Array.isArray(val) ? String(val[0]) : String(val);
}

/** @param {import('hast').Element} node */
function isProseVideoFigure(node) {
  if (node.tagName !== "figure") return false;
  const classes = getClassList(node.properties);
  return (
    classes.includes("prose-video") ||
    getDataAttr(node.properties, "dataProseVideo") != null
  );
}

let warnedMissingBase = false;

/**
 * Markdown inline HTML is emitted as `raw` nodes when the unified processor runs.
 * @param {string} html
 */
function resolveRawProseVideo(html) {
  if (!html.includes("data-prose-video") || !html.includes("data-video=")) {
    return html;
  }
  if (html.includes("data-hls=")) return html;

  const base = getBunnyVideoBaseUrl();
  if (!base) {
    if (!warnedMissingBase) {
      console.warn(
        "[rehype-prose-video] PUBLIC_BUNNY_VIDEO_BASE_URL is unset; data-video URLs were not resolved.",
      );
      warnedMissingBase = true;
    }
    return html;
  }

  return html.replace(
    /data-video=(["'])([^"']+)\1/g,
    (match, quote, name) => {
      const urls = getBunnyVideoUrls(name);
      if (!urls) return match;
      return `${match} data-hls=${quote}${urls.hls}${quote} data-mp4=${quote}${urls.mp4}${quote}`;
    },
  );
}

/** Optional build-time `data-video` → CDN URL resolution (unified markdown processor). */
export function rehypeProseVideo() {
  return (tree) => {
    visit(tree, "raw", (node) => {
      if (typeof node.value !== "string") return;
      node.value = resolveRawProseVideo(node.value);
    });

    visit(tree, "element", (node) => {
      if (!isProseVideoFigure(node)) return;

      const existingHls = getDataAttr(node.properties, "dataHls");
      if (existingHls) return;

      const videoName = getDataAttr(node.properties, "dataVideo");
      if (!videoName) return;

      if (!getBunnyVideoBaseUrl()) {
        if (!warnedMissingBase) {
          console.warn(
            "[rehype-prose-video] PUBLIC_BUNNY_VIDEO_BASE_URL is unset; data-video URLs were not resolved.",
          );
          warnedMissingBase = true;
        }
        return;
      }

      const urls = getBunnyVideoUrls(videoName);
      if (!urls) return;

      node.properties = {
        ...node.properties,
        dataHls: urls.hls,
        dataMp4: urls.mp4,
      };
    });
  };
}
