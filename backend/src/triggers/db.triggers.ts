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

        const client = await pool.connect();

        client.query('LISTEN users_changes');
        client.query('LISTEN settings_changed');
        client.query('LISTEN dues_payment_updated');

        client.on('notification', (msg) => {
            console.log('Received NOTIFY:', msg);
            const payload = JSON.parse(msg.payload);

            // Forward the NOTIFY payload to WebSocket clients
            switch (payload.event) {
                case 'dues_payment_updated_true':
                    this.eventsGateway.sendMessageToClients({ event: 'addMember', data: payload });
                    break;
                case 'dues_payment_updated_false':
                    this.eventsGateway.sendMessageToClients({ event: 'removeMember', data: payload });
                    break;
                case 'users_changes':
                    if (payload.type === 'INSERT') {
                        this.eventsGateway.sendMessageToClients({ event: 'userAdded', data: payload });
                    } else if (payload.type === 'UPDATE') {
                        this.eventsGateway.sendMessageToClients({ event: 'userUpdated', data: payload });
                    } else if (payload.type === 'DELETE') {
                        this.eventsGateway.sendMessageToClients({ event: 'userDeleted', data: payload });
                    }
                    break;
                case 'settings_changed':
                    this.eventsGateway.sendMessageToClients({ event: 'settingUpdated', data: payload });
                    break;
                default:
                    console.log(`Unhandled event: ${msg.channel}`);
            }
        });
    }
}
