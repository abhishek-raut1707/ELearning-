import { ExpressionsRoutingModule } from './expressions-routing.module';

describe('ExpressionsRoutingModule', () => {
  let expressionsRoutingModule: ExpressionsRoutingModule;

  beforeEach(() => {
    expressionsRoutingModule = new ExpressionsRoutingModule();
  });

  it('should create an instance', () => {
    expect(expressionsRoutingModule).toBeTruthy();
  });
});
