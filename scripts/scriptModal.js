const modal = document.getElementById('schedule-modal');
const overlay = modal.querySelector('.modal_overlay');
const closeBtn = modal.querySelector('.modal_close');
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
closeBtn.onclick = closeModal;

form.onsubmit = (e) => {
  e.preventDefault();
  formBlock.style.display = 'none';
  successBlock.style.display = 'block';
};
