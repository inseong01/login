import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import LoginInputs from '../LoginInputs'

const dispatch = jest.fn();
const initError = jest.fn()
  .mockImplementationOnce(() => ({ // login
    id: false,
    password: false,
    name: false,
    msg: { id: '', password: '', name: '', current: '' },
  }))
  .mockImplementationOnce(() => ({
    id: true,
    password: true,
    name: false,
    msg: { id: '', password: '', name: '', current: '' },
  }))
  .mockImplementationOnce(() => ({ // signUp
    id: false,
    password: false,
    name: false,
    msg: { id: '', password: '', name: '', current: '' },
  }))
  .mockImplementationOnce(() => ({
    id: true,
    password: true,
    name: true,
    msg: { id: '', password: '', name: '', current: '' },
  }))
const testCase = [
  {
    title: 'login',
    otherType: 'signUp',
    error: 'No Error',
    totalErrorCount: 0,
  },
  {
    title: 'login',
    otherType: 'signUp',
    error: 'ID, Password Error',
    totalErrorCount: 1,
  },
  {
    title: 'signUp',
    otherType: 'login',
    error: 'No Error',
    totalErrorCount: 0,
  },
  {
    title: 'signUp',
    otherType: 'login',
    error: 'Name, ID, Password Error',
    totalErrorCount: 3,
  },
]

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn()
    .mockImplementationOnce(() => ({ state: { type: 'login' }, dispatch }))
    .mockImplementationOnce(() => ({ state: { type: 'login' }, dispatch }))
    .mockImplementationOnce(() => ({ state: { type: 'signUp' }, dispatch }))
    .mockImplementationOnce(() => ({ state: { type: 'signUp' }, dispatch })),
  useState: jest.fn()
    .mockImplementationOnce(() => ([initError(), () => { }]))
    .mockImplementationOnce(() => ([initError(), () => { }]))
    .mockImplementationOnce(() => ([initError(), () => { }]))
    .mockImplementationOnce(() => ([initError(), () => { }]))
}))


describe('LoginInputs Component test : ', () => {
  beforeEach(() => {
    render(<LoginInputs />)
  })

  for (let i = 0; i < testCase.length; i++) {
    const { title, error, totalErrorCount, otherType } = testCase[i]

    test(`${title} styles - ${error}(${totalErrorCount})`, () => {
      const firstTag = document.querySelector(`.${title}`);
      const secondTag = document.querySelector(`.${otherType}`);
      const errorTagCount = document.querySelectorAll('.error');
      expect(firstTag).toBeInTheDocument();
      expect(secondTag).not.toBeInTheDocument();
      expect(errorTagCount).toHaveLength(totalErrorCount);
    })
  }
})
