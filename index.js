var whathasbeenloaded;
var lastv;
function init() {
    fetch("https://script.google.com/macros/s/AKfycbxTc2Q_7vmOB-KAB_R3f4f8cNTKbYUvewxsMThc9v2Zt66LzTCxeGkd/exec")
        .then(a => a.json())
        .then(response => {
            whathasbeenloaded = response;
            for (var i = 0; i < 15; i++) {
                var current_video = document.getElementById("video-$$INDEX%%").outerHTML;
                current_video = current_video.replace("$$VURL", "https:\/\/youtu.be/" + response[i].id)
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
        })
}
function loadmore() {
    var clv = lastv;
    for (var i = clv + 1; i < clv + 15; i++) {
        var current_video = document.getElementById("video-$$INDEX%%").outerHTML;
        current_video = current_video.replace("$$VURL", "https:\/\/youtu.be/" + whathasbeenloaded[i].id)
        current_video = current_video.replace(" hidden", "");
        current_video = current_video.replace("$$THUM%%", whathasbeenloaded[i].thumbnail);
        current_video = current_video.replace("$$INDEX%%", i);
        current_video = current_video.replace("$$TITLE%%", whathasbeenloaded[i].title.replace(/^(.{29}[^\s]*).*/, "$1"))
        if (whathasbeenloaded[i].description.length > 45) {
            current_video = current_video.replace("$$DESK%%", whathasbeenloaded[i].description.slice(0, 45) + "...")
        }
        else {
            current_video = current_video.replace("$$DESK%%", whathasbeenloaded[i].description);
        }
        document.getElementById("videos-div").innerHTML += current_video;
        lastv = i;
    }
}