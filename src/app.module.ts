import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { ModulesModule } from './modules/modules.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './product/products.module';
import { ProvedoresModule } from './provedores/provedores.module';
import { ProvedorescategoryModule } from './provedorescategory/provedorescategory.module';
import { PaisModule } from './pais/pais.module';
import { CiudadModule } from './ciudad/ciudad.module';
import { ItemModule } from './item/item.module';
import { ItemproductoModule } from './itemproducto/itemproducto.module';
import { ComisionproductoModule } from './comisionproducto/comisionproducto.module';
import { ClientModule } from './client/client.module';
import { ModuleSeeder } from './seeds/module.seed';
import { Module as ModuleEntity } from './entity/module.entity';
import { ProductcategoryModule } from './productcategory/productcategory.module';
import { ImpuestosModule } from './impuestos/impuestos.module';
import { DescuentosModule } from './descuentos/descuentos.module';
import { ClientcategoryModule } from './clientcategory/clientcategory.module';
import { PaquetesModule } from './paquetes/paquetes.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // disable in production
    }),
    TypeOrmModule.forFeature([ModuleEntity]),
    AuthModule,
    UsersModule,
    RolesModule,
    ModulesModule,
    ProductsModule,
    ProvedoresModule,
    ProvedorescategoryModule,
    PaisModule,
    CiudadModule,
    ItemModule,
    ItemproductoModule,
    ComisionproductoModule,
    ClientModule,
    ProductcategoryModule,
    ImpuestosModule,
    DescuentosModule,
    ClientcategoryModule,
    PaquetesModule,
  ],
  controllers: [],
  providers: [ModuleSeeder],
  exports: [],
})
export class AppModule {}
