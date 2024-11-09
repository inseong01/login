import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import ForgetLinkButton from '../ForgetLinkButton';
import { makeStore } from '@/lib/makeStore';

describe('ForgetLinkButton component test : ', () => {
  const store = makeStore();

  beforeEach(() => {
    render(
      <Provider store={store}>
        <ForgetLinkButton />
      </Provider>
    )
  })

  it('styles', () => {
    const tag = screen.getByText('Forget Password');
    expect(tag).toBeInTheDocument();
  })
})