window.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded(event) {
  console.log("DOM fully loaded and parsed");

  var books = [];
  console.log(books);
  function send() {
    var formTitle = document.getElementById("Title").value;
    var formAuthor = document.getElementById("Author").value;
    var formIsbn = document.getElementById("Isbn").value;
    if (formTitle != "" && formAuthor != "" && formIsbn != "") {
      var obj = {
        title: formTitle,
        author: formAuthor,
        isbn: formIsbn,
      };
      books.push(obj);
      alertFunc(true);
      document.getElementById("Title").value = "";
      document.getElementById("Author").value = "";
      document.getElementById("Isbn").value = "";
    } else {
      alertFunc(false);
    }

    console.log(obj);
    console.log(books);

    var table = document.getElementById("book-table"),
      tbody = table.getElementsByTagName("tbody")[0];

    books.forEach(function (book) {
      var row = document.createElement("tr");
      var cell1 = document.createElement("td");
      var cell2 = document.createElement("td");
      var cell3 = document.createElement("td");

      cell1.setAttribute("class", "cell");
      cell2.setAttribute("class", "cell");
      cell3.setAttribute("class", "cell");
      row.setAttribute("class", "row");

      var deleteIcon = document.createElement("td");
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
    });
  }
  var buttonElement = document.getElementById("submit-form");
  console.log(buttonElement);
  if (buttonElement) {
    buttonElement.addEventListener("click", send);

    document
      .getElementById("book-table-body")
      .addEventListener("click", function (e) {
        deleteRow(e.target);
        console.log(e);
        e.preventDefault();
      });
  }

  // Paralel olarak row bilgisini silen fonksiyon

  function deleteRow(target) {
    if (target.className === "delete-icon") {
      target.parentElement.remove();
      removeFromArray(target);
    }
  }

  function removeFromArray(target) {
    var targetIndex = books.indexOf(target);

    books.splice(targetIndex, 1);

    if (books.length === 0) {
      console.log("Empty!");
    }
  }
}

function alertFunc(mesagge) {
  if (mesagge) {
    var successAlert = document.createElement("p");
    successAlert.innerHTML = "Book Added!";
    var box = document.getElementById("success-alert");

    box.appendChild(successAlert);

    setTimeout(() => {
      box = document.getElementById("success-alert");

      box.innerHTML = "";
    }, 2500);
  } else {
    var errorAlert = document.createElement("p");
    errorAlert.innerHTML = "Please fill in all fields!";
    var box = document.getElementById("error-alert");

    box.appendChild(errorAlert);

    setTimeout(function () {
      box = document.getElementById("error-alert");

      box.innerHTML = "";
    }, 2500);
  }
}
