import { FormFounding } from '@/components';
import { AssetType, ProjectGlobalType, ProjectType } from "@/types";

export interface ProjectPageProps {
  assets: AssetType[],
  project: ProjectType,
  projectGlobal: ProjectGlobalType,
  projectExample: ProjectType,
}
 
export default function Page({ assets, project, projectGlobal, projectExample }: ProjectPageProps) {   
  return (
    <main className="flex flex-col gap-8 p-6">
      <h1 className="text-3xl">Nomiks POC</h1>

      <FormFounding
        assets={assets}
        assetName={projectGlobal.asset}
        projectExample={projectExample}
        totalSupply={projectGlobal.totalSupply}
      />
    </main>
  )
}

export async function getServerSideProps() {  
  const responseProjectGlobal = await fetch(`${process.env.DOMAIN_URL}/api/project/global`);
  const projectGlobal = await responseProjectGlobal.json();
  const responseProjectExample = await fetch(`${process.env.DOMAIN_URL}/api/project/example`);
  const projectExample = await responseProjectExample.json();
  const responseAssets = await fetch(`${process.env.DOMAIN_URL}/api/asset`);
  const assets = await responseAssets.json();
 
  return { props: { assets, projectGlobal, projectExample } }
}