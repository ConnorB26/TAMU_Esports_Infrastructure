import { CommandInteraction, CommandInteractionOptionResolver, GuildMember, SlashCommandBuilder } from "discord.js";
import RoleCommandCache from '../../cache/roleCommandCache';
import { createProfileEmbed, getEditModal, getRegisterModal, unregisterUser } from "../../utilities/users";
import { removeMembership } from "../../utilities/membership";

export const data = new SlashCommandBuilder()
    .setName('profile')
    .setDescription('Perform personal user profile related actions')
    .addSubcommand(subcommand =>
        subcommand
            .setName('info')
            .setDescription('Get profile information'))
    .addSubcommand(subcommand =>
        subcommand
            .setName('permissions')
            .setDescription('Get list of executable commands'))
    .addSubcommand(subcommand =>
        subcommand
            .setName('register')
            .setDescription('Register as a user'))
    .addSubcommand(subcommand =>
        subcommand
            .setName('edit')
            .setDescription('Edit profile information'))
    /*.addSubcommand(subcommand =>
        subcommand
            .setName('unregister')
            .setDescription('Unregister as a user'))*/

export async function execute(interaction: CommandInteraction) {
    const opts = interaction.options as CommandInteractionOptionResolver;
    const subcommand = opts.getSubcommand();

    if (subcommand != 'register' && subcommand != 'edit')
        await interaction.deferReply({ ephemeral: true });

    if (!interaction.guild || !interaction.member)
        return await interaction.editReply('This command must be used in a server.');

    try {
        switch (subcommand) {
            case 'info':
                try {
                    const embed = await createProfileEmbed(interaction.member as GuildMember);
                    await interaction.editReply({ embeds: [embed] });
                } catch (error) {
                    await interaction.editReply(`You do not have a profile. Create one using the register command.`);
                }
                break;
            case 'permissions':
                const member = interaction.guild.members.resolve(interaction.user.id);
                const roles = [...(member?.roles.cache.values() || [])];
                const permissions = roles?.reduce((acc, role) => {
                    const roleCommands = RoleCommandCache.get(role.id);
                    if (roleCommands) {
                        acc.push(...roleCommands);
                    }
                    return acc;
                }, [] as string[]);
                await interaction.editReply(`Permissions: ${permissions.join(', ').replaceAll('*', '\\*')}`);
                break;
            case 'register':
                try {
                    const modal = await getRegisterModal();
                    await interaction.showModal(modal);
                } catch (error) {
                    await interaction.reply({ content: `Failed to open register modal`, ephemeral: true });
                }
                break;
            case 'edit':
                try {
                    const modal = await getEditModal();
                    await interaction.showModal(modal);
                } catch (error) {
                    await interaction.reply({ content: `Failed to open edit modal`, ephemeral: true });
                }
                break;
            case 'unregister':
                try {
                    await removeMembership(interaction.guild, interaction.member as GuildMember);
                    await unregisterUser(interaction.user.id);
                    await interaction.editReply(`Unregistered  ${interaction.user.username}`);
                } catch (error) {
                    await interaction.editReply(`Failed to unregister ${interaction.user.username}`);
                }
                break;
            default:
                await interaction.editReply(`Unknown subcommand: ${subcommand}`);
                break;
        }
    } catch (error) {
        console.error(error);
        await interaction.editReply(`Failed to get profile information.`);
    }
}
