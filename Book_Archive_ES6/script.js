const domLoaded = (event) => {
  console.log("DOM fully loaded and parsed");

  let books = [];

  class Book {
    constructor(title, author, isbn) {
      this.title = title;
      this.author = author;
      this.isbn = isbn;
    }
  }

  const getBooks = () => {
    const storedBooks = localStorage.getItem("books");
    return storedBooks ? JSON.parse(storedBooks) : [];
  };

  const saveBooks = () => {
    localStorage.setItem("books", JSON.stringify(books));
  };

  const send = () => {
    const formTitle = document.getElementById("Title").value;
    const formAuthor = document.getElementById("Author").value;
    const formIsbn = document.getElementById("Isbn").value;

    if (formTitle !== "" && formAuthor !== "" && formIsbn !== "") {
      const newBook = new Book(formTitle, formAuthor, formIsbn);
      books.push(newBook);
      saveBooks();
      alertFunc(true);

      document.getElementById("Title").value = "";
      document.getElementById("Author").value = "";
      document.getElementById("Isbn").value = "";

      console.log(books);
      renderBooks();
    } else {
      alertFunc(false);
    }
  };

  const renderBooks = () => {
    const table = document.getElementById("book-table");
    const tbody = table.getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";

    books.forEach((book, index) => {
      const row = document.createElement("tr");
      const cell1 = document.createElement("td");
      const cell2 = document.createElement("td");
      const cell3 = document.createElement("td");

      cell1.setAttribute("class", "cell");
      cell2.setAttribute("class", "cell");
      cell3.setAttribute("class", "cell");
      row.setAttribute("class", "row");

      const deleteIcon = document.createElement("td");
      deleteIcon.innerHTML = "X";
      deleteIcon.setAttribute("class", "delete-icon");

      cell1.innerHTML = book.title;
      cell2.innerHTML = book.author;
      cell3.innerHTML = book.isbn;

      row.appendChild(cell1);
      row.appendChild(cell2);
      row.appendChild(cell3);
      row.appendChild(deleteIcon);
      tbody.appendChild(row);

      deleteIcon.addEventListener("click", () => {
        deleteRow(index);
      });
    });
  };

  const deleteRow = (index) => {
    books.splice(index, 1);
    saveBooks();
    renderBooks();
  };

  const alertFunc = (message) => {
    const alertBox = message ? "success-alert" : "error-alert";
    const messageText = message ? "Book Added!" : "Please fill in all fields!";
    const box = document.getElementById(alertBox);
    const alertMessage = document.createElement("p");
    alertMessage.innerHTML = messageText;

    box.appendChild(alertMessage);

    setTimeout(() => {
      box.innerHTML = "";
    }, 3000);
  };

  const buttonElement = document.getElementById("submit-form");
  if (buttonElement) {
    buttonElement.addEventListener("click", send);
  }

  const storedBooks = getBooks();
  books = storedBooks;
  renderBooks();
};

window.addEventListener("DOMContentLoaded", domLoaded);
