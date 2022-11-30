"use strict";

class Book {
  title;
  author;
  pages;
  read;

  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read ? "read" : "pending";
  }

  info() {
    return `${title} by ${author}, ${pages}, ${read ? "read" : "not read yet"}`;
  }
}

class Library {
  myLibrary = [
    new Book(
      "Le guide de l'apprenti millionaire",
      "Christopher Sojtarov",
      342,
      false
    ),
    new Book(
      "Devenez riche: I Will Teach You to Be Rich - Un programme de 6 semaines qui fonctionne vraiment ",
      "Ramit Sethi",
      10,
      false
    ),
    new Book("L'argent, l'art de le maîtriser", " Anthony Robbins", 812, false),
    new Book("La chèvre de ma mère", "Ricardo Kaniama", 191, true),
    new Book(
      "La psychologie de l'argent: Quelques leçons intemporelles sur la richesse, la cupidité et le bonheur",
      "Morgan Housel",
      291,
      false
    ),
    new Book(
      "Le Quadrant du Cashflow: Un guide pour atteindre la liberté financière",
      "Robert T. Kiyosaki",
      100,
      false
    ),
    new Book("L'autoroute du millionnaire", "MJ Demarco", 501, false),
    new Book(
      "L'homme le plus riche de Babylone",
      "Georges Samuel Clason",
      188,
      true
    ),
    new Book("Père riche, père pauvre", "Robert T. Kiyosaki", 336, true),
    new Book("Réfléchissez et devenez riche", "Napoleon Hill", 254, true),
  ];

  addBookToLibrary(u_title, u_author, u_pages, u_read) {
    const newBook = new Book(u_title, u_author, u_pages, u_read);
    this.myLibrary.push(newBook);
  }

  getAllBooks() {
    return this.myLibrary;
  }

  deleteBook(id) {
    const newLibrary = this.myLibrary.filter((_, bookId) => bookId !== id);
    this.myLibrary = newLibrary;
  }

  updateBook(id) {
    const book = this.myLibrary[id];
    book.read = book.read === "pending" ? "read" : "pending";
  }
}

// UI
const UI = (function () {
  const library = new Library();
  const containerBooks = document.querySelector("tbody");
  const containerTotalBooks = document.querySelector(".total");

  const nodeOpenModal = document.querySelector(".open-modal");
  const nodeModal = document.querySelector(".modal");
  const nodeOverlay = document.querySelector(".overlay");
  const nodeCloseModal = document.querySelector(".close-modal");

  const nodeForm = document.querySelector("form");
  const nodeTitle = document.querySelector("#title");
  const nodeAuthor = document.querySelector("#author");
  const nodePages = document.querySelector("#pages");
  const nodeRead = document.querySelector("#read");

  function renderBooks() {
    const markup = library
      .getAllBooks()
      .map((book, id) => {
        return `
      <tr>
          <td>${String(id + 1).padStart(2, "#")}</td>
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.pages}</td>
          <td>
              <div>
                  <button  data-id="${id}" class="${book.read} status">${
          book.read
        }</button>
              </div>
          </td>
          <td>
              <div>
                  <button data-id="${id}" class="del">delete</button>
              </div>
          </td>
    </tr>
      `;
      })
      .join("");

    containerBooks.innerHTML = markup;
  }

  function renderTotalBooks() {
    containerTotalBooks.textContent = `There are ${
      library.getAllBooks().length
    } total books`;
  }

  function addClick() {
    const nodeListDelete = document.querySelectorAll(".del");
    const nodeListStatus = document.querySelectorAll(".status");

    nodeListDelete.forEach((btnElement) => {
      btnElement.addEventListener("click", handleDelete);
    });

    nodeListStatus.forEach((btnElement) => {
      btnElement.addEventListener("click", handleStatus);
    });

    nodeOverlay.addEventListener("click", handleCloseModal);

    nodeOpenModal.addEventListener("click", handleOpenModal);

    nodeCloseModal.addEventListener("click", handleCloseModal);
  }

  function addSubmit() {
    nodeForm.addEventListener("submit", handleSubmitForm);
  }

  function clearForm() {
    nodeAuthor.value = "";
    nodeTitle.value = "";
    nodePages.value = "";
    nodeRead.checked = false;
  }

  function handleDelete() {
    library.deleteBook(+this.dataset.id);
    init();
  }

  function handleStatus() {
    library.updateBook(+this.dataset.id);
    init();
  }

  function handleOpenModal() {
    nodeModal.classList.remove("hidden");
    nodeOverlay.classList.remove("hidden");
  }

  function handleCloseModal() {
    nodeModal.classList.add("hidden");
    nodeOverlay.classList.add("hidden");
  }

  function handleSubmitForm(e) {
    e.preventDefault();

    const bookAuthor = nodeAuthor.value;
    const bookTitle = nodeTitle.value;
    const bookPages = Math.abs(parseInt(nodePages.value));
    const bookStatus = nodeRead.checked;

    library.addBookToLibrary(bookTitle, bookAuthor, bookPages, bookStatus);
    clearForm();
    init();
  }

  function init() {
    renderBooks();
    renderTotalBooks();
    addClick();
    addSubmit();
  }

  return { init };
})();

UI.init();
