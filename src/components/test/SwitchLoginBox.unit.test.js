import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import SwitchLoginBox from '../SwitchLoginBox';
import userEvent from '@testing-library/user-event';
userEvent.setup();

let dispatchMockFn = jest.fn();

jest.mock('react', () => {
  const actualReact = jest.requireActual('react');
  return {
    ...actualReact,
    useContext: jest
      .fn()
      .mockImplementationOnce(() => ({ state: { type: 'login' }, dispatch: dispatchMockFn }))
      .mockImplementationOnce(() => ({ state: { type: 'signUp' }, dispatch: dispatchMockFn })),
  };
});

describe('SwitchLoginBox Component test : ', () => {
  beforeEach(() => {
    dispatchMockFn.mockClear();
  });

  test('Type: login, styles & onClick', async () => {
    render(<SwitchLoginBox />)
    const tag = screen.getByText('Create new account');
    // styles
    expect(tag).toHaveClass('switchBox');
    expect(tag).toHaveTextContent('Create new account');

    // functions
    expect(dispatchMockFn).not.toHaveBeenCalled();
    await userEvent.click(tag);
    expect(dispatchMockFn).toHaveBeenCalledWith({ type: 'SWITCH' });
  })
  test('Type: signUp,  styles & onClick', async () => {
    render(<SwitchLoginBox />)
    const tag = screen.getByText('Login your account');

    // styles
    expect(tag).toHaveClass('switchBox');
    expect(tag).toHaveTextContent('Login your account');

    // functions
    expect(dispatchMockFn).not.toHaveBeenCalled();
    await userEvent.click(tag);
    expect(dispatchMockFn).toHaveBeenCalledWith({ type: 'SWITCH' });
  })

})