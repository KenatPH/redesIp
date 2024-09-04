import { Test, TestingModule } from '@nestjs/testing';
import { ComisionproductoController } from './comisionproducto.controller';
import { ComisionproductoService } from './comisionproducto.service';

describe('ComisionproductoController', () => {
  let controller: ComisionproductoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComisionproductoController],
      providers: [ComisionproductoService],
    }).compile();

    controller = module.get<ComisionproductoController>(ComisionproductoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
