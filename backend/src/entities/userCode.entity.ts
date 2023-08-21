import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ConfirmationCode } from './confirmationCode.entity';
import { User } from './user.entity';
import { IsString } from 'class-validator';

@Entity('user_codes')
export class UserCode {
    @PrimaryColumn({ name: 'uin' })
    uin: string;

    @PrimaryColumn()
    code: string;

    @ManyToOne(() => User, user => user.uin)
    @JoinColumn({ name: "uin" })
    user: User;

    @ManyToOne(() => ConfirmationCode, code => code.code)
    @JoinColumn({ name: "code" })
    confirmationCode: ConfirmationCode;
}

export class UserCodeDto {
    @IsString()
    uin: string;

    @IsString()
    code: string;
}