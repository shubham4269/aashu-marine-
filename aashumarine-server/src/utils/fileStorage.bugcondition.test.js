/**
 * Bug Condition Exploration Tests - Property 1: Absolute localhost URL construction
 *
 * CRITICAL: These tests are EXPECTED TO FAIL on unfixed code.
 * Failure confirms the bug exists: getImageUrl/getVideoUrl return absolute localhost URLs
 * instead of relative paths.
 *
 * When the fix is applied (Task 3), these same tests will PASS, confirming the fix works.
 *
 * Validates: Requirements 1.1, 1.2, 1.3
 */

import { getImageUrl, getVideoUrl } from './fileStorage.js';

describe('Bug Condition Exploration - Absolute localhost URL construction', () => {
  /**
   * Property 1: For any non-null path string passed to getImageUrl,
   * the result MUST start with '/' and contain no '://'
   * (i.e., it must be a relative path, not an absolute localhost URL)
   */

  test('getImageUrl("uploads/images/test.jpg") returns relative path starting with / and no ://', () => {
    const result = getImageUrl('uploads/images/test.jpg');
    // On unfixed code: returns "http://localhost:5300/uploads/images/test.jpg"
    // Expected (fixed): "/uploads/images/test.jpg"
    expect(typeof result).toBe('string');
    expect(result.startsWith('/')).toBe(true);
    expect(result).not.toContain('://');
  });

  test('getImageUrl(array) returns array where every element starts with / and has no ://', () => {
    const result = getImageUrl(['uploads/images/a.jpg', 'uploads/images/b.jpg']);
    // On unfixed code: returns ["http://localhost:5300/uploads/images/a.jpg", "http://localhost:5300/uploads/images/b.jpg"]
    // Expected (fixed): ["/uploads/images/a.jpg", "/uploads/images/b.jpg"]
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);
    result.forEach(url => {
      expect(url.startsWith('/')).toBe(true);
      expect(url).not.toContain('://');
    });
  });

  test('getVideoUrl("uploads/videos/demo.mp4") returns relative path starting with / and no ://', () => {
    const result = getVideoUrl('uploads/videos/demo.mp4');
    // On unfixed code: returns "http://localhost:5300/uploads/videos/demo.mp4"
    // Expected (fixed): "/uploads/videos/demo.mp4"
    expect(typeof result).toBe('string');
    expect(result.startsWith('/')).toBe(true);
    expect(result).not.toContain('://');
  });

  test('getImageUrl("/uploads/images/test.jpg") (path already has leading slash) returns /uploads/images/test.jpg with no ://', () => {
    const result = getImageUrl('/uploads/images/test.jpg');
    // On unfixed code: returns "http://localhost:5300/uploads/images/test.jpg"
    // Expected (fixed): "/uploads/images/test.jpg"
    expect(typeof result).toBe('string');
    expect(result.startsWith('/')).toBe(true);
    expect(result).not.toContain('://');
    expect(result).toBe('/uploads/images/test.jpg');
  });

  test('getImageUrl("uploads\\\\images\\\\test.jpg") (Windows-style path) returns /uploads/images/test.jpg with no ://', () => {
    const result = getImageUrl('uploads\\images\\test.jpg');
    // On unfixed code: returns "http://localhost:5300/uploads/images/test.jpg" (or with backslashes)
    // Expected (fixed): "/uploads/images/test.jpg"
    expect(typeof result).toBe('string');
    expect(result.startsWith('/')).toBe(true);
    expect(result).not.toContain('://');
    expect(result).toBe('/uploads/images/test.jpg');
  });
});
