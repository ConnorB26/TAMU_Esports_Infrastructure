import { ActionRowBuilder, EmbedBuilder, GuildMember, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';
import { create as createUser, removeDiscord as removeUser, findOneDiscord as findUser } from '../services/userService';
import { User } from '../models/user';

// Add entry to users table
export async function registerUser(user: User) {
    await createUser(user);
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

// Get register modal
export async function getRegisterModal(discordID: string) {
    const modal = new ModalBuilder()
        .setCustomId('register')
        .setTitle(`Registration`)

    const uinInput = new TextInputBuilder()
        .setCustomId('uinInput')
        .setLabel('UIN')
        .setStyle(TextInputStyle.Short);

    const nameInput = new TextInputBuilder()
        .setCustomId('nameInput')
        .setLabel('Name')
        .setStyle(TextInputStyle.Short);

    const emailInput = new TextInputBuilder()
        .setCustomId('emailInput')
        .setLabel('Email')
        .setStyle(TextInputStyle.Short);

    const firstActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(uinInput);
    const secondActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(nameInput);
    const thirdActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(emailInput);

    modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

    return modal;
}
