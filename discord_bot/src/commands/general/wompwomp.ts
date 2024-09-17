import { CommandInteraction, CommandInteractionOptionResolver, Emoji, SlashCommandBuilder, TextChannel } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('wompwomp')
    .setDescription('React to a message with WOMPWOMP')
    .addStringOption(option =>
        option.setName('messagelink')
            .setDescription('The link to the message you want to react to')
            .setRequired(true));

export async function execute(interaction: CommandInteraction) {
    await interaction.deferReply({ ephemeral: true });

    const opts = interaction.options as CommandInteractionOptionResolver;
    const messageLink = opts.getString('messagelink');

    const linkParts = messageLink?.split('/');
    if (!linkParts || linkParts.length < 7) {
        await interaction.editReply('Invalid message link format.');
        return;
    }

    const [guildId, channelId, messageId] = linkParts.slice(-3);

    try {
        const guild = await interaction.client.guilds.fetch(guildId);
        const channel = await guild.channels.fetch(channelId) as TextChannel;
        const message = await channel.messages.fetch(messageId);

        const firstWompReactions = ['womp1', 'womp2', 'womp3', 'womp4'];
        for (const reaction of firstWompReactions) {
            const emoji = guild.emojis.cache.find(e => e.name === reaction);
            if (emoji) {
                await message.react(emoji);
            } else {
                console.log(`Emoji ${reaction} not found.`);
            }
        }

        const secondWompReactions = ['🇼', '🇴', '🇲', '🇵'];
        for (const letter of secondWompReactions) {
            await message.react(letter);
        }

        await interaction.editReply('WOMPWOMP reactions added!');
    } catch (error) {
        console.error(error);
        await interaction.editReply('Failed to react to the message. Make sure the link is correct and the bot has access to the message.');
    }
}
