document.addEventListener('DOMContentLoaded', initPlayer);
function initPlayer() {
DZ.init({
    appId  : '1',
    channelUrl : 'http://nikimusics/channel.html',
    player: {
        container: 'musicplayer',
        width : 500,
        height : 500,
        format: 'square',
        playlist : true,
        onload : function(){
        }
    }
});
}

document.getElementById("playBtn").addEventListener("click", ()=>{
    let artistPlayer = document.getElementById("artistPlayer");
    let trackPlayer = document.getElementById("trackPlayer");
    let request = new XMLHttpRequest();
    let url = "https://cors-anywhere.herokuapp.com/http://api.deezer.com/search?q=artist:'";
    if(trackPlayer.value != "" && artistPlayer.value != "") {
        url += artistPlayer.value + "'" + "track:'" + trackPlayer.value + "'";
      }
      else if (artistPlayer.value != "") {
          url += artistPlayer.value + "'";
      }
      else if (trackPlayer.value != "") {
          url += "'" + "track:'" + trackPlayer.value + "'";
      }
    
    console.log(url);
    request.open('GET', url); 
    request.addEventListener("readystatechange", () => {
    if (request.readyState === 4 && request.status === 200) {  
        let array = JSON.parse(request.responseText);
        if(typeof array.data[0] != "undefined"){
            DZ.player.playTracks([array.data[0].id]);
        }
        else{
            alert("По вашему запросу ничего не найдено");
        }
    }
});
request.send();  
   
});

document.getElementById("artistPlayer").style.backgroundColor = "blue";
document.getElementById("artistPlayer").style.color = "white";
document.getElementById("trackPlayer").style.backgroundColor = "blue";
document.getElementById("trackPlayer").style.color = "white";
document.getElementById("playBtn").style.fontSize = "20px";


