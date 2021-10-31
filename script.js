const fullScreen = document.querySelector(".full-screen");
const videoConteiner = document.querySelector(".conteiner");
const video = document.querySelector(".video");
const innerVolumeRange = document.querySelector(".inner-volume-range")
const playPauseBtn = document.querySelector(".play-pause-btn");
const innerBar = document.querySelector(".inner-bar");
const curretnVideoDuration = document.querySelector(".curent-duration");
const totalVideoDuration = document.querySelector(".total-duration");
const toBeggining = document.querySelector(".toBegining");
const skipButtons = document.querySelectorAll("[data-skip]");
const volumConteiner = document.querySelector(".volume");
const volumeImg = volumConteiner.querySelector(".fa-volume-up");
const progresBar = document.querySelector(".progres-bar");
let progressBarWidth = progresBar.clientWidth;
const currentPlaybackRate = document.querySelector(".curent-playBackRate");
 const playbackRates = document.querySelectorAll("[data-playbackRate]");
 const controls = document.querySelector(".controls");
 const inputSlider = document.querySelector(".my-slider");
 const toEnd = document.querySelector(".toEnd");

let timer = null;


function getFullScreenElement(){
   
    return document.fullscreenElement   
        || document.webkitFullscreenElement
        || document.mozFullscreenElement
        || document.msFullscreenElement

}

function toggleFullScreen(){
    if(getFullScreenElement()){
        document.exitFullscreen();
    }
    else{
      videoConteiner.requestFullscreen().catch((e)=>{
            console.log(e)
        })
    }
}

fullScreen.addEventListener("click",toggleFullScreen);

document.addEventListener("fullscreenchange",function(){
  
    if (document.fullscreenElement){
            controls.style.transform = 'translateY(100%) translateY(-6px)';  
    }
    else{
         controls.style.transform = "translateY(0%)";
    }
});

function togglePlayPause(){

    if(video.paused){
        video.play();
        timer=setInterval(updateTime,100);
    }
    else if(!video.paused){
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
    curretnVideoDuration.innerHTML = `${secondsToTime(video.currentTime)}`;
    totalVideoDuration.innerHTML = `/ ${secondsToTime(video.duration)}`
}

toBeggining.addEventListener("click",function(){
     video.currentTime =0;
     updateTime();
     

});
toEnd.addEventListener("click",function(){
  video.currentTime = video.duration;
  video.pause();
})


function skip(){
   video.currentTime += parseFloat(this.dataset.skip);
}

 skipButtons.forEach((button) => {
   button.addEventListener("click", skip);
 });


  function muteUnmute(){
        if(video.muted){
            video.muted =false;
           this.className = "fas fa-volume-up";
           inputSlider.value = 50;
            slider();
        } else {
            this.className = "fas fa-volume-mute";
              video.muted = true;
              inputSlider.value = 1;
               slider();
        }
  }

  volumeImg.addEventListener("click",muteUnmute)

  function setVolume() {
   video.volume = inputSlider.value/100;
  }

  progresBar.addEventListener("click",function(e){
       let clickPosition = e.clientX - this.getBoundingClientRect().left;
       let percentage = ((clickPosition / progressBarWidth) * 100).toFixed(2);
        innerBar.style.width = `${percentage}%`;
        video.currentTime = (video.duration*percentage)/100;
  })

  playbackRates.forEach(playback =>{
      playback.addEventListener("click",function(e){
            let currentRate = e.currentTarget.dataset.playbackrate;
            video.playbackRate = currentRate;
            currentPlaybackRate.innerHTML = currentRate;

      })
  })

  inputSlider.addEventListener("input",slider)

   const mySlider = document.querySelector(".my-slider");
  

   function slider() {
     valPercent = (mySlider.value / mySlider.max) * 100;
     mySlider.style.background = `linear-gradient(to right, #3baea0 ${valPercent}%, rgba(0,0,0,0.3) ${valPercent}%)`;
    video.volume = inputSlider.value / 100;
   }

   slider();