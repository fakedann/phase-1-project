let form = document.createElement('form')
let main = document.createElement('main')

document.addEventListener("DOMContentLoaded", function() {
  const body = document.querySelector('body')
  
  const btn = document.querySelector('.btn')
  btn.addEventListener('click', function(){
    const summary = document.createElement('div')
    summary.className = 'summary'
    let p = document.createElement('p')
    p.innerHTML = "Search your favorite films down below."
    summary.appendChild(p)
    body.appendChild(summary)

    body.appendChild(main)
    form.innerHTML = `<h4>Add New Film</h4>
    <label for="title">Title: </label>
    <input type="text" name="title" placeholder="The Irishman" id="new-film" />
    <label for="director">Director: </label>
    <input type="text" name="director" placeholder="Martin Scorsese" id="new-director" />
    <input type="submit" class="submitBtn" value="Create" />`
    form.addEventListener('submit', startFetching)
    main.appendChild(form)
  }, {once : true})
});

function startFetching(e){
  e.preventDefault()
  let director = ''
  if (e.target.director.value !== null){
    director = e.target.director.value.toLowerCase()
  }
  
  fetch(`https://imdb-api.com/en/API/SearchMovie/k_652gzlhp/${e.target.title.value}`)
  .then(resp => resp.json() )
  .then(resp => handleSearch(resp.results, director))
  form.reset()
}

function handleSearch(findings, director){
  console.log(findings)
  if(findings.length === 0){
    console.log('sorry')
  }
  for(let each of findings){
    fetch(`https://imdb-api.com/en/API/Title/k_652gzlhp/${each.id}`)
    .then(resp => resp.json() )
    .then(resp => {
      console.log(resp)
      let aux = ''
      if ( resp.directors !== null ){
        aux = resp.directors.toLowerCase()
      }
      if(aux === director){
        console.log(`this one got included: ${resp}`)
        postFilm(resp)
      }
    } )
  }

}

function postFilm(film){
  let img = document.createElement('img')
  img.src = film.image
  img.className = 'posters'
  main.appendChild(img)
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
    .then( resp => resp.json() )
    .then( film => console.log(film) )
}

function deleteObj(id){
  fetch(`http://localhost:3000/posts/${id}`, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json"
  }
})
.then(res => res.json())
.then( obj => console.log(obj))
}