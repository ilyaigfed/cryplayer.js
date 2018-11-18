class CryPlayer {
    constructor(current_tracks) {
        this.generate();
        this.track_array = this.createPlaylist(current_tracks);
        this.current_track = this.track_array[0];
        this.play_track = document.getElementById("play_track");
        this.pause_track = document.getElementById("pause_track");
        this.stop_track = document.getElementById("stop_track");
        this.current_time_track = document.getElementById("current_time_track");
        this.volume_on = document.getElementById("volume_on");
        this.volume_off = document.getElementById("volume_off");
        this.long_track = document.getElementById("long_track");
        this.long_count_track = document.getElementById("long_count_track");
        this.name_track = document.getElementById("name_track");
        this.prev_track = document.getElementById("prev_track");
        this.next_track = document.getElementById("next_track");
        this.image_track = document.getElementById("image_track");
        this.initialize();
    }

    createPlaylist(current_tracks) {
        let track_array = [];
        for(let i = 0; i < current_tracks.length; i++) {
            track_array[i] = new Audio();
            track_array[i].src = current_tracks[i].path;
            track_array[i].author = current_tracks[i].author;
            track_array[i].name = current_tracks[i].name;
            track_array[i].image = current_tracks[i].image;
            track_array[i].position = i;
        }
        return track_array;
    }

    pickUpTrack() {
        this.next_track.onclick = () => {
            if(this.current_track.position < this.track_array.length - 1) {
                this.stopTrack();
                this.current_track = this.track_array[this.current_track.position + 1];
                this.playTrack();
            }
        };
        this.prev_track.onclick = () => {
            if(this.current_track.position > 0) {
                this.stopTrack();
                this.current_track = this.track_array[this.current_track.position + -1];
                this.playTrack();
            }
        };
    }

    playTrack() {
        this.current_track.play();
        this.play_track.style.display = "none";
        this.pause_track.style.display = "inline";
        this.name_track.innerText = this.current_track.author + " - " + this.current_track.name;
        if(this.current_track.image !== "") {
            this.image_track.style.background = "url('" + this.current_track.image + "') center";
            this.image_track.style.backgroundSize = "cover";
        } else {
            this.image_track.style.background = "";
            this.image_track.style.backgroundSize = "";
        }
        setInterval(() => {
            this.current_time_track.innerText = this.currentTimeAsText();
            this.currentTrackLong();
        }, 1);
    }

    pauseTrack() {
        this.current_track.pause();
        this.play_track.style.display = "inline";
        this.pause_track.style.display = "none";
    }

    stopTrack() {
        this.current_track.pause();
        this.current_track.currentTime = 0.0;
        this.play_track.style.display = "inline";
        this.pause_track.style.display = "none";
    }

    volumeOff() {
        this.current_track.muted = true;
        this.volume_off.style.display = "none";
        this.volume_on.style.display = "inline";
    }

    volumeOn() {
        this.current_track.muted = false;
        this.volume_off.style.display = "inline";
        this.volume_on.style.display = "none";
    }

    currentTimeAsText() {
        let c_time = this.current_track.currentTime.toFixed(0);
        let min = Math.trunc(c_time/60);
        let sec = c_time%60;

        if(min < 10) min = "0"+min;
        if(sec < 10) sec = "0"+sec;

        return min+":"+sec;
    }

    currentTrackLong() {
        let time = this.current_track.duration.toFixed(0),
            c_time = this.current_track.currentTime.toFixed(0),
            result = c_time/time*100;

        this.long_count_track.style.width = result+"%";
    }

    changeTrackTime(pos) {
        let time = this.current_track.duration.toFixed(0);
        let counter_one_p = getComputedStyle(this.long_track).width;
        let long = counter_one_p.substr(0, counter_one_p.length - 2);
        let part = time / long;
        this.current_track.currentTime = part * pos;
    }

    open() {
        this.playTrack();
        this.stopTrack();
    }

    generate() {
        document.getElementById("cry_player").innerHTML = "<div class=\"cry-player-wrapper\">\n" +
            "            <div class=\"cp-about-track\">\n" +
            "                <span id=\"image_track\"></span>\n" +
            "                <span id=\"name_track\"></span>\n" +
            "            </div>\n" +
            "            <div class=\"cp-options\">\n" +
            "                <div class=\"cp-options-list\">\n" +
            "                    <span id=\"prev_track\" class=\"fas fa-step-backward\"></span>\n" +
            "                    <span id=\"play_track\" class=\"fas fa-play\"></span>\n" +
            "                    <span id=\"pause_track\" class=\"fas fa-pause\"></span>\n" +
            "                    <span id=\"next_track\" class=\"fas fa-step-forward\"></span>\n" +
            "                </div>\n" +
            "                <span id=\"stop_track\" class=\"fas fa-stop\"></span>\n" +
            "                <span id=\"repeat_track\" class=\"fas fa-redo-alt\" style=\"display: none;\"></span>\n" +
            "                <span id=\"volume_off\" class=\"fas fa-volume-up\"></span>\n" +
            "                <span id=\"volume_on\" class=\"fas fa-volume-up\"></span>\n" +
            "            </div>\n" +
            "            <div class=\"cp-time-block\">\n" +
            "                <span id=\"current_time_track\">00:00</span>\n" +
            "                <div id=\"long_track\">\n" +
            "                    <div id=\"long_count_track\"></div>\n" +
            "                </div>\n" +
            "                <span id=\"count_time_track\">03:00</span>\n" +
            "            </div>\n" +
            "        </div>";
    }

    initialize() {
        this.play_track.onclick = () => {
            this.playTrack();
        };
        this.pause_track.onclick = () => {
            this.pauseTrack();
        };
        this.stop_track.onclick = () => {
            this.stopTrack();
        };
        this.current_track.onended = () => {
            console.log("[track is ended]");
            if(this.current_track.position < this.track_array.length - 1) {
                this.stopTrack();
                this.current_track = this.track_array[this.current_track.position + 1];
                this.playTrack();
            }
        };
        this.volume_off.onclick = () => {
            this.volumeOff();
        };
        this.volume_on.onclick = () => {
            this.volumeOn();
        };
        this.long_track.onclick = (e) => {
            this.changeTrackTime(e.offsetX);
        };
        this.pickUpTrack();
        this.open();
    }
}