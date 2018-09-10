"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("superagent");
const ENDPOINT = process.env.GAME_SERVER_URL ||
    `${window.location.protocol}//${window.location.host}`;
function fetchRoomList() {
    return http.get(`${ENDPOINT}/colyseus/api`).
        accept('application/json');
}
exports.fetchRoomList = fetchRoomList;
function fetchRoomData(roomId) {
    return http.get(`${ENDPOINT}/colyseus/api/room`).
        query({ roomId }).
        accept('application/json');
}
exports.fetchRoomData = fetchRoomData;
function remoteRoomCall(roomId, method, ...args) {
    return http.get(`${ENDPOINT}/colyseus/api/room/call`).
        query({ roomId, method, args: JSON.stringify(args) }).
        accept('application/json');
}
exports.remoteRoomCall = remoteRoomCall;
