class Music {
    constructor(title, singer, img, file){
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.file = file;
    }
    getName() {
        return this.title + " - " + this.singer;
    }
}

const musicList = [
    new Music("Gimme gimme", "Nuriye Teyze", '1.jpeg', '1.mp3'),
    new Music("Başarcam Ulan", "Görkem", '2.jpeg', '3.mp3'),
    new Music("Gangsta's Paradise", "Coolio", '3.jpeg', '2.mp3')
];