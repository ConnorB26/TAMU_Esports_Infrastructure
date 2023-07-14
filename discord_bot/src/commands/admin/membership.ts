import { CommandInteraction, CommandInteractionOptionResolver, SlashCommandBuilder } from "discord.js";
import { giveMembership, removeMembership } from '../../utilities/membership';
import * as userCodeService from '../../services/userCodeService';

export const data = new SlashCommandBuilder()
    .setName('membership')
    .setDescription('Manage membership')
    .addSubcommand(subcommand =>
        subcommand
            .setName('add')
            .setDescription('Give membership to user with confirmation code')
            .addUserOption(option =>
                option.setName('user')
                    .setDescription('User to give membership to')
                    .setRequired(true))
            .addStringOption(option =>
                option.setName('code')
                    .setDescription('Confirmation code from membership dues payment')
                    .setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand
            .setName('remove')
            .setDescription('Remove membership from a user')
            .addUserOption(option =>
                option.setName('user')
                    .setDescription('User to remove membership from')
                    .setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand
            .setName('check_user')
            .setDescription('Check if user already is a member')
            .addUserOption(option =>
                option.setName('user')
                    .setDescription('User to check')
                    .setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand
            .setName('check_code')
            .setDescription('Check if code has already been claimed')
            .addStringOption(option =>
                option.setName('code')
                    .setDescription('Code to check')
                    .setRequired(true)));

export async function execute(interaction: CommandInteraction) {
    await interaction.deferReply();

    const opts = interaction.options as CommandInteractionOptionResolver;
    const user = opts.getUser('user');
    const subcommand = opts.getSubcommand();

    if (!interaction.guild || !interaction.member || (subcommand !== 'check_code' && !user)) {
        return await interaction.editReply('This command must be used in a server.');
    }

    const member = interaction.guild.members.resolve(user!);
    if (!member && subcommand !== 'check_code') {
        return await interaction.editReply('Unable to find specified user in this server.');
    }

    try {
        switch (subcommand) {
            case 'add':
                const code = opts.getString('code')!;
                await giveMembership(interaction.guild, member!, code);
                await interaction.editReply(`Gave membership to ${user?.username} with code ${code}`);
                break;
            case 'remove':
                await removeMembership(interaction.guild, member!);
                await interaction.editReply(`Removed membership from ${user?.username}`);
                break;
            case 'check_user':
                try {
                    await userCodeService.findByUser(user!.id);
                    await interaction.editReply(`${user?.username} is already a member`);
                } catch (error) {
                    await interaction.editReply(`${user?.username} is not a member yet`);
                }
                break;
            case 'check_code':
                const codeToCheck = opts.getString('code')!;
                try {
                    await userCodeService.findByCode(codeToCheck);
                    await interaction.editReply(`Code ${codeToCheck} has already been claimed`);
                } catch (error) {
                    await interaction.editReply(`Code ${codeToCheck} has not been claimed yet`);
                }
                break;
            default:
                await interaction.editReply(`Unknown subcommand: ${subcommand}`);
        }
    } catch (error) {
        console.error(error);
        await interaction.editReply(`Failed to execute ${subcommand} command`);
    }
}
