"use strict"


//BOOKS REDUCERS
export function booksReducers(state={
  books:[]
  }, action) {
  switch(action.type){
    case "GET_BOOKS":
      // let books = state.concat(action.payload); //The concat() method is used to merge two or more arrays. This method does not change the existing arrays, but instead returns a new array.
      // return state = books;
      return {...state, books:[...action.payload]} //need babel-preset-stage1
      break;

    case "POST_BOOK":
      // let books = state.concat(action.payload); //The concat() method is used to merge two or more arrays. This method does not change the existing arrays, but instead returns a new array.
      // return state = books;
      return {...state, books: [...state.books, ...action.payload], msg:'Saved. Click to continue', style: 'success', validation:'success' } //need babel-preset-stage1
      break;
    case "POST_BOOK_REJECTED":

      return {...state, msg:'Please, try again', style:'danger', validation:'error'} //need babel-preset-stage1
      break;
    case "RESET_BUTTON":

      return {...state, msg:'', style:'primary', validation: null} //need babel-preset-stage1
      break;

    case "DELETE_BOOK":
      //creates a copy of the current array of books
      const currentBokToDelete = [ ...state.books]
      //Determine at wich index in books array is the book to be deleted
      const indexToDelete = currentBokToDelete.findIndex(
        function(book){
          return book._id == action.payload //two equalsign means not EXACTLY same. so 2==="2" is false while 2=="2"
        }
      )
      //uses slice to remove the book at the specified indexToDelete
      return {books: [...currentBokToDelete.slice(0,indexToDelete), ...currentBokToDelete.slice(indexToDelete + 1)]}
      break;

    case "UPDATE_BOOK":
      //creates a copy of the current array of books
      const currentBokToUpdate = [ ...state.books]
      //Determine at wich index in books array is the book to be deleted
      const indexToUpdate = currentBokToUpdate.findIndex(
        function(book){
          return book._id === action.payload._id
        }
      )
      const newBookToUpdate ={
        ...currentBokToUpdate[indexToUpdate],
        title:action.payload.title
      }
      //uses slice to remove the book at the specified indexToUpdate
      return {books: [...currentBokToUpdate.slice(0,indexToUpdate),newBookToUpdate, ...currentBokToUpdate.slice(indexToUpdate + 1)]}
      break;
  }
  return state;
}
