import { ActionRowBuilder, CommandInteraction, ModalBuilder, SlashCommandBuilder, TextInputBuilder, TextInputStyle } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName('reserve')
    .setDescription('Reserve a time slot for the facility computers');

export async function execute(interaction: CommandInteraction) {
    const modal = new ModalBuilder()
        .setCustomId('reserveModal')
        .setTitle('Reservation Form');

    const gameInput = new TextInputBuilder()
        .setCustomId('gameInput')
        .setLabel("What game?")
        .setStyle(TextInputStyle.Short)
        .setRequired()

    const teamInput = new TextInputBuilder()
        .setCustomId('teamInput')
        .setLabel("What team?")
        .setStyle(TextInputStyle.Short)
        .setRequired()

    const computerInput = new TextInputBuilder()
        .setCustomId('computerInput')
        .setLabel("How many computers?")
        .setStyle(TextInputStyle.Short)
        .setRequired()

    const startTimeInput = new TextInputBuilder()
        .setCustomId('startTimeInput')
        .setLabel("Start time (HH:MM AM/PM)?")
        .setPlaceholder('e.g. 02:00 PM')
        .setStyle(TextInputStyle.Short);

    const endTimeInput = new TextInputBuilder()
        .setCustomId('endTimeInput')
        .setLabel("End time (HH:MM AM/PM)?")
        .setPlaceholder('e.g. 04:00 PM')
        .setStyle(TextInputStyle.Short);

    const gameActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(gameInput);
    const teamActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(teamInput);
    const computerActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(computerInput);
    const startTimeActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(startTimeInput);
    const endTimeActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(endTimeInput);

    modal.addComponents(gameActionRow, teamActionRow, computerActionRow, startTimeActionRow, endTimeActionRow);

    await interaction.showModal(modal);
}
