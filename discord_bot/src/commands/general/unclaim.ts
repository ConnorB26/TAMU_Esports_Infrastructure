import { CommandInteraction, GuildMember, SlashCommandBuilder } from "discord.js";
import { removeMembership } from '../../utilities/membership';

export const data = new SlashCommandBuilder()
    .setName('unclaim')
    .setDescription('Unclaim membership for the current user');

export async function execute(interaction: CommandInteraction) {
    await interaction.deferReply({ ephemeral: true });

    if (!interaction.guild || !interaction.member) {
        return await interaction.editReply('This command must be used in a server.');
    }

    try {
        await removeMembership(interaction.guild, interaction.member as GuildMember);
        await interaction.editReply(`Unclaimed membership for ${interaction.user.username}`);
    } catch (error) {
        console.error(error);
        await interaction.editReply(`Failed to unclaim membership for ${interaction.user.username}`);
    }
}
