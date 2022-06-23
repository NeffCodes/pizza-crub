import deleteTopping from "./modules/deleteTopping.mjs"
import updateLikes from "./modules/updateLikes.mjs"

//// Initialize storage for vote tracking ///////////
if(!localStorage.getItem('votedToppings')) localStorage.setItem('votedToppings', '{}')

const deleteButtons = document.querySelectorAll('.fa-trash')
const upvotes = document.querySelectorAll('.up')
const downvotes = document.querySelectorAll('.down')

Array.from(deleteButtons).forEach( deleteButton => deleteButton.addEventListener('click', deleteTopping))
Array.from(upvotes).forEach( upvote => {
  upvote.addEventListener('click', updateLikes)
  upvote.vote = 'up'
})
Array.from(downvotes).forEach( downvote => {
  downvote.addEventListener('click', updateLikes)
  downvote.vote = 'down'
})
