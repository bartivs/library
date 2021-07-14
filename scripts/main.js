let myLibrary = [];

function Book(title, pages, readed) { 
    this.title=title;
    this.pages=pages;
    this.readed=readed; 

}

function addBookLibrary(myLibrary,book) {
    myLibrary.push(book);
}

const book1= new Book("sfasdf","adsiofgj",100);

addBookLibrary(myLibrary,book1);

console.table(myLibrary)

const button= document.getElementById("open");
const modalBox= document.querySelector("#modal-box")
const close=document.querySelector("#cancel");
    close.addEventListener("click",(e)=>{
        modalBox.style.display= "none";
    })
button.addEventListener("click",(e)=>{
    
    modalBox.style.display= "block"; 
    console.log(modalBox);
    
})
