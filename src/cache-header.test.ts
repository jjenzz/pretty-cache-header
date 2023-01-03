import { cacheHeader } from './cache-header';

describe('cacheHeader', () => {
  it('accepts all values', () => {
    // prettier-ignore
    const result = cacheHeader({ maxAge: '1day', maxStale: '1day', minFresh: '1day', sMaxage: '1day', noCache: true, noStore: true, noTransform: true, onlyIfCached: true, mustRevalidate: true, proxyRevalidate: true, mustUnderstand: true, private: true, public: true, immutable: true, staleWhileRevalidate: '1day', staleIfError: '1day' });
    // prettier-ignore
    expect(result).toBe(['max-age=86400', 'max-stale=86400', 'min-fresh=86400', 's-maxage=86400', 'no-cache', 'no-store', 'no-transform', 'only-if-cached', 'must-revalidate', 'proxy-revalidate', 'must-understand', 'private', 'public', 'immutable', 'stale-while-revalidate=86400', 'stale-if-error=86400'].join(', '));
  });

  it('accepts partial', () => {
    const result = cacheHeader({ maxAge: '2min', public: true });
    expect(result).toBe('max-age=120, public');
  });

  it('strips false', () => {
    // @ts-expect-error
    const start = cacheHeader({ public: false, maxAge: '2min' });
    // @ts-expect-error
    const end = cacheHeader({ maxAge: '2min', public: false });
    // @ts-expect-error
    const middle = cacheHeader({ maxAge: '2min', public: false, sMaxage: '2min' });

    expect(start).toBe('max-age=120');
    expect(end).toBe('max-age=120');
    expect(middle).toBe('max-age=120, s-maxage=120');
  });

  it('errors with unexpected timestring', () => {
    // @ts-expect-error
    expect(() => cacheHeader({ maxAge: 'hello' })).toThrowError();
  });
});
