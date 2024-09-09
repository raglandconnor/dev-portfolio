'use client';

import { useState, useEffect } from 'react';
import { Linkedin, Github, SquareArrowOutUpRight, Inbox } from 'lucide-react';
import Link from 'next/link';

import { dummyUserData } from '@/data/dummyProfileData';

const BioCard = ({ userId }) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const data = dummyUserData.find((user) => user.username === userId);
      setUserData(data);
    };

    fetchUserData();
  }, []);

  return (
    <div className="inline-block mt-3 md:mt-0 w-full border rounded-2xl">
      <div className="py-2 px-3">
        <h1 className="text-4xl md:text-5xl font-bold">
          {userData.displayName ? userData.displayName : ''}
        </h1>
        <h2 className="text-xl">
          {userData.currentPosition ? userData.currentPosition : ''}
        </h2>
        <h2 className="text-md text-muted-foreground">
          {userData.location ? userData.location : ''}
        </h2>
        <div className="flex flex-row gap-2 mt-1">
          {/* Users LinkedIn Profile */}
          {userData.linkedInUsername && (
            <Link
              href={`https://www.linkedin.com/in/${userData.linkedInUsername}/`}
              target="_blank"
            >
              <Linkedin size={36} className="bg-gray-200 p-1 rounded-md" />
            </Link>
          )}

          {/* Users GitHub Account */}
          {userData.githubUsername && (
            <Link
              href={`https://github.com/${userData.githubUsername}`}
              target="_blank"
            >
              <Github size={36} className="bg-gray-200 p-1 rounded-md" />
            </Link>
          )}

          {/* Users own website */}
          {userData.website && (
            <Link href={userData.website} target="_blank">
              <SquareArrowOutUpRight
                size={36}
                className="bg-gray-200 p-1 rounded-md"
              />
            </Link>
          )}

          {/* Email */}
          {userData.email && (
            <a href={`mailto:${userData.email}`}>
              <Inbox size={36} className="bg-gray-200 p-1 rounded-md" />
            </a>
          )}
        </div>

        {/* Bio */}
        <div className="mt-4">
          <p>{userData.bio ? userData.bio : ''}</p>
        </div>
      </div>
    </div>
  );
};

export default BioCard;
