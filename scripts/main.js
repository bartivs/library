
class Book{
    constructor(title, author,pages, read){
        this.title=title;
        this.pages=pages;
        this.author=author;
        this.read=read; 
    }

}

const myLibrary= (()=>{
    let libraryArray= [];
    const addBookToLibrary = (Book) => {
        libraryArray.push(Book);
    }
    const getLibrary= () => { 
        return libraryArray; 
    }

    const editBook=(index,title,author,pages,read)=>{ 
        libraryArray[index].title=title;
        libraryArray[index].author=author; 
        libraryArray[index].pages=pages;
        libraryArray[index].read=read; 
    }
    return{
        addBookToLibrary, getLibrary, editBook
    }
})() 


const displayMyLibrary=(() => {
    const table=document.getElementById("library-table")
    const clearTable=()=>{
        const rows= table.querySelectorAll("tbody");
        rows.forEach(row => table.removeChild(row));
    }
    const updateTable = () =>{
        clearTable();
        let libraryArray=myLibrary.getLibrary(); 
        libraryArray.forEach((book,index) => appendBookToTable(book,index)); 
    }
    const appendBookToTable=(book,index)=> {
        
        const bookRow= document.createElement("tbody");
        
        const bookTitle=document.createElement("td"); 
        const bookAuthor=document.createElement("td");
        const bookPages=document.createElement("td");
        const bookRead= document.createElement("td");
        const editBookButtonTd=document.createElement("td");
        const editBookButton= document.createElement("button"); 
        editBookButton.classList.add("edit-book-button"); 
        editBookButton.textContent="Edit";
        editBookButton.id=index;
        editBookButtonTd.appendChild(editBookButton);
        
        
        bookTitle.textContent=book.title; 
        bookAuthor.textContent=book.author;
        bookPages.textContent= book.pages; 
        bookRead.textContent= book.read ? "Yes":"NO"; 
        
        bookRow.appendChild(bookTitle);
        bookRow.appendChild(bookAuthor);
        bookRow.appendChild(bookPages);
        bookRow.appendChild(bookRead);
        bookRow.appendChild(editBookButtonTd); 
        table.appendChild(bookRow);
        
        libraryForms.updateTableButtons();
    }

     return {updateTable}
})()



const libraryForms=(()=>{
    const titleBox=document.getElementById("book-title");
    const authorBox=document.getElementById("book-author");
    const pagesBox=document.getElementById("book-pages");
    const readCheckBox=document.getElementById("read-checkbox");
    const addBookFormBox= document.getElementById("add-book-form");
    const updateBookFormBox = document.getElementById("update-book-form");
    let editbookIndex=0;  

    const saveButton=document.getElementById("save");
    const openButton= document.getElementById("open");
    
    const close=document.querySelector("#cancel");

    const updateTableButtons = () => {
        const updateBookButtons=Array.from(document.querySelectorAll(".edit-book-button"));
        updateBookButtons.forEach(button => {
            button.addEventListener("click",(e)=>
            {
                openEditForm(e,updateBookFormBox);
            });
        })
    }
    const addBookToLibrary= () => {
        const book = new Book(titleBox.value,authorBox.value, pagesBox.value, readCheckBox.checked );
        myLibrary.addBookToLibrary(book);
        displayMyLibrary.updateTable();

    }
    const editBook=(index) => {
        myLibrary.editBook(index,titleBox.value, authorBox.value, pagesBox.value, readCheckBox.checked); 
    }

    const closeForm = (form)=>{
            form.style.display= "";
    }
    const openForm=(form)=>{
        
        form.style.display= "block";
        
    }
    const openEditForm=(e,form)=> {
        form.style.display= "block";
        editbookIndex= form.id;
        const closeButton=form.querySelector(".close");
        console.log(closeButton)
        closeButton.addEventListener("click",(e)=>closeForm(form));
    }
    
    //eventListeners
   
    saveButton.addEventListener("click",(e)=>{
        addBookToLibrary();
        closeForm(addBookFormBox);
    });
    
    close.addEventListener("click",(e)=>{
        closeForm(addBookFormBox)
    });
    
    openButton.addEventListener("click",(e)=>{
        openForm(addBookFormBox);
        console.log(addBookFormBox);        
    });

  
    
    return {addBookToLibrary,updateTableButtons};
})()

const localStorageDriver=(()=>{
    const saveLibraryInLocal = () => { 
        const libraryArray=myLibrary.getLibrary(); 
        localStorage.setItem("localStorageLibrary", JSON.stringify(libraryArray)); 
    }
    const loadLocalLibrary= () => { 
        if( localStorage.getItem("localStorageLibrary")!== null ){ 
            const libraryJSON=JSON.parse(localStorage.getItem("localStorageLibrary"));
            libraryJSON.forEach((book)=>{
                const newBook= new Book(book.title,book.author, book.pages, book.read); 
                myLibrary.addBookToLibrary(newBook); 
            })
            displayMyLibrary.updateTable(); 
        }
    }

    return {saveLibraryInLocal, loadLocalLibrary};
})()

const domComponents= (()=> {
    let updateBookButtons=Array.from(document.querySelectorAll(".edit-book-button"));
    
    return {updateBookButtons }    
})();

localStorageDriver.loadLocalLibrary(); 





