import {AssetType, ProjectGlobalType, ProjectType} from "@/types";

class ProjectService {


    loadProjectData(): ProjectGlobalType {
        return {
            asset: "NMK",
            totalSupply:  10000000
        }
    }

    createPoject(data:ProjectType):{message:string}{

        return { message: `You submitted the following data: ${JSON.stringify(data)}` }
    }

    loadExampleProject()
        :
        ProjectType {
        return {
            hardCap: 1500000,
            softCap: 1100000,
            ratioPv: 0.7,
            publicPrice: 0.6,
            publicSupplyShare: 0.7,
            rounds: [
                {
                    roundPrice: 0.12,
                    roundName: "early investors",
                    roundSupplyShare: 0.1,
                    currencies: [{currency: "usd", share: 1}],
                },
                {
                    roundPrice: 0.25,
                    roundName: "Round 2",
                    roundSupplyShare: 0.25,
                    currencies: [{currency: "btc", share: 0.5}, {currency: "usd", share: 0.5}],
                },
                {
                    roundPrice: 0.4,
                    roundName: "Presale",
                    roundSupplyShare: 0.35,
                    currencies: [{currency: "btc", share: 0.15}, {currency: "usd", share: 0.5}, {
                        currency: "eth",
                        share: 0.35
                    }],
                }
            ]
        }
    }
}

export default new ProjectService()