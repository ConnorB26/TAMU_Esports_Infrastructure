import { DiscordSetting } from '../models/discordSetting';

class DiscordSettingCache {
    private static instance: DiscordSettingCache;
    private cache: Map<string, string>;

    constructor() {
        this.cache = new Map<string, string>();
    }

    public static getInstance(): DiscordSettingCache {
        if (!DiscordSettingCache.instance) {
            DiscordSettingCache.instance = new DiscordSettingCache();
        }

        return DiscordSettingCache.instance;
    }

    public async populate(settings: DiscordSetting[]): Promise<void> {
        settings.forEach(setting => this.cache.set(setting.name, setting.value));
    }

    public update(name: string, value: string): void {
        if (!this.cache.has(name)) {
            throw new Error(`Setting with name ${name} does not exist`);
        }
        this.cache.set(name, value);
    }

    public add(name: string, value: string): void {
        if (this.cache.has(name)) {
            throw new Error(`Setting with name ${name} already exists`);
        }
        this.cache.set(name, value);
    }

    public get(name: string): string | undefined {
        return this.cache.get(name);
    }

    public getAll(): { [key: string]: string } {
        let obj = Object.create(null);
        for (let [k, v] of this.cache) {
            obj[k] = v;
        }
        return obj;
    }
}

export default DiscordSettingCache.getInstance();