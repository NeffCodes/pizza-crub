const deleteButtons = document.querySelectorAll('.fa-trash')
const upvotes = document.querySelectorAll('.fa-thumbs-up')
const downvotes = document.querySelectorAll('.fa-thumbs-down')

Array.from(deleteButtons).forEach( deleteButton => deleteButton.addEventListener('click', deleteTopping))
Array.from(upvotes).forEach( upvote => {
  upvote.addEventListener('click', updateLikes)
  upvote.vote = 'up'
})
Array.from(downvotes).forEach( downvote => {
  downvote.addEventListener('click', updateLikes)
  downvote.vote = 'down'
})



async function deleteTopping() {
  const deleteCode = window.prompt("Password required:")
  const topping = this.parentNode.childNodes[1].innerText
  try {
    const response = await fetch('deleteTopping', {
      method:'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'toppingToDelete': topping,
        '_pw': deleteCode
      })
    })
    const data = await response.json()
    data.msg ?
     alert(data.msg) :
     location.reload()
  }
  catch(err) {
    console.log(err)
  }
}

async function updateLikes(event){
  const topping = this.parentNode.childNodes[1].innerText
  const count = Number(this.parentNode.childNodes[3].innerText)
  console.log(topping, event.currentTarget.vote, count)

  try {
    const response = await fetch('updateLike', {
      method:'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'topping': topping,
        'likes': count,
        '_vote': event.currentTarget.vote
      })
    })
    const data = await response.json();
    console.log(data)
    location.reload()
  }
  catch(err){
    console.error(error)
  }
}