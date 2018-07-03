import { ReadableDurationPipe } from './readable-duration.pipe';

describe('ReadableDurationPipe', () => {
  const pipe = new ReadableDurationPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return more readable format', () => {
    expect(pipe.transform(60)).toBe('1 hour');
    expect(pipe.transform(110)).toBe('1 hour, 50 minutes');
  });
});
