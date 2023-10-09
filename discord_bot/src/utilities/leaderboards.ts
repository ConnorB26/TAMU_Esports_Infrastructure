import { ActionRowBuilder, Colors, EmbedBuilder, GuildMember, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';

// Embed for the qotd leaderboard
export async function createQotdLeaderboard(){
    // get the leaderboard from the database to feed into the embed
    const embed = new EmbedBuilder()
    .setColor(Colors.Orange)

    // Will need to install pagination

    return embed;
}