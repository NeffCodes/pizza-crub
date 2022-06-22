const deleteButtons = document.querySelectorAll('.fa-trash')

Array.from(deleteButtons).forEach( deleteButton => deleteButton.addEventListener('click', deleteTopping))

async function deleteTopping() {
  const topping = this.parentNode.childNodes[1].innerText
  try {
    const response = await fetch('deleteTopping', {
      method:'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'toppingToDelete': topping
      })
    })
    const data = await response.json()
    console.log(data)
    location.reload()
  }
  catch(err) {
    console.log(err)
  }
}