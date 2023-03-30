const myLibrary = [];
const addBookBtn = document.querySelector('.add-book');
const cardsDiv = document.querySelector('.cards');

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function displayBooks() {
    for (let i = 0; i < myLibrary.length; i++) {
        const newDiv = document.createElement('div');
        const removeBtn = document.createElement('button');

        removeBtn.classList.add('remove-btn');
        removeBtn.appendChild(document.createTextNode('Remove'));

        newDiv.appendChild(document.createElement('p'))
            .appendChild(document.createTextNode(myLibrary[i].title));
        newDiv.appendChild(document.createElement('p'))
            .appendChild(document.createTextNode(myLibrary[i].author));
        newDiv.appendChild(document.createElement('p'))
            .appendChild(document.createTextNode(`${myLibrary[i].pages} pages`));
        newDiv.appendChild(document.createElement('button'))
            .appendChild(document.createTextNode(myLibrary[i].read));
        newDiv.appendChild(removeBtn);

        newDiv.classList.add('card');
        cardsDiv.appendChild(newDiv);
    }
}

addBookToLibrary('"Pride and Prejustice"', 'Jane Austen', 430, false);
addBookToLibrary('"The Hobbit"', 'J.R.R. Tolkien', 366, true);
displayBooks();
