import { ComicsRoutingModule } from './comics-routing.module';

describe('ComicsRoutingModule', () => {
  let comicsRoutingModule: ComicsRoutingModule;

  beforeEach(() => {
    comicsRoutingModule = new ComicsRoutingModule();
  });

  it('should create an instance', () => {
    expect(comicsRoutingModule).toBeTruthy();
  });
});
