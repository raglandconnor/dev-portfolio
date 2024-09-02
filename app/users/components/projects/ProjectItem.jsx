import { Link2, Github, BookText } from 'lucide-react';

const ProjectItem = ({ userId }) => {
  return (
    <div className="px-0 md:px-2 mt-5">
      <div>
        <h3 className="font-semibold text-xl">Project title</h3>
        <div className="md:flex md:flex-row md:justify-between md:items-baseline">
          <div className="flex flex-row gap-2 flex-wrap">
            <div className="bg-slate-200 rounded-full px-2 border">Next.js</div>
            <div className="bg-slate-200 rounded-full px-2 border">React</div>
            <div className="bg-slate-200 rounded-full px-2 border">
              JavaScript
            </div>
            <div className="bg-slate-200 rounded-full px-2 border">Node.js</div>
            <div className="bg-slate-200 rounded-full px-2 border">Vercel</div>
          </div>
          <p className="italic whitespace-nowrap">Jan 2020 - Present</p>
        </div>
      </div>
      <div className="ml-2 pl-2 mt-2 border-l">
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
      <div className="ml-4 mt-1 flex flex-row gap-2 flex-wrap">
        <a
          href="/"
          className="flex flex-row gap-1 items-center py-1 px-3 border shadow-md rounded-lg hover:underline hover:bg-slate-100"
        >
          <BookText className="size-4" />
          Read more
        </a>
        <a
          href="/"
          className="flex flex-row gap-1 items-center py-1 px-3 border shadow-md rounded-lg hover:underline hover:bg-slate-100"
        >
          <Link2 className="size-4" />
          Link
        </a>
        <a
          href="/"
          className="flex flex-row gap-1 items-center py-1 px-3 border shadow-md rounded-lg hover:underline hover:bg-slate-100"
        >
          <Github className="size-4" />
          GitHub
        </a>
      </div>
    </div>
  );
};

export default ProjectItem;
