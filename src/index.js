let addToy = false;
let toyData

document.addEventListener("DOMContentLoaded", () => {

  fetch('http://localhost:3000/toys')
  .then(r => r.json())
  .then(data => {
    toyData = data
    toyData.forEach(renderCard)
  })

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }


  });

  function renderCard(toyData){
    const toyCard = document.createElement('div')
    const toyName = document.createElement('h2')
    const toyImage = document.createElement('img')
    const toyLikes = document.createElement('p')
    const toyCollection = document.querySelector('#toy-collection')
    const likeBtn = document.createElement('button')

    toyImage.className= 'toy-avatar'
    toyCard.className = 'card'
    
    toyName.textContent = toyData.name
    toyImage.src = toyData.image 
    toyLikes.textContent = toyData.likes
    likeBtn.textContent = 'Like'

    toyCollection.append(toyCard)
    toyCard.appendChild(toyName)
    toyCard.appendChild(toyImage)
    toyCard.appendChild(toyLikes)
    toyCard.appendChild(likeBtn)

    likeBtn.addEventListener('click',()=>[
      toyData.likes = toyData.likes + 1,
      toyLikes.textContent = toyData.likes,
      updateLikes(toyData)
    ])

  }

  function updateLikes(toyData){
    fetch(`http://localhost:3000/toys/${toyData.id}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify(toyData)
    })
    .then(r => r.json())
    .then(data => console.log(data))
  }
  
  function postToy(){
    const newName = document.querySelector('#toy_name')
    const newImg = document.querySelector('#toy_url')
    fetch('http://localhost:3000/toys',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify({
        name: newName.value,
        image: newImg.value,
        likes: 0,
      })
    })
    .then(r => r.json())
    .then(newToy => renderCard(newToy))
  }

    const submit = document.querySelector('.add-toy-form')
    submit.addEventListener('submit',(e)=>{
      e.preventDefault()
      postToy()
    })
  
  

});

