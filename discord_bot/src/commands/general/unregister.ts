import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { registerUser, unregisterUser } from "../../utilities/users";

export const data = new SlashCommandBuilder()
    .setName('unregister')
    .setDescription('Unregister the current user');

export async function execute(interaction: CommandInteraction) {
    await interaction.deferReply();

    try {
        await unregisterUser(interaction.user.id);
        await interaction.editReply(`Unregistered  ${interaction.user.username}`);
    } catch (error) {
        console.error(error);
        await interaction.editReply(`Failed to unregister ${interaction.user.username}`);
    }
}
