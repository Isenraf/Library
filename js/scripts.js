const nodeTableBody = document.querySelector("tbody");
const nodeTotalBooks = document.querySelector(".total");

const nodeOpenModal = document.querySelector(".open-modal");
const nodeModal = document.querySelector(".modal");
const nodeOverlay = document.querySelector(".overlay");
const nodeCloseModal = document.querySelector(".close-modal");

const nodeForm = document.querySelector("form");
const nodeTitle = document.querySelector("#title");
const nodeAuthor = document.querySelector("#author");
const nodePages = document.querySelector("#pages");
const nodeRead = document.querySelector("#read");

// CONSTRUCTOR FUNCTION
function Book(title, author, pages, read) {
  if (!(this instanceof Book)) {
    return new Book(title, author, pages, read);
  }

  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read ? "read" : "pending";
}

// STATIC METHOD and ATTRIBUTE
Book.myLibrary = [
  {
    read: "pending",
    pages: 342,
    title: "Le guide de l'apprenti millionaire",
    author: "Christopher Sojtarov",
  },
  {
    read: "pending",
    pages: 10,
    title:
      "Devenez riche: I Will Teach You to Be Rich - Un programme de 6 semaines qui fonctionne vraiment ",
    author: "Ramit Sethi",
  },
  {
    read: "pending",
    pages: 812,
    title: "L'argent, l'art de le maîtriser",
    author: " Anthony Robbins",
  },
  {
    read: "pending",
    pages: 191,
    title: "La chèvre de ma mère",
    author: "Ricardo Kaniama",
  },
  {
    read: "pending",
    pages: 291,
    title:
      "La psychologie de l'argent: Quelques leçons intemporelles sur la richesse, la cupidité et le bonheur",
    author: "Morgan Housel",
  },
  {
    read: "pending",
    pages: 100,
    title:
      "Le Quadrant du Cashflow: Un guide pour atteindre la liberté financière",
    author: "Robert T. Kiyosaki",
  },
  {
    read: "pending",
    pages: 501,
    title: "L'autoroute du millionnaire",
    author: " MJ Demarco",
  },
  {
    read: "pending",
    pages: 188,
    title: "L'homme le plus riche de Babylone",
    author: "Georges Samuel Clason ",
  },
  {
    read: "pending",
    pages: 336,
    title: "Père riche, père pauvre",
    author: " Robert T. Kiyosaki ",
  },
  {
    read: "pending",
    pages: 254,
    title: "Réfléchissez et devenez riche",
    author: "Napoleon Hill",
  },
];

Book.addBookToLibrary = function () {
  Book.openModal();
  Book.closeModal();
  Book.submitBookInfo();
};

Book.addClickEvent = function () {
  const nodeListRead = document.querySelectorAll(".read");
  const nodeListDelete = document.querySelectorAll(".del");

  nodeListDelete.forEach((node) => {
    node.addEventListener("click", function () {
      const id = +this.dataset.id;

      const newArr = Book.myLibrary.filter((_, bookId) => bookId !== id);
      Book.myLibrary = newArr;

      Book.printBookFromLibrary();
    });
  });

  nodeListRead.forEach((node) => {
    node.addEventListener("click", function () {
      const id = +this.dataset.id;
      const book = Book.myLibrary[id];

      if (book.read === "pending") {
        book.read = "read";
      } else {
        book.read = "pending";
      }

      Book.printBookFromLibrary();
    });
  });
};

Book.setTotalBooks = function () {
  nodeTotalBooks.textContent = Book.myLibrary.length;
};

Book.printBookFromLibrary = function () {
  const markup = Book.generateMarkup();

  Book.clear();
  Book.setTotalBooks();

  nodeTableBody.innerHTML = markup;

  Book.addClickEvent();
};

Book.clear = function () {
  nodeTableBody.textContent = "";
};

Book.generateMarkup = function () {
  return Book.myLibrary
    .map((book, id) => {
      return `
        <tr>
            <td>${String(id + 1).padStart(2, "#")}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td>
                <div>
                    <button  data-id="${id}" class="${book.read} read">${
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
};

Book.openModal = function () {
  nodeOpenModal.addEventListener("click", handleOpenModal);
};

Book.closeModal = function () {
  nodeCloseModal.addEventListener("click", handleCloseModal);
  nodeOverlay.addEventListener("click", handleCloseModal);
};

Book.submitBookInfo = function () {
  nodeForm.addEventListener("submit", handleSubmitForm);
};

Book.clearForm = function () {
  nodeAuthor.value = "";
  nodeTitle.value = "";
  nodePages.value = "";
  nodeRead.checked = false;
};

// SHARED METHOD'S
Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages}, ${
    this.read ? "read" : "not read yet"
  }`;
};

// HELPER FUNCTIONS || HANDLERS
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

  Book.myLibrary.push(Book(bookTitle, bookAuthor, bookPages, bookStatus));
  Book.printBookFromLibrary();
  Book.clearForm();
}

// WHEN PAGE LOADS
window.addEventListener("DOMContentLoaded", function () {
  Book.printBookFromLibrary();
  Book.addBookToLibrary();
});
