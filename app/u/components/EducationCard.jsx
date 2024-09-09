import EducationItems from './education/EducationItems';

const EducationCard = ({ userId }) => {
  return (
    <div className="p-5 w-full rounded-2xl border">
      <h2 className="font-semibold text-2xl md:text-3xl border-b">Education</h2>
      <EducationItems userId={userId} />
    </div>
  );
};

export default EducationCard;
