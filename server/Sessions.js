//Communicates with Room.js primarily. 
const Socket = require('socket.io');

// server components:
const Clients = require('./Clients.js'); 
const Streams = require('./Stream.js');
let clients = new Clients();

class Sessions {
  constructor() {
    //sessions indexed by sessionID containing clients
    this.sessions = new Map();
  }

  createSession(data, socket) {
    let genSessionID = this.generateSessionID();
    if (this.sessions.get(genSessionID) != undefined) //recurse
      return createSession(socket);
    var session = new Session(genSessionID);  
    this.sessions.set(genSessionID, session);
    socket.emit('create-session-response', genSessionID); //emit to only that client so they can view the code 
  }

  joinSession(data, socket) { //apparently does not need the socket.id
    var sess = new Session();
    let session = data.sessionID;
    if (session) 
      sess.joinSession(socket, data.guest, session);
    else {
      socket.emit('join-session-fail', data.sessionID);
      console.log('User %s attempted to join session %s which does not exist.', data.username, data.sessionID);
    }
  }


  startGameSession(sessionID) {
    let session = this.findSessionByID(sessionID);
    session.startGameSession();
  }

  findSessionByID(sessionID) {
    console.log("find session by id fucntion");
    return this.sessions.get(sessionID);
  }

  findSessionIDFromSocketID(socket) {
      var sessionID = sessions.find((sessionID) => 
        sessions[sessionID].clients.find((client) => 
          client.id === socket.id));
      return sessionID;
  }

  generateSessionID() {
    // var crypto = require("crypto");
    // var id = crypto.randomBytes(20).toString('hex');

    let length = 20;
    let genSessionID = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
      genSessionID += characters.charAt(Math.floor(Math.random() * characters.length));
    }
      return genSessionID;
  }
}

class Session {
  constructor(sessionID) {
  //  this.clients = new Clients();
    this.sessionID = sessionID;
    // game session in progress or not? disallow changes to player order during runtime
    this.gameSession = false;
  }
  
  joinSession(socket, username, session){//apparently does not need the socket.id
    try {
        clients.addClient(socket.id, username, session);
        //send usernames to client from client object
        clients.getUsernames();
        //socket.emit('usernames', usernames);//
    }
    catch (error) {
      socket.emit('join-session-failed');
      console.error(error);
    }
  }

  startGameSession() {
    this.gameSession = true;
    // socket.brodcast.to(sessionID).emit('game-started');
  }

  startPlayerStream(socket) {
    nextSID = this.clients.getNextPlayer();
    // socket.to(nextSID).emit('start-stream');
  }

  sendStreams() {
    usernames = this.clients.getUsernames()
    // socket.brodcast.to(sessionID).emit('stream-names', streams);
  }

  sendLatency(start_time) {
    let end_time = Date.now();
    interval = end_time - start_time / 1000;
    socket.emit('pong', interval);
  }
}

module.exports = Sessions;