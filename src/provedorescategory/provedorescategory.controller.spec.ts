import { Test, TestingModule } from '@nestjs/testing';
import { ProvedorescategoryController } from './provedorescategory.controller';
import { ProvedorescategoryService } from './provedorescategory.service';

describe('ProvedorescategoryController', () => {
  let controller: ProvedorescategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProvedorescategoryController],
      providers: [ProvedorescategoryService],
    }).compile();

    controller = module.get<ProvedorescategoryController>(ProvedorescategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
