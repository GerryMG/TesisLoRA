import io from 'socket.io-client';

const socket = {};
socket.sc = null;
let init = () => {
    let so = io(`http://${window.location.hostname}:3003`);
    so.on("connect", function (st) {
        console.log("connected");


    });
    socket.sc = so;
}

socket.init = init;


export default socket;