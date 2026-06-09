---
title: "Countdown"
description: "Countdown."
slug: "countdown"
previewVideo: "countdown.mp4"
order: 49.939
published: true
categories: ["utility"]
triggers: ["load"]
libraries: ["vanilla-js"]
keywords: ["countdown"]
sourceUrl: "https://www.osmo.supply/resource/countdown"
---
## Setup
### HTML
```text
<div data-countdown-timezone-offset="2" data-countdown-date="2030-08-29 13:36" data-countdown-status="active" data-countdown-format="long">
  <p data-countdown-update="days">Days</p>
  <p data-countdown-update="hours">Hours</p>
  <p data-countdown-update="minutes">Minutes</p>
  <p data-countdown-update="seconds">Seconds</p>
</div>
```
### Javascript
```javascript
function initCountdown(){
  var reg={items:[],timer:null};
  function parseIso(root){
    var s=root.getAttribute('data-countdown-date')||'';
    var m=s.trim().match(/^(\d{4})-(\d{2})-(\d{2})\s(\d{1,2}):(\d{2})$/);
    if(!m) return null;
    var y=+m[1],mo=+m[2]-1,d=+m[3],h=+m[4],mi=+m[5];
    var t=Date.UTC(y,mo,d,h,mi,0,0);
    var off=+(root.getAttribute('data-countdown-timezone-offset')||0);
    if(off) t-=off*3600000;
    var dt=new Date(t);
    if(dt.getUTCFullYear()!==y||dt.getUTCMonth()!==mo||dt.getUTCDate()!==d) return null;
    return t;
  }
  function splitByUnits(ms,u){
    var secs=Math.max(0,Math.floor(ms/1000));
    var out={years:0,months:0,weeks:0,days:0,hours:0,minutes:0,seconds:0,done:ms<=0};
    var seq=[['years',31536000],['months',2592000],['weeks',604800],['days',86400],['hours',3600],['minutes',60],['seconds',1]];
    for(var i=0;i<seq.length;i++){
      var k=seq[i][0],len=seq[i][1];
      if(u[k]){ out[k]=Math.floor(secs/len); secs%=len; }
    }
    return out;
  }
  var sing={years:'year',months:'month',weeks:'week',days:'day',hours:'hour',minutes:'minute',seconds:'second'};
  var abbr={years:['yr.','yrs.'],months:['mo.','mos.'],weeks:['wk.','wks.'],days:['day','days'],hours:['hr.','hrs.'],minutes:['min.','mins.'],seconds:['sec.','secs.']};
  function lab(k,v,f){
    if(f==='plain') return ''+v;
    if(f==='short') return v+(k==='months'?'mo':k[0]);
    if(f==='abbr'){ var a=abbr[k]; return v+' '+a[v===1?0:1]; }
    return v+' '+(v===1?sing[k]:k);
  }
  function make(root){
    var u={}, order=['years','months','weeks','days','hours','minutes','seconds'];
    root.querySelectorAll('[data-countdown-update]').forEach(function(n){
      var k=(n.getAttribute('data-countdown-update')||'').toLowerCase();
      if(order.indexOf(k)>-1) u[k]=n;
    });
    var tgt=parseIso(root);
    if(tgt==null){
      root.setAttribute('data-countdown-status','error');
      var first=null; for(var i=0;i<order.length;i++){ if(u[order[i]]){ first=u[order[i]]; break; } }
      if(first) first.textContent='Invalid Date, use: 2026-03-21 11:36';
      order.forEach(function(k){ var n=u[k]; if(n&&n!==first) n.textContent=''; });
      return null;
    }
    var f=(root.getAttribute('data-countdown-format')||'plain').toLowerCase();
    var inst={
      root:root,tgt:tgt,f:f,u:u,st:null,done:false,
      render:function(ms){
        var d=splitByUnits(ms,this.u);
        this.done=d.done;
        this.root.setAttribute('data-countdown-status', d.done?'finished':'active');
        if(this.u.years)   this.u.years.textContent   = lab('years',d.years,this.f);
        if(this.u.months)  this.u.months.textContent  = lab('months',d.months,this.f);
        if(this.u.weeks)   this.u.weeks.textContent   = lab('weeks',d.weeks,this.f);
        if(this.u.days)    this.u.days.textContent    = lab('days',d.days,this.f);
        if(this.u.hours)   this.u.hours.textContent   = lab('hours',d.hours,this.f);
        if(this.u.minutes) this.u.minutes.textContent = lab('minutes',d.minutes,this.f);
        if(this.u.seconds) this.u.seconds.textContent = lab('seconds',d.seconds,this.f);
      },
      tickMin:function(nowMs){
        if(this.done) return;
        this.render(this.tgt-nowMs);
        if(this.u.seconds && !this.done && !this.st) this.startSec();
        if(this.done) this.stopSec();
      },
      startSec:function(){
        var self=this;
        function t(){
          if(self.done) return self.stopSec();
          var ms=self.tgt-Date.now();
          if(ms<=0){ self.render(0); return self.stopSec(); }
          self.render(ms);
        }
        t(); self.st=setInterval(t,1000);
      },
      stopSec:function(){ if(this.st){ clearInterval(this.st); this.st=null; } }
    };
    root.__cd=inst;
    return inst;
  }
  function startMinTimer(){
    if(reg.timer) return;
    reg.timer=setInterval(function(){
      var now=Date.now();
      for(var i=0;i<reg.items.length;i++) reg.items[i].tickMin(now);
    },60000);
    var now=Date.now();
    for(var j=0;j<reg.items.length;j++) reg.items[j].tickMin(now);
  }
  document.querySelectorAll('[data-countdown-date]').forEach(function(root){
    var inst=make(root);
    if(inst) reg.items.push(inst);
  });
  if(reg.items.length) startMinTimer();
}
// Initialize Countdown
document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
});
```
### Implementation
#### Container
Wrap the countdown in a parent element with `[data-countdown-date="YYYY-MM-DD H:mm"]` to set the target end date in UTC. The script will attach `[data-countdown-status]` to this container to indicate its state.
### HTML
```text
<div data-countdown-date="2025-09-30 15:00" data-countdown-status="active">
  <span data-countdown-update="days"></span>
  <span data-countdown-update="hours"></span>
  <span data-countdown-update="minutes"></span>
  <span data-countdown-update="seconds"></span>
</div>
```
#### Date
Provide the target moment using `[data-countdown-date="YYYY-MM-DD H:mm"]` in 24-hour time, interpreted as [UTC](https://en.wikipedia.org/wiki/Coordinated_Universal_Time) unless combined with a timezone offset.  
#### Timezone offset
Add `[data-countdown-timezone-offset="2"]` to interpret the input date as local wall time in a specific timezone, shifting the stored UTC instant by the given number of hours.
Example: Add `2` for Amsterdam CEST time, and `-5` for New York
#### Status
The container receives `[data-countdown-status]`, which automatically updates to active while counting, finished once expired, and error if the input date is invalid. You can style panels or toggle elements by targeting these values, for example showing hidden content with `[data-countdown-status="finished"]`.
#### Units
Attach `[data-countdown-update]` to child elements to output each unit individually. Only the units you include are displayed, and higher-order values roll down into the next available unit.
- Use `[data-countdown-update="years"]` to output the remaining years.
- Use `[data-countdown-update="months"]` to output the remaining months.
- Use `[data-countdown-update="weeks"]` to output the remaining weeks.
- Use `[data-countdown-update="days"]` to output the remaining days.
- Use `[data-countdown-update="hours"]` to output the remaining hours.
- Use `[data-countdown-update="minutes"]` to output the remaining minutes.
- Use `[data-countdown-update="seconds"]` to output the remaining seconds and trigger per-second updates (otherwise the countdown refreshes once per minute).
#### Format
Control the label style on the container with `[data-countdown-format],` where:
- Use `plain` to output only the number (5, 7).
- Use `short` to output compact labels (5h, 7mo).
- Use `long` to output full labels with pluralization (1 hour, 5 hours).
- Use `abbr` to output newsroom-style dotted abbreviations (9 yrs., 4 mos., 2 wks., 1 hr., 30 mins., 12 secs.).
#### Error handling
When the date string cannot be parsed, `[data-countdown-status="error"]` is applied and the first available `[data-countdown-update]` element shows “Invalid Date, use: 2026-03-21 11:36”, while all other units are cleared.
### Bonus
#### Custom CSS from Live Preview
If you want to apply the custom CSS in the live preview, you can use the code below.
### CSS
```text
[data-countdown-date] {
  gap: 0.075em;
}
[data-countdown-update] {
  background-color: #2A2727;
  border-radius: 3em;
  padding: 0.25em 0.75em;
  line-height: 1;
  border: 0.075em solid transparent;
  margin: 0;
}
[data-countdown-update]:nth-child(odd) {
  border-radius: 0.125em;
}
[data-countdown-update="hours"] {
  background-color: transparent;
  border: 0.075em solid #2A2727;
}
[data-countdown-update]:nth-last-child(1) {
  background-color: #F84131;
}
```