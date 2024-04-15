import { Test, TestingModule } from '@nestjs/testing';
import { CommentsornotesController } from './commentsornotes.controller';

describe('CommentsornotesController', () => {
  let controller: CommentsornotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsornotesController],
    }).compile();

    controller = module.get<CommentsornotesController>(CommentsornotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
