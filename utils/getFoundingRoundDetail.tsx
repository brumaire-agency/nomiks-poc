import { RoundDetailType, RoundType } from "@/types";

export const getFoundingRoundDetail = (round: RoundType, totalTokenAmount: number, publicPrice: number): RoundDetailType => {  
  return {
    roundPrice: round.roundPrice,
    roundName: round.roundName,
    roundSupplyShare: round.roundSupplyShare,
    roundTokenAmount: round.roundSupplyShare * totalTokenAmount,
    roundDiscount: round.roundPrice / publicPrice,
    roundCollectedFound: round.roundSupplyShare * totalTokenAmount * round.roundPrice,
  }
}

export const getFoundingPublicRoundDetail = (round: RoundType, totalTokenAmount: number): RoundDetailType => {
  return {
    roundPrice: round.roundPrice,
    roundName: round.roundName,
    roundSupplyShare: round.roundSupplyShare,
    roundTokenAmount: round.roundSupplyShare * totalTokenAmount,
    roundDiscount: null,
    roundCollectedFound: round.roundSupplyShare * totalTokenAmount * round.roundPrice,
  }
}