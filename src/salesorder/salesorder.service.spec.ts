import { Test, TestingModule } from '@nestjs/testing';
import { SalesorderService } from './salesorder.service';

describe('SalesorderService', () => {
  let service: SalesorderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalesorderService],
    }).compile();

    service = module.get<SalesorderService>(SalesorderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
