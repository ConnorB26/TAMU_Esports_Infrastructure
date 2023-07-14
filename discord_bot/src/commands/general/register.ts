import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { registerUser } from "../../utilities/users";

export const data = new SlashCommandBuilder()
    .setName('register')
    .setDescription('Register the current user');

export async function execute(interaction: CommandInteraction) {
    await interaction.deferReply();

    try {
        await registerUser(interaction.user.id);
        await interaction.editReply(`Registered ${interaction.user.username}`);
    } catch (error) {
        console.error(error);
        await interaction.editReply(`Failed to register ${interaction.user.username}`);
    }
}
