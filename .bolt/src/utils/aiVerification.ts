export type ProductVerificationInput = {
  name?: string;
  category?: string;
  quantity?: string | number;
  unit?: string;
  sellingPrice?: string | number;
  harvestDate?: string;
  grade?: string;
  availableFrom?: string;
  location?: string;
  image?: string;
};

export function calculateProductListingScore(input: ProductVerificationInput): number {
  let score = 30;

  if (input.name && input.name.trim().length >= 3) score += 12;
  if (input.category) score += 8;

  const quantity = Number(input.quantity);
  if (Number.isFinite(quantity) && quantity > 0) score += 12;

  if (input.unit) score += 4;

  const sellingPrice = Number(input.sellingPrice);
  if (Number.isFinite(sellingPrice) && sellingPrice > 0) score += 12;

  if (input.harvestDate) score += 6;
  if (input.grade) score += 6;
  if (input.availableFrom) score += 6;

  if (input.location && input.location.trim().length >= 3) score += 8;

  const hasImage = Boolean(input.image && (input.image.startsWith('data:image/') || input.image.startsWith('http')));
  if (hasImage) score += 16;

  return Math.min(100, score);
}

export function getAiVerificationSummary(score: number): string {
  if (score >= 85) return 'Excellent listing: AI verified the product data and image quality.';
  if (score >= 70) return 'Good listing: minor details may improve buyer confidence.';
  if (score >= 50) return 'Fair listing: add the missing details to improve verification.';
  return 'Needs attention: complete the required fields and upload a clear product image.';
}

export function extractAiVerificationResult(responseText: string | null | undefined, fallbackScore: number) {
  const safeFallback = Number.isFinite(fallbackScore) ? Math.min(100, Math.max(0, Number(fallbackScore))) : 0;
  const trimmedText = (responseText ?? '').trim();

  if (!trimmedText) {
    return {
      score: safeFallback,
      summary: `AI verification service is temporarily unavailable. Using local score: ${safeFallback}/100.`,
    };
  }

  if (/Unused Respond to Webhook node found|Internal Server Error|Webhook.*failed|not responding|500/i.test(trimmedText)) {
    return {
      score: safeFallback,
      summary: `AI verification service is temporarily unavailable. Using local score: ${safeFallback}/100.`,
    };
  }

  const directNumber = Number(trimmedText);
  if (Number.isFinite(directNumber)) {
    const normalizedScore = Math.min(100, Math.max(0, directNumber));
    return {
      score: normalizedScore,
      summary: `AI rating: ${normalizedScore}/100`,
    };
  }

  try {
    const parsedResponse = JSON.parse(trimmedText);
    const parsedScore = Number(parsedResponse?.score ?? parsedResponse?.rating ?? parsedResponse?.imageQualityScore ?? parsedResponse?.aiRating ?? safeFallback);
    if (Number.isFinite(parsedScore)) {
      const normalizedScore = Math.min(100, Math.max(0, parsedScore));
      return {
        score: normalizedScore,
        summary: String(parsedResponse?.summary ?? parsedResponse?.message ?? parsedResponse?.result ?? parsedResponse?.imageQualitySummary ?? `AI rating: ${normalizedScore}/100`),
      };
    }
  } catch {
    // Ignore JSON parsing errors and continue to text extraction.
  }

  const extractedNumber = Number(trimmedText.match(/\d+(?:\.\d+)?/)?.[0] ?? safeFallback);
  if (Number.isFinite(extractedNumber)) {
    const normalizedScore = Math.min(100, Math.max(0, extractedNumber));
    return {
      score: normalizedScore,
      summary: `AI rating: ${normalizedScore}/100`,
    };
  }

  return {
    score: safeFallback,
    summary: trimmedText || `AI rating: ${safeFallback}/100`,
  };
}
