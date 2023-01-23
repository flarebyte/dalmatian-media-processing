import { DlmtView } from '../src/dlmt-view.js';

describe('dlmt-view', () => {
  it('should provide fromString', () => {
    const line = "view i:1 lang en-gb xy 1/2 -1/3 width 1 height 1/2 flags OC tags all but [ i:1, i:2 ] -> everything"
    expect(DlmtView.fromString(line).toString()).toStrictEqual(line)
  });
  it('should accept tags', ()=> {
   const  common = "view i:1 lang en-gb xy 1/2 -1/3 width 1 height 1/2 flags OC "
    expect(DlmtView.fromString(common + "tags all but [ i:1, i:2 ] ->").acceptTags(set(["i:3", "i:4"]))).toBeTruthy()
    expect(DlmtView.fromString(common + "tags all but [ i:1, i:2 ] ->").acceptTags(set(["i:3","i:2"]))).toBeFalsy()
    expect(DlmtView.fromString(common + "tags none but [ i:3 ] ->").acceptTags(set(["i:3", "i:2"]))).toBeTruthy()
    expect(DlmtView.fromString(common + "tags none but [ i:3 ] ->").acceptTags(set(["i:4", "i:5"]))).toBeFalsy()

  });
});
