import { CommandInteraction, CommandInteractionOptionResolver, GuildMember, SlashCommandBuilder } from "discord.js";
import { findOne as findUser } from '../../services/userService';
import RoleCommandCache from '../../cache/roleCommandCache';
import { createProfileEmbed } from "../../utilities/users";

export const data = new SlashCommandBuilder()
    .setName('profile')
    .setDescription('Get profile information for the current user')
    .addSubcommand(subcommand =>
        subcommand
            .setName('info')
            .setDescription('Get user info'))
    .addSubcommand(subcommand =>
        subcommand
            .setName('permissions')
            .setDescription('Get user permissions'));

export async function execute(interaction: CommandInteraction) {
    await interaction.deferReply({ ephemeral: true });

    const opts = interaction.options as CommandInteractionOptionResolver;

    if (!interaction.guild || !interaction.member) {
        return await interaction.editReply('This command must be used in a server.');
    }

    const subcommand = opts.getSubcommand();

    try {
        if (subcommand === 'info') {
            const embed = await createProfileEmbed(interaction.member as GuildMember);
            await interaction.editReply({ embeds: [embed] });
        } else if (subcommand === 'permissions') {
            const member = interaction.guild.members.resolve(interaction.user.id);
            const roles = [...(member?.roles.cache.values() || [])];
            const permissions = roles?.reduce((acc, role) => {
                const roleCommands = RoleCommandCache.get(role.id);
                if (roleCommands) {
                    acc.push(...roleCommands);
                }
                return acc;
            }, [] as string[]);
            await interaction.editReply(`Permissions: ${permissions}`);
        } else {
            await interaction.editReply(`Unknown subcommand: ${subcommand}`);
        }
    } catch (error) {
        console.error(error);
        await interaction.editReply(`Failed to get profile information.`);
    }
}
