const createDatabaseInstance = require('./database.js');
const db = createDatabaseInstance(true);

async function seedInfoData() {
    const initialData = [
        { name: 'reset_date', value: '10/10/2020' },
        { name: 'member_role', value: '000000000000' },
        { name: 'twitch_notif_channel', value: '#xxxxxxxx' },
        { name: 'twitch_notif_role', value: '000000000' },
        { name: 'twitter_notif_channel', value: '#xxxxxxxx' },
        { name: 'twitter_notif_role', value: '000000000' },
    ];

    await db.connect();

    for (const data of initialData) {
        try {
            const entry = await db.createSetting(data.name, data.value);
            console.log(`Added ${entry.name}: ${entry.value}`);
        } catch (error) {
            console.error(`Error adding ${data.name}:`, error);
        }
    }
}

seedInfoData();