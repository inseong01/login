import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import DeleteAccountButton from '../user/DeleteAccountButton'
import userEvent from '@testing-library/user-event'

// App router mock
const mockUseRouter = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => {
    return {
      push: mockUseRouter
    }
  }
}))

describe('DeleteAccountButton component test : ', () => {
  beforeEach(() => {
    render(<DeleteAccountButton />)
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('styles', () => {
    const tag = screen.getByText('delete account');
    expect(tag).toBeInTheDocument();
  })

  describe('onClick fetch', () => {
    it('result: "OK"', async () => {
      const tag = screen.getByText('delete account');
      // fetch mock
      window.fetch = jest.fn().mockResolvedValue({
        text: async () => 'OK',
      });

      expect(mockUseRouter).toHaveBeenCalledTimes(0);
      await userEvent.click(tag);
      expect(mockUseRouter).toHaveBeenCalledTimes(1);
    })
    it('result: "ERROR"', async () => {
      const tag = screen.getByText('delete account');
      // fetch mock
      window.fetch = jest.fn().mockResolvedValue({
        text: async () => 'ERROR',
      });

      expect(mockUseRouter).toHaveBeenCalledTimes(0);
      await userEvent.click(tag);
      expect(mockUseRouter).toHaveBeenCalledTimes(0);
    })
  })
})