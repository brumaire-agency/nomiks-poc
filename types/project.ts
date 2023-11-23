export type ProjectType = {
  hardCap: number;
  softCap: number;
  ratioPv: number;
  publicPrice: number;
  publicSupplyShare: number;
  rounds: RoundType[];
}

export interface RoundType {
  roundPrice: number;
  roundName: string;
  roundSupplyShare: number;
  currencies: Currency[];
}

export interface Currency {
  currency: string;
  share: number;
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