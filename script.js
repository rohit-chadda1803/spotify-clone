console.log("js is working");

async function getsongs() {

    let a = await fetch("http://127.0.0.1:3000/songs/");

    let response = await a.text();

    console.log(response);

    let div = document.createElement("div")

    div.innerHTML = response;

    let as = div.getElementsByTagName("a");

    console.log("-----------as after it-------")
    console.log(as);

    let songs = [];

    for (let index = 0; index < as.length; index++) {
        const element = as[index];

        if (element.href.endsWith(".mp3") || element.href.endsWith(".aac")) {
            songs.push(element.href.split("/songs/")[1]) ; // a tag me https/local---/songs/song_name . // it give ["address before /song " , song_name] ; 
        }

    }
    return songs

}

async function main() {
    // get the list of  songs . 
    let songs = await getsongs()

    console.log('**********songs are : -------');

    console.log(songs);

    let songUL  = document.querySelector(".songList").getElementsByTagName("ul")[0] ; 

    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML+ `<li> ${song.replaceAll("%20"," ")} </li>` ; // in links %20 means space , so for humans replace it with space  . // replaceall - replace to all its occurances
    }

    // play the first song . 
    var audio = new Audio(songs[0]);
    
    //audio.play();// chrome prevents autoplay , so not work alone  //Uncaught (in promise) NotAllowedError: play() failed because the user didn't interact with the document first.

    audio.addEventListener("loadeddata", () => {
        console.log(audio.duration,audio.currentSrc , audio.currentTime)
        // The duration variable now holds the duration (in seconds) of the audio clip
      });
}

main();

