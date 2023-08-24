import { CommandInteraction, CommandInteractionOptionResolver, GuildMember, SlashCommandBuilder } from "discord.js";
import { createProfileEmbed } from "../../utilities/users";
import * as userCodeService from '../../services/userCodeService';
import * as confirmationCodeService from '../../services/confirmationCodeService';
import * as userService from '../../services/userService';

export const data = new SlashCommandBuilder()
    .setName('admin')
    .setDescription('Admin commands for managing memberships and users')
    .addSubcommandGroup(group =>
        group.setName('membership')
            .setDescription('Manage membership')
            .addSubcommand(subcommand =>
                subcommand
                    .setName('check_user')
                    .setDescription('Check if user already is a member')
                    .addUserOption(option =>
                        option.setName('user')
                            .setDescription('User to check')
                            .setRequired(true)))
            .addSubcommand(subcommand =>
                subcommand
                    .setName('check_code')
                    .setDescription('Check if code has already been claimed')
                    .addStringOption(option =>
                        option.setName('code')
                            .setDescription('Code to check')
                            .setRequired(true)))
    )
    .addSubcommandGroup(group =>
        group.setName('users')
            .setDescription('Manage users')
            .addSubcommand(subcommand =>
                subcommand
                    .setName('get')
                    .setDescription('Get a user entry')
                    .addUserOption(option =>
                        option.setName('user')
                            .setDescription('User to get')
                            .setRequired(true)))
    );

export async function execute(interaction: CommandInteraction) {
    await interaction.deferReply({ ephemeral: true });

    const opts = interaction.options as CommandInteractionOptionResolver;
    const user = opts.getMember('user') as GuildMember;
    const group = opts.getSubcommandGroup();
    const subcommand = opts.getSubcommand();
    const combinedGroupCommand = group + ' ' + subcommand;

    if (!interaction.guild || !interaction.member) {
        return await interaction.editReply('This command must be used in a server.');
    }

    try {
        switch (combinedGroupCommand) {
            case 'users get':
                try {
                    const embed = await createProfileEmbed(user);
                    await interaction.editReply({ embeds: [embed] });
                } catch (error) {
                    await interaction.editReply(`User ${user.user.username} does not have a registered profile to retrieve.`);
                    break;
                }
                break;
            case 'membership check_user':
                let userEntry;
                try {
                    userEntry = await userService.findOneDiscord(user!.id);
                } catch (error) {
                    await interaction.editReply(`User ${user.user.username} does not have a registered profile to retrieve.`);
                    break;
                }

                try {
                    await userCodeService.findByUser(userEntry.uin);
                    await interaction.editReply(`${user?.displayName} is a member.`);
                } catch (error) {
                    await interaction.editReply(`${user?.displayName} is not a member.`);
                    break;
                }
                break;
            case 'membership check_code':
                const codeToCheck = opts.getString('code')!;

                try {
                    await confirmationCodeService.findOne(codeToCheck);
                } catch (error) {
                    await interaction.editReply(`Code ${codeToCheck} does not exist.`);
                    break;
                }

                try {
                    await userCodeService.findByCode(codeToCheck);
                    await interaction.editReply(`Code ${codeToCheck} has already been claimed.`);
                } catch (error) {
                    await interaction.editReply(`Code ${codeToCheck} has not been claimed.`);
                    break;
                }
                break;
            default:
                await interaction.editReply(`Unknown subcommand: ${subcommand}`);
                break;
        }
    } catch (error) {
        console.error(error);
        await interaction.editReply(`Failed to execute ${combinedGroupCommand} command`);
    }
}
