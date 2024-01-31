import { GuildMember, Collection, Snowflake } from "discord.js";
import discordSettingCache from "../cache/discordSettingCache";

export async function getPurgableUsers(members: Collection<Snowflake, GuildMember>): Promise<GuildMember[]> {
    let kickedList: GuildMember[] = [];
    const roleIds: string[] = [
        discordSettingCache.get('student_role'),
        discordSettingCache.get('alumni_role'),
        discordSettingCache.get('guest_role')
    ].filter(Boolean) as string[];

    for (const member of members.values()) {
        if (!roleIds.some(id => member.roles.cache.has(id)) && !member.user.bot) {
            kickedList.push(member);
        }
    }

    return kickedList;
}