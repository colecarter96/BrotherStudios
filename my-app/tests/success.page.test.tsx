import { render, screen, waitFor } from '@testing-library/react';
import SuccessPage from '../app/success/page';

const sessionsRetrieve = vi.fn(async () => ({
  id: 'cs_test_123',
  amount_total: 12345,
  currency: 'usd',
  customer_details: { email: 'test@example.com' },
}));
const listLineItems = vi.fn(async () => ({
  data: [
    { description: 'TWO TEE', quantity: 2, amount_subtotal: 8000, currency: 'usd', price: { nickname: 'Two Tee' } },
    { description: 'BROTHER TEE', quantity: 1, amount_subtotal: 4345, currency: 'usd', price: { nickname: 'Brother Tee' } },
  ],
}));

vi.mock('stripe', () => ({
  default: vi.fn().mockImplementation(() => ({
    checkout: { sessions: { retrieve: sessionsRetrieve, listLineItems } },
  })),
}));

describe('SuccessPage', () => {
  beforeEach(() => {
    sessionsRetrieve.mockClear();
    listLineItems.mockClear();
    process.env.STRIPE_SECRET_KEY = 'sk_test_123';
    localStorage.setItem('tbs_cart_v1', JSON.stringify([{ priceId: 'price_x', quantity: 1 }])); // seed
  });

  it('renders order details and clears the cart on mount', async () => {
    const el = await SuccessPage({ searchParams: Promise.resolve({ session_id: 'cs_test_123' }) });
    render(el as any);

    // Order info appears
    expect(await screen.findByText(/Thanks for your order/i)).toBeInTheDocument();
    // Assert order id specifically to avoid partial match with the hero title
    expect(screen.getByText('cs_test_123')).toBeInTheDocument();
    expect(screen.getByText(/\$123\.45/)).toBeInTheDocument();
    expect(screen.getByText(/TWO TEE/i)).toBeInTheDocument();
    expect(screen.getByText(/BROTHER TEE/i)).toBeInTheDocument();

    // Cart cleared by client effect
    await waitFor(() => {
      expect(localStorage.getItem('tbs_cart_v1')).toBe('[]');
    });
  });
});

