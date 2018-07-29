import { ComicsModule } from './comics.module';

describe('ComicsModule', () => {
  let comicsModule: ComicsModule;

  beforeEach(() => {
    comicsModule = new ComicsModule();
  });

  it('should create an instance', () => {
    expect(comicsModule).toBeTruthy();
  });
});
