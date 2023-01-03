# pretty-cache-header

Cache-control header utility that parses human readable time strings into seconds.

Time based values use [Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html) to help avoid passing invalid time string formats.

## Installation

```sh
npm i pretty-cache-header
```

## Usage

```node
import { cacheHeader } from 'pretty-cache-header';

return new Response(..., {
  headers: {
    // sets cache control header to "public, max-age=604800, stale-while-revalidate=31536000"
    'Cache-Control': cacheHeader({
      public: true,
      maxAge: '1week',
      staleWhileRevalidate: '1year'
    })
  }
})
```

### TimeString format

Any number followed by a timestring keyword:

1. `ms`, `milli`, `millisecond`, `milliseconds` - will parse to milliseconds
2. `s`, `sec`, `secs`, `second`, `seconds` - will parse to seconds
3. `m`, `min`, `mins`, `minute`, `minutes` - will parse to minutes
4. `h`, `hr`, `hrs`, `hour`, `hours` - will parse to hours
5. `d`, `day`, `days` - will parse to days
6. `w`, `week`, `weeks` - will parse to weeks
7. `mon`, `mth`, `mths`, `month`, `months` - will parse to months
8. `y`, `yr`, `yrs`, `year`, `years` - will parse to years
