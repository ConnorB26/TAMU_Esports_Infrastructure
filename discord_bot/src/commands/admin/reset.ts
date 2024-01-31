import { CommandInteraction, Guild, SlashCommandBuilder } from "discord.js";
import * as userCodeService from '../../services/userCodeService';
import * as confirmationCodeService from '../../services/confirmationCodeService';
import * as userService from '../../services/userService';
import { resetMembershipRoles } from "../../utilities/membership";

export const data = new SlashCommandBuilder()
    .setName('reset')
    .setDescription('Reset the memberships');

export async function execute(interaction: CommandInteraction) {
    await interaction.deferReply({ ephemeral: true });

    try {
        const ids = await userService.getResetDiscordIDs();
        await resetMembershipRoles(interaction.guild as Guild, ids);

        await userCodeService.reset();
        await confirmationCodeService.reset();

        await interaction.editReply('Cleared all memberships and membership confirmation codes');
    } catch (error) {
        console.error(error);
        await interaction.editReply('Failed to reset memberships');
    }
}
