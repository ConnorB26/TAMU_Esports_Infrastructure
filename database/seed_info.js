const createDatabaseInstance = require('./database.js');
const db = createDatabaseInstance(false);

async function seedInfoData() {
    const initialData = [
        { info: 'reset_date', value: '10/10/2020' },
        { info: 'member_role', value: '000000000000' },
        { info: 'twitch_notif_channel', value: '#xxxxxxxx' },
        { info: 'twitch_notif_role', value: '000000000' },
        { info: 'twitter_notif_channel', value: '#xxxxxxxx' },
        { info: 'twitter_notif_role', value: '000000000' },
    ];

    for (const data of initialData) {
        try {
            const entry = await db.createInfoEntry(data);
            console.log(`Added ${entry.info}: ${entry.value}`);
        } catch (error) {
            console.error(`Error adding ${data.info}:`, error);
        }
    }
}

seedInfoData();