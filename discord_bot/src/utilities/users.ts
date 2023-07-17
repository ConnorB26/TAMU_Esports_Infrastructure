import { EmbedBuilder, GuildMember } from 'discord.js';
import { create as createUser, remove as removeUser, findOne as findUser } from '../services/userService';

// Add entry to users table
export async function registerUser(discordId: string) {
    await createUser({ discordId: discordId, hasPaidDues: false });
}

// Remove entry from users table
export async function unregisterUser(discordId: string) {
    await removeUser(discordId);
}

// Get embed showing user entry information
export async function createProfileEmbed(discordUser: GuildMember) {
    const userInfo = await findUser(discordUser.id);
    const embed = new EmbedBuilder()
        .setColor(discordUser.displayHexColor)
        .setAuthor({ name: discordUser.displayName ?? discordUser.user.username, iconURL: discordUser.avatarURL() ?? discordUser.user.avatarURL() ?? "" })
        .addFields(
            { name: 'Dues Paid', value: userInfo.hasPaidDues ? 'Yes' : 'No' }
        );

    return embed;
}