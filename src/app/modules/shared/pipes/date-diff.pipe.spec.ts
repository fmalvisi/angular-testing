import {DateDiffPipe} from './date-diff.pipe';

describe('DateDiffPipe', () => {
  it('create an instance', () => {
    const pipe = new DateDiffPipe();
    expect(pipe).toBeTruthy();
  });
  it('should trasform', ()=>{
    const pipe = new DateDiffPipe();
    let res = pipe.transform([]);
    expect(res).toEqual('');
  });
  it('should trasform tra pochi istanti', ()=>{
    const pipe = new DateDiffPipe();
    let res = pipe.transform([""]);
    expect(res).toEqual("tra pochi istanti");
  });
  it('should trasform 3 settimane fa', ()=>{
    const pipe = new DateDiffPipe();
    let res = pipe.transform(["2020-12-12", "2021-01-02"]);
    expect(res).toEqual('3 settimane fa');
  });
  it('should trasform tra un giorno', ()=>{
    const pipe = new DateDiffPipe();
    let res = pipe.transform(["2020-12-12", "2020-12-11"]);
    expect(res).toEqual('tra un giorno');
  });
  it('should trasform un giorno fa', ()=>{
    const pipe = new DateDiffPipe();
    let res = pipe.transform(["2020-12-12", "2020-12-13"]);
    expect(res).toEqual('un giorno fa');
  });
  it('should trasform tra un giorno', ()=>{
    const pipe = new DateDiffPipe();
    let res = pipe.transform(["2020-12-13", "2020-12-11"]);
    expect(res).toEqual('tra 2 giorni');
  });
  it('should trasform pochi istanti fa', ()=>{
    const pipe = new DateDiffPipe();
    let res = pipe.transform(["2020-12-13 20:20:20", "2020-12-13 20:21:00"]);
    expect(res).toEqual('pochi istanti fa');
  });
});
