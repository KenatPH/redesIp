import { Test, TestingModule } from '@nestjs/testing';
import { ComisionproductoService } from './comisionproducto.service';

describe('ComisionproductoService', () => {
  let service: ComisionproductoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComisionproductoService],
    }).compile();

    service = module.get<ComisionproductoService>(ComisionproductoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
