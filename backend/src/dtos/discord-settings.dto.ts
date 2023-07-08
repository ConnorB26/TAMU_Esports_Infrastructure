import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class DiscordSettingDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    value: string;
}
