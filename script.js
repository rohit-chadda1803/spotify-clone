console.log("js is working") ; 

async function main() {
    
    let a = await fetch("http://127.0.0.1:3000/songs/") ;  

    let response = await a.text() ; 

    console.log(response) ; 

    let div = document.createElement("div")

    div.innerHTML = response ; 

    let tds = div.getElementsByTagName("td") ; 

    console.log("-----------tds after it-------")
    console.log(tds)
}

main()