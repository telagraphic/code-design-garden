---
title: "Dynamic Current Time"
description: "Dynamic Current Time."
slug: "dynamic-current-time"
previewVideo: "dynamic-current-time.mp4"
order: 49.923
published: true
categories: ["utility"]
triggers: ["load"]
libraries: ["vanilla-js"]
keywords: ["dynamic", "current", "time"]
sourceUrl: "https://www.osmo.supply/resource/dynamic-current-time"
---
## Setup
### HTML
```text
<p data-current-time>
  <span data-current-time-hours>9</span>:
  <span data-current-time-minutes>00</span>:
  <span data-current-time-seconds>24</span> 
  <span data-current-time-timezone>CET</span>
</p>
```
### Javascript
```javascript
function initDynamicCurrentTime() {
  const defaultTimezone = "Europe/Amsterdam";
  // Helper function to format numbers with leading zero
  const formatNumber = (number) => number.toString().padStart(2, '0');
  // Function to create a time formatter with the correct timezone
  const createFormatter = (timezone) => {
    return new Intl.DateTimeFormat([], {
      timeZone: timezone,
      timeZoneName: 'short',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false, // Optional: Remove to match your simpler script
    });
  };
  // Function to parse the formatted string into parts
  const parseFormattedTime = (formattedDateTime) => {
    const match = formattedDateTime.match(/(\d+):(\d+):(\d+)\s*([\w+]+)/);
    if (match) {
      return {
        hours: match[1],
        minutes: match[2],
        seconds: match[3],
        timezone: match[4], // Handles both GMT+X and CET cases
      };
    }
    return null;
  };
  // Function to update the time for all elements
  const updateTime = () => {
    document.querySelectorAll('[data-current-time]').forEach((element) => {
      const timezone = element.getAttribute('data-current-time') || defaultTimezone;
      const formatter = createFormatter(timezone);
      const now = new Date();
      const formattedDateTime = formatter.format(now);
      const timeParts = parseFormattedTime(formattedDateTime);
      if (timeParts) {
        const {
          hours,
          minutes,
          seconds,
          timezone
        } = timeParts;
        // Update child elements if they exist
        const hoursElem = element.querySelector('[data-current-time-hours]');
        const minutesElem = element.querySelector('[data-current-time-minutes]');
        const secondsElem = element.querySelector('[data-current-time-seconds]');
        const timezoneElem = element.querySelector('[data-current-time-timezone]');
        if (hoursElem) hoursElem.textContent = hours;
        if (minutesElem) minutesElem.textContent = minutes;
        if (secondsElem) secondsElem.textContent = seconds;
        if (timezoneElem) timezoneElem.textContent = timezone;
      }
    });
  };
  // Initial update and interval for subsequent updates
  updateTime();
  setInterval(updateTime, 1000);
}
// Initialize Dynamic Current Time
document.addEventListener('DOMContentLoaded', () => {
  initDynamicCurrentTime();
});
```
### Implementation
#### Default
When no timezone is added to the `[data-current-time] ` data attribute it will get the timezone defined in the script, as defaut: `Europe/Amsterdam`
#### Adding Timezone
You can add a timezone by hand by passing it in the `[data-current-time="Europe/Amsterdam"]` attribute
#### Show less information
It's possible to remove the seconds or timezone dindication. The script will still work fine.
#### List with timezones
You can find a full list with timezone (TZ Identifier) options on [Wikipedia](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
Examples:
- Africa/Lagos
- America/New\_York
- Asia/Tel\_Aviv
- Australia/West