/* DEV PACK portfolio — interactions (classic script, works from file://) */
(function () {
  'use strict';
  var D = window.DEVPACK;
  if (!D) return;
  var root = document.documentElement;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- storage (optional) ---------- */
  var KEY = 'devpack-jaehoon:v1';
  var store = { opened: [] };
  try { var raw = localStorage.getItem(KEY); if (raw) store = JSON.parse(raw) || store; } catch (e) { /* storage unavailable */ }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) { /* ignore */ } }

  /* ---------- motion preference ---------- */
  var mq = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  var toggle = $('.motion-toggle');
  function calm() { return root.classList.contains('calm') || (mq && mq.matches && !root.classList.contains('motion-on')); }
  function syncToggle() { if (toggle) toggle.setAttribute('aria-pressed', calm() ? 'true' : 'false'); }
  if (store.calm === true) root.classList.add('calm');
  if (store.calm === false && mq && mq.matches) root.classList.add('motion-on');
  syncToggle();
  if (toggle) toggle.addEventListener('click', function () {
    if (calm()) { root.classList.remove('calm'); root.classList.add('motion-on'); store.calm = false; }
    else { root.classList.add('calm'); root.classList.remove('motion-on'); store.calm = true; }
    save(); syncToggle();
  });
  if (mq && mq.addEventListener) mq.addEventListener('change', syncToggle);
  var wait = function (ms) { return new Promise(function (r) { setTimeout(r, calm() ? Math.min(ms, 60) : ms); }); };

  /* ---------- holo tilt ---------- */
  var fine = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var MAX = { impact: 14, live: 12, tested: 10, plan: 8 };
  function bindTilt(el) {
    if (el.__tilt) return; el.__tilt = true;
    var tgt = { px: .5, py: .5, h: 0 }, cur = { px: .5, py: .5, h: 0 }, raf = 0, rect = null;
    var grade = el.getAttribute('data-grade') || 'live';
    var max = MAX[grade] || 10;
    function frame() {
      cur.px += (tgt.px - cur.px) * .18; cur.py += (tgt.py - cur.py) * .18; cur.h += (tgt.h - cur.h) * .18;
      el.style.setProperty('--px', cur.px.toFixed(3));
      el.style.setProperty('--py', cur.py.toFixed(3));
      el.style.setProperty('--hyp', cur.h.toFixed(3));
      el.style.setProperty('--ry', ((cur.px - .5) * 2 * max).toFixed(2) + 'deg');
      el.style.setProperty('--rx', (-(cur.py - .5) * 2 * max).toFixed(2) + 'deg');
      if (Math.abs(tgt.px - cur.px) + Math.abs(tgt.py - cur.py) + Math.abs(tgt.h - cur.h) > .002) raf = requestAnimationFrame(frame);
      else raf = 0;
    }
    function kick() { if (!raf) raf = requestAnimationFrame(frame); }
    el.addEventListener('pointerenter', function () { if (calm()) return; rect = el.getBoundingClientRect(); el.classList.add('is-tilting'); el.style.willChange = 'transform'; });
    el.addEventListener('pointermove', function (ev) {
      if (calm() || (ev.pointerType !== 'mouse' && !el.closest('.detail'))) return;
      rect = rect || el.getBoundingClientRect();
      tgt.px = Math.min(1, Math.max(0, (ev.clientX - rect.left) / rect.width));
      tgt.py = Math.min(1, Math.max(0, (ev.clientY - rect.top) / rect.height));
      tgt.h = Math.min(1, Math.hypot(tgt.px - .5, tgt.py - .5) * 1.6 + .25);
      kick();
    });
    el.addEventListener('pointerleave', function () {
      rect = null; el.classList.remove('is-tilting'); el.style.willChange = '';
      tgt.px = .5; tgt.py = .5; tgt.h = 0; kick();
    });
  }
  function bindAllTilt(scope) { if (!fine) return; $$('.tcard, .profile', scope).forEach(bindTilt); }
  bindAllTilt(document);

  /* ---------- helpers ---------- */
  var cardTpl = {};
  $$('#all .tcard').forEach(function (c) { cardTpl[c.getAttribute('data-id')] = c.outerHTML; });
  function cardEl(id) { var w = document.createElement('div'); w.innerHTML = cardTpl[id]; return w.firstElementChild; }
  var gradeRank = function (id) { return D.gradeOrder.indexOf(D.projects[id].grade); };
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function openDialog(d) { if (typeof d.showModal === 'function') d.showModal(); else d.setAttribute('open', ''); }
  function closeDialog(d) { if (typeof d.close === 'function') d.close(); else d.removeAttribute('open'); }

  /* ---------- detail dialog ---------- */
  var detail = $('#detail');
  var order = $$('#all .tcard').map(function (c) { return c.getAttribute('data-id'); });
  var curDetail = null, returnFocus = null;
  function fillDetail(id) {
    curDetail = id;
    var p = D.projects[id], g = D.grades[p.grade], f = D.featured[id];
    var holder = $('.dt-card', detail); holder.innerHTML = '';
    var c = cardEl(id); c.setAttribute('tabindex', '-1'); c.removeAttribute('aria-label'); c.setAttribute('aria-hidden', 'true');
    holder.appendChild(c); bindTilt(c);
    $('.dt-meta', detail).innerHTML = '<span class="gchip g-' + p.grade + '">' + g.code + '</span><span>' + esc(g.label) + '</span><span aria-hidden="true">·</span><span>' + esc(D.packs[p.pack].name) + '</span>';
    $('#dt-title').textContent = p.title;
    $('.dt-summary', detail).textContent = p.summary;
    var dl = $('.dt-case', detail);
    dl.innerHTML = f ? ['Problem', 'Approach', 'Result'].map(function (k, i) {
      var v = [f.problem, f.approach, f.result][i];
      return '<div><dt>' + k + '</dt><dd>' + esc(v) + '</dd></div>';
    }).join('') + '<div><dt>My role</dt><dd><ul>' + f.role.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') + '</ul></dd></div>' : '';
    $('.dt-status', detail).textContent = p.status;
    var typesSrc = c.querySelector('.c-types');
    $('.dt-types', detail).innerHTML = typesSrc ? typesSrc.innerHTML : '';
    var links = p.links.map(function (l) { return '<a class="ext" href="' + esc(l[1]) + '" target="_blank" rel="noopener">' + esc(l[0]) + ' <span aria-hidden="true">↗</span></a>'; }).join('');
    if (!p.repo && !p.links.some(function (l) { return l[0] === 'GitHub'; })) links += '<span class="private">Private repository</span>';
    $('.dt-links', detail).innerHTML = links;
    try { history.replaceState(null, '', '#p-' + id); } catch (e) { /* file:// may refuse */ }
  }
  function showDetail(id, from) {
    returnFocus = from || document.activeElement;
    fillDetail(id);
    if (!detail.open) openDialog(detail);
    var btn = $('[data-close]', detail); if (btn) btn.focus();
  }
  function step(dir) {
    var i = order.indexOf(curDetail); if (i < 0) return;
    fillDetail(order[(i + dir + order.length) % order.length]);
  }
  $('[data-prev]', detail).addEventListener('click', function () { step(-1); });
  $('[data-next]', detail).addEventListener('click', function () { step(1); });
  $('[data-close]', detail).addEventListener('click', function () { closeDialog(detail); });
  detail.addEventListener('keydown', function (ev) {
    if (ev.key === 'ArrowLeft') { step(-1); ev.preventDefault(); }
    if (ev.key === 'ArrowRight') { step(1); ev.preventDefault(); }
  });
  detail.addEventListener('click', function (ev) { if (ev.target === detail) closeDialog(detail); });
  detail.addEventListener('close', function () {
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) { /* ignore */ }
    if (returnFocus && returnFocus.focus) returnFocus.focus();
  });
  document.addEventListener('click', function (ev) {
    var c = ev.target.closest && ev.target.closest('.tcard');
    if (!c || !c.isConnected || c.closest('.dt-card') || c.closest('.op-slot') || c.closest('.op-grid')) return;
    var id = c.getAttribute('data-id'); if (!id) return;
    showDetail(id, c);
  });

  $$('[data-open]').forEach(function (b) {
    b.addEventListener('click', function () { var id = b.getAttribute('data-open'); if (D.projects[id]) showDetail(id, b); });
  });

  /* ---------- filters ---------- */
  var chips = $$('#all .chip');
  var fPack = null, fGrade = null;
  function applyFilter() {
    var n = 0;
    $$('#all .grid > li').forEach(function (li) {
      var c = li.firstElementChild;
      var ok = (!fPack || c.getAttribute('data-pack') === fPack) && (!fGrade || c.getAttribute('data-grade') === fGrade);
      li.hidden = !ok; if (ok) n++;
    });
    $('#count').textContent = n;
    chips.forEach(function (ch) {
      var on = ch.hasAttribute('data-filter-all') ? (!fPack && !fGrade)
        : ch.getAttribute('data-filter-pack') ? ch.getAttribute('data-filter-pack') === fPack
          : ch.getAttribute('data-filter-grade') === fGrade;
      ch.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }
  chips.forEach(function (ch) {
    ch.addEventListener('click', function () {
      if (ch.hasAttribute('data-filter-all')) { fPack = null; fGrade = null; }
      else if (ch.getAttribute('data-filter-pack')) { var v = ch.getAttribute('data-filter-pack'); fPack = fPack === v ? null : v; }
      else { var g = ch.getAttribute('data-filter-grade'); fGrade = fGrade === g ? null : g; }
      applyFilter();
    });
  });

  /* ---------- pack opening ---------- */
  var op = $('#opening'), opPack = $('.op-pack', op), tearLine = $('.tear-line', op);
  var reveal = $('.op-reveal', op), slot = $('.op-slot', op), rays = $('.op-rays', op), flash = $('.op-flash', op);
  var result = $('.op-result', op), resGrid = $('.op-grid', op), live = $('#op-live');
  var hint = $('.op-hint', op);
  var btnNow = $('[data-open-now]', op), btnSkip = $('[data-skip]', op), btnOther = $('[data-other]', op), btnAll = $('[data-to-all]', op);
  var state = null, packReturn = null, hintTimer = 0;

  function markOpened() {
    $$('.pack').forEach(function (b) {
      var m = $('.opened-mark', b); if (m) m.hidden = store.opened.indexOf(b.getAttribute('data-pack')) < 0;
    });
  }
  markOpened();

  function resetStage() {
    opPack.classList.remove('torn', 'wiggle', 'hinting');
    opPack.style.removeProperty('--p');
    tearLine.style.setProperty('--p', 0);
    $('.op-pack-wrap', op).hidden = false;
    reveal.hidden = true; result.hidden = true; slot.innerHTML = ''; resGrid.innerHTML = '';
    rays.classList.remove('on');
    btnNow.hidden = false; btnSkip.hidden = false; btnOther.hidden = true; btnAll.hidden = true;
    hint.textContent = 'Swipe the top of the wrapper sideways to open it';
  }

  function openPack(packId, fromBtn) {
    var pk = D.packs[packId]; if (!pk) return;
    packReturn = fromBtn || null;
    var ids = pk.items.slice().sort(function (a, b) { return gradeRank(a) - gradeRank(b); });
    state = { pack: packId, ids: ids, i: -1, busy: false, torn: false };
    resetStage();
    $('#op-title').textContent = pk.name + ' · ' + ids.length + ' cards';
    op.style.setProperty('--pack', pk.bg);
    $('.op-pack-top', op).style.background = pk.bg;
    $('.op-pack-body', op).style.background = pk.bg;
    $('.op-pack .pack-name', op).textContent = pk.name;
    $('.op-pack use', op).setAttribute('href', '#cr-' + pk.creature);
    opPack.setAttribute('aria-label', pk.name + ' pack. Press Enter to open it');
    openDialog(op);
    opPack.focus();
    clearTimeout(hintTimer);
    hintTimer = setTimeout(function () { if (state && !state.torn) opPack.classList.add('hinting'); }, 1500);
  }

  /* drag to tear */
  var drag = null;
  opPack.addEventListener('pointerdown', function (ev) {
    if (!state || state.torn) return;
    var r = opPack.getBoundingClientRect();
    var y = ev.clientY - r.top;
    if (y > r.height * .34) { opPack.classList.remove('wiggle'); void opPack.offsetWidth; opPack.classList.add('wiggle'); hint.textContent = 'Swipe the top of the wrapper near the dotted line sideways'; return; }
    drag = { x: ev.clientX, y: ev.clientY, t: performance.now(), w: r.width, id: ev.pointerId };
    opPack.classList.remove('hinting');
    try { opPack.setPointerCapture(ev.pointerId); } catch (e) { /* ignore */ }
  });
  opPack.addEventListener('pointermove', function (ev) {
    if (!drag || ev.pointerId !== drag.id) return;
    var dx = ev.clientX - drag.x;
    var p = Math.max(0, Math.min(1, Math.abs(dx) / (drag.w * .6)));
    tearLine.classList.toggle('rtl', dx < 0);
    tearLine.style.setProperty('--p', p.toFixed(3));
  });
  function endDrag(ev) {
    if (!drag || (ev && ev.pointerId !== drag.id)) return;
    var dx = ev.clientX - drag.x, dy = ev.clientY - drag.y, dt = Math.max(1, performance.now() - drag.t);
    var ok = (Math.abs(dx) >= Math.max(90, drag.w * .55) && Math.abs(dy) < Math.abs(dx) * .6) || (Math.abs(dx) / dt > .8 && Math.abs(dx) > drag.w * .3);
    drag = null;
    if (ok) tear();
    else { tearLine.style.setProperty('--p', 0); if (Math.abs(dx) > 8) hint.textContent = 'Swipe a little farther'; }
  }
  opPack.addEventListener('pointerup', endDrag);
  opPack.addEventListener('pointercancel', function () { drag = null; tearLine.style.setProperty('--p', 0); });
  opPack.addEventListener('keydown', function (ev) {
    if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); autoTear(); }
  });
  function autoTear() {
    if (!state || state.torn) return;
    var t0 = performance.now(), dur = calm() ? 60 : 420;
    tearLine.classList.remove('rtl');
    (function anim(now) {
      var p = Math.min(1, (now - t0) / dur);
      tearLine.style.setProperty('--p', p.toFixed(3));
      if (p < 1) requestAnimationFrame(anim); else tear();
    })(t0);
  }
  btnNow.addEventListener('click', autoTear);

  function tear() {
    if (!state || state.torn) return;
    state.torn = true;
    clearTimeout(hintTimer);
    opPack.classList.add('torn');
    hint.textContent = '';
    if (store.opened.indexOf(state.pack) < 0) { store.opened.push(state.pack); save(); markOpened(); }
    wait(620).then(function () {
      $('.op-pack-wrap', op).hidden = true;
      reveal.hidden = false;
      btnNow.hidden = true;
      next();
    });
  }

  function buildFlip(id) {
    var fl = document.createElement('div');
    fl.className = 'flipper';
    fl.setAttribute('role', 'button');
    fl.setAttribute('tabindex', '0');
    var p = D.projects[id];
    fl.innerHTML = '<div class="back" aria-hidden="true"></div><div class="face"></div>';
    var c = cardEl(id); c.setAttribute('tabindex', '-1'); c.setAttribute('aria-hidden', 'true');
    $('.face', fl).appendChild(c);
    fl.setAttribute('aria-label', 'Flip card ' + (state.i + 1) + '/' + state.ids.length);
    fl.addEventListener('click', function (ev) { ev.stopPropagation(); onSlot(); });
    fl.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); onSlot(); } });
    return fl;
  }

  function next() {
    if (!state) return;
    state.i++;
    if (state.i >= state.ids.length) { showResult(); return; }
    var id = state.ids[state.i];
    slot.innerHTML = '';
    rays.classList.remove('on');
    var fl = buildFlip(id);
    slot.appendChild(fl);
    fl.focus();
    state.flipped = false;
    hint.textContent = 'Click the card to flip it (' + (state.i + 1) + ' / ' + state.ids.length + ')';
  }

  function onSlot() {
    if (!state || state.busy) return;
    if (!state.flipped) flip(); else next();
  }
  document.addEventListener('keydown', function (ev) {
    if (!op.open || !state || reveal.hidden) return;
    if (ev.key === 'ArrowRight') { ev.preventDefault(); onSlot(); }
  });

  function flip() {
    var id = state.ids[state.i], grade = D.projects[id].grade;
    var fl = $('.flipper', slot), back = $('.back', fl);
    state.busy = true;
    var pre = Promise.resolve();
    if (!calm()) {
      if (grade === 'live') { back.classList.add('pre-live', 'shake-1'); pre = wait(650); }
      if (grade === 'impact') { back.classList.add('pre-impact', 'shake-2'); pre = wait(950).then(function () { flash.classList.remove('go'); void flash.offsetWidth; flash.classList.add('go'); return wait(220); }); }
    }
    pre.then(function () {
      fl.classList.add('up');
      state.flipped = true;
      var p = D.projects[id];
      live.textContent = D.grades[grade].code + ' tier, ' + p.title;
      if (grade === 'impact' || grade === 'live') rays.classList.add('on');
      hint.textContent = state.i + 1 < state.ids.length ? 'Click again for the next card' : 'Click again to see the results';
      fl.setAttribute('aria-label', p.title + ' card. Continue');
      return wait(480);
    }).then(function () {
      var c = $('.face .tcard', fl); if (c) bindTilt(c);
      state.busy = false;
    });
  }

  function showResult() {
    if (!state) return;
    state.torn = true;
    clearTimeout(hintTimer);
    $('.op-pack-wrap', op).hidden = true;
    reveal.hidden = true; rays.classList.remove('on');
    result.hidden = false;
    var pk = D.packs[state.pack];
    $('.op-result-title', op).textContent = pk.name + ' · ' + state.ids.length + ' cards. Select a card for details.';
    resGrid.innerHTML = '';
    state.ids.slice().sort(function (a, b) { return gradeRank(b) - gradeRank(a); }).forEach(function (id, i) {
      var li = document.createElement('li'); li.style.animationDelay = (i * 80) + 'ms';
      li.appendChild(cardEl(id)); resGrid.appendChild(li);
    });
    bindAllTilt(resGrid);
    btnNow.hidden = true; btnSkip.hidden = true; btnOther.hidden = false; btnAll.hidden = false;
    hint.textContent = '';
    if (store.opened.indexOf(state.pack) < 0) { store.opened.push(state.pack); save(); markOpened(); }
    var first = $('.tcard', resGrid); if (first) first.focus();
  }
  btnSkip.addEventListener('click', showResult);
  btnOther.addEventListener('click', function () { closeDialog(op); var s = $('#cards'); if (s) s.scrollIntoView(); var b = $('.pack'); if (b) b.focus(); });
  btnAll.addEventListener('click', function () { closeDialog(op); });
  $('[data-close]', op).addEventListener('click', function () { closeDialog(op); });
  op.addEventListener('close', function () {
    state = null; clearTimeout(hintTimer); rays.classList.remove('on');
    if (packReturn && packReturn.focus && document.contains(packReturn)) packReturn.focus();
  });
  resGrid.addEventListener('click', function (ev) {
    var c = ev.target.closest('.tcard'); if (!c) return;
    ev.stopPropagation();
    showDetail(c.getAttribute('data-id'), c);
  });

  $$('.pack').forEach(function (b) {
    b.addEventListener('click', function () { openPack(b.getAttribute('data-pack'), b); });
  });

  /* ---------- card open reveal from hero CTAs ---------- */
  function ensureBack(c) {
    var tilt = c.querySelector('.tilt');
    if (tilt && !tilt.querySelector('.cback')) { var b = document.createElement('span'); b.className = 'cback'; b.setAttribute('aria-hidden', 'true'); tilt.appendChild(b); }
  }
  function openCard(c) {
    var grade = c.getAttribute('data-grade');
    var pre = grade === 'impact' ? 950 : grade === 'live' ? 620 : 0;
    if (pre) c.classList.add('pre-' + grade);
    return wait(pre).then(function () {
      c.classList.remove('pre-live', 'pre-impact');
      c.classList.add('flipping');
      c.classList.remove('closed');
      if (grade === 'impact' || grade === 'live') { c.classList.remove('burst'); void c.offsetWidth; c.classList.add('burst'); }
      return wait(780);
    }).then(function () {
      c.classList.remove('flipping');
      setTimeout(function () { c.classList.remove('burst'); }, 700);
    });
  }
  var revealObs = null, queue = [], running = false;
  function pump() {
    if (running || !queue.length) return;
    running = true;
    var c = queue.shift();
    var gap = c.closest('#featured') ? 260 : 110;
    openCard(c);
    setTimeout(function () { running = false; pump(); }, gap + (c.getAttribute('data-grade') === 'impact' ? 700 : c.getAttribute('data-grade') === 'live' ? 350 : 0));
  }
  function revealCards(cards) {
    if (calm() || !('IntersectionObserver' in window)) return;
    if (revealObs) revealObs.disconnect();
    queue = [];
    cards.forEach(function (c) { ensureBack(c); c.classList.remove('flipping', 'burst'); c.classList.add('closed'); });
    revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && en.target.classList.contains('closed') && queue.indexOf(en.target) < 0) {
          queue.push(en.target); revealObs.unobserve(en.target);
        }
      });
      queue.sort(function (a, b) { return cards.indexOf(a) - cards.indexOf(b); });
      pump();
    }, { threshold: .35 });
    // wait for the smooth scroll to settle before observing
    setTimeout(function () { cards.forEach(function (c) { revealObs.observe(c); }); }, 650);
  }
  $$('[data-reveal]').forEach(function (a) {
    a.addEventListener('click', function (ev) {
      var which = a.getAttribute('data-reveal');
      var target = document.getElementById(which);
      if (!target) return;
      ev.preventDefault();
      if (which === 'all') { fPack = null; fGrade = null; applyFilter(); }
      var cards = $$('.tcard', which === 'featured' ? $('#featured') : $('#all .grid'));
      revealCards(cards);
      target.scrollIntoView({ behavior: calm() ? 'auto' : 'smooth', block: 'start' });
      try { history.replaceState(null, '', '#' + which); } catch (e) { /* ignore */ }
    });
  });

  /* ---------- intro: open the profile card to start ---------- */
  var intro = $('#intro');
  if (intro && root.classList.contains('has-intro')) {
    var icard = $('.intro-card', intro), face = $('.ic-face', intro), burst = $('.intro-burst', intro), iflash = $('.intro-flash', intro);
    var heroProfile = $('.hero .profile');
    var introBusy = false;
    var inertTargets = $$('body > header, body > main, body > footer, body > .skip');
    inertTargets.forEach(function (el) { el.setAttribute('inert', ''); });
    function sizeCard() {
      if (!heroProfile) return;
      var w = heroProfile.offsetWidth || 380, h = heroProfile.offsetHeight || 540;
      icard.style.setProperty('--iw', w + 'px');
      icard.style.setProperty('--ih', h + 'px');
      var avail = window.innerHeight - 250, availW = window.innerWidth - 32;
      var s = Math.max(.45, Math.min(1, avail / h, availW / w));
      icard.style.setProperty('--is', s.toFixed(3));
    }
    if (heroProfile) {
      var clone = heroProfile.cloneNode(true);
      clone.removeAttribute('data-tilt');
      // SVG gradient ids must stay unique, or the hero avatar loses its fills
      $$('[id]', clone).forEach(function (el) { el.id = 'intro-' + el.id; });
      $$('[fill^="url(#"], [stroke^="url(#"]', clone).forEach(function (el) {
        ['fill', 'stroke'].forEach(function (k) { var v = el.getAttribute(k); if (v && v.indexOf('url(#') === 0) el.setAttribute(k, v.replace('url(#', 'url(#intro-')); });
      });
      face.appendChild(clone);
    }
    sizeCard();
    window.addEventListener('resize', function () { if (!introBusy) sizeCard(); });
    setTimeout(function () { icard.focus({ preventScroll: true }); }, 60);

    function sparks() {
      var colors = ['#ffd76e', '#ff9ec0', '#9ad8ff', '#b995ff', '#ffffff', '#ffb36b'];
      var n = window.innerWidth < 600 ? 36 : 64, html = '';
      for (var i = 0; i < n; i++) {
        var ang = Math.random() * Math.PI * 2, dist = 140 + Math.random() * Math.min(window.innerWidth, 900) * .45;
        html += '<span class="spark' + (i % 3 === 0 ? ' star' : '') + '" style="--dx:' + Math.round(Math.cos(ang) * dist) + 'px;--dy:' + Math.round(Math.sin(ang) * dist) + 'px;--c:' + colors[i % colors.length] + ';--sz:' + (4 + Math.round(Math.random() * 8)) + 'px;--d:' + (Math.random() * .25).toFixed(2) + 's"></span>';
      }
      burst.innerHTML = html;
    }
    function finishIntro() {
      root.classList.remove('has-intro');
      root.classList.add('intro-done');
      intro.hidden = true;
      face.innerHTML = '';
      inertTargets.forEach(function (el) { el.removeAttribute('inert'); });
      var h1 = $('#hero-title'); if (h1) { h1.setAttribute('tabindex', '-1'); h1.focus({ preventScroll: true }); }
    }
    function openIntro() {
      if (introBusy) return;
      introBusy = true;
      window.scrollTo(0, 0);
      if (calm()) {
        icard.classList.add('flipped');
        wait(300).then(finishIntro);
        return;
      }
      icard.style.setProperty('--drag', '0deg');
      icard.classList.add('charging');
      intro.classList.add('lit');
      wait(950).then(function () {
        icard.classList.remove('charging');
        iflash.classList.remove('go'); void iflash.offsetWidth; iflash.classList.add('go');
        sparks();
        icard.classList.add('flipped');
        return wait(1500);
      }).then(function () {
        intro.classList.add('opening-done');
        return wait(250);
      }).then(function () {
        // fly the opened card to its place in the hero
        var from = icard.getBoundingClientRect(), to = heroProfile ? heroProfile.getBoundingClientRect() : from;
        var dx = (to.left + to.width / 2) - (from.left + from.width / 2);
        var dy = (to.top + to.height / 2) - (from.top + from.height / 2);
        icard.classList.add('flying');
        intro.classList.add('leaving');
        icard.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(1)';
        return wait(980);
      }).then(finishIntro);
    }
    // click, keyboard, or a sideways swipe opens the card
    var sw = null;
    icard.addEventListener('pointerdown', function (ev) { if (introBusy) return; sw = { x: ev.clientX, y: ev.clientY, id: ev.pointerId, moved: false }; try { icard.setPointerCapture(ev.pointerId); } catch (e) { /* ignore */ } });
    icard.addEventListener('pointermove', function (ev) {
      if (!sw || ev.pointerId !== sw.id) return;
      var dx = ev.clientX - sw.x;
      if (Math.abs(dx) > 6) sw.moved = true;
      icard.style.setProperty('--drag', Math.max(-35, Math.min(35, dx / 6)).toFixed(1) + 'deg');
      if (Math.abs(dx) > 90 && Math.abs(ev.clientY - sw.y) < Math.abs(dx)) { sw = null; openIntro(); }
    });
    icard.addEventListener('pointerup', function () {
      if (!sw) return;
      var moved = sw.moved; sw = null;
      if (!moved) openIntro(); else icard.style.setProperty('--drag', '0deg');
    });
    icard.addEventListener('pointercancel', function () { sw = null; icard.style.setProperty('--drag', '0deg'); });
    icard.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); openIntro(); } });
    $('.intro-skip', intro).addEventListener('click', function () { introBusy = true; finishIntro(); });
  }

  /* ---------- deep link ---------- */
  var m = /^#p-([a-z]+)$/.exec(location.hash || '');
  if (m && D.projects[m[1]]) setTimeout(function () { showDetail(m[1], null); }, 50);
})();
