import {AssetType} from "@/types";

class AssetService {

    getAssetList(): AssetType[] {
        return [
            {code: "btc", label: "BTC"},
            {code: "eth", label: "ETH"},
            {code: "usd", label: "Stable-usd"},
            {code: "egld", label: "EGLD"},
            {code: "bnb", label: "BNB"},
            {code: "nmatic", label: "MATIC"}]
    }


}

export default new AssetService()