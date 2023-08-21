import * as discordSettingService from '../services/discordSettingService';
import * as roleCommandService from '../services/roleCommandService';
import DiscordSettingCache from '../cache/discordSettingCache';
import RoleCommandCache from '../cache/roleCommandCache';

export async function populateCaches() {
    try {
        // Get data from the services
        const discordSettings = await discordSettingService.findAll();
        const roleCommands = await roleCommandService.findAll();

        // Populate caches
        DiscordSettingCache.populate(discordSettings);
        RoleCommandCache.populate(roleCommands);
        
        console.log('Cache has been populated successfully!');
    } catch (error) {
        console.error('Failed to populate the cache:', error);
    }
}
