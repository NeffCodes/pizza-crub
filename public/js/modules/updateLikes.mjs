export default async function updateLikes(event){
  const topping = this.parentNode.parentNode.childNodes[3].innerText
  const count = Number(this.parentNode.childNodes[3].innerText)
  const votedToppings = JSON.parse(localStorage.getItem('votedToppings'))

  if(votedToppings[topping]) {
    alert('Sorry, looks like you already casted your vote for this topping')
  } else {
    votedToppings[topping] = true;
    localStorage.setItem('votedToppings', JSON.stringify(votedToppings))
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
}
