import { CommandInteraction, SlashCommandBuilder, CommandInteractionOptionResolver, Colors, EmbedBuilder } from "discord.js";
import {createQotdLeaderboard} from "../../utilities/leaderboards";
import discordSettingCache from "../../cache/discordSettingCache";
import botVariableCache from "../../cache/botVariableCache";

export const data = new SlashCommandBuilder()
    .setName("qotd")
    .setDescription("Question of the day information")

    .addSubcommand(subcommand =>
        subcommand
            .setName('leaderboard')
            .setDescription('Get the leaderboard for question of the day'))

    .addSubcommand(subcommand =>
        subcommand.setName('ask')
            .setDescription('Ask a question of the day')
            .addStringOption(option => (
                option.setName('question')
                    .setDescription('Question to ask')
                    .setRequired(true)
            )))




// Question of the day leaderboard command
export async function execute(interaction: CommandInteraction){
    const opts = interaction.options as CommandInteractionOptionResolver;
    const subcommand = opts.getSubcommand();

    try {
        switch (subcommand) {
            case 'leaderboard':
                const leaderboard_embed = await createQotdLeaderboard();
                await interaction.reply({embeds: [leaderboard_embed]})

                break;
            case 'ask':
                const qotd_channel_id = discordSettingCache.get("qotd_channel_id");
                const qotd_role_id = discordSettingCache.get("qotd_role_id");

                const qotd_embed = new EmbedBuilder()
                .setColor(Colors.Red)
                .addFields({name: "Question of the day", value: `${opts.getString("question")}`})


                // check for channel
                if (interaction.channelId === qotd_channel_id){
                    // Check if QOTD was already asked before

                    // UNCOMMENT FOR PRODUCTION
                    if (botVariableCache.get("qotd_asked")){
                        await interaction.reply({ephemeral: true, content: "QOTD already asked!"});
                        break;
                    }

                    botVariableCache.set("qotd_asked", true);
                    const response = await interaction.reply({content: `<@&${qotd_role_id}>`, embeds: [qotd_embed], fetchReply: true})
                    const response_data = await response.fetch();
                    // response_data.awaitMessageComponent({componentType: "reply", content: response})
                    botVariableCache.set("qotd_question", response_data.id);

                    console.log(response_data.id)

                }else{
                    await interaction.reply({ephemeral: true, content: "Wrong channel!"});
                }

                break;
        
            default:
                break; 
        }
    } catch (error) {
        
    }
}