import { CommandInteraction, CommandInteractionOptionResolver, GuildMember, SlashCommandBuilder } from "discord.js";
import { findOne as findUser, create as createUser, remove as removeUser } from '../../services/userService';
import { createProfileEmbed, getRegisterModal, unregisterUser } from "../../utilities/users";

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
    /*.addSubcommand(subcommand =>
        subcommand
            .setName('register')
            .setDescription('Register a user')
            .addUserOption(option =>
                option.setName('user')
                    .setDescription('User to register')
                    .setRequired(true)))*/
    .addSubcommand(subcommand =>
        subcommand
            .setName('unregister')
            .setDescription('Unregister a user')
            .addUserOption(option =>
                option.setName('user')
                    .setDescription('User to unregister')
                    .setRequired(true)));

export async function execute(interaction: CommandInteraction) {
    const opts = interaction.options as CommandInteractionOptionResolver;

    if(opts.getSubcommand() !== 'register')
        await interaction.deferReply({ ephemeral: true });

    const user = opts.getMember('user') as GuildMember;

    if (!user) {
        return await interaction.editReply('You must specify a user.');
    }

    try {
        if (opts.getSubcommand() === 'get') {
            const embed = await createProfileEmbed(user);
            await interaction.editReply({ embeds: [embed] });
        } else if (opts.getSubcommand() === 'register') {
            const modal = await getRegisterModal(user.id);
            await interaction.showModal(modal);
        } else if (opts.getSubcommand() === 'unregister') {
            await unregisterUser(user.id);
            await interaction.editReply(`Unregistered ${user.user.username}`);
        } else {
            await interaction.editReply(`Unknown subcommand: ${opts.getSubcommand()}`);
        }
    } catch (error) {
        console.error(error);
        await interaction.editReply(`Failed to ${opts.getSubcommand()} user ${user.user.username}`);
    }
}
