DZ.init({
    appId  : '1',
    channelUrl : 'http://nikimusics/channel.html',
    player: {
        container: 'musicplayer',
        width : 1200,
        height : 150,
        playlist : true,
        onload : function(){
        }
    }
});

document.getElementById("playBtn").addEventListener("click", ()=>{
    //DZ.player.playTracks([136408148]);
    let artistPlayer = document.getElementById("artistPlayer");
    
    let request = new XMLHttpRequest();
    let url = "https://cors-anywhere.herokuapp.com/http://api.deezer.com/search?q=artist:'";
    if(artistPlayer.value != ""){
        url += artistPlayer.value + "'";
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



