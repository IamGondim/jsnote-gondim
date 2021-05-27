import { getMaxWidth } from "./getMaxWidth";

describe('getMaxWidth', () => {
  it('should get 75% of the window size', () => {
    expect(getMaxWidth(1000)).toEqual(750);
    expect(getMaxWidth(10000)).toEqual(7500);
  });
});