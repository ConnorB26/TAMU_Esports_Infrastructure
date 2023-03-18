async function printUsers(db) {
    const users = await db.getAllUsers();
    let result = "Users:\n";
    users.forEach(user => {
        result += `Email: ${user.email}, Name: ${user.name}, Discord ID: ${user.discordId}\n`;
    });
    return result;
}

async function printInfo(db) {
    const infos = await db.getAllInfo();
    let result = "Info:\n";
    infos.forEach(info => {
        result += `Key: ${info.info}, Value: ${info.value}\n`;
    });
    return result;
}

async function addUser(email, name, discordId, db) {
    await db.createUser({ email, name, discordId });
    return `User added: Email: ${email}, Name: ${name}, Discord ID: ${discordId}`;
}

async function editUser(email, newName, newDiscordId, db) {
    const updates = {};
    if (newName) updates.name = newName;
    if (newDiscordId) updates.discordId = newDiscordId;
  
    await db.updateUserByEmail(email, updates);
  
    const responseParts = [`User updated: Email: ${email}`];
    if (newName) responseParts.push(`New Name: ${newName}`);
    if (newDiscordId) responseParts.push(`New Discord ID: ${newDiscordId}`);
    
    return responseParts.join(', ');
  }  

async function removeUser(email, db) {
    await db.deleteUserByEmail(email);
    return `User removed: Email: ${email}`;
}

async function findUser(email, db) {
    const user = await db.findUserByEmail(email);
    if (user) {
        return `User found: Email: ${user.email}, Name: ${user.name}, Discord ID: ${user.discordId}`;
    } else {
        return `User not found: Email: ${email}`;
    }
}

async function updateResetDate(date, db) {
    await db.updateInfoEntry('reset_date', date);
    return `Reset date updated: ${date}`;
}

async function updateMemberRole(roleId, db) {
    await db.updateInfoEntry('member_role', roleId);
    return `Member role ID updated: ${roleId}`;
}

async function updateTwitchChannel(channel, db) {
    await db.updateInfoEntry('twitch_notif_channel', channel);
    return `Twitch notification channel updated: ${channel}`;
}

async function updateTwitchRole(roleId, db) {
    await db.updateInfoEntry('twitch_notif_role', roleId);
    return `Twitch notification role ID updated: ${roleId}`;
}

async function updateTwitterChannel(channel, db) {
    await db.updateInfoEntry('twitter_notif_channel', channel);
    return `Twitter notification channel updated: ${channel}`;
}

async function updateTwitterRole(roleId, db) {
    await db.updateInfoEntry('twitter_notif_role', roleId);
    return `Twitter notification role ID updated: ${roleId}`;
}

module.exports = {
    printUsers,
    printInfo,
    addUser,
    editUser,
    removeUser,
    findUser,
    updateResetDate,
    updateMemberRole,
    updateTwitchChannel,
    updateTwitchRole,
    updateTwitterChannel,
    updateTwitterRole
};