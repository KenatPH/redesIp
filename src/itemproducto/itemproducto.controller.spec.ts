import { Test, TestingModule } from '@nestjs/testing';
import { ItemproductoController } from './itemproducto.controller';
import { ItemproductoService } from './itemproducto.service';

describe('ItemproductoController', () => {
  let controller: ItemproductoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemproductoController],
      providers: [ItemproductoService],
    }).compile();

    controller = module.get<ItemproductoController>(ItemproductoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
