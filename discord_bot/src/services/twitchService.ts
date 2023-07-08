import { TwitchApi } from 'node-twitch';
import { client } from '../utilities/config';
import { ChannelType, DMChannel, EmbedBuilder, TextChannel } from 'discord.js';

const twitch = new TwitchApi({
    client_id: process.env.TWITCH_CLIENT_ID ?? "",
    client_secret: process.env.TWITCH_CLIENT_SECRET ?? "",
});

let isLiveMemory = false;

export async function startTwitchPolling() {
    const checkLive = async () => {
        const data = await twitch.getStreams({ channel: 'tamuesports' });
        const result = data.data[0];

        if (result?.type === 'live') {
            if (!isLiveMemory) {
                isLiveMemory = await sendTwitchNotification(result);
            }
        } else {
            isLiveMemory = false;
        }
    }

    setInterval(checkLive, 15000);
}

async function sendTwitchNotification(streamData: any) {
    const embed = new EmbedBuilder()
        .setColor(0x500000)
        .setTitle(streamData.title)
        .setURL('https://www.twitch.tv/tamuesports')
        .setImage(streamData.thumbnail_url.replace('{width}x{height}', '1920x1080'));

    try {
        const res = await client.channels.fetch(settings.twitch_notif_channel);
        if (res && (res.type === ChannelType.GuildText || res.type === ChannelType.DM)) {
            (res as TextChannel | DMChannel).send({ content: `<@&${settings.twitch_notif_role}> TAMU eSports is now live on Twitch!`, embeds: [embed] });
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.error('Error fetching the channel:', err);
        return false;
    }
}
