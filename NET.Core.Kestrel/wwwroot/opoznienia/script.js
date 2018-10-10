var textbox = document.getElementById("textbox");
var numbox = document.getElementById("numberbox");
var label = document.getElementById("out");
var btn = document.getElementById("btn");
var delayTime = 1000;
var delayedFun;

(function initDelay() {
    numbox.value = delayTime;
})();

function setDelay() {
    delayTime = numbox.value;
}

function textChanged() {
    btn.disabled = true;
    numbox.disabled = true;
    clearTimeout(delayedFun);
    delayedFun = setTimeout(() => { backToNormal(); }, delayTime);
}

function backToNormal() {
    btn.disabled = false;
    numbox.disabled = false;
    label.innerHTML = "<h1>" + textbox.value + "</h1>";
}
