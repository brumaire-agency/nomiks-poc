import type { NextApiRequest, NextApiResponse } from 'next';
import {ProjectType} from "@/types";
import projectService from "@/services/ProjectService";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const data = req.body as ProjectType
    const response =  projectService.createPoject(data)
    res.status(200).json(response)
  }
}
