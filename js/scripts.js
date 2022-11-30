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
class UI {
  Library = new Library();

  containerBooks = document.querySelector("tbody");
  containerTotalBooks = document.querySelector(".total");

  nodeOpenModal = document.querySelector(".open-modal");
  nodeModal = document.querySelector(".modal");
  nodeOverlay = document.querySelector(".overlay");
  nodeCloseModal = document.querySelector(".close-modal");

  nodeForm = document.querySelector("form");
  nodeTitle = document.querySelector("#title");
  nodeAuthor = document.querySelector("#author");
  nodePages = document.querySelector("#pages");
  nodeRead = document.querySelector("#read");

  renderBooks() {
    const markup = this.Library.getAllBooks()
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

    this.containerBooks.innerHTML = markup;
  }

  renderTotalBooks() {
    this.containerTotalBooks.textContent = `There are ${
      this.Library.getAllBooks().length
    } total books`;
  }

  addClick() {
    const nodeListDelete = document.querySelectorAll(".del");
    const nodeListStatus = document.querySelectorAll(".status");

    nodeListDelete.forEach((btnElement) => {
      btnElement.addEventListener(
        "click",
        this.handleDelete.bind(this, +btnElement.dataset.id)
      );
    });

    nodeListStatus.forEach((btnElement) => {
      btnElement.addEventListener(
        "click",
        this.handleStatus.bind(this, +btnElement.dataset.id)
      );
    });

    this.nodeOverlay.addEventListener(
      "click",
      this.handleCloseModal.bind(this)
    );

    this.nodeOpenModal.addEventListener(
      "click",
      this.handleOpenModal.bind(this)
    );

    this.nodeCloseModal.addEventListener(
      "click",
      this.handleCloseModal.bind(this)
    );
  }

  addSubmit() {
    this.nodeForm.addEventListener("submit", this.handleSubmitForm.bind(this));
  }

  clearForm() {
    this.nodeAuthor.value = "";
    this.nodeTitle.value = "";
    this.nodePages.value = "";
    this.nodeRead.checked = false;
  }

  handleDelete(id) {
    this.Library.deleteBook(id);
    this.init();
  }

  handleStatus(id) {
    this.Library.updateBook(id);
    this.init();
  }

  handleOpenModal() {
    this.nodeModal.classList.remove("hidden");
    this.nodeOverlay.classList.remove("hidden");
  }

  handleCloseModal() {
    this.nodeModal.classList.add("hidden");
    this.nodeOverlay.classList.add("hidden");
  }

  handleSubmitForm(e) {
    e.preventDefault();

    const bookAuthor = this.nodeAuthor.value;
    const bookTitle = this.nodeTitle.value;
    const bookPages = Math.abs(parseInt(this.nodePages.value));
    const bookStatus = this.nodeRead.checked;

    this.Library.addBookToLibrary(bookTitle, bookAuthor, bookPages, bookStatus);
    this.clearForm();
    this.init();
  }

  init() {
    this.renderBooks();
    this.renderTotalBooks();
    this.addClick();
    this.addSubmit();
  }
}

new UI().init();
