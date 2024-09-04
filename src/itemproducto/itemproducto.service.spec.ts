import { Test, TestingModule } from '@nestjs/testing';
import { ItemproductoService } from './itemproducto.service';

describe('ItemproductoService', () => {
  let service: ItemproductoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemproductoService],
    }).compile();

    service = module.get<ItemproductoService>(ItemproductoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
