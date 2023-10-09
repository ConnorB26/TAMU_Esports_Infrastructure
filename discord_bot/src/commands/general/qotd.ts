import { CommandInteraction, CommandInteractionOptionResolver, GuildMember, SlashCommandBuilder } from "discord.js";
import {createQotdLeaderboard} from "../../utilities/leaderboards";
import RoleCommandCache from '../../cache/roleCommandCache';

export const data = new SlashCommandBuilder()
    .setName("qotd_leaderboard")
    .setDescription("Leaderboard for question of the day")

export async function execute(interaction: CommandInteraction){
    createQotdLeaderboard();
}