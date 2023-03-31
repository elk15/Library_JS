const myLibrary = [];
const addBookBtn = document.querySelector('.add-book');
const cardsDiv = document.querySelector('.cards');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

// get form elements
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const isReadInput = document.querySelector('#is-read');
const modalForm = document.querySelector('.modal-form');

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function createCard(book) {
    const newDiv = document.createElement('div');
    const titleP = document.createElement('p');
    const authorP = document.createElement('p');
    const pagesP = document.createElement('p');
    const isReadBtn = document.createElement('button');
    const removeBtn = document.createElement('button');

    titleP.textContent = book.title;
    authorP.textContent = book.author;
    pagesP.textContent = book.pages;
    isReadBtn.textContent = book.isRead;
    removeBtn.textContent = 'Remove';

    newDiv.appendChild(titleP);
    newDiv.appendChild(authorP);
    newDiv.appendChild(pagesP);
    newDiv.appendChild(isReadBtn);
    newDiv.appendChild(removeBtn);

    newDiv.classList.add('card');
    removeBtn.classList.add('remove-btn');

    cardsDiv.appendChild(newDiv);
}

// add create card function here
function addBookToLibrary(title, author, pages, isRead) {
    const book = new Book(title, author, pages, isRead);
    myLibrary.push(book);
    createCard(book);
}

function closeModal() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

// open modal
addBookBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
});

// close modal by clicking outside of it
overlay.addEventListener('click', () => {
    closeModal();
});

// submit data from form
modalForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const isRead = isReadInput.checked;
    addBookToLibrary(title, author, pages, isRead);
    closeModal();
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    isRead.checked = false;
});

addBookToLibrary('"Pride and Prejustice"', 'Jane Austen', 430, false);
addBookToLibrary('"The Hobbit"', 'J.R.R. Tolkien', 366, true);
