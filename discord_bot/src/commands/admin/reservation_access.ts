import { CommandInteraction, CommandInteractionOptionResolver, GuildMember, SlashCommandBuilder } from "discord.js";
import * as reservationUserService from '../../services/reservationUserService';
import * as userService from '../../services/userService';

export const data = new SlashCommandBuilder()
    .setName('reservation_access')
    .setDescription('Manage reservation system access')
    .addSubcommand(subcommand =>
        subcommand.setName('give')
            .setDescription('Give a user reservation system access')
            .addUserOption(option => option.setName('user').setDescription('User to give access to').setRequired(true))
            .addBooleanOption(option => option.setName('is_admin').setDescription('Whether the user should have admin access').setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand.setName('revoke')
            .setDescription('Revoke a user\'s reservation system access')
            .addUserOption(option => option.setName('user').setDescription('User to revoke access from').setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand.setName('check')
            .setDescription('Check a user\'s reservation system access')
            .addUserOption(option => option.setName('user').setDescription('User to check access for').setRequired(true)));

export async function execute(interaction: CommandInteraction) {
    await interaction.deferReply({ ephemeral: true });

    const opts = interaction.options as CommandInteractionOptionResolver;
    const user = opts.getMember('user') as GuildMember;
    const subcommand = opts.getSubcommand();

    let userEntry;
    try {
        userEntry = await userService.findOneDiscord(user.id);
    } catch (error) {
        await interaction.editReply(`${user.displayName} is not registered`);
        return;
    }
    const uin = userEntry!.uin;

    switch (subcommand) {
        case 'give':
            const is_admin = opts.getBoolean('is_admin')!;
            try {
                await reservationUserService.update(uin, { uin, is_admin });
                await interaction.editReply(`${user.displayName} has been given reservation system access with admin: ${is_admin}`);
            } catch (error) {
                await interaction.editReply(`${error}`);
            }
            break;
        case 'revoke':
            try {
                await reservationUserService.remove(uin);
                await interaction.editReply(`${user.displayName}'s reservation system access has been revoked`);
            } catch (error) {
                await interaction.editReply(`${user.displayName} doesn't have access to revoke`);
            }
            break;
        case 'check':
            try {
                const access = await reservationUserService.findOne(uin);
                await interaction.editReply(`${user.displayName} has access and is ${access.is_admin ? '' : 'not'} an admin`);
            } catch (error) {
                await interaction.editReply(`${user.displayName} does not have access`);
            }
            break;
        default:
            await interaction.editReply(`Unknown subcommand: ${subcommand}`);
            break;
    }
}