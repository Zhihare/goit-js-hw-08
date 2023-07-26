
import simpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const containerGallery = document.querySelector(".gallery");


const markup = galleryItems.reduce((acc, { preview, original, description }) =>
	acc +
	`
 <li class="gallery__item">
  <a class="gallery__link" href="${original}">
   <img  class="gallery__image"
    src="${preview}"
     alt="${description}" 
     data-source="${original}" loading="lazy" width="350">
     </a>
 </li>
 `,
	""
);

containerGallery.insertAdjacentHTML('beforeend', markup);

const lightbox = new SimpleLightbox('.gallery a', {
	captionsData: 'alt',
	captionDelay: 250,
});