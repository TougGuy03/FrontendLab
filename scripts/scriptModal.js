const modal = document.getElementById('schedule-modal');
const overlay = modal.querySelector('.modal_overlay');
const closeBtnSucces = document.getElementById('modal_close_succes');
const closeBtnForm = document.getElementById('modal_close_form');
const form = document.getElementById('schedule-form');
const formBlock = modal.querySelector('.modal_form');
const successBlock = modal.querySelector('.modal_success');



function openModal() {
  modal.classList.add('modal_is_open');
  formBlock.style.display = 'block';
  successBlock.style.display = 'none';
}

function closeModal() {
  modal.classList.remove('modal_is_open');
  form.reset();
}

document.addEventListener('click', (e) => {
  if (e.target.closest('#schedule-book-btn')) openModal();
});

overlay.onclick = closeModal;
closeBtnSucces.onclick = closeModal;
closeBtnForm.onclick = closeModal;

form.onsubmit = (e) => {
  e.preventDefault();
  formBlock.style.display = 'none';
  successBlock.style.display = 'block';
};
