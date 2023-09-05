import { CommandInteraction, CommandInteractionOptionResolver, SlashCommandBuilder } from "discord.js";
import * as userCodeService from '../../services/userCodeService';
import * as userService from '../../services/userService';
import * as codeService from '../../services/confirmationCodeService';
import { purgeRoldIDs } from "../../utilities/config";
import { getPurgableUsers } from "../../utilities/purging";

export const data = new SlashCommandBuilder()
    .setName('stats')
    .setDescription('Get statistics about different things')
    .addSubcommand(subcommand =>
        subcommand
            .setName('count')
            .setDescription('Get a general count for a particular statistic')
            .addStringOption(option =>
                option.setName('stat_name')
                    .setDescription('Name of the statistic for the CSV')
                    .setRequired(true)
                    .addChoices(
                        { name: 'Members', value: 'members' },
                        { name: 'Registered Users', value: 'users' },
                        { name: 'Server Users', value: 'server_users' },
                        { name: 'Purgable Users', value: 'purgable' },
                        { name: 'Dues Purchased', value: 'dues_purchased' }
                    )))
    .addSubcommand(subcommand =>
        subcommand
            .setName('download')
            .setDescription('Generates a CSV for a particular statistic')
            .addStringOption(option =>
                option.setName('stat_name')
                    .setDescription('Name of the statistic for the CSV')
                    .setRequired(true)
                    .addChoices(
                        { name: 'Members', value: 'members' },
                        { name: 'Registered Users', value: 'users' },
                        { name: 'Purgable Users', value: 'purgable' },
                        { name: 'Dues Purchased', value: 'dues_purchased' }
                    )))

export async function execute(interaction: CommandInteraction) {
    await interaction.deferReply({ ephemeral: true });

    const opts = interaction.options as CommandInteractionOptionResolver;
    const subcommand = opts.getSubcommand();
    const statName = opts.getString('stat_name');

    if (!interaction.guild) {
        return await interaction.editReply('This command must be used in a server.');
    }

    switch (subcommand) {
        case 'count':
            switch (statName) {
                case 'members':
                    const member_count = (await userCodeService.findAll()).length;
                    await interaction.editReply(`There are ${member_count} members.`);
                    break;
                case 'users':
                    const user_count = (await userService.findAll()).length;
                    await interaction.editReply(`There are ${user_count} registered users.`);
                    break;
                case 'server_users':
                    const server_user_count = interaction.guild?.memberCount;
                    await interaction.editReply(`There are ${server_user_count} people in the server.`);
                    break;
                case 'purgable':
                    const members = await interaction.guild.members.fetch();
                    const purgable = await getPurgableUsers(members);
                    await interaction.editReply(`There are ${purgable.length} people in the server that can be purged who do not have the necessary roles.`);
                    break;
                case 'dues_purchased':
                    const dues_purchased_count = (await codeService.findAll()).length;
                    await interaction.editReply(`The dues have been purchased ${dues_purchased_count} times.`);
                    break;
                default:
                    await interaction.editReply(`Could not generate any statistics for ${statName}.`);
                    break;
            }
            break;
        case 'download':
            let csvData: string = '';

            switch (statName) {
                case 'members':
                    const membersList = await userCodeService.findAll();
                    csvData = "UIN,First Name,Last Name,Email,Discord ID,Confirmation Code\n";

                    const csvLines = await Promise.all(membersList.map(async member => {
                        const memberUserInfo = await userService.findOne(member.uin);
                        return `="${memberUserInfo.uin}",${memberUserInfo.first_name},${memberUserInfo.last_name},${memberUserInfo.email},="${memberUserInfo.discord_id}",="${member.code}"`;
                    }));

                    csvData += csvLines.join('\n');
                    break;
                case 'users':
                    const usersList = await userService.findAll();
                    csvData = "UIN,First Name,Last Name,Email,Discord ID,Dues Paid\n";
                    usersList.forEach(async user => {
                        csvData += `="${user.uin}",${user.first_name},${user.last_name},${user.email},="${user.discord_id}",${user.has_paid_dues}\n`;
                    });
                    break;
                case 'purgable':
                    const members = await interaction.guild.members.fetch();
                    const purgableList = await getPurgableUsers(members);
                    csvData = "Discord Name, Discord ID\n";
                    purgableList.forEach(user => {
                        csvData += `${user.user.username},="${user.user.id}"\n`;
                    });
                    break;
                case 'dues_purchased':
                    const codeList = await codeService.findAll()
                    csvData = "Code,Claimed\n";
                    codeList.forEach(code => {
                        csvData += `="${code.code}",${code.claimed}\n`;
                    });
                    break;
                default:
                    await interaction.editReply(`Could not generate any statistics for ${statName}.`);
                    break;
            }

            // Convert csvData to a Buffer and send it as a file:
            if (csvData === '')
                break;

            const buffer = Buffer.from(csvData, 'utf8');
            await interaction.editReply({ files: [{ attachment: buffer, name: `${statName}.csv` }] });
            break;
    }
}
