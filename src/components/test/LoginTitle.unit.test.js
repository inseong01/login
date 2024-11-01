import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import LoginTitle from '../LoginTitle';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn()
    .mockReturnValueOnce({ state: { type: 'login' } })
    .mockReturnValueOnce({ state: { type: 'signUp' } })
}))

describe('LoginTitle Component test : ', () => {
  beforeEach(() => {
    render(<LoginTitle />)
  })

  test('login title', () => {
    const tag = document.querySelector('span');
    expect(tag).toBeInTheDocument();
    expect(tag.textContent).toBe('Login Your Account');
  })

  test('signUp title', () => {
    const tag = document.querySelector('span');
    expect(tag).toBeInTheDocument();
    expect(tag.textContent).toBe('Create Your Account');
  })
})