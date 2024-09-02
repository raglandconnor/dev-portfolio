import ProjectItem from './projects/ProjectItem';

const ProjectsCard = ({ userId }) => {
  return (
    <div className="p-5 w-full rounded-2xl border">
      <h2 className="font-semibold text-2xl md:text-3xl border-b">Projects</h2>
      <ProjectItem userId={userId} />
      <ProjectItem userId={userId} />
    </div>
  );
};

export default ProjectsCard;
