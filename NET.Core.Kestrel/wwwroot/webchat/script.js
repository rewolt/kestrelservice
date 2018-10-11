﻿var connectionForm = document.getElementById("connectionForm");
var connectionUrl = document.getElementById("connectionUrl");
var connectButton = document.getElementById("connectButton");
var stateLabel = document.getElementById("stateLabel");
var sendMessage = document.getElementById("sendMessage");
var sendButton = document.getElementById("sendButton");
var sendForm = document.getElementById("sendForm");
var commsLog = document.getElementById("commsLog");
var socket;
var scheme = document.location.protocol === "https:" ? "wss" : "ws";
var port = document.location.port ? ":" + document.location.port : "";
connectionUrl.value = scheme + "://" + document.location.hostname + port + "/webchat/ws";

function updateState() {
    function disable() {
        sendMessage.disabled = true;
        sendButton.disabled = true;
        closeButton.disabled = true;
    }

    function enable() {
        sendMessage.disabled = false;
        sendButton.disabled = false;
        closeButton.disabled = false;
    }

    connectionUrl.disabled = true;
    connectButton.disabled = true;

    if (!socket) {
        disable();
    } else {
        switch (socket.readyState) {
            case WebSocket.CLOSED:
                stateLabel.innerHTML = "Closed";
                disable();
                connectionUrl.disabled = false;
                connectButton.disabled = false;
                break;
            case WebSocket.CLOSING:
                stateLabel.innerHTML = "Closing...";
                disable();
                break;
            case WebSocket.CONNECTING:
                stateLabel.innerHTML = "Connecting...";
                disable();
                break;
            case WebSocket.OPEN:
                stateLabel.innerHTML = "Open";
                enable();
                break;
            default:
                stateLabel.innerHTML = "Unknown WebSocket State: " + socket.readyState;
                disable();
                break;
        }
    }
}

closeButton.onclick = function () {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
        alert("socket not connected");
    }
    socket.close(1000, "Closing from client");
};

sendButton.onclick = function () {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
        alert("socket not connected");
    }
    var data = sendMessage.value;
    socket.send(data);
    commsLog.innerHTML +=
    '<tr>' +
        '<td class="commslog-client">Client</td>' +
        '<td class="commslog-server">Server</td>' +
        '<td class="commslog-data">' + data + '</td>' +
    '</tr>';
};

connectButton.onclick = function () {
    stateLabel.innerHTML = "Connecting";
    socket = new WebSocket(connectionUrl.value);
    socket.onopen = function (event) {
        updateState();
        commsLog.innerHTML += '<tr>' +
            '<td colspan="3" class="commslog-data">Connection opened</td>' +
            '</tr>';
    };

    socket.onclose = function (event) {
        updateState();
        commsLog.innerHTML += '<tr>' +
            '<td colspan="3" class="commslog-data">Connection closed. Code: ' + event.code + '. Reason: ' + event.reason + '</td>' +
            '</tr>';
    };

    socket.onerror = updateState;
    socket.onmessage = function (event) {
        commsLog.innerHTML +=
        '<tr>' +
            '<td class="commslog-server">Server</td>' +
            '<td class="commslog-client">Client</td>' +
            '<td class="commslog-data">' + event.data + '</td>' +
        '</tr>';
    };
};