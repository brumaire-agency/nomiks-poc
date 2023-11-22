import { FormFounding } from '@/components';
import { ProjectGlobalType, ProjectType } from "@/types";

export interface ProjectPageProps {
  project: ProjectType,
  projectGlobal: ProjectGlobalType,
  projectExample: ProjectType,
}
 
export default function Page({ project, projectGlobal, projectExample }: ProjectPageProps) {   
  return (
    <main className="flex flex-col gap-8 p-6">
      <h1 className="text-3xl">Nomiks POC</h1>

      <FormFounding 
        assetName={projectGlobal.asset}
        projectExample={projectExample}
        totalSupply={projectGlobal.totalSupply}
      />
    </main>
  )
}

export async function getServerSideProps() {
  const responseProjectGlobal = await fetch("http://localhost:3000/api/project/global");
  const projectGlobal = await responseProjectGlobal.json();
  const responseProjectExample = await fetch("http://localhost:3000/api/project/example");
  const projectExample = await responseProjectExample.json();
 
  return { props: { projectGlobal, projectExample } }
}