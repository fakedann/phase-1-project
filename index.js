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

    const main = document.createElement('main')
    body.appendChild(main)
    let form = document.createElement('form')
    form.innerHTML = `<h4>Add New Film</h4>
    <label for="title">Title: </label>
    <input type="text" name="title" id="new-film" />
    <label for="director">Director: </label>
    <input type="text" name="director" id="new-director" />
    <input type="submit" value="Create" />`
    main.appendChild(form)
  }, {once : true})
  
});

function startFetching(){
  let input = 'the irishman'
  let year = '2019'
  console.log(input+' '+year)
  fetch(`https://imdb-api.com/en/API/SearchMovie/k_652gzlhp/${input} ${year}`)
  .then(resp => resp.json() )
  .then(resp => handleSearch(resp.results))
}

function handleSearch(findings){
  console.log(findings)
  if(findings.length === 0){
    console.log('sorry')
  }
  for(let each of findings){
    fetch(`https://imdb-api.com/en/API/Title/k_652gzlhp/${each.id}`)
    .then(resp => resp.json() )
    .then(resp => {
      if(resp.directors === 'Martin Scorsese'){
        console.log('success!')
        postFilm(resp)
      }
    } )
  }

}

function postFilm(film){
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