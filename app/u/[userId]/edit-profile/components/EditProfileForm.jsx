'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

const EditProfileForm = () => {
  const [profileData, setProfileData] = useState({
    username: 'raglandconnor',
    displayName: 'Connor Ragland',
    avatarUrl: 'https://avatars.githubusercontent.com/u/1?v=4',
    currentPosition: 'Computer Science and Mathematics Student',
    location: 'Gainesville, FL',
    email: 'connor@rglnd.com',
    githubUsername: 'raglandconnor',
    linkedInUsername: 'raglandconnor',
    website: 'https://raglandconnor.com',
    bio: `I'm a Computer Science and Mathematics student at the University of Florida.`,

    experience: [
      {
        title: 'Software Engineer Intern',
        company: 'Facebook',
        startDate: 'May 2021',
        endDate: 'August 2021',
        location: 'Menlo Park, CA',
        description: 'I worked on the React team.',
      },
      {
        title: 'Software Engineer Intern',
        company: 'Google',
        startDate: 'May 2020',
        endDate: 'August 2020',
        location: 'Mountain View, CA',
        description: 'I worked on the Angular team.',
      },
    ],
    education: [
      {
        school: 'University of Florida',
        degree: 'B.S. Computer Science',
        startDate: 'August 2018',
        endDate: 'May 2022',
        location: 'Gainesville, FL',
        description: 'I studied Computer Science and Mathematics.',
      },
      {
        school: 'Martin County High School',
        degree: 'General Education',
        startDate: 'August 2018',
        endDate: 'May 2022',
        location: 'Stuart, FL',
        description: 'High school.',
      },
    ],
    projects: [
      {
        title: 'Project 0',
        description: 'This is a project I worked on.',
        technologies: ['Next.js', 'Tailwind CSS', 'MongoDB', 'Node.js'],
        startDate: 'July 2024',
        endDate: 'Present',
        links: {
          readMore: '',
          website: 'https://raglandconnor.com',
          github: 'https://github.com/raglandconnor',
          youtube: '',
        },
      },
    ],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleNestedChange = (index, section, field, value) => {
    const updatedSection = [...profileData[section]];
    updatedSection[index][field] = value;
    setProfileData({
      ...profileData,
      [section]: updatedSection,
    });
  };

  const handleProjectLinksChange = (index, linkField, value) => {
    const updatedProjects = [...profileData.projects];
    updatedProjects[index].links[linkField] = value;
    setProfileData({
      ...profileData,
      projects: updatedProjects,
    });
  };

  const handleTechnologyChange = (projectIndex, techIndex, value) => {
    const updatedProjects = [...profileData.projects];
    updatedProjects[projectIndex].technologies[techIndex] = value;
    setProfileData({
      ...profileData,
      projects: updatedProjects,
    });
  };

  const addTechnology = (projectIndex) => {
    const updatedProjects = [...profileData.projects];
    updatedProjects[projectIndex].technologies.push(''); // Add empty string for new technology
    setProfileData({
      ...profileData,
      projects: updatedProjects,
    });
  };

  const addExperience = () => {
    const newExperience = {
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      location: '',
      description: '',
    };

    setProfileData({
      ...profileData,
      experience: [...profileData.experience, newExperience],
    });
  };

  const addEducation = () => {
    const newEducation = {
      school: '',
      degree: '',
      startDate: '',
      endDate: '',
      location: '',
      description: '',
    };

    setProfileData({
      ...profileData,
      education: [...profileData.education, newEducation],
    });
  };

  const addProject = () => {
    const newProject = {
      title: '',
      description: '',
      technologies: [],
      startDate: '',
      endDate: '',
      links: {
        website: '',
        github: '',
        youtube: '',
      },
    };

    setProfileData({
      ...profileData,
      projects: [...profileData.projects, newProject],
    });
  };

  return (
    <form className="flex flex-col gap-3 mt-4">
      {/* Basic Information */}
      <section>
        <Label htmlFor="displayName" className="text-lg font-medium">
          Display Name
        </Label>
        <Input
          type="text"
          id="displayName"
          name="displayName"
          value={profileData.displayName}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2"
        />

        <Label htmlFor="email" className="text-lg font-medium">
          Email
        </Label>
        <Input
          type="email"
          id="email"
          name="email"
          value={profileData.email}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2"
        />

        <Label htmlFor="currentPosition" className="text-lg font-medium">
          Current Position
        </Label>
        <Input
          type="text"
          id="currentPosition"
          name="currentPosition"
          value={profileData.currentPosition}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2"
        />

        <Label htmlFor="location" className="text-lg font-medium">
          Location
        </Label>
        <Input
          type="text"
          id="location"
          name="location"
          value={profileData.location}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2"
        />

        <Label htmlFor="githubUsername" className="text-lg font-medium">
          GitHub Username
        </Label>
        <Input
          type="text"
          id="githubUsername"
          name="githubUsername"
          value={profileData.githubUsername}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2"
        />

        <Label htmlFor="linkedInUsername" className="text-lg font-medium">
          LinkedIn Username
        </Label>
        <Input
          type="text"
          id="linkedInUsername"
          name="linkedInUsername"
          value={profileData.linkedInUsername}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2"
        />

        <Label htmlFor="website" className="text-lg font-medium">
          Website
        </Label>
        <Input
          type="text"
          id="website"
          name="website"
          value={profileData.website}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2"
        />

        <Label htmlFor="bio" className="text-lg font-medium">
          Bio
        </Label>
        <Textarea
          id="bio"
          name="bio"
          value={profileData.bio}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2"
        />
      </section>

      {/* Experiences */}
      <section>
        <h2 className="text-xl font-semibold mt-5">Experiences</h2>
        <div className="flex flex-col gap-2">
          {profileData.experience.map((exp, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{`Experience ${index + 1}`}</CardTitle>
              </CardHeader>
              <CardContent>
                <Label
                  htmlFor={`experience-title-${index}`}
                  className="text-lg font-medium"
                >
                  Title
                </Label>
                <Input
                  type="text"
                  id={`experience-title-${index}`}
                  value={exp.title}
                  onChange={(e) =>
                    handleNestedChange(
                      index,
                      'experience',
                      'title',
                      e.target.value
                    )
                  }
                  className="border border-gray-300 rounded-md p-2"
                />

                <Label
                  htmlFor={`experience-company-${index}`}
                  className="text-lg font-medium"
                >
                  Company
                </Label>
                <Input
                  type="text"
                  id={`experience-company-${index}`}
                  value={exp.company}
                  onChange={(e) =>
                    handleNestedChange(
                      index,
                      'experience',
                      'company',
                      e.target.value
                    )
                  }
                  className="border border-gray-300 rounded-md p-2"
                />

                <Label
                  htmlFor={`experience-startDate-${index}`}
                  className="text-lg font-medium"
                >
                  Start Date
                </Label>
                <Input
                  type="text"
                  id={`experience-startDate-${index}`}
                  value={exp.startDate}
                  onChange={(e) =>
                    handleNestedChange(
                      index,
                      'experience',
                      'startDate',
                      e.target.value
                    )
                  }
                  className="border border-gray-300 rounded-md p-2"
                />

                <Label
                  htmlFor={`experience-endDate-${index}`}
                  className="text-lg font-medium"
                >
                  End Date
                </Label>
                <Input
                  type="text"
                  id={`experience-endDate-${index}`}
                  value={exp.endDate}
                  onChange={(e) =>
                    handleNestedChange(
                      index,
                      'experience',
                      'endDate',
                      e.target.value
                    )
                  }
                  className="border border-gray-300 rounded-md p-2"
                />

                <Label
                  htmlFor={`experience-location-${index}`}
                  className="text-lg font-medium"
                >
                  Location
                </Label>
                <Input
                  type="text"
                  id={`experience-location-${index}`}
                  value={exp.location}
                  onChange={(e) =>
                    handleNestedChange(
                      index,
                      'experience',
                      'location',
                      e.target.value
                    )
                  }
                  className="border border-gray-300 rounded-md p-2"
                />

                <Label
                  htmlFor={`experience-description-${index}`}
                  className="text-lg font-medium"
                >
                  Description
                </Label>
                <Textarea
                  id={`experience-description-${index}`}
                  value={exp.description}
                  onChange={(e) =>
                    handleNestedChange(
                      index,
                      'experience',
                      'description',
                      e.target.value
                    )
                  }
                  className="border border-gray-300 rounded-md p-2"
                />
              </CardContent>
            </Card>
          ))}
        </div>
        <Button
          variant="secondary"
          onClick={addExperience}
          className="mt-4"
          type="button"
        >
          Add Experience
        </Button>
      </section>

      {/* Education */}
      <section>
        <h2 className="text-xl font-semibold mt-5">Education</h2>
        <div className="flex flex-col gap-2">
          {' '}
          {profileData.education.map((edu, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{`Education ${index + 1}`}</CardTitle>
              </CardHeader>
              <CardContent>
                <Label
                  htmlFor={`education-school-${index}`}
                  className="text-lg font-medium"
                >
                  School
                </Label>
                <Input
                  type="text"
                  id={`education-school-${index}`}
                  value={edu.school}
                  onChange={(e) =>
                    handleNestedChange(
                      index,
                      'education',
                      'school',
                      e.target.value
                    )
                  }
                  className="border border-gray-300 rounded-md p-2"
                />

                <Label
                  htmlFor={`education-degree-${index}`}
                  className="text-lg font-medium"
                >
                  Degree
                </Label>
                <Input
                  type="text"
                  id={`education-degree-${index}`}
                  value={edu.degree}
                  onChange={(e) =>
                    handleNestedChange(
                      index,
                      'education',
                      'degree',
                      e.target.value
                    )
                  }
                  className="border border-gray-300 rounded-md p-2"
                />

                <Label
                  htmlFor={`education-startDate-${index}`}
                  className="text-lg font-medium"
                >
                  Start Date
                </Label>
                <Input
                  type="text"
                  id={`education-startDate-${index}`}
                  value={edu.startDate}
                  onChange={(e) =>
                    handleNestedChange(
                      index,
                      'education',
                      'startDate',
                      e.target.value
                    )
                  }
                  className="border border-gray-300 rounded-md p-2"
                />

                <Label
                  htmlFor={`education-endDate-${index}`}
                  className="text-lg font-medium"
                >
                  End Date
                </Label>
                <Input
                  type="text"
                  id={`education-endDate-${index}`}
                  value={edu.endDate}
                  onChange={(e) =>
                    handleNestedChange(
                      index,
                      'education',
                      'endDate',
                      e.target.value
                    )
                  }
                  className="border border-gray-300 rounded-md p-2"
                />

                <Label
                  htmlFor={`education-location-${index}`}
                  className="text-lg font-medium"
                >
                  Location
                </Label>
                <Input
                  type="text"
                  id={`education-location-${index}`}
                  value={edu.location}
                  onChange={(e) =>
                    handleNestedChange(
                      index,
                      'education',
                      'location',
                      e.target.value
                    )
                  }
                  className="border border-gray-300 rounded-md p-2"
                />

                <Label
                  htmlFor={`education-description-${index}`}
                  className="text-lg font-medium"
                >
                  Description
                </Label>
                <Textarea
                  id={`education-description-${index}`}
                  value={edu.description}
                  onChange={(e) =>
                    handleNestedChange(
                      index,
                      'education',
                      'description',
                      e.target.value
                    )
                  }
                  className="border border-gray-300 rounded-md p-2"
                />
              </CardContent>
            </Card>
          ))}
        </div>
        <Button
          variant="secondary"
          onClick={addEducation}
          className="mt-4"
          type="button"
        >
          Add Education
        </Button>
      </section>

      {/* Projects */}
      <section>
        <h2 className="text-xl font-semibold mt-5">Projects</h2>
        <div className="flex flex-col gap-2">
          {profileData.projects.map((proj, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{`Project ${index + 1}`}</CardTitle>
              </CardHeader>
              <CardContent>
                <Label
                  htmlFor={`project-title-${index}`}
                  className="text-lg font-medium"
                >
                  Title
                </Label>
                <Input
                  type="text"
                  id={`project-title-${index}`}
                  value={proj.title}
                  onChange={(e) =>
                    handleNestedChange(
                      index,
                      'projects',
                      'title',
                      e.target.value
                    )
                  }
                  className="border border-gray-300 rounded-md p-2"
                />

                <p className="text-lg font-medium">Technologies</p>
                <ul className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                  {proj.technologies.map((tech, techIndex) => (
                    <Input
                      key={techIndex}
                      value={tech}
                      onChange={(e) =>
                        handleTechnologyChange(index, techIndex, e.target.value)
                      }
                      className="border border-gray-300 rounded-md p-2"
                    />
                  ))}
                  <Button
                    variant="secondary"
                    onClick={() => addTechnology(index)}
                    type="button"
                  >
                    Add Technology
                  </Button>
                </ul>

                <Label
                  htmlFor={`project-description-${index}`}
                  className="text-lg font-medium"
                >
                  Description
                </Label>
                <Textarea
                  id={`project-description-${index}`}
                  value={proj.description}
                  onChange={(e) =>
                    handleNestedChange(
                      index,
                      'projects',
                      'description',
                      e.target.value
                    )
                  }
                  className="border border-gray-300 rounded-md p-2"
                />

                <Label
                  htmlFor={`project-startDate-${index}`}
                  className="text-lg font-medium"
                >
                  Start Date
                </Label>
                <Input
                  type="text"
                  id={`project-startDate-${index}`}
                  value={proj.startDate}
                  onChange={(e) =>
                    handleNestedChange(
                      index,
                      'projects',
                      'startDate',
                      e.target.value
                    )
                  }
                  className="border border-gray-300 rounded-md p-2"
                />

                <Label
                  htmlFor={`project-endDate-${index}`}
                  className="text-lg font-medium"
                >
                  End Date
                </Label>
                <Input
                  type="text"
                  id={`project-endDate-${index}`}
                  value={proj.endDate}
                  onChange={(e) =>
                    handleNestedChange(
                      index,
                      'projects',
                      'endDate',
                      e.target.value
                    )
                  }
                  className="border border-gray-300 rounded-md p-2"
                />

                <Label
                  htmlFor={`project-website-${index}`}
                  className="text-lg font-medium"
                >
                  Website
                </Label>
                <Input
                  type="text"
                  id={`project-website-${index}`}
                  value={proj.links.website}
                  onChange={(e) =>
                    handleProjectLinksChange(index, 'website', e.target.value)
                  }
                  className="border border-gray-300 rounded-md p-2"
                />

                <Label
                  htmlFor={`project-github-${index}`}
                  className="text-lg font-medium"
                >
                  GitHub
                </Label>
                <Input
                  type="text"
                  id={`project-github-${index}`}
                  value={proj.links.github}
                  onChange={(e) =>
                    handleProjectLinksChange(index, 'github', e.target.value)
                  }
                  className="border border-gray-300 rounded-md p-2"
                />

                <Label
                  htmlFor={`project-youtube-${index}`}
                  className="text-lg font-medium"
                >
                  YouTube
                </Label>
                <Input
                  type="text"
                  id={`project-youtube-${index}`}
                  value={proj.links.youtube}
                  onChange={(e) =>
                    handleProjectLinksChange(index, 'youtube', e.target.value)
                  }
                  className="border border-gray-300 rounded-md p-2"
                />
              </CardContent>
            </Card>
          ))}
        </div>
        <Button
          variant="secondary"
          onClick={addProject}
          className="mt-4"
          type="button"
        >
          Add Project
        </Button>
      </section>

      <Button type="submit" className="mt-8">
        Save Changes
      </Button>
    </form>
  );
};

export default EditProfileForm;
