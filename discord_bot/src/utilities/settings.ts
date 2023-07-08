type SettingsType = { [key: string]: any };

let settings: SettingsType = {};

export function initializeSettings(newSettings: SettingsType) {
    settings = newSettings;
}

export function updateSetting(key: string, value: any) {
    settings[key] = value;
}

export function getSetting(key: string) {
    return settings[key];
}