import images from "./gallery-items.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  backdrop: document.querySelector(".lightbox__overlay"),
  modal: document.querySelector(".lightbox"),
  modalContent: document.querySelector(".lightbox__content"),
  modalImage: document.querySelector(".lightbox__image"),
  closeBtn: document.querySelector('button[data-action="close-lightbox"]'),
};

// images.forEach(({ original, preview, description }, index = 0) =>
//   refs.gallery.insertAdjacentHTML(
//     "beforeend",
//     `<li class="gallery__item">
//     <a class="gallery__link" href="${original}"><img class="gallery__image" src="${preview}" data-source="${original}" data-index="${index}" alt="${description}"></a>
//     </li>`
//   )
// );

const createGalleryItem = ({ original, preview, description }, index = 0) =>
  `<li class="gallery__item">
<a class="gallery__link" href="${original}"><img class="gallery__image" src="${preview}" data-source="${original}" data-index="${index}" alt="${description}"></a>
</li>`;

const item = images.map(createGalleryItem).join("");

refs.gallery.insertAdjacentHTML("afterbegin", item);

//===

let currentIndex = 0;

const openModal = (evt) => {
  evt.preventDefault();

  if (evt.target.nodeName !== "IMG") return;
  refs.modal.classList.add("is-open");
  refs.modalImage.src = evt.target.dataset.source;
  currentIndex = Number(evt.target.dataset.index);
  window.addEventListener("keydown", keyPress);
};

//===

const closeModal = () => {
  refs.modal.classList.remove("is-open");
  refs.modalImage.src = "";
  window.removeEventListener("keydown", keyPress);
};

//===

const prevImg = () => {
  if (currentIndex > 0 && currentIndex <= images.length - 1) {
    currentIndex -= 1;
    refs.modalImage.src = images[currentIndex].original;
  } else if (currentIndex === 0) {
    currentIndex = images.length - 1;
    refs.modalImage.src = images[currentIndex].original;
  }
};

//===

const nextImg = () => {
  if (currentIndex >= 0 && currentIndex < images.length - 1) {
    currentIndex += 1;
    refs.modalImage.src = images[currentIndex].original;
  } else if ((currentIndex = images.length - 1)) {
    currentIndex = 0;
    refs.modalImage.src = images[currentIndex].original;
  }
};

//===

const keyPress = (evt) => {
  if (evt.code === "Escape") {
    closeModal();
  }

  if (evt.target === evt.currentTarget) {
    closeModal();
  }

  if (evt.code === "ArrowLeft") {
    prevImg();
  }

  if (evt.code === "ArrowRight") {
    nextImg();
  }
};

refs.gallery.addEventListener("click", openModal);
refs.closeBtn.addEventListener("click", closeModal);
refs.backdrop.addEventListener("click", keyPress);
