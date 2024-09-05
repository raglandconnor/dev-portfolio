import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="w-full">
      <div className="w-full h-16 backdrop-filter backdrop-blur-xl bg-black bg-opacity-70 border-b border-gray-800 flex items-center justify-center">
        <div className="max-w-7xl w-full flex items-center justify-between p-4">
          <Link href="/">
            <h6 className="font-bold text-white">DevFolio</h6>
          </Link>
          <ul className="flex gap-8">
            <li>
              <Link
                className="hover:text-gray-300 transition-colors text-xs sm:text-base text-white"
                href="/#about"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-gray-300 transition-colors text-xs sm:text-base text-white"
                href="/#waitlist"
              >
                Waitlist
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
