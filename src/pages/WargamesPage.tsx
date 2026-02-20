import htb_img from '@/assets/images/htb.png';
import otw_img from '@/assets/images/otw.png';
import pico_img from '@/assets/images/picoctf.png';
import sts_img from '@/assets/images/sts.png';
import utw_img from '@/assets/images/utw.png';
import HamburgerMenu from '@/components/common/HamburgerMenu';
import TiltCard from '@/components/common/TiltCard';
import wargames from '@/data/wargames.json';

const imageMap: Record<string, string> = {
  'otw.png': otw_img,
  'sts.png': sts_img,
  'picoctf.png': pico_img,
  'utw.png': utw_img,
  'htb.png': htb_img,
};

interface Difficulty {
  value: string;
  color: string;
}

interface Wargame {
  url: string;
  image: string;
  title: string;
  description: string;
  difficulty: Difficulty;
}

const WargamesPage: React.FC = () => (
  <>
    <div className="absolute right-4 top-4 z-20">
      <HamburgerMenu />
    </div>

    <div className="main-content relative z-10">
      <header className="flex flex-col items-center justify-center bg-transparent py-1 pt-8 text-[#ffffff]">
        <h1 className="mb-0 block text-2xl md:text-4xl">Wargames</h1>
        <h2 className="block py-4 text-lg md:text-xl">For fun and profit :)</h2>
        <hr className="mb-[1%] w-[80%] border-2 border-dashed border-[#ffffff]" />
      </header>
      <div className="my-5 flex flex-wrap justify-center gap-2 pb-8">
        {(wargames as Wargame[]).map((wg) => (
          <a
            key={wg.url}
            href={wg.url}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline"
          >
            <TiltCard
              image={imageMap[wg.image]}
              title={wg.title}
              description={wg.description}
              difficulty={wg.difficulty}
            />
          </a>
        ))}
      </div>
    </div>
  </>
);

export default WargamesPage;
