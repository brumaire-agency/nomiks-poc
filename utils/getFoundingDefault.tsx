import { Currency, RoundDetailType } from "@/types";

export const getFoundingRoundPublicDetailDefault = (hardCap: number, ratioPv: number, totalTokenAmount: number, defaultCurrencies: Currency[]): RoundDetailType => {
  const publicPrice = (hardCap * 0.7 / totalTokenAmount ) * ratioPv;
  const publicTokenAmount = totalTokenAmount * ratioPv;

  return {
    roundPrice: publicPrice,
    roundName: 'Public sale',
    roundSupplyShare: ratioPv,
    roundTokenAmount: publicTokenAmount,
    roundDiscount: null,
    roundCollectedFound: publicPrice * publicTokenAmount,
    currencies: defaultCurrencies,
  }
}