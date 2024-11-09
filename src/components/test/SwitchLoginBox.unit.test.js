import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import SwitchLoginBox from '../SwitchLoginBox';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

describe('SwitchLoginBox Component test : ', () => {
  const mockStore = configureMockStore();
  let store;


  describe('Type: login', () => {
    beforeEach(() => {
      store = mockStore({
        formState: { type: 'login' },
        submitState: { submitStatus: '' },
      })
      store.dispatch = jest.fn();
      render(
        <Provider store={store}>
          <SwitchLoginBox />
        </Provider>
      )
    });

    it('styles', () => {
      const tag = screen.getByText('Create new account');
      expect(tag).toBeInTheDocument();
    })
    it('onClick', async () => {
      const tag = screen.getByText('Create new account');
      expect(store.dispatch).not.toHaveBeenCalled();
      await userEvent.click(tag);
      expect(store.dispatch).toHaveBeenCalledTimes(3);
    })
  })
  describe('Type: signUp', () => {
    beforeEach(() => {
      store = mockStore({
        formState: { type: 'signUp' },
        submitState: { submitStatus: '' },
      })
      store.dispatch = jest.fn();

      render(
        <Provider store={store}>
          <SwitchLoginBox />
        </Provider>
      )
    });

    it('styles', () => {
      const tag = screen.getByText('Login your account');
      expect(tag).toBeInTheDocument();
    })
    it('onClick', async () => {
      const tag = screen.getByText('Login your account');
      expect(store.dispatch).not.toHaveBeenCalled();
      await userEvent.click(tag);
      expect(store.dispatch).toHaveBeenCalledTimes(4);
    })
  })
})