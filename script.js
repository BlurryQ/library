/* Theme code */

const root = document.documentElement;

root.classList.add('dark');

/* Running code */

const FORM = document.getElementById("new-book-form")
FORM.style.display = "none"

const myLibrary = [];

function Book(title, author, pages, pagesRead, finished, bookIndex) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.pagesRead = pagesRead;
  this.finished = finished;
  this.bookIndex = bookIndex;
}

function addBookToLibrary(title, author, pages, pagesRead, finished, bookIndex) {
    let newBook = new Book(title, author, pages, pagesRead, finished, bookIndex);
    myLibrary.push(newBook);
}

/* const THE_HOBBIT = addBookToLibrary("The Hobbit", "J.R.R.Tolkien", 295, 10, false),
EMPIRE_OF_THE_VAMPIRE = addBookToLibrary("Empire of the Vampire", "Jay Kristoff", 739, 739, true);
 */

const TITLE = document.getElementById("title"),
AUTHOR = document.getElementById("author"),
PAGES = document.getElementById("pages"),
PAGES_READ = document.getElementById("pagesRead"),
FINISHED = document.getElementById("finished"),
SAVE = document.getElementById("save"),
CLOSE = document.getElementById("close"),
DISPLAY = document.getElementById("display"),
NEW_BOOK = document.getElementById("add-new-book"),
SHELF = document.getElementById("shelf");

console.table(myLibrary)

SAVE.setAttribute("disabled", true)

TITLE.addEventListener("change", () => {
    let formComplete = checkForm();
    if(formComplete) {
        SAVE.removeAttribute("disabled");
    }
})

AUTHOR.addEventListener("change", () => {
    let formComplete = checkForm();
    if(formComplete) {
        SAVE.removeAttribute("disabled");
    }
})

PAGES.addEventListener("change", () => {
    let pagesCorrect = correctPagesReadEntry()
    let formComplete = checkForm();
    console.log(pagesCorrect + " Z " + formComplete)
    if(formComplete && pagesCorrect) {
        SAVE.removeAttribute("disabled");
    } else {
        SAVE.setAttribute("disabled", true);
    }
})

PAGES_READ.addEventListener("change", () => {
    let pagesCorrect = correctPagesReadEntry()
    let formComplete = checkForm();
    console.log(pagesCorrect + " Z " + formComplete)
    if(formComplete && pagesCorrect) {
        SAVE.removeAttribute("disabled");
    } else {
        SAVE.setAttribute("disabled", true);
    }
})

SAVE.addEventListener("click", () => {
    const bookIndex = myLibrary.length,
    title = TITLE.value,
    author = AUTHOR.value,
    pages = PAGES.value,
    finished = FINISHED.checked;
    let pagesRead = PAGES_READ.value,
    read = isBookFinished(pages, pagesRead, finished);
/*     console.log("read 2 " + read) */
    if(read) { pagesRead = pages }
    addBookToLibrary(title, author, pages, pagesRead, read, bookIndex);
    addNewBookToShelf(myLibrary, bookIndex)
    clearFormInputs()
    FORM.style.display = "none"
})

CLOSE.addEventListener("click", () => {
    FORM.style.display = "none"
})

NEW_BOOK.addEventListener("click", () => {
    FORM.style.display = "flex"
})

function correctPagesReadEntry() {
    return Number(PAGES.value) >= Number(PAGES_READ.value)
}

function checkForm() {
    if(TITLE.value !== "" 
        && AUTHOR.value !== ""
        && PAGES.value !== "" 
        && PAGES_READ.value !== "") {
    return true; }
    return false
}

function clearFormInputs() {
    TITLE.value = "";
    AUTHOR.value = "";
    PAGES.value = "";
    PAGES_READ.value = "";
    FINISHED.checked = false;
    SAVE.setAttribute("disabled", true);
}

function isBookFinished(pages, pagesRead, finished) {
/*     console.log("pagesT = " + pages + " || pagesR = " + pagesRead)
    console.log("read"  + finished) */
    if(finished) { return true }
    return pages === pagesRead ? true : false;
}

function setBookToRead(bookIndex) {
    const thisBook = myLibrary[bookIndex]
    return thisBook.finished = !thisBook.finished
}

function addNewBookToShelf(library, bookIndex) {
    const book = library[bookIndex]
    newBook = document.createElement("div")
    newBook.classList.add("book")

    readIcon = document.createElement("div")

    readIcon.classList.add("reading")
    readIcon.textContent = "[_|_]"
    readIcon.setAttribute("id", "toggle-read")
    readIcon.classList.add("reading")
    console.log("BF: " + book.finished)
    if(book.finished) {
        readIcon.classList.add("read") 
        readIcon.classList.remove("reading")
    }
    newBook.appendChild(readIcon)

    title = document.createElement("div")
    title.classList.add("title")
    title.textContent = book.title
    newBook.appendChild(title)

    line1 = document.createElement("div")
    line1.classList.add("line")
    newBook.appendChild(line1)

    author = document.createElement("div")
    author.classList.add("author")
    author.textContent = book.author
    newBook.appendChild(author)

    line2 = document.createElement("div")
    line2.classList.add("line")
    newBook.appendChild(line2)

    pagesProgress = document.createElement("div");
    const PAGES_READ = book.pagesRead,
    TOTAL_PAGES = book.pages;
    pagesProgress.textContent = `${PAGES_READ} / ${TOTAL_PAGES}`
    newBook.appendChild(pagesProgress)

    line3 = document.createElement("div")
    line3.classList.add("line")
    newBook.appendChild(line3)

    percentageComplete = document.createElement("div");
    percentageComplete.classList.add("percentage")
    const PERCENT_COMPLETE = (PAGES_READ / TOTAL_PAGES) * 100
    percentageComplete.textContent = `${Math.round(PERCENT_COMPLETE)} %`
    newBook.appendChild(percentageComplete)

    SHELF.insertBefore(newBook, SHELF.firstChild)

    TOGGLE_READ = document.getElementById("toggle-read");
    TOGGLE_READ.addEventListener("click", () => {
        console.log("i: " + bookIndex)
        setBookToRead(bookIndex)
        updateBook(myLibrary, bookIndex)
    })
}

function updateBook(library, bookIndex) {
    const book = library[bookIndex]
    newBook = document.createElement("div")
    newBook.classList.add("book")

    readIcon = document.createElement("div")

    readIcon.classList.add("reading")
    readIcon.textContent = "[_|_]"
    readIcon.setAttribute("id", "toggle-read")
    readIcon.classList.add("reading")
    console.log("BF: " + book.finished)
    if(book.finished) {
        readIcon.classList.add("read") 
        readIcon.classList.remove("reading")
    }
    newBook.appendChild(readIcon)

    title = document.createElement("div")
    title.classList.add("title")
    title.textContent = book.title
    newBook.appendChild(title)

    line1 = document.createElement("div")
    line1.classList.add("line")
    newBook.appendChild(line1)

    author = document.createElement("div")
    author.classList.add("author")
    author.textContent = book.author
    newBook.appendChild(author)

    line2 = document.createElement("div")
    line2.classList.add("line")
    newBook.appendChild(line2)

    pagesProgress = document.createElement("div");
    const PAGES_READ = book.pagesRead,
    TOTAL_PAGES = book.pages;
    pagesProgress.textContent = `${PAGES_READ} / ${TOTAL_PAGES}`
    newBook.appendChild(pagesProgress)

    line3 = document.createElement("div")
    line3.classList.add("line")
    newBook.appendChild(line3)

    percentageComplete = document.createElement("div");
    percentageComplete.classList.add("percentage")
    const PERCENT_COMPLETE = (PAGES_READ / TOTAL_PAGES) * 100
    percentageComplete.textContent = `${Math.round(PERCENT_COMPLETE)} %`
    newBook.appendChild(percentageComplete)

    SHELF.replaceChild(newBook, bookIndex)
}

/* 

when +book pressed open form
once saved it appears from left side
this will spill to next row

*/