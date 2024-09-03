import Spline from '@splinetool/react-spline';
import Image from 'next/image';
import Link from 'next/link';
import infoCards from '../components/InfoCards';
import Navbar from './components/Navbar';

export default function Home() {
  return (
    <main className="flex min-h-screen h-fit flex-col items-center justify-center relative bg-black text-white">
      <Navbar />
      <header
        id="home"
        className="flex flex-col-reverse md:flex-row w-full h-screen max-w-7xl items-center justify-center p-8 relative overflow-hidden"
      >
        <div className="w-full h-2/4 md:h-full md:w-2/5 flex flex-col justify-center items-center md:items-start gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-6xl font-black md:text-8xl text-white">
              DevFolio
            </h1>
            <h2 className="text-xl md:text-2xl text-center md:text-left text-gray-300">
              Start growing today!
            </h2>
          </div>
          <p className="max-w-md text-center md:text-left text-sm md:text-base text-gray-400">
            DevFolio is a platform for developers to showcase their work and
            connect with others.{' '}
          </p>
          <div className="w-full flex items-center justify-center md:justify-start gap-4">
            <button className="w-48 h-12 text-sm sm:text-base rounded bg-white text-black hover:bg-gray-200 transition-colors">
              Get Started
            </button>
          </div>
        </div>

        <div className="w-full h-2/4 md:h-full md:w-3/5 relative">
          <Spline
            className="absolute inset-0 w-full h-full pointer-events-none"
            scene="https://prod.spline.design/pvM5sSiYV2ivWraz/scene.splinecode"
          />
        </div>
      </header>

      <section
        id="about"
        className="h-fit min-h-screen w-full flex relative items-center justify-center p-8 bg-black"
      >
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <Image
            src="/whirl.svg"
            layout="fill"
            objectFit="cover"
            className="sm:rotate-90"
            alt="Background Whirl"
          />
        </div>
        <div className="w-full h-full flex items-center justify-center flex-col gap-8 max-w-7xl relative z-10">
          <h3 className="text-4xl md:text-5xl font-bold text-white">
            Features
          </h3>
          <div className="w-full grid grid-cols-1 grid-rows-3 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-3 lg:grid-rows-1 gap-4 justify-between relative">
            {infoCards.map((infoCard) => (
              <InfoCard
                key={infoCard.id}
                Icon={infoCard.icon}
                title={infoCard.title}
              >
                <p className="text-sm sm:text-base text-center md:text-left text-gray-300">
                  {infoCard.bodyText}
                </p>
              </InfoCard>
            ))}
          </div>
        </div>
      </section>

      <section
        id="waitlist"
        className="h-fit min-h-screen w-full flex flex-col items-center justify-center gap-8 p-8 bg-black"
      >
        <h4 className="text-4xl md:text-5xl font-bold text-white">
          Join the Waitlist
        </h4>
        <div className="w-full max-w-3xl">
          <p className="text-center text-gray-300 mb-6">
            Be the first to know when we launch!
          </p>
          <div className="grid">
            <Link
              href="/signup"
              className="bg-white flex flex-col items-center justify-center text-black rounded p-2 text-lg transition-colors hover:bg-gray-200"
            >
              Sign up now to join our waitlist.
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoCard({ title, Icon, children }) {
  return (
    <div className="w-full h-80 rounded flex flex-col justify-around items-center p-8 bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-xl">
      <div className="p-4 bg-white rounded-full">
        <Icon className="text-black" />
      </div>
      <div>
        <h3 className="text-lg font-bold sm:text-xl text-white">{title}</h3>
      </div>
      <div>{children}</div>
    </div>
  );
}
