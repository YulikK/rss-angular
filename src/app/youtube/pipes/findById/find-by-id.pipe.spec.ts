import { FindByIdPipe } from './find-by-id.pipe';

describe('FindByIdPipe', () => {
  it('create an instance', () => {
    const pipe = new FindByIdPipe();
    expect(pipe).toBeTruthy();
  });
});
