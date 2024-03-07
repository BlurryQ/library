const root = document.documentElement;

root.classList.add('dark');



const myLibrary = [];

function Book(name, author, pages, pagesRead, finished) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.pagesRead = pagesRead;
  this.finished = finished;
}

function addBookToLibrary(name, author, pages, pagesRead, finished) {
    let newBook = new Book(name, author, pages, pagesRead, finished);
    myLibrary.push(newBook);
}

const THE_HOBBIT = addBookToLibrary("The Hobbit", "J.R.R.Tolkien", 295, 0, false),
EMPIRE_OF_THE_VAMPIRE = addBookToLibrary("Empire of the Vampire", "Jay Kristoff", 739, 739, true);

console.table(myLibrary)


const NAME = document.getElementById("name"),
AUTHOR = document.getElementById("author"),
PAGES = document.getElementById("pages"),
PAGES_READ = document.getElementById("pagesRead"),
FINISHED = document.getElementById("finished"),
SAVE = document.getElementById("save"),
DISPLAY = document.getElementById("display")

SAVE.addEventListener("click", () => {
    console.log("I have been pressed")
    const name = NAME.value,
    author = AUTHOR.value,
    pages = PAGES.value,
    pagesRead = PAGES_READ.value,
    finished = FINISHED.value;
    addBookToLibrary(name, author, pages, pagesRead, finished);
    updateDisplay(myLibrary)
    clearInputs()
})

function updateDisplay(arr) {
    DISPLAY.textContent = " || ";
    arr.forEach(book => {
        DISPLAY.textContent += book.name + " || ";
    });
}

function clearInputs() {
    NAME.value = "";
    AUTHOR.value = "";
    PAGES.value = "";
    PAGES_READ.value = "";
    FINISHED.value = "";
}


updateDisplay(myLibrary)