import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Module } from 'src/entity/module.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ModuleSeeder {
  constructor(
    @InjectRepository(Module)
    private readonly moduleRepository: Repository<Module>,
  ) {}

  async run() {
    const modules = [
      { titulo: 'Usuarios', icono: 'AiOutlineUser', path: '/usuarios' },
      {
        titulo: 'Clientes',
        icono: 'MdOutlineSupervisorAccount',
        path: '/clientes',
      },
      {
        titulo: 'Categorias',
        icono: 'MdOutlineBusinessCenter',
        path: '/categorias',
      },
      {
        titulo: 'Proveedores',
        icono: 'MdOutlineAssignment',
        path: '/proveedor',
      },
      { titulo: 'Paquetes', icono: 'MdOutlineReceiptLong', path: '/paquetes' },
      {
        titulo: 'FormasDePago',
        icono: 'MdOutlinePriceChange',
        path: '/paymentForms',
      },
      { titulo: 'Impuestos', icono: 'MdOutlinePoll', path: '/impuestos' },
      {
        titulo: 'Cotizaciones',
        icono: 'MdOutlineAddCard',
        path: '/cotizaciones',
      },
      { titulo: 'Ventas', icono: 'MdOutlinePriceCheck', path: '/ventas' },
      { titulo: 'Tasa', icono: 'MdOutlineEqualizer', path: '/tasa' },
    ];

    for (let i = 0; i < modules.length; i++) {
      const existingModule = await this.moduleRepository.findOne({
        where: { titulo: modules[i].titulo },
      });

      if (!existingModule) {
        await this.moduleRepository.save({
          titulo: modules[i].titulo,
          icono: modules[i].icono,
          path: modules[i].path,
          order: i + 1,
        });
      }
    }
  }
}
