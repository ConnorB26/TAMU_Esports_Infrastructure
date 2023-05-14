const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField } = require('discord.js');

// Helper function to create a delay
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Purge all members without the guest, student, or alumni roles'),
    async execute(interaction) {
        // Check if the user has admin permissions
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator) && !interaction.member.user.username === 'Hockeyflame') {
            return await interaction.reply('You do not have permission to execute this command');
        }

        await interaction.deferReply();

        const roleIds = ['490790816889962506', '881711748560846848', '490790817754251264', '490786632383987734'];
        const members = await interaction.guild.members.fetch();

        const membersWithoutRoles = members.filter(member => {
            return !roleIds.some(roleId => member.roles.cache.has(roleId));
        });

        const kickList = [...membersWithoutRoles.values()].slice(0, 500);

        // Kick each member and send a private DM
        for (const member of kickList) {
            try {
                await member.send('You have been kicked from the Texas A&M eSports server because you did not have any of the necessary roles determining your status within the server as a Student, Guest, or Alumni. If you feel like you should not have been kicked from the server, please feel free to rejoin: https://discord.gg/tamuesports');
                await member.kick({
                    reason: 'You did not have any of the necessary roles determining your status within the server as a Student, Guest, or Alumni.'
                });
                console.log(`${member.user.username} has been kicked`);
                //await sleep(2000);
            } catch (error) {
                console.error(`Error kicking member ${member.user.username}: ${error}`);
            }
        }

        await interaction.editReply(`${kickList.length} members have been purged`);
    },
};