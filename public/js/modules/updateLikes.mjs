export default async function updateLikes(event){
  const topping = this.parentNode.parentNode.childNodes[3].innerText
  const count = Number(this.parentNode.childNodes[3].innerText)
  const votedToppings = JSON.parse(localStorage.getItem('votedToppings'))
  const voteDirection = event.currentTarget.vote
  if(votedToppings[topping] === voteDirection) {
    alert('Whoops, sorry. No double voting.')
  } else {
    votedToppings[topping] = voteDirection;
    localStorage.setItem('votedToppings', JSON.stringify(votedToppings))
    try {
      const response = await fetch('updateLike', {
        method:'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'topping': topping,
          'likes': count,
          '_vote': voteDirection
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
}
