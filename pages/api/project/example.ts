import type {NextApiRequest, NextApiResponse} from 'next';
import type {ProjectType} from '@/types';
import projectService from '@/services/ProjectService';

export default function handler(
    _req: NextApiRequest,
    res: NextApiResponse<ProjectType>
) {

    const project = projectService.loadExampleProject()
    res.status(200).json(project)
}
