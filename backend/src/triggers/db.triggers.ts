import { Injectable, OnModuleInit } from '@nestjs/common';
import { config } from '../config';
import { EventsGateway } from '../websockets/events.gateway';

@Injectable()
export class DatabaseTriggersService implements OnModuleInit {
    constructor(private eventsGateway: EventsGateway) { }

    async onModuleInit() {
        const { Client } = require('pg')
        const client = new Client({
            host: config.DB_HOST,
            port: config.DB_PORT_NUMBER,
            user: config.DB_USERNAME,
            password: config.DB_PASSWORD,
            database: config.DB_DATABASE,
        })

        client.connect()

        client.query('LISTEN settings_changed')
        client.query('LISTEN claim_status_updated')

        client.on('notification', (msg) => {
            console.log('Received NOTIFY:', msg)
            const payload = JSON.parse(msg.payload)

            switch (msg.channel) {
                case 'claim_status_updated':
                    this.eventsGateway.sendMessageToClients(payload);
                    break
                case 'settings_changed':
                    this.eventsGateway.sendMessageToClients(payload);
                    break
                default:
                    console.log(`Unhandled event: ${msg.channel}`)
            }
        })
    }
}
