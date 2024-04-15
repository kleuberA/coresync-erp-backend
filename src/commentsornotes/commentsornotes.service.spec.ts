import { Test, TestingModule } from '@nestjs/testing';
import { CommentsornotesService } from './commentsornotes.service';

describe('CommentsornotesService', () => {
  let service: CommentsornotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentsornotesService],
    }).compile();

    service = module.get<CommentsornotesService>(CommentsornotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
