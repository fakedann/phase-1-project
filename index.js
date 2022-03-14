let form = document.createElement('form')
let header = document.querySelector('header')
let body = document.querySelector('body')
let main = document.createElement('div')
let section = document.createElement('section')
main.className = "main"
body.appendChild(section)
body.appendChild(main)
  
let btn = document.querySelector('.btn')
btn.addEventListener('click', function(){
  let summary = document.createElement('div')
  summary.className = 'summary'
  let p = document.createElement('p')
  p.innerHTML = "Search your favorite films down below."
  summary.appendChild(p)
  section.appendChild(summary)
  
  form.innerHTML = `<h4>Searched Films</h4>
  <label for="title">Title: </label>
  <input type="text" name="title" placeholder="The Irishman" id="new-film" />
  <label for="director">Director: </label>
  <input type="text" name="director" placeholder="Martin Scorsese" id="new-director" />
  <input type="submit" class="submitBtn" value="Fetch Film" />`
  main.appendChild(form)
  // body.appendChild(main)
  form.addEventListener('submit', startFetching)
}, {once : true})


function startFetching(e){
  e.preventDefault()
  let director = ''
  let title = ''
  if (e.target.director.value.trim() !== director){
    director = e.target.director.value.toLowerCase()
    title = e.target.title.value.toLowerCase()
    fetch(`http://www.omdbapi.com/?apikey=6e17c072&t=${e.target.title.value}`)
    .then(resp => resp.json() )
    .then(resp => handleSearch(resp, director, title))
  }else{
    alert("Sorry, try being a little more specific when you type in the director!")
  }
  form.reset()
}

function handleSearch(film, director, title){
  let auxDirector = ''
  let auxTitle = ''
  if (film.Response !== false){
    auxDirector = film.Director.toLowerCase()
    auxTitle = film.Title.toLowerCase()
  }else{
    alert('Sorry, your search did not match with any movies. Please, try again.')
  }

  if(auxDirector === director && auxTitle === title){
    postFilm(film)
  }else{
    alert('Sorry, your movie did not match with the director you submitted. Please, try again.')
  }
}

function postFilm(film){
  let div = document.createElement('div')
  let img = document.createElement('img')
  let addBtn = document.createElement('button')
  addBtn.innerHTML = "ADD TO DATABASE"
  img.src = film.Poster
  div.className = "images"
  img.className = 'posters'
  addBtn.className = 'addBtn'
  div.append(img, addBtn)
  main.appendChild(div)
  
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
        "countries": `${film.Country}`
  
        }),
      })
      .then(resp => resp.json())
      .then(resp => {
        parentDiv.id = resp.id

      })
}

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

    e.target.reset()
    
  })
}

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