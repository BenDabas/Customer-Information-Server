const express = require('express');
const Server = require('./Server');
// import { Server } from './Server';

const server = new Server(express);
server.run();
