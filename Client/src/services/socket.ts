import * as io from 'socket.io-client';

const socket: SocketIOClient.Socket = io('http://localhost:3000');

export default socket;