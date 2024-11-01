import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react';
import SubmitButton from '../SubmitButton';

const dispatchMockFn = jest.fn();

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(() => ({ dispatch: dispatchMockFn }))
}))

describe('SubmitButton Component test : ', () => {
  test('styles', () => {
    render(<SubmitButton />)
    const submitInput = document.querySelector('input');
    expect(submitInput).toBeVisible();
    expect(submitInput.value).toBe('SUBMIT');
    expect(submitInput).toHaveClass('btn');
  })

  test('onSubmit is active', async () => {
    render(<SubmitButton />)
    const submitInput = document.querySelector('input');
    expect(dispatchMockFn).toHaveBeenCalledTimes(0);
    // userEvent, onSubmit 검사 제한됨
    fireEvent.submit(submitInput);
    expect(dispatchMockFn).toHaveBeenCalledWith({ type: 'CLICK_SUBMIT' })
    expect(dispatchMockFn).toHaveBeenCalledTimes(1);
  })
})