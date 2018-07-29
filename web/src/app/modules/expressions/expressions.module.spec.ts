import { ExpressionsModule } from './expressions.module';

describe('ExpressionsModule', () => {
  let expressionsModule: ExpressionsModule;

  beforeEach(() => {
    expressionsModule = new ExpressionsModule();
  });

  it('should create an instance', () => {
    expect(expressionsModule).toBeTruthy();
  });
});
