// src/lib/pricing-calculator.ts

export const DEFAULT_EXCHANGE_RATE = 25500;
export const DEFAULT_MARGIN_PERCENT = 30; // 130%

export interface ConvertedPrice {
  rawVnd: number;
  finalVnd: number;
  usd: number;
  display: string;
  isAdviseLater: boolean;
}

/**
 * Tính giá bán USD từ giá gốc (nghìn VNĐ)
 * Công thức: Giá bán = (Giá gốc * 1000 * (1 + margin / 100)) / exchangeRate
 * Nếu giá gốc <= 0 hoặc không có -> trả về "Advise Later"
 */
export function calculateCarPrice(
  baseThousandsVnd: number | undefined | null,
  marginPercent: number = DEFAULT_MARGIN_PERCENT,
  exchangeRate: number = DEFAULT_EXCHANGE_RATE
): ConvertedPrice {
  if (!baseThousandsVnd || baseThousandsVnd <= 0 || baseThousandsVnd === 99000) {
    return {
      rawVnd: 0,
      finalVnd: 0,
      usd: 0,
      display: 'Advise Later',
      isAdviseLater: true,
    };
  }

  const rawVnd = baseThousandsVnd * 1000;
  const finalVnd = rawVnd * (1 + marginPercent / 100);
  const usd = Math.round(finalVnd / exchangeRate);

  return {
    rawVnd,
    finalVnd,
    usd,
    display: `$${usd} USD`,
    isAdviseLater: false,
  };
}
