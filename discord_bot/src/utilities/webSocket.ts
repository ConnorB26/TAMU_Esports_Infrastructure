import WebSocket from 'ws';
import { config } from './config';

let retryTimeout = 5000; // initial delay
const maxRetryTimeout = 60000; // maximum delay cap

export function createWebsocket(onMessage: Function) {
    let ws: WebSocket;
    let isReconnecting = false;

    function reconnect() {
        // Only try to reconnect if the WebSocket is not open and no reconnection attempt is in progress
        if (!isReconnecting && ws.readyState !== WebSocket.OPEN) {
            isReconnecting = true;
            console.log('Attempting to reconnect...');
            createWebsocket(onMessage);
            // Increase the delay for the next attempt, with a maximum cap
            retryTimeout = Math.min(retryTimeout * 2, maxRetryTimeout);
        }
    }

    ws = new WebSocket("ws://backend:8080", {
        headers: {
            Authorization: `Bearer ${config.BACKEND_DISCORD_TOKEN}`,
        },
    });

    ws.on('open', function open() {
        console.log('Websocket connection open');
        // Reset the retry timeout back to initial delay once connection is successful
        retryTimeout = 5000;
        isReconnecting = false;
    });

    ws.on('close', function close() {
        console.log('Websocket connection closed');
        setTimeout(reconnect, retryTimeout);
    });

    ws.on('error', function error() {
        console.log('Websocket connection error');
        setTimeout(reconnect, retryTimeout);
    });

    ws.on('message', function incoming(data) {
        const jsonData = JSON.parse(data.toString());
        onMessage(jsonData);
    });

    // return ws; // If you don't need to use the WebSocket instance elsewhere, no need to return it
}