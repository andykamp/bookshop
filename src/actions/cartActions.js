"use strict"
import axios from 'axios';
//GET CART
export function getCart(){
  return function(dispatch){
    axios.get('/api/cart')
    .then(function(response){
      dispatch({type:"GET_CART", payload:response.data })
    })
    .catch(function(err){
      dispatch({type:"GET_CART_REJECTED", msg: 'error when getting the cart from session'})

    })
  }
}
//ADD TO CART
export function addToCart(cart){
  return function(dispatch){
    axios.post("/api/cart", cart)
      .then(function(response){
        dispatch({type:"ADD_TO_CART", payload:response.data })
      })
      .catch(function(err){
        dispatch({type:"ADD_TO_CART_REJECTED", msg: 'error when adding to cart'})
      })
  }
}

//UPDATE FORM CART
export function updateCart(_id, unit, cart){
  //creates a copy of the current array of books
  const currentBokToUpdate = cart
  //Determine at wich index in books array is the book to be deleted
  const indexToUpdate = currentBokToUpdate.findIndex(
    function(book){
      return book._id === _id
    }
  )

  const newBookToUpdate ={
    ...currentBokToUpdate[indexToUpdate],
    quantity:currentBokToUpdate[indexToUpdate].quantity + unit
  }
  //uses slice to remove the book at the specified indexToUpdate
  let cartUpdate = [...currentBokToUpdate.slice(0,indexToUpdate),newBookToUpdate, ...currentBokToUpdate.slice(indexToUpdate + 1)]

  return function(dispatch){
    axios.post("/api/cart", cartUpdate)
      .then(function(response){
        dispatch({type:"UPDATE_CART", payload:response.data })
      })
      .catch(function(err){
        dispatch({type:"UPDATE_CARTT_REJECTED", msg: 'error when updating cart'})
      })
  }
}
//DELETE FORM CART
export function deleteCartItem(cart){
  return function(dispatch){
    axios.post("/api/cart", cart)
      .then(function(response){
        dispatch({type:"DELETE_CART_ITEM",payload:response.data})
       })
      .catch(function(err){
        dispatch({type:"DELETE_CART_ITEM_REJECTED", msg: 'error when deleting from cart'})
      })
  }

}
