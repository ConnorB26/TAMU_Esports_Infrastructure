import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import {createQotdLeaderboard} from "../../utilities/leaderboards";

export const data = new SlashCommandBuilder()
    .setName("qotd")
    .setDescription("Leaderboard for question of the day")



// Question of the day leaderboard command
export async function execute(interaction: CommandInteraction){
    const leaderboard_embed = await createQotdLeaderboard();
    await interaction.reply({embeds: [leaderboard_embed]})
}