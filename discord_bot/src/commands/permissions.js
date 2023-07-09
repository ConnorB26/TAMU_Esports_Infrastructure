import { CommandInteraction, SlashCommandBuilder, Role } from 'discord.js';
import * as roleCommandService from '../services/roleCommandService';
import roleCommandCache from '../cache/roleCommandCache';

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
                    .setRequired(true)));

export async function execute(interaction) {
    await interaction.deferReply();

    const subcommand = interaction.options.getSubcommand();
    const role = interaction.options.getRole('role');
    const command = interaction.options.getString('command');
    const roleId = role.id;

    switch (subcommand) {
        case 'add':
            try {
                const addedRoleCommand = await roleCommandService.create({role_id: roleId, command_name: command});
                roleCommandCache.addCommand(addedRoleCommand);
                await interaction.editReply(`Added command permission for ${role?.name} role.`);
            } catch (error) {
                console.error(error);
                await interaction.editReply(`Failed to add command permission.`);
            }
            break;
        case 'remove':
            try {
                const roleCommands = roleCommandCache.get(roleId);
    
                if (!roleCommands || !roleCommands.includes(command)) {
                    await interaction.editReply(`No command permission found for ${role?.name} role.`);
                } else {
                    await roleCommandService.removeVals(roleId, command);
                    roleCommandCache.removeCommand({role_id: roleId, command_name: command});
                    await interaction.editReply(`Removed command permission for ${role?.name} role.`);
                }
            } catch (error) {
                console.error(error);
                await interaction.editReply(`Failed to remove command permission.`);
            }
            break;
        case 'remove_all':
            try {
                const roleCommands = roleCommandCache.get(roleId);
    
                if (!roleCommands || roleCommands.length === 0) {
                    await interaction.editReply(`No command permissions found for ${role?.name} role.`);
                } else {
                    roleCommands.forEach(async (command) => {
                        await roleCommandService.removeVals(roleId, command);
                        roleCommandCache.removeCommand({role_id: roleId, command_name: command});
                    });
                    await interaction.editReply(`Removed all command permissions for ${role?.name} role.`);
                }
            } catch (error) {
                console.error(error);
                await interaction.editReply(`Failed to remove all command permissions.`);
            }
            break;
        default:
            await interaction.editReply(`Unknown subcommand: ${subcommand}`);
    }
}
