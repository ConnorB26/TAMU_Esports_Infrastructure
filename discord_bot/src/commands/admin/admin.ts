import { CommandInteraction, CommandInteractionOptionResolver, GuildMember, Role, SlashCommandBuilder } from "discord.js";
import { createProfileEmbed } from "../../utilities/users";
import * as userCodeService from '../../services/userCodeService';
import * as confirmationCodeService from '../../services/confirmationCodeService';
import * as userService from '../../services/userService';
import { getUnpaidDuesList } from "../../utilities/membership";

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
            .addSubcommand(subcommand =>
                subcommand
                    .setName('check_all')
                    .setDescription(`Get a list of all competitive team members who haven't paid their dues`)
                    .addRoleOption(option =>
                        option.setName('role')
                            .setDescription('Specific team role to get list from')
                            .setRequired(false)))
            .addSubcommand(subcommand =>
                subcommand
                    .setName('create_code')
                    .setDescription('Create a code for people in need of financial aid for their memberships')
                    .addUserOption(option =>
                        option.setName('user')
                            .setDescription('User for whome to generate the code for')
                            .setRequired(true)))
            .addSubcommand(subcommand =>
                subcommand
                    .setName('message_all')
                    .setDescription(`Message all of the competitive team members who haven't paid their dues`)
                    .addRoleOption(option =>
                        option.setName('role')
                            .setDescription('Specific team role to message')
                            .setRequired(false)))
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
    const role = opts.getRole('role') as Role | undefined;
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
            case 'membership check_all':
                let csvData: string = 'Username,Team(s)\n';
                const unpaidUsersCheck = await getUnpaidDuesList(interaction.guild, role);

                unpaidUsersCheck.forEach((roles, user) => {
                    const rolesNames = roles.map(role => role.name).join(' | ');
                    csvData += `"${user.username}","${rolesNames}"\n`;
                });

                if (csvData === '')
                    break;

                const buffer = Buffer.from(csvData, 'utf8');
                await interaction.editReply({ files: [{ attachment: buffer, name: 'users_missing_dues.csv' }] });
                break;
            case 'membership message_all':
                const unpaidUsersMsg = await getUnpaidDuesList(interaction.guild, role);

                let errorList: string[] = [];
                unpaidUsersMsg.forEach(async (roles, user) => {
                    try {
                        await user.send(`Howdy ${user.username},\n\nYou are receiving this message because you have not obtained the member status for Texas A&M Esports as a player in a one of the competitive teams. Please remember to complete the dues process as it is a requirement for our teams.\n\nIf you've already paid, don't forget to follow the steps to register with the bot by following the instructions here: https://discord.com/channels/490773969876549643/1148675227476295860/1148685606948450316.\n\nIf you've had a conversation in private with President Alex or Vice President Pierce, you can disregard this message.`);
                    } catch (err) {
                        errorList.push(user.username);
                    }
                });

                await interaction.editReply(`All team members who have not paid dues have been messaged${errorList.length > 0 ? `, except for: ${errorList.join(',')}` : ''}.`)
                break;
            case 'membership create_code':
                const financialAidUser = opts.getUser('user');
                const codeName = financialAidUser?.username + '_financialaid';

                try {
                    await confirmationCodeService.create({
                        code: codeName,
                        claimed: false
                    });
                }
                catch (err) {
                    await interaction.editReply(`A financial aid code for '${financialAidUser?.username}' has already been generated before. Code: \`${codeName}\``);
                    return;
                }

                await user?.send(`Howdy ${financialAidUser?.username}! You have been granted financial aid for Texas A&M Esports. To activate it, claim the following code like you would claim your membership normally: \`${codeName}\`. Keep in mind that this is only for the current semester and another request will have to be made and reviewed for future semesters.`)

                await interaction.editReply(`Generated dues code '${codeName}' and sent it to the specified user.`);
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
