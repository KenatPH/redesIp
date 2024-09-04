import { Test, TestingModule } from '@nestjs/testing';
import { ProvedoresController } from './provedores.controller';
import { ProvedoresService } from './provedores.service';

describe('ProvedoresController', () => {
  let controller: ProvedoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProvedoresController],
      providers: [ProvedoresService],
    }).compile();

    controller = module.get<ProvedoresController>(ProvedoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
