import Image from 'next/image';
import BioCard from '../components/BioCard';

const ProfilePage = ({ params }) => {
  return (
    <main className="flex flex-col items-center mt-8 md:mt-24">
      <div className="flex flex-col gap-3 w-[95%] lg:w-[1000px] p-5 border rounded-2xl">
        <div className="md:flex md:flex-row md:gap-3 ">
          <Image
            src="/next.svg"
            width={0}
            height={0}
            className="w-96 h-96 rounded-2xl border inline-block"
          />
          <BioCard userId={params.userId} />
        </div>
        <div className="h-64 w-full rounded-2xl border">
          github contributions chart
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
