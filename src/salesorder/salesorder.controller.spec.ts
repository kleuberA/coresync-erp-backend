import { Test, TestingModule } from '@nestjs/testing';
import { SalesorderController } from './salesorder.controller';

describe('SalesorderController', () => {
  let controller: SalesorderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesorderController],
    }).compile();

    controller = module.get<SalesorderController>(SalesorderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
