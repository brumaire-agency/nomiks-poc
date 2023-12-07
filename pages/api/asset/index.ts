import type { NextApiRequest, NextApiResponse } from 'next';
import type { AssetType } from '@/types';
import assetService from '@/services/AssetService';
export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<AssetType[]>
) {

  const assets = assetService.getAssetList()

  return res.status(200).json(assets)
}
