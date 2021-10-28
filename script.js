const fullScreen = document.querySelector(".full-screen");
const videoConteiner = document.querySelector(".conteiner");
const video = document.querySelector(".video");
const innerVolumeRange = document.querySelector(".inner-volume-range")
const playPauseBtn = document.querySelector(".play-pause-btn");
const innerBar = document.querySelector(".inner-bar");
console.dir(video);
const curretnVideoDuration = document.querySelector(".curent-duration");
const totalVideoDuration = document.querySelector(".total-duration");
const toBeggining = document.querySelector(".toBegining");
const skipButtons = document.querySelectorAll("[data-skip]");
const volumeSlider = document.querySelector(".volume-slider");
console.log(skipButtons)
const volumConteiner = document.querySelector(".volume");
const volumeImg = volumConteiner.querySelector(".fa-volume-up");
console.log(volumeImg)
const progresBar = document.querySelector(".progres-bar");
 let progressBarWidth = progresBar.clientWidth;
 const currentPlaybackRate = document.querySelector(".curent-playBackRate");

 const playbackRates = document.querySelectorAll("[data-playbackRate]");
 console.log(playbackRates)

let timer = null;
/*kada zelimo da zavrsimo u stvari treba da pauziramo video i da namestimo video.currentTime = 0 */

console.log(playPauseBtn);
console.log(fullScreen);

// function getFullScreenElement(){
//     return document.fullscreenElement   
//         || document.webkitFullscreenElement
//         || document.mozFullscreenElement
//         || document.msFullscreenElement
// }

// function toggleFullScreen(){
//     if(getFullScreenElement()){
//         document.exitFullscreen();
//     }
//     else{
//       videoConteiner.requestFullscreen().catch((e)=>{
//             console.log(e)
//         })
//     }
// }

// fullScreen.addEventListener("click",toggleFullScreen);
fullScreen.addEventListener("click",toggleFullScreen)

function toggleFullScreen(){
   if (video.requestFullscreen){
       video.requestFullscreen()
   } else if(video.webkitRequestFullScreen){
       video.webkitRequestFullScreen()
   } else if(video.mozRequestFullScreen){
       video.mozRequestFullScreen()
   }
}

function togglePlayPause(){
    if(video.paused){
        // playPauseBtn.innerHTML = `<i class="far fa-pause-circle"></i>`;
        video.play();
        timer=setInterval(updateTime,100);
    }
    else if(!video.paused){
        // playPauseBtn.innerHTML = `<i class="far fa-play-circle">`;
        video.pause();
    }
}

video.addEventListener("play",function(){
  playPauseBtn.innerHTML = `<i class="far fa-pause-circle"></i>`;
})
video.addEventListener("pause",function(){
  playPauseBtn.innerHTML = `<i class="far fa-play-circle">`;
})
video.addEventListener("click",togglePlayPause);

playPauseBtn.addEventListener("click",togglePlayPause)

video.addEventListener("timeupdate",function(){
    let innerBarPos = video.currentTime / video.duration;
    innerBar.style.width = `${innerBarPos*100}%`
    if(video.ended){
         playPauseBtn.innerHTML = `<i class="far fa-play-circle">`;
    }
})

function secondsToTime(time){
     let hour = ~~(time/3600);
     let min = ~~((time%3600)/60);
     let sec = time%60;
     let sec_min = "";
     if(hour>0){
         sec_min += "" + hour + ":" + (min<10 ? "0":"");
     }
     sec_min += "" + min + ":" + (sec < 10 ? "0" : "");
     sec_min += "" + Math.round(sec);
     return sec_min;
}

function updateTime(){
    curretnVideoDuration.innerHTML = `Time: ${secondsToTime(video.currentTime)}`;
    totalVideoDuration.innerHTML = `Total: ${secondsToTime(video.duration)}`
}

toBeggining.addEventListener("click",function(){
    clearInterval(timer);
     curretnVideoDuration.innerHTML = `Time:00:00`;
     video.pause();
     video.currentTime =0;

});

function skip(){
   console.log(this.dataset.skip)
   video.currentTime += parseFloat(this.dataset.skip);
}

 skipButtons.forEach((button) => {
   button.addEventListener("click", skip);
 });


 

//   volumeSlider.addEventListener("mousemove", handelRangeUpdate);
  //ovaj event ne radi
//ako nije mutirano onda je false
  function muteUnmute(){
        console.log(this)
        if(video.muted){
            video.muted =false;
           this.className = "fas fa-volume-up";
           volumeSlider.value = 100;
           
        } else {
            this.className = "fas fa-volume-mute";
           
              video.muted = true;
              volumeSlider.value = 1;
        }
  }

  volumeImg.addEventListener("click",muteUnmute)


  function setVolume() {
    console.log(this.value);
   video.volume = volumeSlider.value/100
    
  }

  volumeSlider.addEventListener("change", setVolume);

 
//   const conteinerwidht = progresBar.widht;
  console.dir(progresBar)
  progresBar.addEventListener("click",function(e){
       let clickPosition = e.clientX - this.getBoundingClientRect().left;
       let percentage = ((clickPosition / progressBarWidth) * 100).toFixed(2);
        innerBar.style.width = `${percentage}%`;
        //treba i da postavimo video 
        //imamo da je to procenat
        video.currentTime = (video.duration*percentage)/100;
  })

  playbackRates.forEach(playback =>{
      playback.addEventListener("click",function(e){
            let currentRate = e.currentTarget.dataset.playbackrate;
            video.playbackRate = currentRate;
            currentPlaybackRate.innerHTML = currentRate;

      })
  })

 