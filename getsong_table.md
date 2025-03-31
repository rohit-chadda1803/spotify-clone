- songs in dongs folder - accesible by : http://127.0.0.1:3000/songs/

// then from it i fetched sons using 

```
// script.js
async function main() {
    
    let a = await fetch("http://127.0.0.1:3000/songs/") ;  

    let response = await a.text() ; 

    console.log(response) ; 

    let div = document.createElement("div")

    div.innerHTML = response ; 

    let tds = div.getElementsByTagName("td") ; 

    console.log(tds)
}

```


Stoppped at 1:35:19