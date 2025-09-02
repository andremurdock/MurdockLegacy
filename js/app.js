// Murdock Legacy site JS
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Load reunion details + build ICS dynamically
(async function loadReunion(){
  const el = (sel) => document.querySelector(sel);
  try {
    const res = await fetch('data/reunion.json');
    if (!res.ok) return;
    const data = await res.json();
    // Bind details
    document.querySelectorAll('[data-bind="date"]').forEach(n => n.textContent = data.date || 'TBD');
    document.querySelectorAll('[data-bind="location"]').forEach(n => n.textContent = data.location || 'TBD');
    document.querySelectorAll('[data-bind="theme"]').forEach(n => n.textContent = data.theme || 'TBD');
    const titleEl = document.getElementById('reunion-title');
    if (titleEl && data.title) titleEl.innerHTML = data.title;

    // RSVP link
    const rsvp = document.getElementById('rsvp-link');
    if (rsvp && data.rsvp_url) { rsvp.href = data.rsvp_url; } else if (rsvp) { rsvp.remove(); }

    // Build an ICS file on the fly if we have ISO start/end
    if (data.start_iso && data.end_iso && data.location) {
      const ics = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Murdock Legacy//Reunion//EN',
        'BEGIN:VEVENT',
        `UID:${(typeof crypto!=='undefined' && crypto.randomUUID)?crypto.randomUUID():(Date.now()+'@murdocklegacy')}`,
        `DTSTAMP:${new Date().toISOString().replace(/[-:]/g,'').split('.')[0]}Z`,
        `DTSTART:${data.start_iso.replace(/[-:]/g,'').replace('.000Z','Z')}`,
        `DTEND:${data.end_iso.replace(/[-:]/g,'').replace('.000Z','Z')}`,
        `SUMMARY:${data.title || 'Murdock Family Reunion'}`,
        `LOCATION:${data.location}`,
        data.description ? `DESCRIPTION:${data.description.replace(/\n/g,'\\n')}` : '',
        'END:VEVENT',
        'END:VCALENDAR'
      ].filter(Boolean).join('\r\n');
      const blob = new Blob([ics], {type:'text/calendar'});
      const url = URL.createObjectURL(blob);
      const a = document.getElementById('add-calendar');
      if (a) { a.href = url; a.download = 'murdock-reunion.ics'; }
    } else {
      const a = document.getElementById('add-calendar');
      if (a) a.remove();
    }
  } catch (e) {
    console.warn('No reunion.json yet.', e);
  }
})();

// Photos gallery
(async function loadPhotos(){
  const wrap = document.getElementById('gallery');
  if (!wrap) return;
  try {
    const res = await fetch('data/photos.json');
    if (!res.ok) return;
    const list = await res.json();
    wrap.innerHTML = list.map(item => `
      <figure>
        <img src="${item.src}" alt="${item.alt||''}" loading="lazy">
        <figcaption>${item.caption||''}</figcaption>
      </figure>
    `).join('');
    // Lightbox
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const cap = document.getElementById('lightbox-cap');
    const close = document.querySelector('.lightbox-close');
    wrap.querySelectorAll('img').forEach((im, i) => {
      im.style.cursor = 'zoom-in';
      im.addEventListener('click', () => {
        img.src = im.src;
        img.alt = im.alt || '';
        cap.textContent = (list[i] && list[i].caption) || '';
        lb.classList.add('open');
        lb.setAttribute('aria-hidden','false');
      });
    });
    close.addEventListener('click', () => {
      lb.classList.remove('open');
      lb.setAttribute('aria-hidden','true');
    });
    lb.addEventListener('click', (e) => {
      if (e.target === lb) close.click();
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lb.classList.contains('open')) close.click();
    });
  } catch (e) {
    console.warn('No photos.json yet.', e);
  }
})();

// History videos
(async function loadVideos(){
  const wrap = document.getElementById('videos');
  if (!wrap) return;
  try {
    const res = await fetch('data/videos.json');
    if (!res.ok) return;
    const vids = await res.json();
    wrap.innerHTML = vids.map(v => `
      <article class="video">
        <iframe src="https://www.youtube-nocookie.com/embed/${v.youtubeId}" title="${v.title||'Family history video'}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe>
        <div class="meta">
          <h3>${v.title||'Untitled Video'}</h3>
          <p>${v.description||''}</p>
        </div>
      </article>
    `).join('');
  } catch (e) {
    console.warn('No videos.json yet.', e);
  }
})();
