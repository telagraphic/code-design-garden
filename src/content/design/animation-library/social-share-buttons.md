---
title: "Social Share Buttons"
description: "Social Share Buttons."
slug: "social-share-buttons"
previewVideo: "social-share-buttons.mp4"
order: 49.847
published: true
categories: ["utility"]
triggers: ["load"]
libraries: ["vanilla-js"]
keywords: ["social", "share", "buttons"]
sourceUrl: "https://www.osmo.supply/resource/social-share-buttons"
---
## Setup
### HTML
```text
<div data-social-share-title="Osmo - Start building websites people remember." data-social-share="" data-social-share-link="https://osmo.supply" class="social-share">
  <button type="button" data-social-share-type="clipboard" aria-label="Copy to Clipboard" class="social-share__button"><i class="social-share__icon"></i><i class="social-share__icon is--success"></i></button>
  <button type="button" data-social-share-type="mail" aria-label="Share via Mail" class="social-share__button"><i class="social-share__icon"></i></button>
  <button type="button" data-social-share-type="facebook" aria-label="Share on Facebook" class="social-share__button"><i class="social-share__icon"></i></button>
  <button type="button" data-social-share-type="pinterest" aria-label="Share on Pinterest" class="social-share__button"><i class="social-share__icon"></i></button>
  <button type="button" data-social-share-type="whatsapp" aria-label="Share on WhatsApp" class="social-share__button"><i class="social-share__icon"></i></button>
  <button type="button" data-social-share-type="reddit" aria-label="Share on Reddit" class="social-share__button"><i class="social-share__icon"></i></button>
  <button type="button" data-social-share-type="linkedin" aria-label="Share on LinkedIn" class="social-share__button"><i class="social-share__icon"></i></button>
  <button type="button" data-social-share-type="x" aria-label="Share on X" class="social-share__button"><i class="social-share__icon"></i></button>
  <button type="button" data-social-share-type="telegram" aria-label="Share on Telegram" class="social-share__button"><i class="social-share__icon"></i></button>
</div>
```
### CSS
```text
.social-share {
  grid-column-gap: .5em;
  grid-row-gap: .5em;
  flex-flow: wrap;
  justify-content: center;
  align-items: center;
  display: flex;
}
.social-share__button {
  color: #4f4c4c;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  width: 3em;
  height: 3em;
  display: flex;
  position: relative;
  overflow: hidden;
}
.social-share__icon {
  width: 1.5em;
  display: flex;
}
.social-share__icon.is--success {
  position: absolute;
}
/* Clipboard Success Icon */
[data-social-share-type="clipboard"] .social-share__icon {
  transition: transform 0.4s cubic-bezier(0.625, 0.05, 0, 1);
  transform: translateY(0%) rotate(0.001deg);
}
[data-social-share-type="clipboard"] .social-share__icon.is--success {
  color: #009E3B;
  transform: translateY(200%) rotate(0.001deg);
}
[data-social-share-type="clipboard"][data-social-share-success] .social-share__icon {
  transform: translateY(-200%) rotate(0.001deg);
}
[data-social-share-type="clipboard"][data-social-share-success] .social-share__icon.is--success {
  transform: translateY(0%) rotate(0.001deg);
}
/* Optional hover styling */
[data-social-share-type] {
  transition: all 0.4s cubic-bezier(0.625, 0.05, 0, 1);
  transform: scale(1) rotate(0.001deg);
}
[data-social-share]:has([data-social-share-type]:hover) [data-social-share-type] {
  transform: scale(0.9) rotate(0.001deg);
}
[data-social-share]:has([data-social-share-type]:hover) [data-social-share-type]:hover  {
  transform: scale(1.1) rotate(0.001deg);
}
/* Optional color styling */
[data-social-share-type="linkedin"] {color: #0A66C2;}
[data-social-share-type="x"] {color: #000000;}
[data-social-share-type="facebook"] {color: #1877F2;}
[data-social-share-type="pinterest"] {color: #E60023;}
[data-social-share-type="whatsapp"] {color: #25D366;}
[data-social-share-type="reddit"] {color: #FF4500;}
[data-social-share-type="telegram"] {color: #0088CC;}
```
### Javascript
```javascript
function initSocialShare() {
  document.querySelectorAll('[data-social-share]').forEach(root => {
    if (root._socialShareBound) return;
    root._socialShareBound = true;
    const link = root.getAttribute('data-social-share-link') || location.href;
    const title = root.getAttribute('data-social-share-title') || document.title;
    root.addEventListener('click', e => {
      const btn = e.target.closest('[data-social-share-type]');
      if (!btn) return;
      e.preventDefault();
      const type = btn.getAttribute('data-social-share-type');
      const u = encodeURIComponent(link);
      const t = encodeURIComponent(title);
      const map = {
        x: \`https://twitter.com/intent/tweet?text=${t}&url=${u}\`,
        linkedin: \`https://www.linkedin.com/sharing/share-offsite/?url=${u}\`,
        reddit: \`https://www.reddit.com/submit?url=${u}&title=${t}\`,
        telegram: \`https://t.me/share/url?url=${u}&text=${t}\`,
        whatsapp: \`https://api.whatsapp.com/send?text=${t}%20${u}\`,
        mail: \`mailto:?subject=${t}&body=${t}%0A%0A${u}\`,
        facebook: \`https://www.facebook.com/sharer/sharer.php?u=${u}\`,
        pinterest: \`https://www.pinterest.com/pin/create/button/?url=${u}&description=${t}\`,
      };
      if (type === 'clipboard') {
        navigator.clipboard.writeText(link).then(() => {
          btn.setAttribute('data-social-share-success', '');
          setTimeout(() => btn.removeAttribute('data-social-share-success'), 2000);
        });
        return;
      }
      const url = map[type];
      if (url) window.open(url, '_blank', 'noopener,noreferrer');
    });
  });
}
// Initialize Social Share
document.addEventListener('DOMContentLoaded', () => {
  initSocialShare();
});
```
### Javascript
```text
/* Clipboard Success Icon */
[data-social-share-type="clipboard"] .social-share__icon {
  transition: transform 0.4s cubic-bezier(0.625, 0.05, 0, 1);
  transform: translateY(0%) rotate(0.001deg);
}
[data-social-share-type="clipboard"] .social-share__icon.is--success {
  color: #009E3B;
  transform: translateY(200%) rotate(0.001deg);
}
[data-social-share-type="clipboard"][data-social-share-success] .social-share__icon {
  transform: translateY(-200%) rotate(0.001deg);
}
[data-social-share-type="clipboard"][data-social-share-success] .social-share__icon.is--success {
  transform: translateY(0%) rotate(0.001deg);
}
/* Optional hover styling */
[data-social-share-type] {
  transition: all 0.4s cubic-bezier(0.625, 0.05, 0, 1);
  transform: scale(1) rotate(0.001deg);
}
[data-social-share]:has([data-social-share-type]:hover) [data-social-share-type] {
  transform: scale(0.9) rotate(0.001deg);
}
[data-social-share]:has([data-social-share-type]:hover) [data-social-share-type]:hover  {
  transform: scale(1.1) rotate(0.001deg);
}
/* Optional color styling */
[data-social-share-type="linkedin"] {color: #0A66C2;}
[data-social-share-type="x"] {color: #000000;}
[data-social-share-type="facebook"] {color: #1877F2;}
[data-social-share-type="pinterest"] {color: #E60023;}
[data-social-share-type="whatsapp"] {color: #25D366;}
[data-social-share-type="reddit"] {color: #FF4500;}
[data-social-share-type="telegram"] {color: #0088CC;}
```
### Implementation
#### Container
Use `[data-social-share]` to group all share buttons. Add `[data-social-share-link]` to define the URL that will be shared. Add `[data-social-share-title]` to define the title included in the share message.
#### Buttons
Use `[data-social-share-type]` on each button to set the platform. Supported types are: `x`, `linkedin`, `reddit`, `telegram`, `whatsapp`, `mail`, `facebook`, `pinterest`, and `clipboard`.
#### Clipboard: Success
When copying a link with `[data-social-share-type="clipboard"]`, a temporary `[data-social-share-success]` attribute is added for two seconds to indicate success. We use this to show the "success" icon via CSS.