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
            { name: 'UIN', value: userInfo.uin },
            { name: 'Name', value: userInfo.first_name + ' ' + userInfo.last_name },
            { name: 'Email', value: userInfo.email },
            { name: 'Dues Paid', value: userInfo.has_paid_dues ? 'Yes' : 'No' }
        );

    return embed;
}

// Get register modal
export async function getRegisterModal() {
    const modal = new ModalBuilder()
        .setCustomId('register')
        .setTitle(`Registration`)

    const uinInput = new TextInputBuilder()
        .setCustomId('uinInput')
        .setLabel('UIN')
        .setStyle(TextInputStyle.Short);

    const firstNameInput = new TextInputBuilder()
        .setCustomId('firstNameInput')
        .setLabel('First Name')
        .setStyle(TextInputStyle.Short);

    const lastNameInput = new TextInputBuilder()
        .setCustomId('lastNameInput')
        .setLabel('Last Name')
        .setStyle(TextInputStyle.Short);

    const emailInput = new TextInputBuilder()
        .setCustomId('emailInput')
        .setLabel('Email')
        .setStyle(TextInputStyle.Short);

    const firstActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(uinInput);
    const secondActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(firstNameInput);
    const thirdActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(lastNameInput);
    const fourthActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(emailInput);

    modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow);

    return modal;
}

// Get edit modal
export async function getEditModal() {
    const modal = new ModalBuilder()
        .setCustomId('edit')
        .setTitle(`Edit Profile`)

    const firstNameInput = new TextInputBuilder()
        .setCustomId('firstNameInput')
        .setLabel('First Name')
        .setStyle(TextInputStyle.Short);

    const lastNameInput = new TextInputBuilder()
        .setCustomId('lastNameInput')
        .setLabel('Last Name')
        .setStyle(TextInputStyle.Short);

    const emailInput = new TextInputBuilder()
        .setCustomId('emailInput')
        .setLabel('Email')
        .setStyle(TextInputStyle.Short);

    const firstActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(firstNameInput);
    const secondActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(lastNameInput);
    const thirdActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(emailInput);

    modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

    return modal;
}