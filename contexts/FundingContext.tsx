import {createContext, Dispatch, ReactNode, SetStateAction, useEffect, useMemo, useState} from "react";
import {AssetType, ProjectType, RoundDetailType} from "@/types";
import {
    getFoundingRoundDetail,
    getFoundingRoundPublicDetailDefault,
    getMaxRoundPrice,
    sumCollectedFound,
    sumCurrencyShare,
    sumRoundSupplyShare
} from '@/utils';


export type FundingContextProviderData = {
    hardCap?: number, setHardCap?: Dispatch<SetStateAction<number | undefined>>,
    softCap?: number, setSoftCap?: Dispatch<SetStateAction<number | undefined>>,
    ratioPv?: number, setRatioPv?: Dispatch<SetStateAction<number | undefined>>,
    roundsDetails?: Array<RoundDetailType>, setRoundsDetails?: Dispatch<SetStateAction<Array<RoundDetailType> | undefined>>,
    roundPublicDetail?: RoundDetailType, setRoundPublicDetail?: Dispatch<SetStateAction<RoundDetailType | undefined>>,
    error?: string, setError?: Dispatch<SetStateAction<string | undefined>>,
    modalAddOpen?: boolean, setModalAddOpen?: Dispatch<SetStateAction<boolean | undefined>>,
    modalEditOpen?: boolean, setModalEditOpen?: Dispatch<SetStateAction<boolean | undefined>>,
    modalEditPublicOpen?: boolean, setModalEditPublicOpen?: Dispatch<SetStateAction<boolean | undefined>>,
    roundIdToEdit?: number, setRoundIdToEdit?: Dispatch<SetStateAction<number | undefined>>,
    canEditTable?: boolean,
    canSave?: boolean,
    totalSupply?: number
    project?: ProjectType,
    assets?: AssetType[],
    defaultCurrencies: Array<{ currency: string, share: number }>,
    totalCollectedFound?: number,
    projectExample?: ProjectType,
    assetName: string


}

export interface FundingContextProps {
    assets: AssetType[];
    assetName: string;
    project?: ProjectType;
    projectExample?: ProjectType;
    totalSupply: number;

}

const initialState = {} as FundingContextProviderData

const FundingContext = createContext<FundingContextProviderData>(initialState)

function FundingContextProvider({
                                    children,
                                    assets,
                                    assetName,
                                    project,
                                    projectExample,
                                    totalSupply
                                }: FundingContextProps & { children: ReactNode }) {

    // States - Content
    const [hardCap, setHardCap] = useState<number | undefined>(project?.hardCap);
    const [softCap, setSoftCap] = useState<number | undefined>(project?.softCap);
    const [ratioPv, setRatioPv] = useState<number | undefined>(project?.ratioPv);
    const [roundsDetails, setRoundsDetails] = useState<RoundDetailType[] | undefined>([]);
    const [roundPublicDetail, setRoundPublicDetail] = useState<RoundDetailType | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);

    // Memo
    const defaultCurrencies = useMemo<Array<{ currency: string, share: number }>>(() => [{currency: assets[0].label, share: 0}], [assets]);
    const totalCollectedFound = useMemo<number>(() => {
        return roundPublicDetail ? sumCollectedFound(roundsDetails, roundPublicDetail) : 0
    }, [roundsDetails, roundPublicDetail]);


    // States - Modal
    const [modalAddOpen, setModalAddOpen] = useState<boolean | undefined>(false);
    const [modalEditOpen, setModalEditOpen] = useState<boolean | undefined>(false);
    const [modalEditPublicOpen, setModalEditPublicOpen] = useState<boolean | undefined>(false);
    const [roundIdToEdit, setRoundIdToEdit] = useState<number | undefined>(undefined);

    const canEditTable = useMemo(() => !!hardCap && !!softCap && !!ratioPv, [hardCap, softCap, ratioPv]);
    const canSave = useMemo(() => !error && canEditTable, [error, canEditTable]);


    useEffect(() => {
        if (project) {
            setRoundsDetails(project.rounds.map(round => getFoundingRoundDetail(round, totalSupply, 0, defaultCurrencies)));
        }
    }, [project, totalSupply, defaultCurrencies])

    useEffect(() => {
        if (roundsDetails && roundPublicDetail) {
            setRoundsDetails(roundsDetails.map(round => getFoundingRoundDetail(round, totalSupply, roundPublicDetail.roundPrice, defaultCurrencies, round.currencies)));
        }
    }, [roundPublicDetail, totalSupply, defaultCurrencies, roundsDetails])

    useEffect(() => {
        if (!!hardCap && !!softCap && !!ratioPv) {
            setRoundPublicDetail(getFoundingRoundPublicDetailDefault(hardCap, ratioPv, totalSupply, defaultCurrencies));
        }
    }, [hardCap, softCap, ratioPv, totalSupply])

    // Handle Error Message
    useEffect(() => {
        if (!!hardCap && !!softCap && (hardCap < softCap)) {
            setError('Hard cap must be higher than Soft cap');
        } else if (roundPublicDetail && sumRoundSupplyShare(roundsDetails, roundPublicDetail) > 1) {
            setError('The sum of rounds supply share must be lower than 100%');
        } else if (roundPublicDetail && getMaxRoundPrice(roundsDetails) > roundPublicDetail.roundPrice) {
            setError('The round price must be lower than public price');
        } else if (roundsDetails && roundPublicDetail && !sumCurrencyShare([...roundsDetails, roundPublicDetail]).every(currency => currency <= 1)) {
            setError('The sum of currencies in round must be lower than 100%');
        } else {
            setError(undefined);
        }
    }, [hardCap, softCap, roundsDetails, roundPublicDetail]);


    const providerData: FundingContextProviderData = {
        hardCap, setHardCap,
        softCap, setSoftCap,
        ratioPv, setRatioPv,
        roundsDetails, setRoundsDetails,
        roundPublicDetail, setRoundPublicDetail,
        error, setError,
        modalAddOpen, setModalAddOpen,
        modalEditOpen, setModalEditOpen,
        modalEditPublicOpen, setModalEditPublicOpen,
        roundIdToEdit, setRoundIdToEdit,
        canEditTable,
        canSave,
        totalSupply,
        project,
        assets,
        defaultCurrencies,
        totalCollectedFound,
        projectExample,
        assetName

    }

    return (
        <FundingContext.Provider value={providerData}>
            {children}
        </FundingContext.Provider>
    )
}

export {FundingContext};
export default FundingContextProvider;



