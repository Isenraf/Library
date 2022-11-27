"use strict";

function BookFactory(title, author, pages, read) {
  const status = read ? "read" : "pending";

  function info() {
    return `${title} by ${author}, ${pages}, ${read ? "read" : "not read yet"}`;
  }

  return { title, author, pages, read: status, info };
}

const Library = (function () {
  let myLibrary = [
    BookFactory(
      "Le guide de l'apprenti millionaire",
      "Christopher Sojtarov",
      342,
      false
    ),
    BookFactory(
      "Devenez riche: I Will Teach You to Be Rich - Un programme de 6 semaines qui fonctionne vraiment ",
      "Ramit Sethi",
      10,
      false
    ),
    BookFactory(
      "L'argent, l'art de le maîtriser",
      " Anthony Robbins",
      812,
      false
    ),
    BookFactory("La chèvre de ma mère", "Ricardo Kaniama", 191, true),
    BookFactory(
      "La psychologie de l'argent: Quelques leçons intemporelles sur la richesse, la cupidité et le bonheur",
      "Morgan Housel",
      291,
      false
    ),
    BookFactory(
      "Le Quadrant du Cashflow: Un guide pour atteindre la liberté financière",
      "Robert T. Kiyosaki",
      100,
      false
    ),
    BookFactory("L'autoroute du millionnaire", "MJ Demarco", 501, false),
    BookFactory(
      "L'homme le plus riche de Babylone",
      "Georges Samuel Clason",
      188,
      true
    ),
    BookFactory("Père riche, père pauvre", "Robert T. Kiyosaki", 336, true),
    BookFactory("Réfléchissez et devenez riche", "Napoleon Hill", 254, true),
  ];

  function addBookToLibrary(u_title, u_author, u_pages, u_read) {
    const newBook = BookFactory(u_title, u_author, u_pages, u_read);
    myLibrary.push(newBook);
  }

  function getAllBooks() {
    return myLibrary;
  }

  function deleteBook(id) {
    const newLibrary = myLibrary.filter((_, bookId) => bookId !== id);
    myLibrary = newLibrary;
  }

  function updateBook(id) {
    const book = myLibrary[id];
    book.read = book.read === "pending" ? "read" : "pending";
  }

  return { getAllBooks, deleteBook, updateBook, addBookToLibrary };
})();

// UI
const UI = (function () {
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
    const markup = Library.getAllBooks()
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
      Library.getAllBooks().length
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
    Library.deleteBook(+this.dataset.id);
    init();
  }

  function handleStatus() {
    Library.updateBook(+this.dataset.id);
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

    Library.addBookToLibrary(bookTitle, bookAuthor, bookPages, bookStatus);
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
