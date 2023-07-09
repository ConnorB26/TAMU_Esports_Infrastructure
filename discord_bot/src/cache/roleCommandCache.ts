import { RoleCommand } from "../models/roleCommand";

export default class RoleCommandCache {
    private cache: Map<number, string[]>;

    constructor() {
        this.cache = new Map<number, string[]>();
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

    public get(role_id: number): string[] | undefined {
        return this.cache.get(role_id);
    }
}