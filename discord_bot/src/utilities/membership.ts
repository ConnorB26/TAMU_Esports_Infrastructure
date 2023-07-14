import { Guild, GuildMember } from 'discord.js';
import DiscordSettingCache from '../cache/discordSettingCache';
import { create as createUserCode, removeId as removeUserCode } from '../services/userCodeService';
import { findOne as getUser } from '../services/userService';
import { registerUser } from './users';

export async function giveMembership(guild: Guild, member: GuildMember, code: string) {
    const discordId = member.id;

    // If not registered, register
    try {
        await getUser(discordId);
    } catch (error) {
        registerUser(discordId);
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
    await createUserCode({ discordId: discordId, code });
}

export async function removeMembership(guild: Guild, member: GuildMember) {
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
    await removeUserCode(member.id);
}
