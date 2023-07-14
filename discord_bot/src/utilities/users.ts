import { Guild, GuildMember, User } from 'discord.js';
import { create as createUser, remove as removeUser } from '../services/userService';

export async function registerUser(discordId: string) {
    // Add entry to users table
    await createUser({ discordId: discordId, hasPaidDues: false });
}

export async function unregisterUser(discordId: string) {
    // Remove entry from users table
    await removeUser(discordId);
}