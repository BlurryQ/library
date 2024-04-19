/* Theme code */

const root = document.documentElement;

root.classList.add('dark');

/* Running code */

const myLibrary = [];

function Book(title, author, pages, pagesRead, finished) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.pagesRead = pagesRead;
  this.finished = finished;
}

function addBookToLibrary(title, author, pages, pagesRead, finished) {
    let newBook = new Book(title, author, pages, pagesRead, finished);
    myLibrary.push(newBook);
}

const THE_HOBBIT = addBookToLibrary("The Hobbit", "J.R.R.Tolkien", 295, 10, false),
EMPIRE_OF_THE_VAMPIRE = addBookToLibrary("Empire of the Vampire", "Jay Kristoff", 739, 729, true);

const TITLE = document.getElementById("title"),
AUTHOR = document.getElementById("author"),
PAGES = document.getElementById("pages"),
PAGES_READ = document.getElementById("pagesRead"),
FINISHED = document.getElementById("finished"),
SAVE = document.getElementById("save"),
DISPLAY = document.getElementById("display")

console.table(myLibrary)
/* 
SAVE.setAttribute("disabled", true)

TITLE.addEventListener("change", () => {
    let formComplete = checkForm();
    console.log(formComplete)
    if(formComplete) {
        SAVE.removeAttribute("disabled");
    }
})

AUTHOR.addEventListener("change", () => {
    let formComplete = checkForm();
    console.log(formComplete)
    if(formComplete) {
        SAVE.removeAttribute("disabled");
    }
})

PAGES.addEventListener("change", () => {
    let formComplete = checkForm();
    console.log(formComplete)
    if(formComplete) {
        SAVE.removeAttribute("disabled");
    }
})

PAGES_READ.addEventListener("change", () => {
    let formComplete = checkForm();
    console.log(formComplete)
    if(formComplete) {
        SAVE.removeAttribute("disabled");
    }
})

SAVE.addEventListener("click", () => {
    const title = TITLE.value,
    author = AUTHOR.value,
    pages = PAGES.value,
    pagesRead = PAGES_READ.value,
    finished = isBookFinished()
    addBookToLibrary(title, author, pages, pagesRead, finished);
    updateDisplay(myLibrary)
    clearInputs()
})

function checkForm() {
    if(TITLE.value !== "" 
        && AUTHOR.value !== ""
        && PAGES.value !== "" 
        && PAGES_READ.value !== "") {
    return true; }
    return false
}

function isBookFinished() {
    return PAGES_READ.value === PAGES.value ? true : false;
}

function updateDisplay(arr) {
    DISPLAY.textContent = " || ";
    arr.forEach(book => {
        DISPLAY.textContent += book.title + " || ";
    });
}

function clearInputs() {
    TITLE.value = "";
    AUTHOR.value = "";
    PAGES.value = "";
    PAGES_READ.value = "";
    FINISHED.value = "";
    SAVE.setAttribute("disabled", true);
}

updateDisplay(myLibrary) */


/* 

create +book design
+book AFTER last book div

when +book pressed open form
once saved it appears from left side
this will spill to next row

*/

const SHELF = document.getElementById("shelf")

for(let book in myLibrary) {
    newBook = document.createElement("div")
    newBook.classList.add("book")

    readIcon = document.createElement("div")
    readIcon.textContent = "[_|_]"
    newBook.appendChild(readIcon)

    title = document.createElement("div")
    title.textContent = myLibrary[book].title
    newBook.appendChild(title)

    author = document.createElement("div")
    author.textContent = myLibrary[book].author
    newBook.appendChild(author)

    pagesProgress = document.createElement("div");
    const PAGES_READ = myLibrary[book].pagesRead,
    TOTAL_PAGES = myLibrary[book].pages;
    pagesProgress.textContent = `${PAGES_READ} / ${TOTAL_PAGES}`
    newBook.appendChild(pagesProgress)

    percentageComplete = document.createElement("div");
    const PERCENT_COMPLETE = (PAGES_READ / TOTAL_PAGES) * 100
    percentageComplete.textContent = `${Math.round(PERCENT_COMPLETE)} %`
    newBook.appendChild(percentageComplete)

    SHELF.insertBefore(newBook, SHELF.firstChild)
}
