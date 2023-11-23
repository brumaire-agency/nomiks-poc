import { RoundForm } from "@/components";
import { Currency, RoundDetailType } from "@/types";

export const getFoundingRoundDetail = (round: RoundForm, totalTokenAmount: number, publicPrice: number, defaultCurrencies: Currency[], currencies?: Currency[]): RoundDetailType => {  
  return {
    roundPrice: round.roundPrice,
    roundName: round.roundName,
    roundSupplyShare: round.roundSupplyShare,
    roundTokenAmount: round.roundSupplyShare * totalTokenAmount,
    roundDiscount: round.roundPrice / publicPrice,
    roundCollectedFound: round.roundSupplyShare * totalTokenAmount * round.roundPrice,
    currencies: currencies ? currencies : defaultCurrencies,
  }
}

export const getFoundingPublicRoundDetail = (round: RoundForm, totalTokenAmount: number, defaultCurrencies: Currency[], currencies?: Currency[]): RoundDetailType => {
  return {
    roundPrice: round.roundPrice,
    roundName: round.roundName,
    roundSupplyShare: round.roundSupplyShare,
    roundTokenAmount: round.roundSupplyShare * totalTokenAmount,
    roundDiscount: null,
    roundCollectedFound: round.roundSupplyShare * totalTokenAmount * round.roundPrice,
    currencies: currencies ? currencies : defaultCurrencies,
  }
}