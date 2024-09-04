import { Test, TestingModule } from '@nestjs/testing';
import { ClientcategoryController } from './clientcategory.controller';
import { ClientcategoryService } from './clientcategory.service';

describe('ClientcategoryController', () => {
  let controller: ClientcategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientcategoryController],
      providers: [ClientcategoryService],
    }).compile();

    controller = module.get<ClientcategoryController>(ClientcategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
