import { renderHook, act } from '@testing-library/react';
import { useCart } from '../app/components/useCart';

describe('useCart', () => {
  beforeEach(() => {
    localStorage.clear();
    // @ts-expect-error
    delete window.location; window.location = { href: '' } as any;
  });

  it('adds and merges items by priceId+size', () => {
    const { result } = renderHook(() => useCart());
    act(() => result.current.addItem({ priceId: 'price_1', quantity: 1, size: 'M', title: 'TWO TEE', slug: 'two-tee' }));
    act(() => result.current.addItem({ priceId: 'price_1', quantity: 2, size: 'M' }));
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(3);
  });

  it('updates and removes items', () => {
    const { result } = renderHook(() => useCart());
    act(() => result.current.addItem({ priceId: 'price_2', quantity: 1 }));
    act(() => result.current.updateItem(0, { quantity: 5 }));
    expect(result.current.items[0].quantity).toBe(5);
    act(() => result.current.removeItem(0));
    expect(result.current.items).toHaveLength(0);
  });

  it('checkout posts metadata and redirects', async () => {
    const { result } = renderHook(() => useCart());
    act(() => result.current.addItem({
      priceId: 'price_x',
      quantity: 1,
      size: 'L',
      slug: 'two-tee',
      title: 'TWO TEE'
    }));
    // mock fetch
    // @ts-ignore
    global.fetch = vi.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ url: '/success?session_id=cs_test' })
    })) as any;

    await act(async () => { await result.current.checkout(); });
    expect(fetch).toHaveBeenCalledWith('/api/checkout', expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }));
    const body = JSON.parse((fetch as any).mock.calls[0][1].body);
    expect(body.items[0].metadata).toMatchObject({
      size: 'L',
      slug: 'two-tee',
      title: 'TWO TEE',
      priceId: 'price_x'
    });
    expect((window.location as any).href).toContain('/success');
  });
});

