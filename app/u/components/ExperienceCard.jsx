import ExperienceItems from './experience/ExperienceItems';

const ExperienceCard = ({ userId }) => {
  return (
    <div className="p-5 w-full rounded-2xl border">
      <h2 className="font-semibold text-2xl md:text-3xl border-b">
        Experience
      </h2>
      <ExperienceItems userId={userId} />
    </div>
  );
};

export default ExperienceCard;
