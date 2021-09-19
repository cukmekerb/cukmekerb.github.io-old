var lastv;
function init() {
    fetch("https://lstnr.gq/.netlify/functions/rss-to-json?url=https%3A%2F%2Fwww.youtube.com%2Ffeeds%2Fvideos.xml%3Fchannel_id%3DUCzSlF1euionqDthloMy2R-Q")
        .then(a => a.json())
        .then(response => {
            response = response.items;
            for (let i = 0; i < 15; i++) {
                response[i].thumbnail = `https://i.ytimg.com/vi/${response[i].id.replace("yt:video:","")}/mqdefault.jpg`;
                let current_video = document.getElementById("video-$$INDEX%%").outerHTML;
								current_video = current_video.replace("$$VURL%%", "https:\/\/youtu.be/" + response[i].id.replace("yt:video:",""))
                current_video = current_video.replace(" hidden", "");
                current_video = current_video.replace("$$THUM%%", response[i].thumbnail);
                current_video = current_video.replace("$$INDEX%%", i);
                current_video = current_video.replace("$$TITLE%%", response[i].title.replace(/^(.{29}[^\s]*).*/, "$1"));
                if (response[i].description.length > 45) {
                    current_video = current_video.replace("$$DESK%%", response[i].description.slice(0, 45) + "...");
                }
                else {
                    current_video = current_video.replace("$$DESK%%", response[i].description);
                }
                document.getElementById("videos-div").innerHTML += current_video;
                lastv = i;
            }
        });
}

window.onscroll = () => {
    if (window.pageYOffset >= document.getElementById("header").offsetTop + 0.3) {
        document.getElementById("header").classList.add("stuck");
    }
    else {
        document.getElementById("header").classList.remove("stuck");
    }
};
