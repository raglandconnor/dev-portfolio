'use client';

import { useState, useEffect } from 'react';
import { dummyUserData } from '@/data/dummyProfileData';
import { Link2, Github, BookText, Youtube } from 'lucide-react';
import Link from 'next/link';

const ProjectItems = ({ userId }) => {
  const [userProjects, setUserProjects] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = dummyUserData.find((user) => user.username === userId);
      setUserProjects(data.projects);
    };

    fetchUserData();
  }, []);

  return (
    <div className="px-0 md:px-2 mt-5 grid gap-3">
      {userProjects.map((project, idx) => (
        <div key={idx}>
          <div>
            <h3 className="font-semibold text-xl">{project.title}</h3>
            <div className="md:flex md:flex-row md:justify-between md:items-baseline">
              <div className="flex flex-row gap-2 flex-wrap">
                {project.technologies.map((tech, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-200 rounded-full px-2 border"
                  >
                    {tech}
                  </div>
                ))}
              </div>
              <p className="italic whitespace-nowrap">{`${project.startDate} - ${project.endDate}`}</p>
            </div>
          </div>
          <div className="ml-2 pl-2 mt-2 border-l">
            <p>{project.description}</p>
            <p>{userId}</p>
          </div>
          <div className="ml-4 mt-1 flex flex-row gap-2 flex-wrap">
            {/* Read more link */}
            {project.links.readMore && (
              <Link
                href={project.links.readMore}
                target="_blank"
                className="flex flex-row gap-1 items-center py-1 px-3 border shadow-md rounded-lg hover:underline hover:bg-slate-100"
              >
                <BookText className="size-4" />
                Read more
              </Link>
            )}

            {/* Website link */}
            {project.links.website && (
              <Link
                href={project.links.website}
                target="_blank"
                className="flex flex-row gap-1 items-center py-1 px-3 border shadow-md rounded-lg hover:underline hover:bg-slate-100"
              >
                <Link2 className="size-4" />
                Link
              </Link>
            )}

            {/* Github link */}
            {project.links.github && (
              <Link
                href={project.links.github}
                target="_blank"
                className="flex flex-row gap-1 items-center py-1 px-3 border shadow-md rounded-lg hover:underline hover:bg-slate-100"
              >
                <Github className="size-4" />
                GitHub
              </Link>
            )}

            {/* Youtube demo link */}
            {project.links.youtube && (
              <Link
                href={project.links.youtube}
                target="_blank"
                className="flex flex-row gap-1 items-center py-1 px-3 border shadow-md rounded-lg hover:underline hover:bg-slate-100"
              >
                <Youtube className="size-4" />
                YouTube
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectItems;
