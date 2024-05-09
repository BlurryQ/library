/* Theme code */

const root = document.documentElement;

root.classList.add('dark');

/* Running code */

const FORM = document.getElementById("new-book-form")
FORM.style.display = "none"
let editMode = false

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

const THE_HOBBIT = addBookToLibrary("The Hobbit", "J.R.R.Tolkien", 295, 10, false, 0),
EMPIRE_OF_THE_VAMPIRE = addBookToLibrary("Empire of the Vampire", "Jay Kristoff", 739, 739, true, 1);


const TITLE = document.getElementById("title"),
AUTHOR = document.getElementById("author"),
PAGES = document.getElementById("pages"),
PAGES_READ = document.getElementById("pagesRead"),
FINISHED = document.getElementById("finished"),
SAVE = document.getElementById("save"),
CLOSE = document.getElementById("close"),
DISPLAY = document.getElementById("display"),
SHELF = document.getElementById("shelf");


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
    if(formComplete && pagesCorrect) {
        SAVE.removeAttribute("disabled");
    } else {
        SAVE.setAttribute("disabled", true);
    }
})

PAGES_READ.addEventListener("change", () => {
    let pagesCorrect = correctPagesReadEntry()
    let formComplete = checkForm();
    if(formComplete && pagesCorrect) {
        SAVE.removeAttribute("disabled");
    } else {
        SAVE.setAttribute("disabled", true);
    }
})

SAVE.addEventListener("click", () => {
    if(editMode) {

    } else {
        const bookIndex = myLibrary.length,
        title = TITLE.value,
        author = AUTHOR.value,
        pages = PAGES.value,
        finished = FINISHED.checked;
        let pagesRead = PAGES_READ.value,
        read = isBookFinished(pages, pagesRead, finished);
        if(read) { pagesRead = pages }
        addBookToLibrary(title, author, pages, pagesRead, read, bookIndex);
        updateLibrary(myLibrary, bookIndex)
        clearFormInputs()
        FORM.style.display = "none"
    }
})

CLOSE.addEventListener("click", () => {
    FORM.style.display = "none"
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
    if(finished) { return true }
    return pages === pagesRead ? true : false;
}

function setBookToRead(bookIndex) {
    const thisBook = myLibrary[bookIndex]
    thisBook.pagesRead === thisBook.pages ? thisBook.pagesRead-- : thisBook.pagesRead = thisBook.pages;
    return thisBook.finished = !thisBook.finished
}

function updateLibrary(library) {

    while(SHELF.firstChild) {
        SHELF.removeChild(SHELF.firstChild)
    }

    const newBook = document.createElement("div")
    newBook.classList.add("new-book")
    const addBook = document.createElement("div")
    addBook.setAttribute("id", "add-new-book")
    addBook.classList.add("add-new-book")
    const add = document.createElement("div")
    add.textContent = "+"
    addBook.appendChild(add)
    newBook.appendChild(addBook)
    SHELF.appendChild(newBook)

    addBook.addEventListener("click", () => {
        FORM.style.display = "flex"
    })

    for(const book of library) {
        const bookIndex = book.bookIndex
        const newBook = document.createElement("div")
        newBook.classList.add("book")
        newBook.setAttribute("id", bookIndex)

        const readIcon = document.createElement("div")
        readIcon.classList.add("reading")
        readIcon.setAttribute("id", "toggle-read")
        readIcon.classList.add("reading")
        if(book.finished) {
            newBook.classList.add("read")
            readIcon.classList.add("read") 
            readIcon.classList.remove("reading")
        }
        newBook.appendChild(readIcon)

        const title = document.createElement("div")
        title.classList.add("title")
        title.textContent = book.title
        newBook.appendChild(title)

        const line1 = document.createElement("div")
        line1.classList.add("line")
        newBook.appendChild(line1)

        const author = document.createElement("div")
        author.classList.add("author")
        author.textContent = book.author
        newBook.appendChild(author)

        const line2 = document.createElement("div")
        line2.classList.add("line")
        newBook.appendChild(line2)

        const pagesProgress = document.createElement("div");
        pagesProgress.classList.add("amount-read")

        const pagesRead = document.createElement("div");
        pagesRead.textContent = book.pagesRead;
        pagesProgress.appendChild(pagesRead)

        const slash = document.createElement("div");
        slash.textContent = "/"
        pagesProgress.appendChild(slash)

        const pagesTotal = document.createElement("div");
        pagesTotal.textContent = book.pages;
        pagesProgress.appendChild(pagesTotal)
        newBook.appendChild(pagesProgress)

        const line3 = document.createElement("div")
        line3.classList.add("line")
        newBook.appendChild(line3)

        const percentageComplete = document.createElement("div");
        percentageComplete.classList.add("percentage")
        const PERCENT_COMPLETE = (book.pagesRead / book.pages) * 100
        percentageComplete.textContent = `${Math.floor(PERCENT_COMPLETE)} %`
        newBook.appendChild(percentageComplete)

        const line4 = document.createElement("div")
        line4.classList.add("line")
        newBook.appendChild(line4)

        const icons = document.createElement("div")
        icons.classList.add("icons")
        const edit = document.createElement("div")
        edit.classList.add("edit")
        edit.setAttribute("id", "edit")
        const remove = document.createElement("div")
        remove.classList.add("remove")
        remove.setAttribute("id", "remove")
        icons.appendChild(edit)
        icons.appendChild(remove)
        newBook.appendChild(icons)

        SHELF.insertBefore(newBook, SHELF.firstChild)

        const TOGGLE_READ = document.getElementById("toggle-read");
        TOGGLE_READ.addEventListener("click", () => {
            setBookToRead(bookIndex)
            updateLibrary(library)
        })

        const EDIT_BOOK = document.getElementById("edit")
        EDIT_BOOK.addEventListener("click", () => {
            editBook(library, bookIndex)
        })

        const REMOVE_BOOK = document.getElementById("remove")
        REMOVE_BOOK.addEventListener("click", () => {
            removeBook(library, bookIndex)
        })

    }
}

function editBook(library, index) {
    console.log("Edit: " + index)
    FORM.style.display = "flex"

    const book = library[index]
    TITLE.value = book.title
    AUTHOR.value = book.author
    PAGES.value = book.pages
    PAGES_READ.value = book.pagesRead
    FINISHED.checked = book.finshed
    editMode = true
}

function removeBook(library, index) {
    FORM.style.display = "none"
    library.splice(index, 1)
    updateLibrary(myLibrary)
}

updateLibrary(myLibrary)