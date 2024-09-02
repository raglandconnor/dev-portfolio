import { Linkedin, Github, SquareArrowOutUpRight, Inbox } from 'lucide-react';
import Link from 'next/link';

const BioCard = ({ userId }) => {
  return (
    <div className="inline-block mt-3 md:mt-0 w-full border rounded-2xl">
      <div className="py-2 px-3">
        <h1 className="text-4xl md:text-5xl font-bold">{userId}</h1>
        <h2 className="text-xl">Senior Software Engineer</h2>
        <div className="flex flex-row gap-2 mt-1">
          {/* Users LinkedIn Profile */}
          <Link href="/">
            <Linkedin size={36} className="bg-gray-200 p-1 rounded-md" />
          </Link>
          {/* Users GitHub Account */}
          <Link href="/">
            <Github size={36} className="bg-gray-200 p-1 rounded-md" />
          </Link>
          {/* Users own website */}
          <Link href="https://www.google.com/">
            <SquareArrowOutUpRight
              size={36}
              className="bg-gray-200 p-1 rounded-md"
            />
          </Link>
          {/*  */}
          <Link href="/">
            <Inbox size={36} className="bg-gray-200 p-1 rounded-md" />
          </Link>
        </div>
        <div className="mt-4">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint
            assumenda architecto dolorum magni neque. Soluta labore quia
            possimus enim? Sed fugiat maxime aliquid quae sit dicta. Ipsam ex
            eius non. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Sint assumenda architecto dolorum magni neque. Soluta labore quia
            possimus enim? Sed fugiat maxime aliquid quae sit dicta. Ipsam ex
            eius non.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BioCard;
