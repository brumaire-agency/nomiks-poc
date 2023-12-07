import type {NextApiRequest, NextApiResponse} from 'next';
import type {ProjectGlobalType} from '@/types';
import projectService from "@/services/ProjectService";

export default function handler(
    _req: NextApiRequest,
    res: NextApiResponse<ProjectGlobalType>
) {

    const projectData = projectService.loadProjectData()
    res.status(200).json(projectData)
}
