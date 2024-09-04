import { Test, TestingModule } from '@nestjs/testing';
import { ProvedorescategoryService } from './provedorescategory.service';

describe('ProvedorescategoryService', () => {
  let service: ProvedorescategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProvedorescategoryService],
    }).compile();

    service = module.get<ProvedorescategoryService>(ProvedorescategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
