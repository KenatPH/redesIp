import { Test, TestingModule } from '@nestjs/testing';
import { ClientcategoryService } from './clientcategory.service';

describe('ClientcategoryService', () => {
  let service: ClientcategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientcategoryService],
    }).compile();

    service = module.get<ClientcategoryService>(ClientcategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
