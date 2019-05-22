import React, { Component } from 'react';
import './App.css';


function AddBook(props) {
  return (
    <form className="bookInfo">
    <div className="bookHeader"><p>Add New Book</p></div>
      <div className="bookNameInput">
        <p>Book Title</p>
        <input type="text"
        value ={props.titleValue}
        onChange={props.onChange}
        required/>
      </div>
      <div className="bookNameInput">
        <p>Author</p>
        <input type="text" required/>
      </div>
      <div className="bookNameInput">
        <p>Number of Pages</p>
        <input type="number" required/>
      </div>
      <div className="btns">
        <button>Submit</button>
        <button onClick={() => props.onCancelForm()}>Cancel</button>
      </div>
    </form>
  )
}

function ReadingList(props) {
  if(props.books.length === 0) {
    return (
      <div className="noBook">
       <p>You currently have no books. Please click 'Add Book' to get started!</p>
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
      authorInput: ''
    }
    this.showForm = this.showForm.bind(this)
    this.updateInput = this.updateInput.bind(this)
    this.cancelForm = this.cancelForm.bind(this)
  }

  cancelForm() {
    let mainBody = document.querySelector('.background');
    mainBody.style.filter = "blur(0px)";
    this.setState({
      addForm: false
    })
  }

  showForm() {
    let mainBody = document.querySelector('.background');
    if(this.state.addForm !== true) {
      mainBody.style.filter = "blur(8px)";
    } else {
      mainBody.style.filter = "blur(0px)";
    }
    this.setState((currentState) => {
      return {
        addForm: !currentState.addForm,
      }
    })
  }

  updateInput(e) {
    const bookTitleValue=e.target.value;
    console.log(this.state.bookTitleInput);
    this.setState({
      bookTitleInput: bookTitleValue
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
                books={this.state.books}
              />
          </main>
        </div>
        <div className="addBookForm">
        {this.state.addForm ? <AddBook
          titleValue={this.state.bookTitleInput}
          onChange={this.updateInput}
          onCancelForm = {this.cancelForm}
        /> : null }
        </div>
      </div>
    );
  }
}

export default App;
