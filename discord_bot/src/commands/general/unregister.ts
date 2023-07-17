import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { unregisterUser } from "../../utilities/users";

export const data = new SlashCommandBuilder()
    .setName('unregister')
    .setDescription('Unregister the current user');

export async function execute(interaction: CommandInteraction) {
    await interaction.deferReply({ ephemeral: true });

    try {
        await unregisterUser(interaction.user.id);
        await interaction.editReply(`Unregistered  ${interaction.user.username}`);
    } catch (error) {
        console.error(error);
        await interaction.editReply(`Failed to unregister ${interaction.user.username}`);
    }
}
