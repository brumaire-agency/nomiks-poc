import type { NextApiRequest, NextApiResponse } from 'next';
import type { ProjectGlobalType } from '@/types';

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<ProjectGlobalType>
) {
  res.status(200).json(
    { 
      asset : "NMK",
      totalSupply: 10000000
    }
  )
}
