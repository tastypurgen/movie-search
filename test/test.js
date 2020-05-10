import { hideInterface, showInterface } from '../src/utils';

describe('some tests', () => {
  it('we need have a function to hide interface', () => {
    expect(hideInterface).toBeDefined();
  });
  it('alsowe need have a function to show interface', () => {
    expect(showInterface).toBeDefined();
  });
});
