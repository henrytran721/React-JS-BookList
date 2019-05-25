import React, { Component } from 'react';
import './App.css';


function AddBook(props) {
  return (
    <div className="bookInfo">
    <div className="bookHeader"><p>Add New Book</p></div>
      <div className="bookNameInput">
        <p>Book Title</p>
        <input type="text"
        value={props.titleValue}
        onChange={props.onTitleChange}
        required/>
      </div>
      <div className="bookNameInput">
        <p>Author</p>
        <input type="text"
        value={props.authorValue}
        onChange={props.onAuthorChange}
        required/>
      </div>
      <div className="bookNameInput">
        <p>Number of Pages</p>
        <input
        type='number'
        value={props.pageValue}
        onChange={props.onPageChange}
        />
      </div>
      <div className="btns">
        <button onClick={() => props.onCreateNewBook()}>Submit</button>
        <button onClick={() => props.onCancelForm()}>Cancel</button>
      </div>
    </div>
  )
}

function ReadingList(props) {
  if(props.list.length === 0) {
    return (
      <div className="noBook">
       <p>You currently have no books. Please click 'Add Book' to get started!</p>
      </div>
    )
  } else {
    return (
        <div className='bookContainer'>
          {props.list.map((books) => (
            <div key={books.bookName} className='bookListDiv'>
              <button onClick={() => props.onRemoveBook(books.bookName)} className='deleteBtn'><span>X</span></button>
              <div key={books.bookName}>
                <span className='bookName'><strong><p>Book Title:&nbsp;</p></strong>{books.bookName}</span>
                <span className='authorName'><strong><p>Author:&nbsp;</p></strong>{books.authorName}</span>
                <span className='pageNum'><strong><p>Number of Pages:&nbsp;</p></strong>{books.pageNum}</span>
              </div>
          </div>
          ))}
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addForm: false,
      books: [],
      bookTitleInput: '',
      authorInput: '',
      pagesInput: ''
    }
    this.showForm = this.showForm.bind(this)
    this.updateTitleInput=this.updateTitleInput.bind(this)
    this.updateAuthorInput=this.updateAuthorInput.bind(this)
    this.updatePagesInput=this.updatePagesInput.bind(this)
    this.removeBook=this.removeBook.bind(this)
    this.createNewBook=this.createNewBook.bind(this)
    this.cancelForm = this.cancelForm.bind(this)
  }

  cancelForm() {
    let mainBody = document.querySelector('.background');
    let addBookForm = document.querySelector('.addBookForm');
    mainBody.style.filter = "blur(0px)";
    addBookForm.style.transform =  '';
    this.setState({
      addForm: false
    })
  }

  showForm() {
    let mainBody = document.querySelector('.background');
    let addBookForm = document.querySelector('.addBookForm');
    if(this.state.addForm !== true) {
      mainBody.style.filter = "blur(8px)";
      addBookForm.style.transform = 'translateY(80px)'
    } else {
      mainBody.style.filter = "blur(0px)";
      addBookForm.style.transform = 'translateY(-80px)'
    }
    this.setState((currentState) => {
      return {
        addForm: !currentState.addForm,
      }
    })
  }
  updateTitleInput(e) {
    const bookTitleValue=e.target.value;
    console.log("Title Input: " + this.state.bookTitleInput);
    this.setState({
      bookTitleInput: bookTitleValue
    })
  }
  updateAuthorInput(e) {
    const authorValue=e.target.value;
    console.log("Author Input: " + this.state.authorInput);
    this.setState({
      authorInput: authorValue
    })
  }
  updatePagesInput(e) {
    console.log('Pages: ' + e.target.value)
    if(e.target.validity.valid) {
      this.setState({
        pagesInput: e.target.value
      })
    }
  }
  createNewBook() {
    let mainBody = document.querySelector('.background');
    if(this.state.bookTitleInput.length !== 0) {
      mainBody.style.filter = 'blur(0px)'
    this.setState((currentState) => {
      return {
        addForm: !currentState.addForm,
        books: currentState.books.concat([
          {
            bookName: this.state.bookTitleInput.charAt(0).toUpperCase()
            + this.state.bookTitleInput.slice(1),
            authorName: this.state.authorInput,
            pageNum: this.state.pagesInput
          }
        ]),
        bookTitleInput: '',
        authorInput: '',
        pagesInput: ''
      }
    })
    console.log(this.state.books);
  }
  }

  removeBook(name) {
    console.log(this.state.books);
    this.setState((currentState) => {
      return {
        books: currentState.books.filter((book) => book.bookName !== name)
      }
    })
  }

  render() {
    return (
      <div className="body">
        <div className="background">
          <header>
            <h1>Add Your New Book Here</h1>
          </header>
          <main>
              <button onClick={() => this.showForm()} className="addButton"><span
              className="addSymbol">+</span>Add Book</button>
              <ReadingList
                list={this.state.books}
                onRemoveBook={this.removeBook}
              />
          </main>
        </div>
        <div className="addBookForm">
        {this.state.addForm ? <AddBook
          titleValue={this.state.bookTitleInput}
          onTitleChange={this.updateTitleInput}
          authorValue={this.state.authorInput}
          onAuthorChange={this.updateAuthorInput}
          pageValue={this.state.pagesInput}
          onPageChange={this.updatePagesInput}
          onCancelForm={this.cancelForm}
          onCreateNewBook={this.createNewBook}
        /> : null }
        </div>
      </div>
    );
  }
}

export default App;
