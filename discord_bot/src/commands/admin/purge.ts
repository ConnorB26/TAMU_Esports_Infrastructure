import { CommandInteraction, CommandInteractionOptionResolver, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName('purge')
    .setDescription('Purge members who do not have any of the specified roles')
    .addIntegerOption(option =>
        option.setName('number_of_people')
            .setDescription('Number of people to purge')
            .setRequired(true))
    .addStringOption(option =>
        option.setName('role_ids')
            .setDescription('Role IDs to exempt from purging, separated by commas')
            .setRequired(true));

export async function execute(interaction: CommandInteraction) {
    await interaction.deferReply();

    const opts = interaction.options as CommandInteractionOptionResolver;
    const numberOfPeople = opts.getInteger('number_of_people')!;
    const roleIds = opts.getString('role_ids')?.split(',') || [];

    if (!interaction.guild) {
        return await interaction.editReply('This command must be used in a server.');
    }

    const rolesExist = roleIds.some(id => interaction.guild!.roles.cache.has(id));

    if (!rolesExist) {
        return await interaction.editReply('None of the specified roles exist in this server.');
    }

    const members = await interaction.guild.members.fetch();
    let purgedCount = 0;

    for (const member of members.values()) {
        if (!roleIds.some(id => member.roles.cache.has(id)) && !member.user.bot) {
            await member.send('You have been kicked from the server due to not having the required roles.');
            await member.kick('Did not have required roles.');
            purgedCount++;

            if (purgedCount >= numberOfPeople) {
                break;
            }
        }
    }

    await interaction.editReply(`Purged ${purgedCount} members.`);
}
