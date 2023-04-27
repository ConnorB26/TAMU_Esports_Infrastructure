const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Purge all members without the guest, student, or alumni roles'),
    async execute(interaction) {
        // Check if the user has admin permissions
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return await interaction.reply('You do not have permission to execute this command');
        }

        // Role ids for Student, Alumni, and Guest
        const roleIds = ['490790816889962506', '881711748560846848', '490790817754251264'];

        // Fetch all guild members
        const members = await interaction.guild.members.fetch();

        // Filter out the members who don't have any of the specified roles
        const membersWithoutRoles = members.filter(member => {
            return !roleIds.some(roleId => member.roles.cache.has(roleId));
        }).first(50);

        // Kick each member and send a private DM
        for (const member of membersWithoutRoles.values()) {
            try {
                await member.send('You have been kicked from the Texas A&M eSports server because you did not have any of the necessary roles determining your status within the server as a Student, Guest, or Alumni. If you feel like you should not have been kicked from the server, please feel free to rejoin: https://discord.gg/a-m-esports-490773969876549643');
                await member.kick({
                    reason: 'You did not have any of the necessary roles determining your status within the server as a Student, Guest, or Alumni.'
                });
            } catch (error) {
                console.error(`Error kicking member: ${error}`);
            }
        }

        //interaction.member.send('You have been kicked from the Texas A&M eSports server because you did not have any of the necessary roles determining your status within the server as a Student, Guest, or Alumni. If you feel like you should not have been kicked from the server, please feel free to rejoin: https://discord.gg/a-m-esports-490773969876549643');

        // Reply with the embed
        await interaction.reply(`${membersWithoutRoles.size} members have been purged`);
    },
};