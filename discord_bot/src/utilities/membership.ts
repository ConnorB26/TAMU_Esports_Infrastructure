import { Collection, Guild, GuildMember, Role, Snowflake, User } from 'discord.js';
import DiscordSettingCache from '../cache/discordSettingCache';
import { create as createUserCode, removeId as removeUserCode } from '../services/userCodeService';
import { findOneDiscord as getUser } from '../services/userService';
import { findOne as findCode } from '../services/confirmationCodeService';

export async function giveMembership(guild: Guild, member: GuildMember, code: string) {
    // If not registered, register
    let user;
    try {
        user = await getUser(member.id);
    } catch (error) {
        throw new Error('You need to register before claiming your membership. You can do so by using the command /register');
    }

    // Check if code has been added
    try {
        await findCode(code);
    } catch (error) {
        throw new Error('The code you are trying to claim is not in the database');
    }

    // Get the member role name from the cache
    const memberRoleId = DiscordSettingCache.get('member_role');
    if (!memberRoleId) {
        throw new Error('member_role setting not found');
    }

    // Give the user the role
    const role = guild.roles.cache.find(role => role.id === memberRoleId);
    if (!role) {
        throw new Error('Member role not found in guild');
    }
    await member.roles.add(role);

    // Add to user code table
    await createUserCode({ uin: user.uin, code });
}

export async function removeMembership(guild: Guild, member: GuildMember) {
    // Get user UIN
    let user;
    try {
        user = await getUser(member.id);
    } catch (error) {
        throw new Error('You need to register and claim a membership before trying to unclaim it. You can do so by using the commands /profile register and /membership claim');
    }

    // Get the member role name from the cache
    const memberRoleId = DiscordSettingCache.get('member_role');
    if (!memberRoleId) {
        throw new Error('member_role setting not found');
    }

    // Remove the user's role
    const role = guild.roles.cache.find(role => role.id === memberRoleId);
    if (role) {
        await member.roles.remove(role);
    }

    // Remove from user code table
    await removeUserCode(user.uin);
}

export async function resetMembershipRoles(guild: Guild, discordIDs: string[]) {
    // Get the member role name from the cache
    const memberRoleId = DiscordSettingCache.get('member_role');
    if (!memberRoleId) {
        throw new Error('member_role setting not found');
    }

    // Find the role in the guild
    const role = guild.roles.cache.find(role => role.id === memberRoleId);
    if (!role) {
        throw new Error('member_role not found in the guild');
    }

    // Iterate over each Discord ID and remove the role
    for (const id of discordIDs) {
        try {
            const member = await guild.members.fetch(id);
            if (member && member.roles.cache.has(memberRoleId)) {
                await member.roles.remove(role);
            }
        } catch (error) {

        }
    }
}

export async function resetAllMemberRoles(guild: Guild) {
    // Get the member role name from the cache
    const memberRoleId = DiscordSettingCache.get('member_role');
    if (!memberRoleId) {
        throw new Error('member_role setting not found');
    }

    // Find the role in the guild
    const role = guild.roles.cache.find(role => role.id === memberRoleId);
    if (!role) {
        throw new Error('member_role not found in the guild');
    }

    let counter = 0;
    role.members.forEach((member: GuildMember) => {
        setTimeout(() => {
            member.roles.remove(role);
            console.log(`Removed member role from ${member.displayName}`);
        }, counter * 1000);
        counter++;
    });
}

export async function getUnpaidDuesList(guild: Guild, specificRole?: Role): Promise<Map<User, Role[]>> {
    let teamRoles: Role[];

    if (specificRole) {
        teamRoles = [specificRole];
    } else {
        // Get all "Team ____" roles
        const TEAM_ROLE_PATTERN = /^Team\s\w+/;
        teamRoles = [...guild.roles.cache.filter(role => TEAM_ROLE_PATTERN.test(role.name) && role.name != 'Team Captain' && role.name != 'Team Fight Tactics' && role.name != 'Team Manager').values()];
    }
    // Get the member role name from the cache
    const memberRoleId = DiscordSettingCache.get('member_role');
    if (!memberRoleId) {
        throw new Error('member_role setting not found');
    }

    // Get all users that have a team role but haven't paid dues
    const nonMembers: Map<User, Role[]> = new Map();

    for (const teamRole of teamRoles) {
        for (const [, member] of teamRole.members) {
            // Check if the member is already in the nonMembers list to avoid unnecessary computations
            if (nonMembers.has(member.user)) continue;

            const memberRoles = [...member.roles.cache.values()];

            if (memberRoles.some(role => role.id === DiscordSettingCache.get('student_role')) && !memberRoles.some(role => role.id === memberRoleId)) {
                const memberTeamRoles = memberRoles.filter(role => teamRoles.includes(role));
                if (memberTeamRoles.length) {
                    nonMembers.set(member.user, memberTeamRoles);
                }
            }
        }
    }

    return nonMembers;
}
