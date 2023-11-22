import type { NextApiRequest, NextApiResponse } from 'next';
import type { AssetType } from '@/types';

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<AssetType[]>
) {
  return res.status(200).json([{ code: "btc", label: "BTC" },{ code: "eth", label: "ETH" },{ code: "usd", label: "Stable-usd" },{ code :"egld", label: "EGLD" },{ code:"bnb", label: "BNB" },{ code: "nmatic", label: "MATIC" }])
}
