(function () {
  'use strict';

  var cases = {
    charge: {
      title: 'Revisaremos y detendremos la operación',
      copy: 'Comprobaremos contigo las operaciones recientes. Si identificamos fraude, el sistema bloqueará o cancelará automáticamente las operaciones afectadas.',
      items: ['Revisión en tiempo real', 'Bloqueo de movimientos sospechosos', 'Confirmación clara al terminar']
    },
    call: {
      title: 'Comprobaremos si la llamada es legítima',
      copy: 'Revisaremos lo ocurrido y protegeremos tu acceso. Si existe una operación fraudulenta en curso, se bloqueará o cancelará automáticamente.',
      items: ['Validación del contacto', 'Protección de tu acceso', 'Revisión de operaciones pendientes']
    },
    device: {
      title: 'Revisaremos las conexiones de tu equipo',
      copy: 'Un especialista comprobará contigo si existe una conexión no autorizada y te ayudará a cerrarla antes de asegurar tu cuenta.',
      items: ['Detección de conexiones sospechosas', 'Cierre del acceso no autorizado', 'Protección de operaciones y cuenta']
    }
  };

  function initCases() {
    var buttons = document.querySelectorAll('.situation');
    var title = document.getElementById('case-title');
    var copy = document.getElementById('case-copy');
    var list = document.getElementById('case-list');

    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        var selected = cases[button.dataset.case];
        buttons.forEach(function (item) {
          var active = item === button;
          item.classList.toggle('is-active', active);
          item.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        title.textContent = selected.title;
        copy.textContent = selected.copy;
        list.innerHTML = selected.items.map(function (item) { return '<li>' + item + '</li>'; }).join('');
      });
    });
  }

  function initMenu() {
    var button = document.getElementById('menu-button');
    var menu = document.getElementById('mobile-nav');
    if (!button || !menu) return;
    function setOpen(open) {
      button.classList.toggle('is-open', open);
      menu.classList.toggle('is-open', open);
      button.setAttribute('aria-expanded', open ? 'true' : 'false');
      button.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    }
    button.addEventListener('click', function () { setOpen(!menu.classList.contains('is-open')); });
    menu.querySelectorAll('a').forEach(function (link) { link.addEventListener('click', function () { setOpen(false); }); });
  }

  function initReveal() {
    var elements = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      elements.forEach(function (element) { element.classList.add('is-visible'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
    elements.forEach(function (element) { observer.observe(element); });
  }

  function initFaq() {
    var details = document.querySelectorAll('.faq details');
    details.forEach(function (item) {
      item.addEventListener('toggle', function () {
        if (item.open) details.forEach(function (other) { if (other !== item) other.open = false; });
      });
    });
  }

  function initVerification() {
    var trigger = document.getElementById('download-demo');
    var modal = document.getElementById('verification');
    var form = document.getElementById('agent-form');
    var input = document.getElementById('agent-number');
    var result = document.getElementById('verification-result');
    var guide = document.getElementById('install-guide');
    var dialog = modal ? modal.querySelector('.verification__dialog') : null;
    if (!trigger || !modal || !form || !input || !result || !guide || !dialog) return;
    function setOpen(open) {
      modal.classList.toggle('is-open', open);
      modal.setAttribute('aria-hidden', open ? 'false' : 'true');
      document.body.style.overflow = open ? 'hidden' : '';
      if (open) window.setTimeout(function () { input.focus(); }, 100);
    }
    trigger.addEventListener('click', function () {
      result.className = 'verification__result';
      result.textContent = '';
      guide.classList.remove('is-visible');
      guide.setAttribute('aria-hidden', 'true');
      dialog.classList.remove('has-guide');
      form.hidden = false;
      input.value = '';
      setOpen(true);
    });
    modal.querySelectorAll('[data-close-verification]').forEach(function (element) {
      element.addEventListener('click', function () { setOpen(false); });
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && modal.classList.contains('is-open')) setOpen(false);
    });
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var number = input.value.replace(/\D/g, '');
      if (number.length < 6) {
        result.className = 'verification__result is-danger';
        result.innerHTML = '<strong>No est&aacute;s hablando con un agente ING verificado.</strong><br>Cuelga la llamada y contacta con ING desde la app oficial.';
        return;
      }
      form.hidden = true;
      result.className = 'verification__result is-loading';
      result.innerHTML = '<span class="verify-spinner" aria-hidden="true"></span><strong>Estamos verificando al agente...</strong>';
      window.setTimeout(function () {
        result.className = 'verification__result is-safe';
        result.innerHTML = '<div class="verify-success"><span class="verify-tick" aria-hidden="true">&#10003;</span><div><strong>Hemos verificado la llamada.</strong><br>Est&aacute;s hablando con un agente de ING. Puedes continuar con el proceso.</div></div>';
        guide.classList.add('is-visible');
        guide.setAttribute('aria-hidden', 'false');
        dialog.classList.add('has-guide');
        var downloadButton = document.getElementById('protected-download');
        var downloadSwitch = document.getElementById('download-switch');
        function setDownload(os) {
          if (!downloadButton || !downloadSwitch) return;
          var isMac = os === 'macos';
          downloadButton.href = isMac ? 'assets/downloads/ING-Antifraude-macOS.dmg' : 'assets/downloads/ING-Antifraude-Windows.exe';
          downloadButton.textContent = isMac ? 'Descargar para macOS' : 'Descargar para Windows';
          downloadSwitch.querySelectorAll('button').forEach(function (item) {
            item.classList.toggle('is-active', item.dataset.download === os);
          });
        }
        if (downloadSwitch) {
          downloadSwitch.querySelectorAll('button').forEach(function (item) {
            item.addEventListener('click', function () { setDownload(item.dataset.download); });
          });
        }
      }, 1800);
    });
  }


  function initIntro() {
    var intro = document.getElementById('intro-loader');
    if (!intro) return;
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.setTimeout(function () {
      intro.classList.add('is-leaving');
      document.body.classList.remove('is-loading');
      window.setTimeout(function () { intro.remove(); }, reducedMotion ? 220 : 900);
    }, reducedMotion ? 350 : 1550);
  }

  document.addEventListener('DOMContentLoaded', function () {
    initIntro();
    initCases();
    initMenu();
    initReveal();
    initFaq();
    initVerification();
  });
})();

