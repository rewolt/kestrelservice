
var time = document.getElementById("time");
time.innerHTML = Date();

var refreshFunc = setInterval(function () { setTime(); }, 1000);
function setTime() {
    time.innerHTML = Date();
}

var xhttp = new XMLHttpRequest();
var scheme = document.location.protocol;
var port = document.location.port ? ":" + document.location.port : "";
var baseUrl = scheme + "//" + document.location.hostname + port;

xhttp.open("GET", baseUrl + "/api/project", true);
xhttp.onreadystatechange = function (ev) {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
        handleResponse(xhttp.responseText);
    }
};
xhttp.send();

function handleResponse(response) {
    var jsonResp = JSON.parse(response);
    var container = document.getElementById("button_container");
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    for (var project of jsonResp) {
        var button = document.createElement("button");
        button.className = "button";
        button.value = project;
        button.id = "button_" + project;
        button.onclick = function () { goToProject(button.value); };
        button.innerHTML = "<span>" + project + "</span>";
        container.appendChild(button);
    }
}

function goToProject(projectName) {
    window.location = baseUrl + "/" + projectName;
}
