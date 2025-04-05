console.log("js is working");
let currSong = new Audio(); // current song me ek time pr ek hi gaana aur yhi hr jgh chl rha h . 

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
            songs.push(element.href.split("/songs/")[1]); // a tag me https/local---/songs/song_name . // it give ["address before /song " , song_name] ; 
        }

    }
    return songs

}

const playTrack = (track)=>{
    //let audio = new Audio("/songs/"+track) ;// hr baar new audio for that song aur vo pay , agr isse phle koi song to vo hi chlta rhega . 
    //audio.play() ;  

    currSong.src = "/songs/"+track ; 
    currSong.play() ; 
}




async function main() {
    // get the list of  songs . 

   
    
    let songs = await getsongs()

    console.log('**********songs are : -------');

    console.log(songs);

    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
    
    // show all the songs in playlist . 
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `
                        <li>
                            <img src="music.svg" alt="" class="invert">
                            <div class="info">
                                <div class="songnamebox">${song.replaceAll("%20", " ")} </div>
                                <div>Song artist</div>
                            </div>

                            <div class="playnow">
                                <span>Play Now</span>
                                <img src="play.svg" class="invert" alt="">
                            </div>

                        </li>
       ` ; // in links %20 means space , so for humans replace it with space  . // replaceall - replace to all its occurances


    }

    // attach an event listner to each song . 
    console.log("******************* add event listner **************")
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        // console.log(e) ;  // to see what i got in console. 

        e.addEventListener("click",()=>{
            console.log(e.querySelector(".info").firstElementChild.innerHTML);
        
            playTrack(e.querySelector(".info").firstElementChild.innerHTML.trim())  ; // trim remove spaces aage-peeche se. 
    
        })     
    });


    // play the first song . 
    var audio = new Audio(songs[0]);

    //audio.play();// chrome prevents autoplay , so not work alone  //Uncaught (in promise) NotAllowedError: play() failed because the user didn't interact with the document first.

    audio.addEventListener("loadeddata", () => {
        console.log(audio.duration, audio.currentSrc, audio.currentTime)
        // The duration variable now holds the duration (in seconds) of the audio clip
    });
}

main();
