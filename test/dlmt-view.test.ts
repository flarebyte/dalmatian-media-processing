import { DlmtView } from '../src/dlmt-view';

describe('dlmt-view', () => {
  it('should provide fromString', () => {
    const line = "view i:1 lang en-gb xy 1/2 -1/3 width 1 height 1/2 flags OC tags all but [ i:1, i:2 ] -> everything"
    expect(DlmtView.fromString(line).toString()).toStrictEqual(line)
  });
});
