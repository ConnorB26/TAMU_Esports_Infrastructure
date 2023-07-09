import { DiscordSetting } from '../models/discordSetting';

export default class DiscordSettingCache {
    private cache: Map<string, string>;

    constructor() {
        this.cache = new Map<string, string>();
    }

    public async populate(settings: DiscordSetting[]): Promise<void> {
        settings.forEach(setting => this.cache.set(setting.name, setting.value));
    }

    public update(setting: DiscordSetting): void {
        if (!this.cache.has(setting.name)) {
            throw new Error(`Setting with name ${setting.name} does not exist`);
        }
        this.cache.set(setting.name, setting.value);
    }

    public get(name: string): string | undefined {
        return this.cache.get(name);
    }    
}
