import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';
import { config } from '../config';

@WebSocketGateway(8080)
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    server: Server;

    handleConnection(client: any, req: any) {
        console.log('Client connected:', client._socket.remoteAddress);

        // Check for correct token
        const token = req.headers.authorization?.split(' ')[1];
        if (token !== config.BACKEND_DISCORD_TOKEN) {
            client.close();
        }
    }

    handleDisconnect(client: any) {
        console.log('Client disconnected:', client._socket.remoteAddress);
    }

    sendMessageToClients(data: any) {
        // This method will be used to send messages to all connected clients
        this.server.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    }
}