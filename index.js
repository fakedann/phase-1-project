document.addEventListener("DOMContentLoaded", function() {
  let input = 'the irishman'
  let year = '2019'
  console.log(input+' '+year)


  fetch(`https://imdb-api.com/en/API/SearchMovie/k_652gzlhp/${input} ${year}`)
  .then(resp => resp.json() )
  .then(resp => handleSearch(resp.results))
  
});

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