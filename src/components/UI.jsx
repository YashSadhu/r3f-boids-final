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
        
        {/* Top Header */}
        <div className="absolute top-0 left-0 right-0 z-10 pointer-events-auto p-8">
          <div className="flex justify-between items-center">
            <div className="text-center flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Find Your Perfect
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                  Mentor
                </span>
              </h1>
            </div>
            
            {/* Environment Switcher - Top Right */}
            <div className="flex flex-col items-end gap-2">
              <p className="text-white/60 text-sm">Environment</p>
              <div className="flex gap-2">
                {Object.values(THEMES).map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setTheme(t.key)}
                    className={`px-4 py-2 rounded-full border-2 border-white/30 transition-all duration-500 text-sm hover:bg-white/20
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
          </div>
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-auto p-8">
          <div className="text-center text-white max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
              Connect with AI personas of history's greatest minds and today's most successful leaders
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => alert('Welcome to Yess Mentors! Choose your AI mentor to begin your learning journey.')}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Start Learning
              </button>
              <button 
                onClick={() => alert('Explore our collection of AI mentors including historical figures and modern leaders.')}
                className="border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Explore Mentors
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
