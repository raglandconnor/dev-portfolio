const EducationItem = ({ userId }) => {
  return (
    <div className="px-0 md:px-2 mt-5">
      <div>
        <h3 className="font-semibold text-xl">University of Florida</h3>
        <div className="md:flex md:flex-row md:justify-between md:items-baseline">
          <h4 className="text-lg">Computer Science</h4>
          <p className="italic">Jan 2020 - Present</p>
        </div>
      </div>
      <div className="ml-2 pl-2 border-l">
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint
          assumenda architecto dolorum magni neque. Soluta labore quia possimus
          enim? Sed fugiat maxime aliquid quae sit dicta. Ipsam ex eius non.
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint
          assumenda architecto dolorum magni neque. Soluta labore quia possimus
          enim? Sed fugiat maxime aliquid quae sit dicta. Ipsam ex eius non.
        </p>
        <p>{userId}</p>
      </div>
    </div>
  );
};

export default EducationItem;
