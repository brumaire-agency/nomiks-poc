import {FormFounding} from '@/components';
import {AssetType, ProjectGlobalType, ProjectType} from "@/types";
import projectService from "@/services/ProjectService";
import assetService from "@/services/AssetService";
import FundingContextProvider from "@/contexts/FundingContext";

export interface ProjectPageProps {
    assets: AssetType[],
    project: ProjectType,
    projectGlobal: ProjectGlobalType,
    projectExample: ProjectType,
}

export default function Page({assets, project, projectGlobal, projectExample}: ProjectPageProps) {
    return (
        <main className="flex flex-col gap-8 p-6">
            <h1 className="text-3xl">Nomiks POC</h1>
            <FundingContextProvider assets={assets} assetName={projectGlobal.asset}
                                    totalSupply={projectGlobal.totalSupply}>
                <FormFounding/>
            </FundingContextProvider>
        </main>
    )
}

export async function getServerSideProps() {
    const projectGlobal = projectService.loadProjectData()
    const projectExample = projectService.loadExampleProject()
    const assets = assetService.getAssetList()
    return {props: {assets, projectGlobal, projectExample}}
}