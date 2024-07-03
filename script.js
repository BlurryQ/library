class Book {
    constructor(title, author, pagesTotal, pagesRead, finished, bookIndex) {
    this.title = title
    this.author = author
    this.pagesTotal = pagesTotal
    this.pagesRead = pagesRead
    this.finished = finished
    this.bookIndex = bookIndex
  }

}

const render = () => {

    const THE_HOBBIT = new Book("The Hobbit", "J.R.R.Tolkien", 295, 10, false, 0),
    EMPIRE_OF_THE_VAMPIRE = new Book("Empire of the Vampire", "Jay Kristoff", 739, 739, true, 1);


    let myLibrary = [THE_HOBBIT, EMPIRE_OF_THE_VAMPIRE],
    editMode = false,
    bookToEditIndex = null;

    const MODAL = document.querySelector("[data-modal]"),
    TITLE = document.getElementById("title"),
    AUTHOR = document.getElementById("author"),
    PAGES_TOTAL = document.getElementById("pagesTotal"),
    PAGES_READ = document.getElementById("pagesRead"),
    FINISHED = document.getElementById("finished"),
    SAVE = document.getElementById("save"),
    CLOSE = document.getElementById("close"),
    SHELF = document.getElementById("shelf");
    
    SAVE.setAttribute("disabled", true)
    
    TITLE.addEventListener("change", () => {
        let formComplete = _checkForm();
        if(formComplete) {
            SAVE.removeAttribute("disabled");
        }
    })
    
    AUTHOR.addEventListener("change", () => {
        let formComplete = _checkForm();
        if(formComplete) {
            SAVE.removeAttribute("disabled");
        }
    })
    
    PAGES_TOTAL.addEventListener("change", () => {
        let pagesCorrect = _correctPagesReadEntry()
        let formComplete = _checkForm();
        if(formComplete && pagesCorrect) {
            SAVE.removeAttribute("disabled");
        } else {
            SAVE.setAttribute("disabled", true);
        }
    })
    
    PAGES_READ.addEventListener("change", () => {
        let pagesCorrect = _correctPagesReadEntry()
        let formComplete = _checkForm();
        if(formComplete && pagesCorrect) {
            SAVE.removeAttribute("disabled");
        } else {
            SAVE.setAttribute("disabled", true);
        }
    })
    
    SAVE.addEventListener("click", () => {
        const title = TITLE.value,
        author = AUTHOR.value,
        pagesTotal = PAGES_TOTAL.value;
        let finished = FINISHED.checked,
        pagesRead = PAGES_READ.value;
        const read = _isBookFinished(pagesTotal, pagesRead, finished);
        if(read) { 
            pagesRead = pagesTotal
            finished = true;
         }
        if(editMode) {
            const bookIndex = bookToEditIndex
            _updateBook(myLibrary, title, author, pagesTotal, pagesRead, finished, read, bookIndex);
        } else {
            const bookIndex = myLibrary.length
            _addBookToLibrary(title, author, pagesTotal, pagesRead, read, bookIndex);    
        }
        _clearFormInputs()
        _updateLibrary(myLibrary)
        MODAL.close()
    })
    
    CLOSE.addEventListener("click", () => {
        MODAL.close()
        _clearFormInputs()
    })

    const shelf = () => {

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
    
        if(!myLibrary) { return }
        for(const book of myLibrary) {
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
                _setBookToRead(bookIndex)
            })
    
            const EDIT_BOOK = document.getElementById("edit")
            EDIT_BOOK.addEventListener("click", () => {
                _editBook(myLibrary, bookIndex)
            })
    
            const REMOVE_BOOK = document.getElementById("remove")
            REMOVE_BOOK.addEventListener("click", () => {
                _removeBook(myLibrary, bookIndex)
            })
        }
    }

    const _correctPagesReadEntry = () => {
        return Number(PAGES_TOTAL.value) >= Number(PAGES_READ.value)
    }

    const _isBookFinished = (pagesTotal, pagesRead, finished) => {
        if(finished) { return true }
        return pagesTotal === pagesRead ? true : false;
    }

    const _checkForm = () => {
        if(TITLE.value !== "" 
            && AUTHOR.value !== ""
            && PAGES_TOTAL.value !== "" 
            && PAGES_READ.value !== "") {
        return true; }
        return false
    }

    const _clearFormInputs = () => {
        TITLE.value = "";
        AUTHOR.value = "";
        PAGES_TOTAL.value = "";
        PAGES_READ.value = "";
        FINISHED.checked = false;
        SAVE.setAttribute("disabled", true);
        bookToEditIndex = null
    }

    const _addBookToLibrary = (title, author, pagesTotal, pagesRead, finished, bookIndex) => {
        let newBook = new Book(title, author, pagesTotal, pagesRead, finished, bookIndex);
        myLibrary.push(newBook);
    }

    const _updateLibrary = (myLibrary) => {
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
    
        for(const book of myLibrary) {
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
                _setBookToRead(bookIndex)
                _updateLibrary(myLibrary)
            })
    
            const EDIT_BOOK = document.getElementById("edit")
            EDIT_BOOK.addEventListener("click", () => {
                _editBook(myLibrary, bookIndex)
                _updateLibrary(myLibrary)
            })
    
            const REMOVE_BOOK = document.getElementById("remove")
            REMOVE_BOOK.addEventListener("click", () => {
                _removeBook(myLibrary, bookIndex)
                _updateLibrary(myLibrary)
            })
    
        }
    }

    const _updateBook = (myLibrary, title, author, pagesTotal, pagesRead, finished, read, bookIndex) => {
        bookToUpdate = {
            title,
            author,
            pagesTotal,
            pagesRead,
            finished,
            read,
        }
        myLibrary.splice(bookIndex, 1, bookToUpdate)
        _reAssignIDs(myLibrary)
    }
    
    const _removeBook = (library, index) => {
        MODAL.close()
        _clearFormInputs()
        library.splice(index, 1)
        _reAssignIDs(library)
        _updateLibrary(myLibrary)
    }

    _setBookToRead = (bookIndex) => {
        const thisBook = myLibrary[bookIndex]
        thisBook.finished = !thisBook.finished
        if(thisBook.pagesRead === thisBook.pagesTotal) {
            thisBook.oldPagesRead ? thisBook.pagesRead = thisBook.oldPagesRead : thisBook.pagesRead--
        } else {
            thisBook.oldPagesRead = thisBook.pagesRead
            thisBook.pagesRead = thisBook.pagesTotal;
        }
        return _updateLibrary(myLibrary)
    }

    _editBook = (library, index) => {
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
    
    const _reAssignIDs = (library) => {
        let index = 0;
        for(const book of library) {
            book.bookIndex = index;
            index++
        }
    }

    return { shelf }
}


const RENDER = render()
RENDER.shelf()