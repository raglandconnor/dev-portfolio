import Image from "next/image";
import BioCard from "../components/BioCard";
import GitHubContributionsCard from "../components/GitHubContributionsCard";
import ExperienceCard from "../components/ExperienceCard";
import EducationCard from "../components/EducationCard";
import ProjectsCard from "../components/ProjectsCard";

const ProfilePage = ({ params }) => {
  return (
    <main className="flex flex-col items-center mt-8 md:mt-24">
      <div className="flex flex-col gap-3 w-[95%] lg:w-[1000px] p-1 rounded-2xl">
        <div className="md:flex md:flex-row md:gap-3 ">
          <Image
            src="/next.svg"
            alt={`${params.userId}'s profile picture`}
            width={0}
            height={0}
            className="w-96 h-96 rounded-2xl border inline-block"
          />
          <BioCard userId={params.userId} />
        </div>
        <div className="hidden md:block">
          <GitHubContributionsCard githubLogin={params.userId} />
        </div>
        <ExperienceCard userId={params.userId} />
        <EducationCard userId={params.userId} />
        <ProjectsCard userId={params.userId} />
      </div>
    </main>
  );
};

export default ProfilePage;
