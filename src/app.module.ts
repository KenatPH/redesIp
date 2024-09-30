import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { MailService } from './common/mail/mail.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductModule } from './modules/product/product.module';
import { WarehouseModule } from './modules/warehouse/warehouse.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { FavoriteProductModule } from './modules/favorite-product/favorite-product.module';
import { CartModule } from './modules/cart/cart.module';
import { NotificationModule } from './modules/notification/notification.module';
import { AddressModule } from './modules/address/address.module';
import { PaymentMethodModule } from './modules/payment-method/payment-method.module';
import { EncryptionService } from './common/encryption/encryption.service';
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
    FavoriteProductModule,
    CartModule,
    NotificationModule,
    AddressModule,
    PaymentMethodModule
  ],
  providers: [MailService, EncryptionService],
})
export class AppModule {}
