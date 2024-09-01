const ProfilePage = ({ params }) => {
  return (
    <div className="flex flex-col items-center mt-24">
      This is the userId: {params.userId}
    </div>
  );
};

export default ProfilePage;
