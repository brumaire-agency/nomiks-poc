export type ProjectType = {
  hardCap: number;
  softCap: number;
  ratioPv: number;
  publicPrice: number;
  publicSupplyShare: number;
  rounds: RoundType[];
}

export type RoundType = {
  roundPrice: number;
  roundName: string;
  roundSupplyShare: number;
}

export interface RoundDetailType extends RoundType {
  roundTokenAmount: number;
  roundDiscount: number|null;
  roundCollectedFound: number;
}

export type ProjectGlobalType = {
  asset: string;
  totalSupply: number;
}