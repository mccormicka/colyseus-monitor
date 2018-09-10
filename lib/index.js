"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const api_1 = require("./api");
require("./ext/Room");
const frontendDirectory = path.resolve(__dirname, "..", "lib", "static");
function monitor(server) {
    const router = express.Router();
    router.use('/', express.static(frontendDirectory));
    router.use('/api', api_1.getAPI(server));
    return router;
}
exports.monitor = monitor;
