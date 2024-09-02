'use client';

import { useState, useEffect } from 'react';
import { dummyUserData } from '@/data/dummyProfileData';

const ExperienceItems = ({ userId }) => {
  const [userExperiences, setUserExperiences] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = dummyUserData.find((user) => user.username === userId);
      setUserExperiences(data.experience);
    };

    fetchUserData();
  }, []);

  return (
    <div className="px-0 md:px-2 mt-5">
      {userExperiences.map((exp, idx) => (
        <div key={idx}>
          <div>
            <h3 className="font-semibold text-xl">{exp.title}</h3>
            <div className="md:flex md:flex-row md:justify-between md:items-baseline">
              <h4 className="text-lg">{exp.company}</h4>
              <p className="italic">{`${exp.startDate} - ${exp.endDate}`}</p>
            </div>
          </div>
          <div className="ml-2 pl-2 border-l">
            <p>{exp.description}</p>
            <p>{userId}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceItems;
