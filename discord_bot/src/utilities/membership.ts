import { Guild, GuildMember } from 'discord.js';
import DiscordSettingCache from '../cache/discordSettingCache';
import { create as createUserCode, removeId as removeUserCode } from '../services/userCodeService';
import { findOneDiscord as getUser, removeDiscord as removeUser } from '../services/userService';
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
    } catch(error) {
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
        throw new Error('You need to register and claim a membership before trying to unclaim it. You can do so by using the commands /register and /claim');
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

export async function cleanupMembership(discordID: string) {
    let user;
    try {
        user = await getUser(discordID);
    } catch (error) {

    }

    if (user) {
        try {
            await removeUserCode(user.uin);
            await removeUser(discordID);
        } catch (error) {

        }
    }
}