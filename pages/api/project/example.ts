import type { NextApiRequest, NextApiResponse } from 'next';
import type { ProjectType } from '@/types';

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<ProjectType>
) {
  res.status(200).json(
    { 
      hardCap: 1500000,
      softCap: 1100000,
      ratioPv: 0.7,
      publicPrice: 0.6,
      publicSupplyShare: 0.7,
      rounds: [
        {
          roundPrice: 0.12, roundName: "early investors", roundSupplyShare: 0.1,
        },
        {
          roundPrice: 0.25, roundName: "Round 2", roundSupplyShare: 0.25,
        },
        {
          roundPrice: 0.4, roundName: "Presale", roundSupplyShare: 0.35,
        }
      ]
    }
  )
}
