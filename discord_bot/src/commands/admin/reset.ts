import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import * as userCodeService from '../../services/userCodeService';
import * as confirmationCodeService from '../../services/confirmationCodeService';

export const data = new SlashCommandBuilder()
    .setName('reset')
    .setDescription('Reset the memberships');

export async function execute(interaction: CommandInteraction) {
    await interaction.deferReply({ ephemeral: true });

    try {
        const userCodes = await userCodeService.findAll();
        for (const userCode of userCodes) {
            await userCodeService.remove(userCode.discordId, userCode.code);
        }
        const codes = await confirmationCodeService.findAll();
        for (const code of codes) {
            await confirmationCodeService.remove(code.code);
        }
        await interaction.editReply('Cleared all memberships and membership confirmation codes');
    } catch (error) {
        console.error(error);
        await interaction.editReply('Failed to reset the user codes table.');
    }
}
