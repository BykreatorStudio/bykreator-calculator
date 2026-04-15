(function () {
  var WORKER = 'https://bykreator-calendar.bykreator.workers.dev';
  var state = { date: null, time: null, slots: [] };
  var viewDate = new Date();

  function el(id) { return document.getElementById(id); }

  function fmtMonthYear(d) { return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }); }
  function fmtDateFull(iso) { return new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }); }
  function fmtTime(iso) { return new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }); }

  function validateForm() {
    var name = el('bkName').value.trim();
    var email = el('bkEmail').value.trim();
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    var ready = name !== '' && emailOk && state.date !== null && state.time !== null;
    var btn = el('bkBookBtn');
    btn.disabled = !ready;
    btn.style.opacity = ready ? '1' : '0.4';
    btn.style.cursor = ready ? 'pointer' : 'not-allowed';
  }

  function renderMonth() {
    var y = viewDate.getFullYear(), m = viewDate.getMonth();
    el('bkCurrentMonth').textContent = fmtMonthYear(new Date(y, m, 1));

    var thisMonth = new Date(); thisMonth.setDate(1); thisMonth.setHours(0, 0, 0, 0);
    var viewMonth = new Date(y, m, 1);
    var prevBtn = el('bkPrevMonth');
    prevBtn.disabled = viewMonth <= thisMonth;
    prevBtn.style.opacity = viewMonth <= thisMonth ? '0.3' : '1';
    prevBtn.style.cursor = viewMonth <= thisMonth ? 'not-allowed' : 'pointer';

    var grid = el('bkDateGrid');
    grid.innerHTML = '';

    ['S', 'M', 'T', 'W', 'T', 'F', 'S'].forEach(function (d) {
      var h = document.createElement('div');
      h.style.cssText = 'text-align:center;font-size:12px;color:rgba(255,255,255,.4);font-weight:500;padding:8px 0';
      h.textContent = d;
      grid.appendChild(h);
    });

    var firstDay = new Date(y, m, 1).getDay();
    for (var i = 0; i < firstDay; i++) grid.appendChild(document.createElement('div'));

    var lastDay = new Date(y, m + 1, 0).getDate();
    var today = new Date(); today.setHours(0, 0, 0, 0);

    for (var day = 1; day <= lastDay; day++) {
      var dateObj = new Date(y, m, day);
      var tzOff = dateObj.getTimezoneOffset() * 60000;
      var dateStr = new Date(dateObj.getTime() - tzOff).toISOString().split('T')[0];
      var btn = document.createElement('button');
      btn.textContent = day;
      btn.dataset.date = dateStr;
      var isPast = dateObj < today;
      var isSel = state.date === dateStr;
      btn.style.cssText = 'width:100%;padding:10px 0;border-radius:8px;font-size:14px;font-weight:500;font-family:inherit;transition:all .2s;box-sizing:border-box;' +
        (isPast
          ? 'background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.05);color:rgba(255,255,255,.18);cursor:not-allowed;'
          : isSel
            ? 'background:#CFFF54;border:1px solid #CFFF54;color:#000;cursor:pointer;'
            : 'background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);color:#fff;cursor:pointer;');
      if (isPast) {
        btn.disabled = true;
      } else {
        btn.addEventListener('mouseenter', function () {
          if (state.date !== this.dataset.date) this.style.background = 'rgba(255,255,255,.13)';
        });
        btn.addEventListener('mouseleave', function () {
          if (state.date !== this.dataset.date) this.style.background = 'rgba(255,255,255,.07)';
        });
        btn.addEventListener('click', function () {
          state.date = this.dataset.date;
          state.time = null;
          el('bkDateView').style.display = 'none';
          el('bkTimeView').style.display = 'block';
          loadSlots(state.date);
          validateForm();
        });
      }
      grid.appendChild(btn);
    }
  }

  function loadSlots(date) {
    el('bkSelectedDateLabel').textContent = fmtDateFull(date);
    var grid = el('bkTimeSlotsGrid');
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:24px;color:rgba(255,255,255,.4);font-size:15px">Loading slots…</div>';
    fetch(WORKER + '/api/availability?date=' + date)
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (d) {
        state.slots = d.slots || [];
        if (state.slots.length > 0) {
          renderSlots();
        } else {
          grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:24px;color:rgba(255,255,255,.4);font-size:15px">No available slots for this date</div>';
        }
      })
      .catch(function () {
        grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:24px;color:rgba(255,255,255,.4);font-size:15px">Error loading slots. Please try again.</div>';
      });
  }

  function renderSlots() {
    var grid = el('bkTimeSlotsGrid');
    grid.innerHTML = '';
    state.slots.forEach(function (slot) {
      var btn = document.createElement('button');
      btn.textContent = fmtTime(slot.start);
      btn.dataset.time = slot.start;
      var isSel = state.time === slot.start;
      btn.style.cssText = 'padding:12px 8px;border-radius:8px;font-size:14px;font-weight:500;font-family:inherit;cursor:pointer;transition:all .2s;box-sizing:border-box;' +
        (isSel ? 'background:#CFFF54;border:1px solid #CFFF54;color:#000;' : 'background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);color:#fff;');
      btn.addEventListener('mouseenter', function () {
        if (state.time !== this.dataset.time) this.style.background = 'rgba(255,255,255,.13)';
      });
      btn.addEventListener('mouseleave', function () {
        if (state.time !== this.dataset.time) this.style.background = 'rgba(255,255,255,.07)';
      });
      btn.addEventListener('click', function () {
        state.time = this.dataset.time;
        renderSlots();
        validateForm();
      });
      grid.appendChild(btn);
    });
  }

  el('bkBookBtn').addEventListener('click', function () {
    if (!el('bkName').value.trim() || !state.date || !state.time) return;
    var btn = this;
    btn.textContent = 'Booking…';
    btn.disabled = true;
    btn.style.opacity = '0.6';
    btn.style.cursor = 'not-allowed';

    var name = el('bkName').value.trim();
    var email = el('bkEmail').value.trim();
    var company = el('bkCompany').value.trim();
    var message = el('bkMessage').value.trim();
    var selectedSlot = state.slots.find(function (s) { return s.start === state.time; });
    var endTime = selectedSlot ? selectedSlot.end : new Date(new Date(state.time).getTime() + 30 * 60000).toISOString();

    fetch(WORKER + '/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        email: email,
        company: company || 'N/A',
        description: message || 'Discovery call booking',
        start: state.time,
        end: endTime,
        notes: 'Company: ' + (company || 'N/A') + (message ? '\nMessage: ' + message : ''),
        locale: 'en'
      })
    })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (d.success) {
          showConfirmation(name);
        } else {
          alert('Booking failed: ' + (d.error || 'Unknown error'));
          btn.textContent = 'Book Discovery Call';
          btn.disabled = false; btn.style.opacity = '1'; btn.style.cursor = 'pointer';
        }
      })
      .catch(function () {
        alert('Booking error. Please try again or contact us directly.');
        btn.textContent = 'Book Discovery Call';
        btn.disabled = false; btn.style.opacity = '1'; btn.style.cursor = 'pointer';
      });
  });

  function showConfirmation(name) {
    el('bkMainContent').style.display = 'none';
    el('bkConfirmContent').style.display = 'block';
    el('bkConfirmedName').textContent = name.split(' ')[0];
    el('bkConfirmedDate').textContent = fmtDateFull(state.date);
    el('bkConfirmedTime').textContent = fmtTime(state.time);
  }

  el('bkPrevMonth').addEventListener('click', function () {
    var prev = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1);
    var thisMonth = new Date(); thisMonth.setDate(1); thisMonth.setHours(0, 0, 0, 0);
    if (prev >= thisMonth) { viewDate = prev; renderMonth(); }
  });
  el('bkNextMonth').addEventListener('click', function () {
    viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);
    renderMonth();
  });
  el('bkBackToDate').addEventListener('click', function () {
    el('bkTimeView').style.display = 'none';
    el('bkDateView').style.display = 'block';
    state.time = null;
    validateForm();
  });

  el('bkName').addEventListener('input', validateForm);
  el('bkEmail').addEventListener('input', validateForm);

  renderMonth();
  validateForm();
})();
