import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from '../app/api/checkout/route';

const sessionsCreate = vi.fn(async () => ({ url: '/success?session_id=cs_test' }));
const pricesList = vi.fn(async () => ({ data: [{ id: 'price_resolved' }] }));
const productsRetrieve = vi.fn(async () => ({ default_price: 'price_resolved' }));
const intentsSearch = vi.fn(async () => ({ data: [] }));

vi.mock('stripe', () => ({
  default: vi.fn().mockImplementation(() => ({
    checkout: { sessions: { create: sessionsCreate } },
    prices: { list: pricesList },
    products: { retrieve: productsRetrieve },
    paymentIntents: { search: intentsSearch },
  })),
}));

describe('POST /api/checkout', () => {
  beforeEach(() => {
    sessionsCreate.mockClear();
    pricesList.mockClear();
    productsRetrieve.mockClear();
    intentsSearch.mockClear();
    process.env.STRIPE_SECRET_KEY = 'sk_test_123';
    delete process.env.STRIPE_SHIPPING_RATE_ID;
  });

  it('creates a session for batch checkout with promotion codes and metadata', async () => {
    const req = new NextRequest('http://localhost/api/checkout', {
      method: 'POST',
      body: JSON.stringify({
        items: [
          { priceId: 'price_x', quantity: 2, metadata: { size: 'M', slug: 'two-tee', title: 'TWO TEE' } },
        ],
      }),
    } as any);
    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(sessionsCreate).toHaveBeenCalled();
    const args = sessionsCreate.mock.calls[0][0];
    expect(args.allow_promotion_codes).toBe(true);
    // When a priceId already starts with "price_", the API uses it as-is
    expect(args.line_items[0]).toMatchObject({ price: 'price_x', quantity: 2 });
    expect(args.metadata.cart).toBeTypeOf('string');
    const cart = JSON.parse(args.metadata.cart);
    // Compact cart: { p, s?, q, u?, c? } — c = color for per-colorway inventory
    expect(cart[0]).toMatchObject({ p: 'price_x', s: 'M', q: 2, u: 'two-tee' });
  });

  it('omits shipping_options for nepo-baby-tee (free shipping)', async () => {
    process.env.STRIPE_SHIPPING_RATE_ID = 'shr_paid_default';
    const req = new NextRequest('http://localhost/api/checkout', {
      method: 'POST',
      body: JSON.stringify({
        priceId: 'price_x',
        quantity: 1,
        metadata: { size: 'M', slug: 'nepo-baby-tee' },
      }),
    } as any);
    const res = await POST(req);
    expect(res.status).toBe(200);
    const args = sessionsCreate.mock.calls[0][0];
    expect(args.metadata.slug).toBe('nepo-baby-tee');
    expect(args.payment_intent_data.metadata.slug).toBe('nepo-baby-tee');
    expect(args.shipping_options).toBeUndefined();
    expect(args.shipping_address_collection).toEqual({ allowed_countries: ['US'] });
  });

  it('uses return_to for cancel_url when safe', async () => {
    const req = new NextRequest(
      'http://localhost/api/checkout?return_to=' + encodeURIComponent('/landing/nepo-baby-tee'),
      {
        method: 'POST',
        body: JSON.stringify({ priceId: 'price_x', quantity: 1, metadata: { size: 'M' } }),
      } as any
    );
    const res = await POST(req);
    expect(res.status).toBe(200);
    const args = sessionsCreate.mock.calls[0][0];
    expect(args.cancel_url).toBe('http://localhost/landing/nepo-baby-tee?canceled=1');
  });
});

