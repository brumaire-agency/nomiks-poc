import { ProjectType, RoundDetailType } from "@/types";

export const transformProjectData = (
  hardCap: number, 
  softCap: number, 
  ratioPv: number,
  roundPublic: RoundDetailType,
  roundsDetails: RoundDetailType[],
): ProjectType => {
  return {
    hardCap: hardCap,
    softCap: softCap,
    ratioPv: ratioPv,
    publicPrice: roundPublic.roundPrice,
    publicSupplyShare: roundPublic.roundSupplyShare,
    rounds: roundsDetails.map((roundDetail => {
      return {
        roundPrice: roundDetail.roundPrice,
        roundName: roundDetail.roundName,
        roundSupplyShare: roundDetail.roundSupplyShare,
      }
    }))
  }
}