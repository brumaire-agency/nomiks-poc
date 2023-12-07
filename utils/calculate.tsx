import {RoundDetailType} from "@/types";

export const sumCollectedFound = (rounds: RoundDetailType[] | undefined, roundPublic: RoundDetailType): number => {
    let sumRounds = 0;
    // Sum rounds collected found
    rounds?.map(round => sumRounds = sumRounds + round.roundCollectedFound);
    // Add public collected found
    sumRounds = sumRounds + roundPublic.roundCollectedFound;
    return sumRounds;
}

export const sumRoundSupplyShare = (rounds: RoundDetailType[] | undefined, roundPublic: RoundDetailType): number => {
    let sumRounds = 0;
    // Sum rounds supply share
    rounds?.map(round => sumRounds = sumRounds + round.roundSupplyShare);
    // Add public supply share
    sumRounds = sumRounds + roundPublic.roundSupplyShare;
    return sumRounds;
}

export const sumCurrencyShare = (rounds: RoundDetailType[]): number[] => {
    return rounds.map(round => {
        let sumRounds = 0;
        round.currencies.map(currency => sumRounds = sumRounds + currency.share)
        return sumRounds;
    });
}

export const getMaxRoundPrice = (rounds: RoundDetailType[] | undefined): number => {
    return Math.max(...rounds?.map(round => round.roundPrice) || [0]);
}