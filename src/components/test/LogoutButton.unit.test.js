import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import LogoutButton from '../LogoutButton';
import userEvent from '@testing-library/user-event';

// App router mock
const mockUseRouterPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockUseRouterPush,
  })
}))

describe('LogoutButton component test : ', () => {
  beforeEach(() => {
    render(
      <LogoutButton />
    )
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('styles', () => {
    const logoutTag = screen.getByText('logout');
    expect(logoutTag).toBeInTheDocument();
  })

  describe('onClick', () => {
    it('fetch, result: "OK"', async () => {
      const logoutTag = screen.getByText('logout');
      window.fetch = jest.fn().mockResolvedValue({
        text: async () => 'OK'
      })
      expect(mockUseRouterPush).toHaveBeenCalledTimes(0);
      await userEvent.click(logoutTag)
      expect(mockUseRouterPush).toHaveBeenCalledTimes(1);
    })
    it('fetch, result: "ERROR"', async () => {
      const logoutTag = screen.getByText('logout');
      window.fetch = jest.fn().mockResolvedValue({
        text: async () => 'ERROR'
      })
      expect(mockUseRouterPush).toHaveBeenCalledTimes(0);
      await userEvent.click(logoutTag);
      expect(mockUseRouterPush).toHaveBeenCalledTimes(0);
    })
  })
})