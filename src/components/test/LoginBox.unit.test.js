import { makeStore } from '@/lib/makeStore';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import LoginBox from '../LoginBox';

// DOM mock
jest.mock('../Top', () => () => <div>Top</div>)
jest.mock('../Middle', () => () => <div>Middle</div>)
jest.mock('../Bottom', () => () => <div>Bottom</div>)
// App router mock
const mockUseRouterPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockUseRouterPush
  })
}))

describe('LoginBox component test : ', () => {
  const store = makeStore();

  beforeEach(() => {
    render(
      <Provider store={store}>
        <LoginBox />
      </Provider>
    )
  })

  it('styles', () => {
    const formTag = document.getElementById('loginForm');
    const topTag = screen.getByText('Top');
    const middleTag = screen.getByText('Middle');
    const bottomTag = screen.getByText('Bottom');
    expect(formTag).toBeInTheDocument();
    expect(topTag).toBeInTheDocument();
    expect(middleTag).toBeInTheDocument();
    expect(bottomTag).toBeInTheDocument();
  })

  describe('submit type: "login"', () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    })

    it('fetch, result: "OK"', async () => {
      const formTag = document.getElementById('loginForm');
      window.fetch = jest.fn()
        .mockResolvedValue({
          ok: true,
          status: 200,
          text: async () => 'OK'
        })

      expect(mockUseRouterPush).toHaveBeenCalledTimes(0);
      fireEvent.submit(formTag);
      await waitFor(() =>
        expect(mockUseRouterPush).toHaveBeenCalledTimes(1),
        { timeout: 2000 }
      );
    })
    it('fetch, result: "ERROR"', async () => {
      const formTag = document.getElementById('loginForm');
      window.fetch = jest.fn()
        .mockResolvedValue({
          ok: true,
          status: 200,
          text: async () => 'ERROR'
        })

      expect(mockUseRouterPush).toHaveBeenCalledTimes(0);
      fireEvent.submit(formTag);
      await waitFor(() =>
        expect(mockUseRouterPush).toHaveBeenCalledTimes(0),
        { timeout: 2000 }
      );
    })
  })
})