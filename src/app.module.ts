import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { MailService } from './common/mail/mail.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { CategoriesModule } from './categories/categories.module';
import { FavoriteProductModule } from './favorite-product/favorite-product.module';
import { CartModule } from './cart/cart.module';
import { NotificationModule } from './notification/notification.module';
import { AddressModule } from './address/address.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
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
        url: process.env.MONGODB_URI, //configService.get<string>('MONGODB_URI'),
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
