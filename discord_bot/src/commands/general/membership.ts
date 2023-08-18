import { CommandInteraction, CommandInteractionOptionResolver, GuildMember, SlashCommandBuilder } from "discord.js";
import { giveMembership, removeMembership } from "../../utilities/membership";

export const data = new SlashCommandBuilder()
    .setName('membership')
    .setDescription('Perform membership related actions')
    .addSubcommand(subcommand =>
        subcommand
            .setName('claim')
            .setDescription('Claim membership with confirmation code')
            .addStringOption(option =>
                option.setName('code')
                    .setDescription('Confirmation code from membership dues payment')
                    .setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand
            .setName('unclaim')
            .setDescription('Unclaim membership'))

export async function execute(interaction: CommandInteraction) {
    await interaction.deferReply({ ephemeral: true });

    const opts = interaction.options as CommandInteractionOptionResolver;
    const subcommand = opts.getSubcommand();

    if (!interaction.guild || !interaction.member)
        return await interaction.editReply('This command must be used in a server.');

    try {
        switch (subcommand) {
            case 'claim':
                try {
                    const code = opts.getString('code') ?? "";
                    await giveMembership(interaction.guild, interaction.member as GuildMember, code);
                    await interaction.editReply(`Claimed membership for ${interaction.user.username}`);
                } catch (error) {
                    await interaction.editReply(`${error}`);
                }
                break;
            case 'unclaim':
                try {
                    await removeMembership(interaction.guild, interaction.member as GuildMember);
                    await interaction.editReply(`Unclaimed membership for ${interaction.user.username}`);
                } catch (error) {
                    await interaction.editReply(`${error}`);
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
