import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ConfirmationCode } from './confirmationCode.entity';
import { User } from './user.entity';
import { IsString } from 'class-validator';

@Entity('user_codes')
export class UserCode {
    @PrimaryColumn({ name: 'discord_id' })
    discordId: string;

    @PrimaryColumn()
    code: string;

    @ManyToOne(() => User, user => user.discordId)
    @JoinColumn({ name: "discord_id" })
    user: User;

    @ManyToOne(() => ConfirmationCode, code => code.code)
    @JoinColumn({ name: "code" })
    confirmationCode: ConfirmationCode;
}

export class UserCodeDto {
    @IsString()
    discordId: string;

    @IsString()
    code: string;
}