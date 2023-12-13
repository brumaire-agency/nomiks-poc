import {Input} from "@/components/input";
import {useContext} from "react";
import {FundingContext} from "@/contexts/FundingContext";

function FundingHeader() {

    const {

        totalSupply,

        hardCap, setHardCap,
        softCap, setSoftCap,
        ratioPv, setRatioPv,

        totalCollectedFound,

    } = useContext(FundingContext)


    return <div className="flex gap-2">
        <Input
            label="Hard cap"
            type="number"
            value={hardCap}
            onChange={(e) => setHardCap && setHardCap(Number(e.target.value))}
            data-cy="input-hard-cap"
        />
        <Input
            label="Soft cap"
            type="number"
            value={softCap}
            onChange={(e) => setSoftCap && setSoftCap(Number(e.target.value))}
            data-cy="input-soft-cap"
        />
        <Input
            label="Ratio Public/Private Sale"
            type="number"
            value={ratioPv}
            onChange={(e) => setRatioPv && setRatioPv(Number(e.target.value))}
            data-cy="input-ratio-pv"
        />
        <Input
            label="Total collected found"
            type="number"
            value={totalCollectedFound}
            disabled
            data-cy="input-total-collected-found"
        />
        <Input
            label="Total Tokens amounts Sale (private/public)"
            type="number"
            value={totalSupply}
            disabled
            data-cy="input-total-supply"
        />
    </div>;
}

export default FundingHeader;