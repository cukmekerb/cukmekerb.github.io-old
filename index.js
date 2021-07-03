var lastv;
function init() {
    fetch("https://lstnr.gq/.netlify/functions/rss-to-json?url=https://odysee.com/$/rss/@cukmekerb/19ec35dcb324ee80b86acbee9cf2c613546f6ad6")
        .then(a => a.json())
        .then(response => {
            response = response.items;
            for (var i = 0; i < 15; i++) {
                response[i].thumbnail = response[i].enclosures[0].url;
                var current_video = document.getElementById("video-$$INDEX%%").outerHTML;
                current_video = current_video.replace("$$VURL%%",  response[i].url)
                current_video = current_video.replace(" hidden", "");
                current_video = current_video.replace("$$THUM%%", response[i].thumbnail);
                current_video = current_video.replace("$$INDEX%%", i);
                current_video = current_video.replace("$$TITLE%%", response[i].title.replace(/^(.{29}[^\s]*).*/, "$1"))
                if (response[i].description.length > 45) {
                    current_video = current_video.replace("$$DESK%%", response[i].description.slice(0, 45) + "...")
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
    if(window.pageYOffset >= document.getElementById("header").offsetTop +0.3) {
        document.getElementById("header").classList.add("stuck");
    }
    else {
        document.getElementById("header").classList.remove("stuck");
    }
};
