import EditProfileForm from './components/EditProfileForm';

const EditProfilePage = () => {
  return (
    <div className="flex flex-col items-center mt-8 md:mt-24">
      <div className="flex flex-col gap-3 w-[95%] lg:w-[1000px] p-1 rounded-2xl">
        <h1 className="text-3xl font-semibold border-b pb-1">Edit Profile</h1>

        <EditProfileForm />
      </div>
    </div>
  );
};

export default EditProfilePage;
