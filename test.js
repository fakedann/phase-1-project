async function handleSearch(findings, director){
  
  const prom = await test(findings, director)
  console.log(prom)
  if (prom !== 1){
    alert("Sorry, nothing turned out from your search. Try again!")
  }
  // setTimeout(function(){
  //   if (flag === 0){
  //     alert("Sorry, nothing turned out from your search. Try again!")
  //   }
  // }, 1500)

}

async function test(findings, director){
  let hola = 0
  for(let each of findings){
    fetch(`https://imdb-api.com/en/API/Title/k_652gzlhp/${each.id}`)
    .then(resp => resp.json() )
    .then(resp => {
      let aux = ''
      if ( resp.directors !== null ){
        aux = resp.directors.toLowerCase()
      }
      if(aux === director){
        postFilm(resp)
        hola = 1
        return hola
        
      }
    } )
  }
}