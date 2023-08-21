import { CommandInteraction, CommandInteractionOptionResolver, SlashCommandBuilder } from "discord.js";
import * as userCodeService from '../../services/userCodeService';
import * as userService from '../../services/userService';

export const data = new SlashCommandBuilder()
    .setName('stats')
    .setDescription('Get statistics about different things')
    .addStringOption(option =>
        option.setName('stat_name')
            .setDescription('Name of the statistic to get')
            .setRequired(true)
            .addChoices(
				{ name: 'Member Count', value: 'member_count' },
				{ name: 'Registered User Count', value: 'user_count' },
				{ name: 'Server User Count', value: 'server_user_count' },
			));

export async function execute(interaction: CommandInteraction) {
    await interaction.deferReply({ ephemeral: true });
    
    const opts = interaction.options as CommandInteractionOptionResolver;
    const statName = opts.getString('stat_name');

    switch(statName) {
        case 'member_count':
            const member_count = (await userCodeService.findAll()).length;
            await interaction.editReply(`There are ${member_count} members.`);
            break;
        case 'user_count':
            const user_count = (await userService.findAll()).length;
            await interaction.editReply(`There are ${user_count} registered users.`);
            break;
        case 'server_user_count':
            const server_user_count = interaction.guild?.memberCount;
            await interaction.editReply(`There are ${server_user_count} people in the server.`);
            break;
        default:
            await interaction.editReply(`Could not generate any statistics for ${statName}.`);
            break;
    }
}
