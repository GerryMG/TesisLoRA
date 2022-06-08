import io from 'socket.io-client';

const socket = {};
socket.sc = null;
let init = () => {
    let so = io();
    so.on("connect", function (st) {
        console.log("connected");


    });
    socket.sc = so;
}

socket.init = init;


export default socket;