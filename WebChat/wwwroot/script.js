var time = document.getElementById("time");
time.innerHTML = Date();

var refreshFunc = setInterval(function () { setTime(); }, 1000);

function setTime() {
    time.innerHTML = Date();
}

function goToWebChat() {
    var webChatUrl = document.location.hostname + '/webchat';
    window.location = webChatUrl;
}


