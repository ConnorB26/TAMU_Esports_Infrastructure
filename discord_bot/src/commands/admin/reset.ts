import { CommandInteraction, Guild, SlashCommandBuilder } from "discord.js";
import * as userCodeService from '../../services/userCodeService';
import * as confirmationCodeService from '../../services/confirmationCodeService';
import { resetAllMemberRoles, resetMembershipRoles } from "../../utilities/membership";

export const data = new SlashCommandBuilder()
    .setName('reset')
    .setDescription('Reset the memberships');

export async function execute(interaction: CommandInteraction) {
    await interaction.deferReply({ ephemeral: true });

    try {
        await userCodeService.reset();
        await confirmationCodeService.reset();

        await resetAllMemberRoles(interaction.guild as Guild);

        await interaction.editReply('Cleared all memberships and membership confirmation codes');
    } catch (error) {
        console.error(error);
        await interaction.editReply('Failed to reset memberships');
    }
}
