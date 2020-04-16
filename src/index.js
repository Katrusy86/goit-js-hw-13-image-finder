import './styles.css';
import 'basiclightbox/dist/basicLightbox.min.css';
import * as basicLightbox from 'basiclightbox';
import apiServiceFetch from './apiService';
import imageItemTemplate from './imageItem.hbs'

const refs = {
  searchForm: document.querySelector('#search-form'),
  galleryList: document.querySelector('.gallery'),
  btnLoadMore:document.querySelector('button[data-action="load-more"]'),
}

refs.searchForm.addEventListener('input', searchFormInputHandler);
refs.btnLoadMore.addEventListener('click', btnLoadMoreHandler);
refs.galleryList.addEventListener('click', modalWindowHandler);

function searchFormInputHandler(e) {

  e.preventDefault()

  const inputQuery = e.currentTarget.elements.query.value;

  apiServiceFetch.resetPage();
  clearListItems();
  apiServiceFetch.searchQuery = inputQuery;
  apiServiceFetch.fetchQuery().then(hits => {
    insertListItems(hits)
  })
  .catch((err)=> {
    console.log('Error---'),err});
  }


  function btnLoadMoreHandler(){
    apiServiceFetch.fetchQuery().then(hits => {
      insertListItems(hits)
  }).then(()=> {scrollToItems()})
  }

  function insertListItems(items){
  const markupImage = imageItemTemplate(items)
  refs.galleryList.insertAdjacentHTML('beforeend', markupImage)

}

function clearListItems(){
  refs.galleryList.innerHTML = '';
}

function scrollToItems(){
  window.scrollTo({
  top: document.body.scrollHeight,
  behavior: 'smooth',
});
}


function modalWindowHandler(e) {
  if(e.target.nodeName === 'IMG') {
    const largeImageURL = e.target.dataset.action;
    basicLightbox.create(
      `<img width="800" height="500" src="${largeImageURL}">`,
    )
    .show();
  }
}
