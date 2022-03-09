let form = document.createElement('form')
let header = document.querySelector('header')
let body = document.querySelector('body')
let section = document.createElement('section')
body.appendChild(section)
  
let btn = document.querySelector('.btn')
btn.addEventListener('click', function(){
  let summary = document.createElement('div')
  summary.className = 'summary'
  let p = document.createElement('p')
  p.innerHTML = "Search your favorite films down below."
  summary.appendChild(p)
  section.appendChild(summary)

    
  form.innerHTML = `<h4>Add New Film</h4>
  <label for="title">Title: </label>
  <input type="text" name="title" placeholder="The Irishman" id="new-film" />
  <label for="director">Director: </label>
  <input type="text" name="director" placeholder="Martin Scorsese" id="new-director" />
  <input type="submit" class="submitBtn" value="Fetch Film" />`
  body.appendChild(form)
  form.addEventListener('submit', startFetching)
}, {once : true})


function startFetching(e){
  e.preventDefault()
  let director = ''
  let title = ''
  if (e.target.director.value.trim() !== director){
    director = e.target.director.value.toLowerCase()
    title = e.target.title.value.toLowerCase()
    fetch(`https://imdb-api.com/en/API/SearchMovie/k_652gzlhp/${e.target.title.value}`)
    .then(resp => resp.json() )
    .then(resp => handleSearch(resp.results, director, title))
  }else{
    alert("Sorry, try being a little more specific when you type in the director!")
  }
  form.reset()
}

function handleSearch(findings, director, title){
  let hola = 0
  for(let i = 0; i < findings.length; i++){
    fetch(`https://imdb-api.com/en/API/Title/k_652gzlhp/${findings[i].id}`)
    .then(resp => resp.json() )
    .then(resp => {
      let aux1 = ''
      let aux2 = ''
      if ( resp.title !== null && resp.directors !== null){
        aux1 = resp.title.toLowerCase()
        aux2 = resp.directors.toLowerCase()
      }
      if(aux2 === director && title === aux1){
        postFilm(resp)
        hola = 1
      }
      // console.log(i)
      // if(i === findings.length-1 && hola === 0){
      //   throw 'Your input did not return any results. Please, try again.'
      // }
    } )
  }
  setTimeout(()=> {
    if(hola === 0){
      alert('Your input did not return any results. Please, try again.')
    }
  }, 2000)

}

function postFilm(film){
  let div = document.createElement('div')
  let img = document.createElement('img')
  let btn = document.createElement('button')
  btn.innerHTML = "Add Comment"
  img.src = film.image
  div.className = "images"
  img.className = 'posters'
  btn.className = 'addBtn'
  div.append(img, btn)
  body.appendChild(div)

  btn.addEventListener('click', function(){
    let commentSect = document.createElement('form')
    commentSect.className = "formComment"
    commentSect.innerHTML = `<input type="text" class="commentText" name="comment" placeholder="Type your comment"/>
    <input type="submit" class="commentBtn" value="Submit" />`
    commentSect.className = "comment"
    div.appendChild(commentSect)
    btn.remove()

    commentSect.addEventListener('submit', function(e){
      e.preventDefault()
      fetch(`http://localhost:3000/posts/${div.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        'comments': `${e.target.comment.value}`
        }),
      })

    commentSect.reset()
      
    })

  }, {once : true})

  img.addEventListener('mouseover', () => img.className = img.className+" mouseOver")
  img.addEventListener('mouseout', () => img.className ="posters")


  fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        'title': `${film.title}`,
        'directors': `${film.directors}`,
        "genres": `${film.genres}`,
        "runtime": `${film.runtimeMins}`,
        "countries": `${film.countries}`
  
        }),
      })
      .then(resp => resp.json())
      .then(resp => {
        div.id = resp.id
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