import { describe, expect, it } from 'vitest';
import { calculateProductListingScore, extractAiVerificationResult, getAiVerificationSummary } from './aiVerification';

describe('AI product verification', () => {
  it('scores a complete listing highly and explains the result', () => {
    const score = calculateProductListingScore({
      name: 'Fresh Red Tomato',
      category: 'Vegetables',
      quantity: '120',
      unit: 'kg',
      sellingPrice: '42',
      harvestDate: '2026-09-21',
      grade: 'Grade A',
      availableFrom: '2026-09-22',
      location: 'Nashik, Maharashtra',
      image: 'data:image/png;base64,abc',
    });

    expect(score).toBeGreaterThan(80);
    expect(score).toBeLessThanOrEqual(100);
    expect(getAiVerificationSummary(score)).toContain('Excellent');
  });

  it('falls back to the local AI score when n8n is misconfigured', () => {
    const result = extractAiVerificationResult(
      '{"code":0,"message":"Unused Respond to Webhook node found in the workflow"}',
      82,
    );

    expect(result.score).toBe(82);
    expect(result.summary.toLowerCase()).toContain('temporarily unavailable');
  });

  it('extracts a numeric rating from a text response', () => {
    const result = extractAiVerificationResult('AI rating: 76/100', 50);

    expect(result.score).toBe(76);
    expect(result.summary).toContain('76');
  });
});
