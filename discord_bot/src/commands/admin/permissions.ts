import { CommandInteraction, CommandInteractionOptionResolver, SlashCommandBuilder } from 'discord.js';
import * as roleCommandService from '../../services/roleCommandService';
import roleCommandCache from '../../cache/roleCommandCache';

export const data = new SlashCommandBuilder()
    .setName('permissions')
    .setDescription('Manage permissions for roles')
    .addSubcommand(subcommand =>
        subcommand
            .setName('add')
            .setDescription('Add permissions to a role')
            .addRoleOption(option =>
                option.setName('role')
                    .setDescription('Role to add permissions to')
                    .setRequired(true))
            .addStringOption(option =>
                option.setName('command')
                    .setDescription('Command to add permissions for')
                    .setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand
            .setName('remove')
            .setDescription('Remove permissions from a role')
            .addRoleOption(option =>
                option.setName('role')
                    .setDescription('Role to remove permissions from')
                    .setRequired(true))
            .addStringOption(option =>
                option.setName('command')
                    .setDescription('Command to remove permissions for')
                    .setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand
            .setName('remove_all')
            .setDescription('Remove all permissions from a role')
            .addRoleOption(option =>
                option.setName('role')
                    .setDescription('Role to remove all permissions from')
                    .setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand
            .setName('check')
            .setDescription('Check all permissions for a role')
            .addRoleOption(option =>
                option.setName('role')
                    .setDescription('Role to check permissions for')
                    .setRequired(true)));

export async function execute(interaction: CommandInteraction) {
    await interaction.deferReply({ ephemeral: true });

    const opts = interaction.options as CommandInteractionOptionResolver;

    const subcommand = opts.getSubcommand();
    const role = opts.getRole('role')!;
    const command = opts.getString('command')!;
    const roleId = role.id;

    switch (subcommand) {
        case 'add':
            try {
                const addedRoleCommand = await roleCommandService.create({ role_id: roleId, command_name: command });
                roleCommandCache.addCommand(addedRoleCommand);
                await interaction.editReply(`Added permission for command ${command} to the ${role?.name} role`);
            } catch (error) {
                console.log(error);
                await interaction.editReply(`Failed to add command permission`);
            }
            break;
        case 'remove':
            try {
                const roleCommands = roleCommandCache.get(roleId);

                if (!roleCommands || !roleCommands.includes(command)) {
                    await interaction.editReply(`No permission for command ${command} found for ${role?.name} role`);
                } else {
                    await roleCommandService.removeVals(roleId, command);
                    roleCommandCache.removeCommand({ role_id: roleId, command_name: command });
                    await interaction.editReply(`Removed permission for command ${command} to the ${role?.name} role`);
                }
            } catch (error) {
                console.log(error);
                await interaction.editReply(`Failed to remove command permission`);
            }
            break;
        case 'remove_all':
            try {
                const roleCommands = roleCommandCache.get(roleId);

                if (!roleCommands || roleCommands.length === 0) {
                    await interaction.editReply(`No permissions found for ${role?.name} role`);
                } else {
                    roleCommands.forEach(async (command) => {
                        await roleCommandService.removeVals(roleId, command);
                        roleCommandCache.removeCommand({ role_id: roleId, command_name: command });
                    });
                    await interaction.editReply(`Removed all permissions for ${role?.name} role`);
                }
            } catch (error) {
                console.log(error);
                await interaction.editReply(`Failed to remove all permissions`);
            }
            break;
        case 'check':
            const roleCommands = roleCommandCache.get(roleId);
            await interaction.editReply(`Permissions for ${role?.name} role: ${roleCommands?.join(', ').replaceAll('*', '\\*')}`);
            break;
        default:
            await interaction.editReply(`Unknown subcommand: ${subcommand}`);
    }
}
