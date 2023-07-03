import { Injectable, OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';
import { config } from '../config';
import { EventsGateway } from '../websockets/events.gateway';

@Injectable()
export class DatabaseTriggersService implements OnModuleInit {

    constructor(private eventsGateway: EventsGateway) { }

    async onModuleInit() {
        const pool = new Pool({
            host: config.DB_HOST,
            port: config.DB_PORT_NUMBER,
            user: config.DB_USERNAME,
            password: config.DB_PASSWORD,
            database: config.DB_DATABASE,
        });

        pool.on('connect', (client) => {
            client.query('LISTEN settings_changed');
            client.query('LISTEN claim_status_updated');

            client.on('notification', (msg) => {
                console.log('Received NOTIFY:', msg);
                const payload = JSON.parse(msg.payload);

                // Forward the NOTIFY payload to WebSocket clients
                switch (payload.event) {
                    case 'claim_status_updated':
                        this.eventsGateway.sendMessageToClients(payload);
                        break;
                    case 'settings_changed':
                        this.eventsGateway.sendMessageToClients({ event: 'settingUpdated', data: payload });
                        break;
                    default:
                        console.log(`Unhandled event: ${msg.channel}`);
                }
            });

            client.query('COMMIT');
        });
    }
}