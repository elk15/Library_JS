const addBookBtn = document.querySelector('.add-book');
const cardsDiv = document.querySelector('.cards');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
let bookId = 0;

// get form elements
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const isReadInput = document.querySelector('#is-read');
const modalForm = document.querySelector('.modal-form');

class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
        this.bookId = bookId++;
    }

    switchIsRead() {
        this.isRead = !this.isRead;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(title, author, pages, isRead) {
        const book = new Book(title, author, pages, isRead);
        this.books.push(book);
        return book;
    }

    removeBook(id) {
        this.books = this.books.filter((book) => book.bookId !== id);
    }
}

const myLibrary = new Library();

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
    isReadBtn.textContent = book.isRead ? 'Read' : 'Not Read';
    removeBtn.textContent = 'Remove';

    newDiv.appendChild(titleP);
    newDiv.appendChild(authorP);
    newDiv.appendChild(pagesP);
    newDiv.appendChild(isReadBtn);
    newDiv.appendChild(removeBtn);

    newDiv.classList.add('card');
    removeBtn.classList.add('remove-btn');
    isReadBtn.classList.add(book.isRead ? 'green-btn' : 'red-btn');

    removeBtn.setAttribute('data-id', book.bookId);

    removeBtn.addEventListener('click', (e) => {
        const { id } = e.target.dataset;
        cardsDiv.removeChild(newDiv);
        myLibrary.removeBook(id);
    });

    isReadBtn.addEventListener('click', () => {
        book.switchIsRead();
        isReadBtn.textContent = book.isRead ? 'Read' : 'Not Read';
        isReadBtn.classList.add(book.isRead ? 'green-btn' : 'red-btn');
        isReadBtn.classList.remove(book.isRead ? 'red-btn' : 'green-btn');
    });

    cardsDiv.appendChild(newDiv);
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

// Form Validation

function capitalize(text) {
    return text.substring(0, 1).toUpperCase() + text.substring(1);
}

function checkValidity(input) {
    if (input.validity.valueMissing) {
        input.setCustomValidity(`${capitalize(input.id)} is required.`);
    } else if (input.validity.tooShort) {
        input.setCustomValidity(`${capitalize(input.id)} needs to be at least ${input.minLength} long.`);
    } else if (input.validity.rangeUnderflow) {
        input.setCustomValidity(`${capitalize(input.id)} needs to be greater than 0.`);
    } else {
        input.setCustomValidity('');
    }
    input.reportValidity();
}

titleInput.addEventListener('input', () => {
    checkValidity(titleInput);
});

authorInput.addEventListener('input', () => {
    checkValidity(authorInput);
});

pagesInput.addEventListener('input', () => {
    checkValidity(pagesInput);
});

// submit data from form
modalForm.addEventListener('submit', (event) => {
    if (!titleInput.validity.valid || !authorInput.validity.valid || !pagesInput.validity.valid) {
        checkValidity(titleInput);
        checkValidity(authorInput);
        checkValidity(pagesInput);
        event.preventDefault();
    } else {
        event.preventDefault();
        const title = titleInput.value;
        const author = authorInput.value;
        const pages = pagesInput.value;
        const isRead = isReadInput.checked;
        const newBook = myLibrary.addBook(title, author, pages, isRead);
        createCard(newBook);
        closeModal();
        titleInput.value = '';
        authorInput.value = '';
        pagesInput.value = '';
        isRead.checked = false;
        console.log(myLibrary.books);
    }
});

const newBook1 = myLibrary.addBook('"Pride and Prejustice"', 'Jane Austen', 430, false);
createCard(newBook1);

const newBook2 = myLibrary.addBook('"The Hobbit"', 'J.R.R. Tolkien', 366, true);
createCard(newBook2);
