"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
function getAPI(server) {
    const api = express.Router();
    api.get("/", (req, res) => {
        const handlers = Object.keys(server.matchMaker.handlers);
        const result = {};
        Promise.all(handlers.map((handler) => {
            return server.matchMaker.
                getAllRooms(handler, 'getRoomListData').
                then((rooms) => {
                result[handler] = rooms;
            }).
                catch((err) => console.error(err));
        })).then(() => res.json(result));
    });
    api.get("/room", (req, res) => {
        const roomId = req.query.roomId;
        server.matchMaker.
            remoteRoomCall(roomId, "getInspectData").
            then((data) => res.json(data)).
            catch((err) => console.error(err));
    });
    api.get("/room/call", (req, res) => {
        const roomId = req.query.roomId;
        const method = req.query.method;
        const args = JSON.parse(req.query.args);
        server.matchMaker.
            remoteRoomCall(roomId, method, args).
            then((data) => res.json(data)).
            catch((err) => console.error(err));
    });
    return api;
}
exports.getAPI = getAPI;
