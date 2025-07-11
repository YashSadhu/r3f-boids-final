import { useFont, useGLTF } from "@react-three/drei";
import { atom, useAtom } from "jotai";

export const themeAtom = atom("underwater");

export const THEMES = {
  underwater: {
    key: "underwater",
    skyColor: "#309BFF",
    sunColor: "#FE9E40",
    groundColor: "#DDD6F3",
    titleColor: "#FFFFFF",
    title: "Yess",
    subtitle: "Mentors",
    models: [
      `Koi_01`,
      `Koi_02`,
      `Koi_03`,
      `Koi_04`,
      `Koi_05`,
      `Koi_06`,
      `Koi_07`,
    ],
    dof: true,
  },
  space: {
    key: "space",
    skyColor: "#000000",
    sunColor: "#e1ae4e",
    groundColor: "#333333",
    titleColor: "#ADD8E6",
    title: "Yess",
    subtitle: "Mentors",
    models: [`Koi_08`],
    dof: false,
  },
};

Object.values(THEMES).forEach((theme) => {
  theme.models.forEach((model) => useGLTF.preload(`/models/${model}.glb`));
});

useFont.preload("/fonts/Poppins Black_Regular.json");

export const UI = () => {
  const [theme, setTheme] = useAtom(themeAtom);
  return (
    <>
      <main className="pointer-events-none select-none z-10 fixed inset-0 flex flex-col">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(rgba(0,0,0,0.0)_70%,rgba(0,0,0,1)_170%)]" />
        
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 pointer-events-auto p-8">
          <nav className="flex justify-between items-center">
            <div className="text-white text-xl font-bold">Yess Mentors</div>
            <div className="flex gap-6">
              <a href="#about" className="text-white/80 hover:text-white transition-colors">About</a>
              <a href="#mentors" className="text-white/80 hover:text-white transition-colors">Mentors</a>
              <a href="#contact" className="text-white/80 hover:text-white transition-colors">Contact</a>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center pointer-events-none">
          <div className="text-center text-white max-w-2xl px-8">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Find Your Perfect
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                Mentor
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
              Connect with industry experts and accelerate your career growth through personalized mentorship
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                Find a Mentor
              </button>
              <button className="border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300">
                Become a Mentor
              </button>
            </div>
          </div>
        </div>

        {/* Theme Switcher */}
        <div className="absolute z-10 pointer-events-auto flex flex-col items-center justify-center bottom-0 w-screen p-8 gap-4">
          <p className="text-white/60 text-sm">Choose your environment</p>
          <div className="flex gap-2 items-center justify-center">
            {Object.values(THEMES).map((t) => (
              <button
                key={t.key}
                onClick={() => setTheme(t.key)}
                className={`px-6 py-3 rounded-full border-2 border-white/30 transition-all duration-500 min-w-32 hover:bg-white/20
                    ${
                      theme === t.key
                        ? "bg-white/20 text-white border-white/60"
                        : "bg-white/10 text-white/70"
                    }`}
              >
                {t.key === 'underwater' ? 'Ocean' : 'Space'}
              </button>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};
