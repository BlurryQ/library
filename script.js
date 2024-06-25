/* Theme code */

const root = document.documentElement;

root.classList.add('dark');

/* Running code */

class Book {
    constructor(title, author, pagesTotal, pagesRead, finished, bookIndex) {
    this.title = title
    this.author = author
    this.pagesTotal = pagesTotal
    this.pagesRead = pagesRead
    this.finished = finished
    this.bookIndex = bookIndex
    console.log("CREATED")
  }

    isBookFinished = () => {
        if(finished) { return true }
        return pagesTotal === pagesRead ? true : false;
    }

    setBookToRead = (bookIndex) => {
        const thisBook = myLibrary[bookIndex]
        if(thisBook.pagesRead === thisBook.pagesTotal) {
            if(thisBook.oldPagesRead) {
                thisBook.pagesRead = thisBook.oldPagesRead
            } else {
                thisBook.pagesRead--
            }
        } else {
            thisBook.oldPagesRead = thisBook.pagesRead
            thisBook.pagesRead = thisBook.pagesTotal;
        }
        return thisBook.finished = !thisBook.finished
    }


    correctPagesReadEntry = () => {
        return Number(PAGES_TOTAL.value) >= Number(PAGES_READ.value)
    }

    editBook = (library, index) => {
        MODAL.showModal()
        SAVE.removeAttribute("disabled");

        const book = library[index]
        TITLE.value = book.title
        AUTHOR.value = book.author
        PAGES_TOTAL.value = book.pagesTotal
        PAGES_READ.value = book.pagesRead
        FINISHED.checked = book.finshed
        editMode = true
        bookToEditIndex = index
    }

    updateBook = (library, title, author, pagesTotal, pagesRead, read, bookIndex) => {
        let bookToUpdate = library[bookIndex]
        bookToUpdate = {
            title,
            author,
            pagesTotal,
            pagesRead,
            read,
        }
        library.splice(bookIndex, 1, bookToUpdate)
        reAssignIDs(library)
        updateLibrary(myLibrary)
    }

    removeBook = (library, index) => {
        MODAL.close()
        clearFormInputs()
        library.splice(index, 1)
        reAssignIDs(library)
        updateLibrary(myLibrary)
    }

  get getTitle() {
    return this.title
  }

  set setTitle(newTitle) {
    this.title = newTitle
  }
}




let editMode = false
let bookToEditIndex = null

const myLibrary = [];

const THE_HOBBIT = addBookToLibrary("The Hobbit", "J.R.R.Tolkien", 295, 10, false, 0),
EMPIRE_OF_THE_VAMPIRE = addBookToLibrary("Empire of the Vampire", "Jay Kristoff", 739, 739, true, 1);


const MODAL = document.querySelector("[data-modal]"),
TITLE = document.getElementById("title"),
AUTHOR = document.getElementById("author"),
PAGES_TOTAL = document.getElementById("pagesTotal"),
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

PAGES_TOTAL.addEventListener("change", () => {
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
    const title = TITLE.value,
    author = AUTHOR.value,
    pagesTotal = PAGES_TOTAL.value,
    finished = FINISHED.checked;
    let pagesRead = PAGES_READ.value,
    read = isBookFinished(pagesTotal, pagesRead, finished);
    if(read) { pagesRead = pagesTotal }
    if(editMode) {
        const bookIndex = bookToEditIndex
        updateBook(myLibrary, title, author, pagesTotal, pagesRead, read, bookIndex);
        updateLibrary(myLibrary, bookIndex)
    } else {
        const bookIndex = myLibrary.length
        addBookToLibrary(title, author, pagesTotal, pagesRead, read, bookIndex);
        updateLibrary(myLibrary, bookIndex)
    }
    clearFormInputs()
    MODAL.close()
})

CLOSE.addEventListener("click", () => {
    MODAL.close()
    clearFormInputs()
})

updateLibrary(myLibrary)

/* functions */

  function addBookToLibrary(title, author, pagesTotal, pagesRead, finished, bookIndex) {
      let newBook = new Book(title, author, pagesTotal, pagesRead, finished, bookIndex);
      myLibrary.push(newBook);
  }

function correctPagesReadEntry() {
    return Number(PAGES_TOTAL.value) >= Number(PAGES_READ.value)
}

function checkForm() {
    if(TITLE.value !== "" 
        && AUTHOR.value !== ""
        && PAGES_TOTAL.value !== "" 
        && PAGES_READ.value !== "") {
    return true; }
    return false
}

function clearFormInputs() {
    TITLE.value = "";
    AUTHOR.value = "";
    PAGES_TOTAL.value = "";
    PAGES_READ.value = "";
    FINISHED.checked = false;
    SAVE.setAttribute("disabled", true);
    bookToEditIndex = null
}

function isBookFinished(pagesTotal, pagesRead, finished) {
    if(finished) { return true }
    return pagesTotal === pagesRead ? true : false;
}

function setBookToRead(bookIndex) {
    const thisBook = myLibrary[bookIndex]
    if(thisBook.pagesRead === thisBook.pagesTotal) {
        if(thisBook.oldPagesRead) {
            thisBook.pagesRead = thisBook.oldPagesRead
        } else {
            thisBook.pagesRead--
        }
    } else {
        thisBook.oldPagesRead = thisBook.pagesRead
        thisBook.pagesRead = thisBook.pagesTotal;
    }
    return thisBook.finished = !thisBook.finished
}

function updateLibrary(library) {
    while(SHELF.firstChild) {
        SHELF.removeChild(SHELF.firstChild)
    }

    const newBook = document.createElement("div")
    const addBook = document.createElement("div")
    const add = document.createElement("div")
    add.textContent = "+"

    newBook.classList.add("new-book")
    addBook.classList.add("add-new-book")

    addBook.setAttribute("id", "add-new-book")
   
    addBook.appendChild(add)
    newBook.appendChild(addBook)
    SHELF.appendChild(newBook)

    addBook.addEventListener("click", () => {
        MODAL.showModal()
    })

    for(const book of library) {
        const bookIndex = book.bookIndex

        const readIcon = document.createElement("button")
        const newBook = document.createElement("div")
        const title = document.createElement("div")
        const line1 = document.createElement("div")
        const author = document.createElement("div")
        const line2 = document.createElement("div")
        const pagesProgress = document.createElement("div");
        const pagesRead = document.createElement("div");
        const slash = document.createElement("div");
        const pagesTotal = document.createElement("div");
        const line3 = document.createElement("div")
        const percentageComplete = document.createElement("div");
        const line4 = document.createElement("div")
        const icons = document.createElement("div")
        const edit = document.createElement("button")
        const remove = document.createElement("button")

        title.textContent = book.title
        author.textContent = book.author
        pagesRead.textContent = book.pagesRead;
        slash.textContent = "/"
        pagesTotal.textContent = book.pagesTotal;
        const PERCENT_COMPLETE = (book.pagesRead / book.pagesTotal) * 100
        percentageComplete.textContent = `${Math.floor(PERCENT_COMPLETE)} %`

        newBook.classList.add("book")
        title.classList.add("title")
        line1.classList.add("line")
        author.classList.add("author")
        line2.classList.add("line")
        pagesProgress.classList.add("amount-read")
        line3.classList.add("line")
        percentageComplete.classList.add("percentage")
        line4.classList.add("line")
        icons.classList.add("icons")
        edit.classList.add("edit")
        remove.classList.add("remove")
        readIcon.classList.add(book.finished ? "read" : "reading")

        newBook.setAttribute("id", bookIndex)
        readIcon.setAttribute("id", "toggle-read")
        edit.setAttribute("id", "edit")
        remove.setAttribute("id", "remove")

        newBook.appendChild(readIcon)
        newBook.appendChild(title)
        newBook.appendChild(line1)
        newBook.appendChild(author)
        newBook.appendChild(line2)
        pagesProgress.appendChild(pagesRead)
        pagesProgress.appendChild(slash)
        pagesProgress.appendChild(pagesTotal)
        newBook.appendChild(pagesProgress)
        newBook.appendChild(line3)
        newBook.appendChild(percentageComplete)
        newBook.appendChild(line4)
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
            updateLibrary(library)
        })

        const REMOVE_BOOK = document.getElementById("remove")
        REMOVE_BOOK.addEventListener("click", () => {
            removeBook(library, bookIndex)
            updateLibrary(library)
        })

    }
}

function editBook(library, index) {
    MODAL.showModal()
    SAVE.removeAttribute("disabled");

    const book = library[index]
    TITLE.value = book.title
    AUTHOR.value = book.author
    PAGES_TOTAL.value = book.pagesTotal
    PAGES_READ.value = book.pagesRead
    FINISHED.checked = book.finshed
    editMode = true
    bookToEditIndex = index
}

function updateBook(library, title, author, pagesTotal, pagesRead, read, bookIndex) {
    let bookToUpdate = library[bookIndex]
    bookToUpdate = {
        title,
        author,
        pagesTotal,
        pagesRead,
        read,
    }
    library.splice(bookIndex, 1, bookToUpdate)
    reAssignIDs(library)
    updateLibrary(myLibrary)
}

function removeBook(library, index) {
    MODAL.close()
    clearFormInputs()
    library.splice(index, 1)
    reAssignIDs(library)
    updateLibrary(myLibrary)
}

function reAssignIDs(library) {
    let index = 0;
    for(const book of library) {
        book.bookIndex = index;
        index++
    }
}


/* 

page render
    library
    books
    listeners

library
    add book
    remove book

books
    read
    unread
    edit
    new



 */