import { IsBoolean, IsString } from 'class-validator';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('confirmation_codes')
export class ConfirmationCode {
    @PrimaryColumn()
    code: string;

    @Column({ default: false })
    claimed: boolean;
}

export class ConfirmationCodeDto {
    @IsString()
    code: string;

    @IsBoolean()
    claimed: boolean;
}