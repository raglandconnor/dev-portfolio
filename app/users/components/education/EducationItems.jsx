'use client';

import { useState, useEffect } from 'react';
import { dummyUserData } from '@/data/dummyProfileData';

const EducationItems = ({ userId }) => {
  const [userEducation, setUserEducation] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = dummyUserData.find((user) => user.username === userId);
      setUserEducation(data.education);
    };

    fetchUserData();
  }, []);

  return (
    <div className="px-0 md:px-2 mt-5 grid gap-3">
      {userEducation.map((edu, idx) => (
        <div key={idx}>
          <div>
            <div className="md:flex md:flex-row md:justify-between md:items-baseline">
              <h3 className="font-semibold text-xl">{edu.school}</h3>
              <p className="text-lg">{edu.location}</p>
            </div>
            <div className="md:flex md:flex-row md:justify-between md:items-baseline">
              <h4 className="text-lg">{edu.degree}</h4>
              <p className="italic">{`${edu.startDate} - ${edu.endDate}`}</p>
            </div>
          </div>
          <div className="ml-2 pl-2 border-l">
            <p>{edu.description}</p>
            <p>{userId}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EducationItems;
