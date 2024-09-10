import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from 'src/entities/user.entity';
import { MailService } from 'src/mail/mail.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService, MailService],
    controllers: [UserController],
    exports: [UserService, TypeOrmModule],
})
export class UserModule { }
