import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('role_commands')
export class RoleCommand {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    role_id: string;

    @Column({ type: 'varchar', length: 255 })
    command_name: string;
}
