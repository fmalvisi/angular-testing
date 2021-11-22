import {DateDiffPipe} from './date-diff.pipe';

describe('DateDiffPipe', () => {
  it('create an instance', () => {
    const pipe = new DateDiffPipe();
    expect(pipe).toBeTruthy();
  });
  it('should do un giorno in futuro', () => {
    const pipe = new DateDiffPipe();
    let res = pipe.transform(["2020-01-02", "2020-01-01"]);
    expect(res).toEqual("tra un giorno");
  });
  it('should return empty value', () => {
    const pipe = new DateDiffPipe();
    let res = pipe.transform([]);
    expect(res).toEqual("");
  })
});
