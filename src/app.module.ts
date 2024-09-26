import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { MailService } from './mail/mail.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductModule } from './modules/product/product.module';
import { WarehouseModule } from './modules/warehouse/warehouse.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { FavoriteProductModule } from './modules/favorite-product/favorite-product.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables estén disponibles globalmente
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mongodb',
    //   url: ConfigService.get<string>('MONGODB_URL'),
    //   synchronize: true,
    //   useUnifiedTopology: true,
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
    // }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get<string>('MONGODB_URI'),
        synchronize: true,
        useUnifiedTopology: true,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
    }),
    UserModule,
    RoleModule,
    AuthModule,
    ProductModule,
    WarehouseModule,
    CategoriesModule,
    FavoriteProductModule
  ],
  providers: [MailService],
})
export class AppModule {}
