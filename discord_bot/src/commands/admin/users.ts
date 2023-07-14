import { CommandInteraction, CommandInteractionOptionResolver, SlashCommandBuilder } from "discord.js";
import { findOne as findUser, create as createUser, remove as removeUser } from '../../services/userService';

export const data = new SlashCommandBuilder()
    .setName('users')
    .setDescription('Manage users')
    .addSubcommand(subcommand =>
        subcommand
            .setName('get')
            .setDescription('Get a user entry')
            .addUserOption(option =>
                option.setName('user')
                    .setDescription('User to get')
                    .setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand
            .setName('register')
            .setDescription('Register a user')
            .addUserOption(option =>
                option.setName('user')
                    .setDescription('User to register')
                    .setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand
            .setName('unregister')
            .setDescription('Unregister a user')
            .addUserOption(option =>
                option.setName('user')
                    .setDescription('User to unregister')
                    .setRequired(true)));

export async function execute(interaction: CommandInteraction) {
    await interaction.deferReply();

    const opts = interaction.options as CommandInteractionOptionResolver;
    const user = opts.getUser('user');

    if (!user) {
        return await interaction.editReply('You must specify a user.');
    }

    try {
        if (opts.getSubcommand() === 'get') {
            const userInfo = await findUser(user.id);
            await interaction.editReply(`User info: ${JSON.stringify(userInfo)}`);
        } else if (opts.getSubcommand() === 'register') {
            await createUser({ discordId: user.id, hasPaidDues: false });
            await interaction.editReply(`Registered ${user.username}`);
        } else if (opts.getSubcommand() === 'unregister') {
            await removeUser(user.id);
            await interaction.editReply(`Unregistered ${user.username}`);
        } else {
            await interaction.editReply(`Unknown subcommand: ${opts.getSubcommand()}`);
        }
    } catch (error) {
        console.error(error);
        await interaction.editReply(`Failed to ${opts.getSubcommand()} user ${user.username}`);
    }
}
