import { RoleCommand } from "../models/roleCommand";

class RoleCommandCache {
    private static instance: RoleCommandCache;
    private cache: Map<string, string[]>;

    constructor() {
        this.cache = new Map<string, string[]>();
    }

    public static getInstance(): RoleCommandCache {
        if (!RoleCommandCache.instance) {
            RoleCommandCache.instance = new RoleCommandCache();
        }

        return RoleCommandCache.instance;
    }

    public async populate(roleCommands: RoleCommand[]): Promise<void> {
        roleCommands.forEach(roleCommand => {
            if (this.cache.has(roleCommand.role_id)) {
                this.cache.get(roleCommand.role_id)!.push(roleCommand.command_name);
            } else {
                this.cache.set(roleCommand.role_id, [roleCommand.command_name]);
            }
        });
    }

    public addCommand(roleCommand: RoleCommand): void {
        if (this.cache.has(roleCommand.role_id)) {
            this.cache.get(roleCommand.role_id)!.push(roleCommand.command_name);
        } else {
            this.cache.set(roleCommand.role_id, [roleCommand.command_name]);
        }
    }

    public removeCommand(roleCommand: RoleCommand): void {
        if (this.cache.has(roleCommand.role_id)) {
            const commands = this.cache.get(roleCommand.role_id)!;
            const index = commands.indexOf(roleCommand.command_name);
            if (index > -1) {
                commands.splice(index, 1);
            }
        } else {
            throw new Error(`Role ID ${roleCommand.role_id} does not exist`);
        }
    }

    public removeAll(role_id: string): void {
        this.cache.delete(role_id);
    }

    public get(role_id: string): string[] | undefined {
        return this.cache.get(role_id);
    }
}

export default RoleCommandCache.getInstance();