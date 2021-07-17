
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
    return{
        addBookToLibrary, getLibrary
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
        bookRow.id=index;
        const bookTitle=document.createElement("td"); 
        const bookAuthor=document.createElement("td");
        const bookPages=document.createElement("td");
        const bookRead= document.createElement("td");

        bookTitle.textContent=book.title; 
        bookAuthor.textContent=book.author;
        bookPages.textContent= book.pages; 
        bookRead.textContent= book.read ? "Yes":"NO"; 
        
        bookRow.appendChild(bookTitle);
        bookRow.appendChild(bookAuthor);
        bookRow.appendChild(bookPages);
        bookRow.appendChild(bookRead);

        table.appendChild(bookRow);
        
    }
     return {updateTable}
})()

const libraryForms=(()=>{
    const titleBox=document.getElementById("book-title");
    const authorBox=document.getElementById("book-author");
    const pagesBox=document.getElementById("book-pages");
    const readCheckBox=document.getElementById("read-checkbox");
    const modalBox= document.getElementById("add-book-form");

    const saveButton=document.getElementById("save");
    const openButton= document.getElementById("open");
    const close=document.querySelector("#cancel");

    const addBookToLibrary= () => {
        const book = new Book(titleBox.value,authorBox.value, pagesBox.value, readCheckBox.checked );
        myLibrary.addBookToLibrary(book);
        displayMyLibrary.updateTable();

    }
    const editBook()

    const closeForm = ()=>{
            modalBox.style.display= "none";
    }
    
    //eventListeners
    saveButton.addEventListener("click",()=>{
        addBookToLibrary();
        closeForm();
    })
    
    
    
    close.addEventListener("click",closeForm)
    openButton.addEventListener("click",(e)=>{
        
        modalBox.style.display= "block"; 
        console.log(modalBox);
        
    })
    
    return {addBookToLibrary}
})()




