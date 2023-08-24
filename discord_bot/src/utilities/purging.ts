import { GuildMember, Collection, Snowflake } from "discord.js";
import { purgeRoldIDs } from "./config";

const roleIds = purgeRoldIDs;

export async function getPurgableUsers(members: Collection<Snowflake, GuildMember>): Promise<GuildMember[]> {
    let kickedList: GuildMember[] = [];

    for (const member of members.values()) {
        if (!roleIds.some(id => member.roles.cache.has(id)) && !member.user.bot) {
            kickedList.push(member);
        }
    }

    return kickedList;
}