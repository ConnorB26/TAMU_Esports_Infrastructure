import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { getRegisterModal, registerUser } from "../../utilities/users";

export const data = new SlashCommandBuilder()
    .setName('register')
    .setDescription('Register the current user');

export async function execute(interaction: CommandInteraction) {
    try {
        const modal = await getRegisterModal(interaction.user.id);
        await interaction.showModal(modal);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: `Failed to register ${interaction.user.username}`, ephemeral: true });
    }
}
