//MOBILE NAV MENU
var setInputFilter = function(textbox, inputFilter) {
  if (textbox == null) {
    return;
  }
  [
    'input',
    'keydown',
    'keyup',
    'mousedown',
    'mouseup',
    'select',
    'contextmenu',
    'drop'
  ].forEach(function(event) {
    textbox.addEventListener(event, function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty('oldValue')) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = '';
      }
    });
  });
};

setInputFilter(document.getElementById('tel'), function(value) {
  return /^\d*\.?\d*$/.test(value);
});

export var mobileNav = () => {
  var toggleBtn = document.querySelector('.navbar-default .navbar-toggle');
  var mediaQuery = window.matchMedia('(max-width: 767px)');

  toggleBtn.addEventListener('click', function() {
    if (mediaQuery.matches && toggleBtn.classList.contains('collapsed')) {
      document
        .querySelector('ul.nav.navbar-nav')
        .classList.remove('select-hide');
      document.querySelectorAll('#header, #main, #footer').forEach(el => {
        el.style.display = 'none';
      });
      document.querySelectorAll('.body, .navbar-default').forEach(el => {
        el.style.background = '#302f38';
      });
      document.querySelectorAll('div#bs-navbar').forEach(el => {
        el.style.border = 'none';
        el.style.boxShadow = 'none';
      });
      document.querySelector('.menu-icon').classList.remove('select-hide');
      document.querySelectorAll('.icon-bar').forEach(el => {
        el.classList.add('select-hide');
      });
      document.querySelector('.navbar').classList.remove('nav-shadow');
    } else {
      document.querySelectorAll('#header, #main, #footer').forEach(el => {
        el.style.display = 'block';
      });
      document.querySelectorAll('.body, .navbar-default').forEach(el => {
        el.style.background = '#fcd232';
      }); 
      document.querySelector('.menu-icon').classList.add('select-hide');
      document.querySelectorAll('.icon-bar').forEach(el => {
        el.classList.remove('select-hide');
      });
      document.querySelector('.navbar').classList.add('nav-shadow');
      document.querySelector('ul.nav.navbar-nav').classList.add('select-hide');
    }
  });
};
mobileNav();

//SELECTION DROP
var x, i, j, selElmnt, a, b, c;
x = document.getElementsByClassName('custom-select');
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName('select')[0];
  a = document.createElement('DIV');
  a.setAttribute('class', 'select-selected');
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  b = document.createElement('DIV');
  b.setAttribute('class', 'select-items select-hide');
  for (j = 1; j < selElmnt.length; j++) {
    c = document.createElement('DIV');
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener('click', function(e) {
      var y, i, k, s, h;
      s = this.parentNode.parentNode.getElementsByClassName('select')[0];
      h = this.parentNode.previousSibling;

      for (i = 0; i < s.length; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName('same-as-selected');
          for (k = 0; k < y.length; k++) {
            y[k].removeAttribute('class');
          }
          this.setAttribute('class', 'same-as-selected');
          break;
        }
      }
      h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener('click', function(e) {
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle('select-hide');
  });
}
function closeAllSelect(elmnt) {
  var x,
    y,
    i,
    arrNo = [];
  x = document.getElementsByClassName('select-items');
  y = document.getElementsByClassName('select-selected');
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add('select-hide');
    }
  }
}
document.addEventListener('click', closeAllSelect);
