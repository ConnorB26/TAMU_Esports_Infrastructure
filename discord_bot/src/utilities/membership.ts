import { Guild, GuildMember } from 'discord.js';
import DiscordSettingCache from '../cache/discordSettingCache';
import { create as createUserCode, removeId as removeUserCode } from '../services/userCodeService';
import { findOneDiscord as getUser } from '../services/userService';

export async function giveMembership(guild: Guild, member: GuildMember, code: string) {
    // If not registered, register
    let user;
    try {
        user = await getUser(member.id);
    } catch (error) {
        throw new Error('You need to register before claiming your membership. You can do so by using the command /register')
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
        throw new Error('You need to register and claim a membership before trying to unclaim it. You can do so by using the commands /register and /claim')
    }

    // Get the member role name from the cache
    const memberRoleName = DiscordSettingCache.get('member_role');
    if (!memberRoleName) {
        throw new Error('member_role setting not found');
    }

    // Remove the user's role
    const role = guild.roles.cache.find(role => role.name === memberRoleName);
    if (role) {
        await member.roles.remove(role);
    }

    // Remove from user code table
    await removeUserCode(user.uin);
}
