import * as data from './data.js';
import { mobileNav } from './form.js';

data.makeList();
mobileNav();

//FILTER BUTTONS - TOGGLE ACTIVE CLASS
function addActiveClass(element) { 
  var activeClass = document.querySelector('.col-sm-4.bg-active')
  if(activeClass) {
    activeClass.classList.replace('bg-active', 'bg-dark');
    activeClass.children[1].classList.add('v-none'); 
  }
    element.classList.replace('bg-dark', 'bg-active');
    element.children[1].classList.remove('v-none'); 
}

function delActiveClass(element) {
    element.classList.replace('bg-active', 'bg-dark');
    element.children[1].classList.add('v-none'); 
}

//FILTER CARDS
var marketing = data.list.filter(function (el) {
  return el.project === 'pr-marketing';
});

var programing = data.list.filter(function (el) {
  return el.project === 'pr-programing';
});
var design = data.list.filter(function (el) {
  return el.project === 'pr-design';
});
 
document.querySelector('.b-mr-filter').addEventListener('click', function (e) {
  var itemActive = this.classList.contains('bg-active');
  
  if(!itemActive) {
    addActiveClass(this);
    clearResults();
    renderResults(marketing);   
  } else {
    delActiveClass(this);
    clearResults();
    renderAllResults(data.list);
  }
  e.preventDefault();
});
document.querySelector('.b-pr-filter').addEventListener('click', function (e) {
  var itemActive = this.classList.contains('bg-active');
  
  if(!itemActive) {
    addActiveClass(this);
    clearResults();
    renderResults(programing);   
  } else {
    delActiveClass(this);
    clearResults();
    renderAllResults(data.list);
  }
  e.preventDefault();
});
document.querySelector('.b-de-filter').addEventListener('click', function (e) {
  var itemActive = this.classList.contains('bg-active');
  
  if(!itemActive) {
    addActiveClass(this);
    clearResults();
    renderResults(design);   
  } else {
    delActiveClass(this);
    clearResults();
    renderAllResults(data.list);
  }
  e.preventDefault();
});

//RENDER CARD
var renderThumbnail = thumb => {
  var mark = `
    <div class="col-sm-4 thumb-filter ${thumb.project}">
      <div class="thumbnail">
        <img src="./assets/img/${thumb.img}" alt="project" class="img-responsive">
        <div class="caption">
          <span class="project-tag">
          Академија за ${thumb.academy}
          </span>
          <h4 class="h4-style">${thumb.name}</h4>
          <p class="p-style mb-1">
          ${thumb.describe}
          </p>
          <span class="date-tag mb-2">${thumb.date}</span>
          <p class="text-right">
            <a href="#" class="btn btn-style m-0 pxy-2">Дознај повеќе</a>
          </p>
        </div>
      </div>
      </div>
    `
  document.querySelector('.row.mx-3').insertAdjacentHTML('beforeend', mark)
};

//CLEAR CARDS AND BUTTON
var clearResults = () => {
  document.querySelector('.row.mx-3').innerHTML = '';
  document.querySelector('.btn-goto--js').innerHTML = '';
};

//CLEAR BUTTON
var clearButton = () => {
  document.querySelector('.btn-goto--js').innerHTML = '';
}

//CREATE PAGINATION BUTTON 
var createButtonNext = (page, type) => `
    <a class="btn btn-style pxy-3 mr-1 btn--goto btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1} role="button">Повеќе</a>
`;
var createButtonPrev = (page, type) => `
    <a class="btn btn-style pxy-3 mr-1 btn--goto btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1} role="button">Назад</a>
`;

//RENDER PAGINATION BUTTON
var renderButtons = (page, numResults, resPerPage) => {
  var pages = Math.ceil(numResults / resPerPage);
  var btnDisplay = document.querySelector('.btn-goto--js').classList;

  var button;
  if (page === 1 && pages > 1) {
    // Only button to go to next page
    btnDisplay.remove('select-hide');
    button = createButtonNext(page, 'next');
  } else if (page < pages) {
    // Both buttons
    btnDisplay.remove('select-hide');
    button = `
          ${createButtonPrev(page, 'prev')}
          ${createButtonNext(page, 'next')}
      `;
  } else if (page === pages && pages > 1) {
    // Only button to go to prev page
    btnDisplay.remove('select-hide');
    button = createButtonPrev(page, 'prev');
  } else if (page === 1 && pages === 1) {
    btnDisplay.add('select-hide');
  }

  document.querySelector('.btn-goto--js').insertAdjacentHTML('beforeend', button);
};

//RENDER MOB BUTTON
var renderMobButton = (page, numResults, resPerPage) => {
  var pages = Math.ceil(numResults / resPerPage);
  var btnDisplay = document.querySelector('.btn-goto--js').classList;

  var button;
  button = createButtonNext(page, 'next')
  
  if (page === pages && pages > 1) {
    btnDisplay.add('select-hide'); 
  }
  document.querySelector('.btn-goto--js').insertAdjacentHTML('beforeend', button);
}

//RENDER CARDS ON BUTTON CLICK MOBILE (SINGLE PROJECT)
var renderMobResults = (thumbs, page = 1, resPerPage = 6) => {
  // render results of current page
  var start = (page - 1) * resPerPage;
  var end = page * resPerPage;

  thumbs.slice(start, end).forEach(renderThumbnail);

  // render pagination button
  renderMobButton(page, thumbs.length, resPerPage);
};

//RENDER CARDS ON BUTTON CLICK DESKTOP (SINGLE PROJECT)
var renderResults = (thumbs, page = 1, resPerPage = 6) => {
  // render results of current page
  var start = (page - 1) * resPerPage;
  var end = page * resPerPage;

  thumbs.slice(start, end).forEach(renderThumbnail);

  // render pagination buttons
  renderButtons(page, thumbs.length, resPerPage);
};

//RENDER ALL CARDS (ALL PROJECTS)
var renderAllResults = (thumbs, page = 1, resPerPage = 9) => {
  var start = (page - 1) * resPerPage;
  var end = page * resPerPage;

  thumbs.slice(start, end).forEach(renderThumbnail);

  // render pagination buttons
  renderButtons(page, thumbs.length, resPerPage);
}

//PAGINATION
var mediaQueryMob = window.matchMedia("(min-width: 768px)");
mediaQueryMob.matches ? renderAllResults(data.list) : renderMobResults(data.list);

document.querySelector('.btn-goto--js').addEventListener('click', function (e) {
  var btnGo = e.target.closest('.btn--goto');
  var goToPage = parseInt(btnGo.dataset.goto, 10);
  var btnArr = Array.from(document.querySelectorAll('.btn--js'));
 
  if (btnGo && btnArr[0].className.indexOf('bg-active') != -1 ) {
    mediaQueryMob.matches ? clearResults() : clearButton();
    mediaQueryMob.matches ? renderResults(marketing, goToPage) : renderMobResults(marketing, goToPage); 
  } else if (btnGo && btnArr[1].className.indexOf('bg-active') != -1 ) {
    mediaQueryMob.matches ? clearResults() : clearButton();
    mediaQueryMob.matches ? renderResults(programing, goToPage) : renderMobResults(programing, goToPage); 
  } else if (btnGo && btnArr[2].className.indexOf('bg-active') != -1 ) {
    mediaQueryMob.matches ? clearResults() : clearButton();
    mediaQueryMob.matches ? renderResults(design, goToPage) : renderMobResults(design, goToPage); 
  } else {
    mediaQueryMob.matches ? (clearResults(), renderAllResults(data.list, goToPage)) : (clearButton(), renderMobResults(data.list, goToPage)); 
  }
  e.preventDefault();
});