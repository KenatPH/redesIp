import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteProductController } from './favorite-product.controller';

describe('FavoriteProductController', () => {
  let controller: FavoriteProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoriteProductController],
    }).compile();

    controller = module.get<FavoriteProductController>(FavoriteProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
