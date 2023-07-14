import { CommandInteraction, CommandInteractionOptionResolver, GuildMember, SlashCommandBuilder } from "discord.js";
import { giveMembership } from '../../utilities/membership';

export const data = new SlashCommandBuilder()
    .setName('claim')
    .setDescription('Claim membership for the current user')
    .addStringOption(option =>
        option.setName('code')
            .setDescription('Confirmation code from membership dues payment')
            .setRequired(true));

export async function execute(interaction: CommandInteraction) {
    await interaction.deferReply();

    const opts = interaction.options as CommandInteractionOptionResolver;
    const code = opts.getString('code') ?? "";

    if (!interaction.guild || !interaction.member) {
        return await interaction.editReply('This command must be used in a server.');
    }

    try {
        await giveMembership(interaction.guild, interaction.member as GuildMember, code);
        await interaction.editReply(`Claimed membership for ${interaction.user.username}`);
    } catch (error) {
        console.error(error);
        await interaction.editReply(`Failed to claim membership for ${interaction.user.username}`);
    }
}
