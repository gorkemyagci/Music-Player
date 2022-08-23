const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const play = document.querySelector("#controls #play");
const prev = document.querySelector("#controls #prev");
const next = document.querySelector("#controls #next");
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const ul = document.querySelector('ul');
const volumeBar = document.querySelector("#volume-bar");

const player = new MusicPlayer(musicList);

window.addEventListener("load", () => {
    let music = player.getMusic();
    displayMusic(music);
    displayMusicList(musicList);
    isPlayingMusic();
});

function displayMusic(music) {
    title.innerText = music.getName();
    image.src = "img/" + music.img;
    audio.src = "mp3/" + music.file;
}

play.addEventListener("click", () => {
    const isMusicPlay = container.classList.contains("playing");
    isMusicPlay ? pauseMusic() : playMusic();
});

prev.addEventListener("click", () => { prevMusic(); });

next.addEventListener("click", () => { nextMusic(); });

const prevMusic = () => {
    player.prev();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingMusic();
}

const nextMusic = () => {
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingMusic();
}

const pauseMusic = () => {
    container.classList.remove("playing");
    play.querySelector("i").classList = "fa-solid fa-play";
    audio.pause();
}

const playMusic = () => {
    container.classList.add("playing");
    play.querySelector("i").classList = "fa-solid fa-pause";
    audio.play();
}

const calculateTime = (toplamSaniye) => {
    const dakika = Math.floor(toplamSaniye / 60);
    const saniye = Math.floor(toplamSaniye % 60);
    const guncellenenSaniye = saniye < 10 ? `0${saniye}`: `${saniye}`;
    const sonuc = `${dakika}:${guncellenenSaniye}`;
    return sonuc;
}

audio.addEventListener("loadedmetadata", () => {
    duration.textContent = calculateTime(audio.duration);
    progressBar.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.textContent = calculateTime(progressBar.value);
});

progressBar.addEventListener("input", () => {
    currentTime.textContent = calculateTime(progressBar.value);
    audio.currentTime = progressBar.value;
});

let sesDurumu = "sesli";

volumeBar.addEventListener("input", (e) => {
    const value = e.target.value;
    audio.volume = value / 100;
    if(value == 0) {
        audio.muted = true;
        sesDurumu = "sessiz";
        volume.classList = "fa-solid fa-volume-xmark";
    } else {
        audio.muted = false;
        sesDurumu = "sesli";
        volume.classList = "fa-solid fa-volume-high";
    }
});

volume.addEventListener("click", () => {
    if(sesDurumu==="sesli") {
        audio.muted = true;
        sesDurumu = "sessiz";
        volume.classList = "fa-solid fa-volume-xmark";
        volumeBar.value = 0;
    } else {
        audio.muted = false;
        sesDurumu = "sesli";
        volume.classList = "fa-solid fa-volume-high";
        volumeBar.value = 100;
    }
});

const displayMusicList = (list) => {
    for(let i = 0; i < list.length; i++){
        let html = "";
        html = `
        
        <li li-index='${i}' onClick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center">
        <span>${list[i].getName()}</span>
        <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
        <audio class="music-${i}" src="mp3/${list[i].file}"></audio>
        </li>
        
        `
        document.querySelector('ul').insertAdjacentHTML('beforeend',html);

        let liAudioDuration = document.querySelector(`#music-${i}`);
        let liAudioTag = document.querySelector(`.music-${i}`);

        liAudioTag.addEventListener('loadeddata', () => {
          liAudioDuration.innerText = calculateTime(liAudioTag.duration);
        })

    }
}

const selectedMusic = (li) => {
    player.index = li.getAttribute('li-index');   
    displayMusic(player.getMusic());
    playMusic();
    isPlayingMusic();
}

const isPlayingMusic = () => {
    for(let li of ul.querySelectorAll('li')){
        if(li.classList.contains('playing')){
            li.classList.remove('playing');
        }
        if(li.getAttribute('li-index') == player.index){
            li.classList.add('playing');
        }
    }
}

audio.addEventListener('ended', () => {
    nextMusic();
})