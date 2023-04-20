async function updateResetDate(date, db) {
    await db.updateSettingByName('reset_date', date);
    return `Reset date updated: ${date}`;
}

async function updateMemberRole(roleId, db) {
    await db.updateSettingByName('member_role', roleId);
    return `Member role ID updated: ${roleId}`;
}

async function updateTwitchChannel(channel, db) {
    await db.updateSettingByName('twitch_notif_channel', channel);
    return `Twitch notification channel updated: ${channel}`;
}

async function updateTwitchRole(roleId, db) {
    await db.updateSettingByName('twitch_notif_role', roleId);
    return `Twitch notification role ID updated: ${roleId}`;
}

async function updateTwitterChannel(channel, db) {
    await db.updateSettingByName('twitter_notif_channel', channel);
    return `Twitter notification channel updated: ${channel}`;
}

async function updateTwitterRole(roleId, db) {
    await db.updateSettingByName('twitter_notif_role', roleId);
    return `Twitter notification role ID updated: ${roleId}`;
}

module.exports = {
    updateResetDate,
    updateMemberRole,
    updateTwitchChannel,
    updateTwitchRole,
    updateTwitterChannel,
    updateTwitterRole
};