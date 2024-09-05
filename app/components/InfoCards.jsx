import { Link2, ArrowDownNarrowWide, ArrowUpNarrowWide } from 'lucide-react';

const infoCards = [
  {
    title: 'Resume Review',
    bodyText: [
      'Provides personalized feedback and suggestions to enhance the quality and effectiveness of your resume, helping you stand out to potential employers.',
    ],
    icon: ArrowUpNarrowWide,
    id: 1,
  },
  {
    title: 'Personal Brand',
    bodyText: [
      'Enables users to generate and share a customized URL that directs others to their professional profile.',
      'Share your profile link with potential employers and colleagues and get noticed.',
    ],
    icon: Link2,
    id: 2,
  },
  {
    title: 'Share Easily',
    bodyText: [
      'Allows users to easily highlight their professional achievements and skills with detailed descriptions.',
    ],
    icon: ArrowDownNarrowWide,
    id: 3,
  },
];

export default infoCards;
