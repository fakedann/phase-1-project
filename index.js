//WAITING FOR START-BUTTON CLICK IN ORDER TO SET UP THE PAGE
document.addEventListener('DOMContentLoaded', function(){
  let btn = document.querySelector('.btn')
  btn.addEventListener('click', function(e){
    setUpPage(e)
  }, {once : true})
})

//CREATING MULTIPLE DOM ELEMENTS
function setUpPage(e){
  let body = e.target.parentNode.parentNode
  let section = document.createElement('section')
  let footer = document.createElement('footer')
  let form = document.createElement('form')
  let main = document.createElement('div')
  main.className = "main"
  main.appendChild(form)
  body.append(section, main, footer)
  //SETTING UP SUMMARY
  let summary = document.createElement('div')
  summary.className = 'summary'
  let p = document.createElement('p')
  p.innerHTML = "Search your favorite films down below."
  summary.appendChild(p)
  section.appendChild(summary)
  //SETTING UP FOOTER
  footer.innerHTML = `<button type="button" class="btn" id="database">CHECK YOUR DATABASE</button>
  <div></div>`
  let data = document.getElementById('database')
  data.addEventListener('click', function(e){
    checkDatabase(e)
  })
  //SETTING UP FORM
  form.innerHTML = `<h4>SEARCHED FILMS</h4>
  <label for="title">Title: </label>
  <input type="text" name="title" placeholder="The Irishman" id="new-film" />
  <label for="director">Director: </label>
  <input type="text" name="director" placeholder="Martin Scorsese" id="new-director" />
  <input type="submit" class="submitBtn" value="Fetch Film" />`
  form.addEventListener('submit', checkInput)

}

//CHECKING THAT THE USER SUBMITS ACCEPTABLE INPUT
function checkInput(e){
  e.preventDefault()
  let evento = e
  let director = ''
  let title = ''
  if (e.target.director.value.trim() !== director){
    director = e.target.director.value.toLowerCase()
    title = e.target.title.value.toLowerCase()
    fetch(`http://www.omdbapi.com/?apikey=6e17c072&t=${e.target.title.value}`)
    .then(resp => resp.json() )
    .then(resp => handleSearch(evento, resp, director, title))
  }else{
    alert("Sorry, try being a little more specific when you type in the director!")
  }
  e.target.reset()
}

//IF INPUT IS ACCEPTABLE, CHECK IF THERE'S A MATCH
function handleSearch(evento, film, director, title){
  let auxDirector = ''
  let auxTitle = ''
  if (film.Response !== false){
    auxDirector = film.Director.toLowerCase()
    auxTitle = film.Title.toLowerCase()
  }else{
    alert('Sorry, your search did not match with any movies. Please, try again.')
  }

  if(auxDirector === director && auxTitle === title){
    showPoster(evento, film)
  }else{
    alert('Sorry, your movie did not match with the director you submitted. Please, try again.')
  }
}

//IF THERE'S A MATCH, A FILM POSTER WILL BE POSTED ON THE DOM
function showPoster(evento, film){
  let div = document.createElement('div')
  let img = document.createElement('img')
  let addBtn = document.createElement('button')
  addBtn.innerHTML = "ADD TO DATABASE"
  img.src = film.Poster
  div.className = "images"
  img.className = 'posters'
  addBtn.className = 'addBtn'
  div.append(img, addBtn)
  evento.target.parentNode.appendChild(div)
  
  addBtn.addEventListener('click', function(e){
    addFilm(e, film)
    let commentBtn = document.createElement('button')
    commentBtn.innerHTML = "Add Comment"
    commentBtn.className = "addBtn"
    div.appendChild(commentBtn)
    addBtn.remove()
    commentBtn.addEventListener('click', function(e){
      handleComment(e)
    })
  })
  img.addEventListener('mouseover', () => img.className = img.className+" mouseOver")
  img.addEventListener('mouseout', () => img.className ="posters")
}

//IF FILM WOULD LIKE TO BE ADDED BY THE USER, THIS FUNCTION ADDS IT TO THE DATABASE
function addFilm(e, film){
  let parentDiv = e.target.parentNode
  fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        'title': `${film.Title}`,
        'directors': `${film.Director}`,
        "genres": `${film.Genre}`,
        "runtime": `${film.Runtime}`,
        "countries": `${film.Country}`,
        "comments": '',
        "poster": `${film.Poster}`
        }),
      })
      .then(resp => resp.json())
      .then(resp => {
        alert('This film was succesfully added to your database!')
        parentDiv.id = resp.id
      })
}

//IF USER WANTS TO ADD A COMMENT TO A FILM, THIS FUNCTION WILL HANDLE IT
function handleComment(e){
  let commentSect = document.createElement('form')
  commentSect.className = "formComment"
  commentSect.innerHTML = `<input type="text" class="commentText" name="comment" placeholder="Type your comment"/>
  <input type="submit" class="commentBtn" value="Submit" />`
  commentSect.className = "comment"
  e.target.parentNode.appendChild(commentSect)
  e.target.remove()

  commentSect.addEventListener('submit', function(e){
    e.preventDefault()
    fetch(`http://localhost:3000/posts/${e.target.parentNode.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      'comments': `${e.target.comment.value}`
      }),
    })

    alert('Your comment was succesfully added!')
    e.target.reset()   
  })
}

//DISPLAY WHAT'S INSIDE THE DATABASE
function checkDatabase(e){
  let foot = e.target.parentNode
  let container = foot.lastChild
  
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  fetch('http://localhost:3000/posts')
  .then(resp => resp.json())
  .then( database => {
    if(database.length === 0){
      alert('Your database is empty at the moment. Add some films first and check again later!')
    }else{
      for(each of database){
        let div = document.createElement('div')
        let img = document.createElement('img')
        let p = document.createElement('p')
        p.innerHTML = `Title: ${each.title}<br>
        Directors: ${each.directors}<br>
        Genres: ${each.genres}<br>
        Countries: ${each.countries}<br>
        Comments: ${each.comments}`
        img.src = each.poster
        div.className = "imagesData"
        img.className = 'posters'
        div.append(img, p)
        container.appendChild(div)
        
      }
    }
  })
}

//THIS FUNCTION IS NOT MEANT TO BE USED BY THE USER. IT DELETES FILMS ON THE DATABASE
function deleteObj(start, finish){
  for(let i=start;i <= finish; i++){
    fetch(`http://localhost:3000/posts/${i}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
  }
}