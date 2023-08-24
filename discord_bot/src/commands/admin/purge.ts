import { CommandInteraction, CommandInteractionOptionResolver, SlashCommandBuilder } from "discord.js";
import { config } from "../../utilities/config";
import { getPurgableUsers } from "../../utilities/purging";

export const data = new SlashCommandBuilder()
    .setName('purge')
    .setDescription('Purge members who do not have any of the specified roles')
    .addIntegerOption(option =>
        option.setName('number_of_people')
            .setDescription('Number of people to purge')
            .setRequired(true))

export async function execute(interaction: CommandInteraction) {
    await interaction.deferReply({ ephemeral: false });

    const opts = interaction.options as CommandInteractionOptionResolver;
    const numberOfPeople = opts.getInteger('number_of_people')!;

    if (!interaction.guild || interaction.guildId !== config.DISCORD_GUILD_ID) {
        return await interaction.editReply('This command must be used in the Texas A&M eSports Server.');
    }

    const members = await interaction.guild.members.fetch();
    const purgable = await getPurgableUsers(members);
    let kickedList = [];
    
    for(const member of purgable) {
        try {
            await member.send('You have been kicked from the Texas A&M eSports server because you did not have any of the necessary roles determining your status within the server as a Student, Guest, or Alumni. If you feel like you should not have been kicked from the server, please feel free to rejoin: https://discord.gg/tamuesports');
            await member.kick('User did not have any of the necessary roles determining status within the server as a Student, Guest, or Alumni.');
            kickedList.push(member);

            if (kickedList.length >= numberOfPeople) {
                break;
            }
        } catch (error) {
            console.error(`Error kicking member ${member.user.username}: ${error}`);
        }
    }

    await interaction.editReply(`Purged ${kickedList.length} members:\n` + kickedList.join(', '));
}
