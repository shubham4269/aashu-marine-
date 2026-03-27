/**
 * Preservation Property Tests - Property 2: Null and Empty Input Handling
 *
 * These tests verify that for all inputs where the bug condition does NOT hold
 * (null, falsy, empty array), getImageUrl and getVideoUrl return the same result
 * as the original functions — null for null/falsy input, [] for empty arrays.
 *
 * EXPECTED OUTCOME: Tests PASS on unfixed code (confirms baseline behavior to preserve).
 *
 * Validates: Requirements 3.1, 3.2, 3.3, 3.4
 *
 * **Validates: Requirements 3.1, 3.2, 3.3, 3.4**
 */

import fc from 'fast-check';
import { getImageUrl, getVideoUrl } from './fileStorage.js';

describe('Preservation Property 2 - Null and Empty Input Handling', () => {
  // ── Observation-first: confirm baseline behavior on unfixed code ──────────

  describe('Observed baseline behavior (unfixed code)', () => {
    test('getImageUrl(null) returns null', () => {
      expect(getImageUrl(null)).toBeNull();
    });

    test('getVideoUrl(null) returns null', () => {
      expect(getVideoUrl(null)).toBeNull();
    });

    test('getImageUrl([]) returns []', () => {
      const result = getImageUrl([]);
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(0);
    });

    test('getVideoUrl([]) returns []', () => {
      const result = getVideoUrl([]);
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(0);
    });

    test('getImageUrl("") returns null (falsy empty string)', () => {
      expect(getImageUrl('')).toBeNull();
    });
  });

  // ── Property-based tests: null/falsy inputs always return null ────────────

  describe('Property: null/falsy inputs always return null', () => {
    /**
     * For any falsy value (null, undefined, 0, false, ""), getImageUrl returns null.
     * **Validates: Requirements 3.1, 3.2, 3.3, 3.4**
     */
    test('getImageUrl returns null for any falsy input', () => {
      const falsyArbitrary = fc.oneof(
        fc.constant(null),
        fc.constant(undefined),
        fc.constant(''),
        fc.constant(0),
        fc.constant(false)
      );

      fc.assert(
        fc.property(falsyArbitrary, (input) => {
          const result = getImageUrl(input);
          return result === null;
        }),
        { numRuns: 10 }
      );
    });

    /**
     * For any falsy value, getVideoUrl returns null.
     * **Validates: Requirements 3.1, 3.2, 3.3, 3.4**
     */
    test('getVideoUrl returns null for any falsy input', () => {
      const falsyArbitrary = fc.oneof(
        fc.constant(null),
        fc.constant(undefined),
        fc.constant(''),
        fc.constant(0),
        fc.constant(false)
      );

      fc.assert(
        fc.property(falsyArbitrary, (input) => {
          const result = getVideoUrl(input);
          return result === null;
        }),
        { numRuns: 10 }
      );
    });
  });

  // ── Property-based tests: empty arrays always return [] ──────────────────

  describe('Property: empty array input always returns []', () => {
    /**
     * getImageUrl([]) always returns an empty array.
     * **Validates: Requirements 3.1, 3.2, 3.3, 3.4**
     */
    test('getImageUrl returns [] for empty array input', () => {
      fc.assert(
        fc.property(fc.constant([]), (input) => {
          const result = getImageUrl(input);
          return Array.isArray(result) && result.length === 0;
        }),
        { numRuns: 5 }
      );
    });

    /**
     * getVideoUrl([]) always returns an empty array.
     * **Validates: Requirements 3.1, 3.2, 3.3, 3.4**
     */
    test('getVideoUrl returns [] for empty array input', () => {
      fc.assert(
        fc.property(fc.constant([]), (input) => {
          const result = getVideoUrl(input);
          return Array.isArray(result) && result.length === 0;
        }),
        { numRuns: 5 }
      );
    });
  });

  // ── Property-based tests: arrays containing only null/falsy entries ───────

  describe('Property: arrays of null/falsy entries return []', () => {
    /**
     * Arrays containing only null/falsy entries are filtered out, returning [].
     * **Validates: Requirements 3.1, 3.2, 3.3, 3.4**
     */
    test('getImageUrl filters out null entries from arrays, returning []', () => {
      // Arrays of nulls/empty strings only — all entries are falsy
      const nullOnlyArrayArbitrary = fc.array(
        fc.oneof(fc.constant(null), fc.constant('')),
        { minLength: 1, maxLength: 10 }
      );

      fc.assert(
        fc.property(nullOnlyArrayArbitrary, (input) => {
          const result = getImageUrl(input);
          return Array.isArray(result) && result.length === 0;
        }),
        { numRuns: 10 }
      );
    });

    test('getVideoUrl filters out null entries from arrays, returning []', () => {
      const nullOnlyArrayArbitrary = fc.array(
        fc.oneof(fc.constant(null), fc.constant('')),
        { minLength: 1, maxLength: 10 }
      );

      fc.assert(
        fc.property(nullOnlyArrayArbitrary, (input) => {
          const result = getVideoUrl(input);
          return Array.isArray(result) && result.length === 0;
        }),
        { numRuns: 10 }
      );
    });
  });
});
