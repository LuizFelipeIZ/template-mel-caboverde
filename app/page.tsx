"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const MapaOrigem = dynamic(() => import("../src/components/MapaOrigem"), {
  ssr: false,
  loading: () => (
    <div className="h-[440px] w-full bg-[#140D06] rounded-2xl flex items-center justify-center border border-[#E8A93B]/20 text-[#E8A93B] text-xs tracking-widest uppercase animate-pulse">
      Carregando mapa de apiários...
    </div>
  ),
});

const PRODUCERS = [
  {
    name: "Família Carvalho",
    place: "Sítio Alto da Serra · Cabo Verde/MG",
    desc: "Há 15 anos cuidando das colmeias com manejo orgânico e colheita seletiva por floração.",
    image: "https://images.unsplash.com/photo-1587049352847-81a56d773c1c?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Apiário Ouro Verde",
    place: "Fazenda Esperança · Cabo Verde/MG",
    desc: "Produção familiar, com apiários distribuídos entre a mata nativa preservada e áreas de cultivo.",
    image: "https://images.unsplash.com/photo-1559599189-d419e4ff28e6?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "João Batista & Filhos",
    place: "Sítio Recanto · Botelhos/MG",
    desc: "Especialistas em mel silvestre e florada de eucalipto, com apiários fixos há mais de uma década.",
    image: "https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?q=80&w=800&auto=format&fit=crop",
  },
];

const HONEYS = [
  { name: "Silvestre", level: 88, color: "#8A4B12", light: "#C97A2E", desc: "Sabor intenso, aroma marcante — vegetação nativa preservada." },
  { name: "Eucalipto", level: 55, color: "#D9971F", light: "#F3CE84", desc: "Âmbar claro, sabor suave e levemente mentolado." },
  { name: "Laranjeira", level: 70, color: "#C9832B", light: "#F0BE6A", desc: "Aroma cítrico e floral, doçura equilibrada." },
  { name: "Cipó-uva", level: 95, color: "#5C3512", light: "#8A5A1E", desc: "Escuro e encorpado, com notas amadeiradas." },
];

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [particles, setParticles] = useState<{ id: number; left: string; delay: string; duration: string; size: string }[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    const newParticles = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      delay: `${Math.random() * 15}s`,
      duration: `${10 + Math.random() * 20}s`,
      size: `${3 + Math.random() * 5}px`,
    }));
    setParticles(newParticles);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="bg-[#F7ECD3] text-[#2B1B0E] antialiased scroll-smooth relative cursor-none" style={{ fontFamily: "var(--font-body, 'Work Sans', sans-serif)" }}>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&family=Work+Sans:wght@300;400;500;600&display=swap");
        
        .font-display { font-family: 'Newsreader', serif; }
        
        body { cursor: none; }
        a, button { cursor: none !important; }

        @keyframes pollenFloat {
          0% { transform: translateY(110vh) translateX(0px) rotate(0deg); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(-10vh) translateX(50px) rotate(360deg); opacity: 0; }
        }
        .pollen {
          position: fixed;
          background: radial-gradient(circle, #F3CE84 0%, #E8A93B 70%, transparent 100%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 10;
          animation: pollenFloat linear infinite;
          box-shadow: 0 0 8px rgba(232, 169, 59, 0.8);
        }

        @keyframes dripFall {
          0%   { transform: translateY(0) scaleY(1); opacity: 1; }
          70%  { transform: translateY(120px) scaleY(1.3); opacity: 1; }
          85%  { transform: translateY(130px) scaleY(0.5); opacity: 1; }
          100% { transform: translateY(130px) scaleY(0.5); opacity: 0; }
        }
        .drip { animation: dripFall 3s ease-in infinite; transform-origin: top center; }

        .vial {
          position: relative;
          width: 52px;
          border-radius: 3px 3px 18px 18px;
          background: rgba(255, 255, 255, 0.5);
          border: 1px solid rgba(138, 75, 18, 0.2);
          box-shadow: inset 0 0 10px rgba(0,0,0,0.05), 0 8px 20px rgba(201, 114, 11, 0.1);
          backdrop-filter: blur(2px);
          overflow: hidden;
          display: flex;
          align-items: flex-end;
          margin: 0 auto;
        }
        .vial::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 40%);
          pointer-events: none;
        }
        .vial-cap {
          position: absolute;
          top: -6px; left: 50%; transform: translateX(-50%);
          width: 26px; height: 10px; 
          background: linear-gradient(to right, #6B5738, #2B1B0E); 
          border-radius: 3px 3px 0 0;
        }
      `}</style>

      {/* CURSOR DE ABELHA */}
      <div 
        className="fixed pointer-events-none z-[9999] text-3xl transition-transform duration-75 ease-out drop-shadow-lg"
        style={{ left: mousePos.x, top: mousePos.y, transform: 'translate(-30%, -30%)' }}
      >
        🐝
      </div>

      {/* PARTÍCULAS DE PÓLEN */}
      {particles.map((p) => (
        <div 
          key={p.id} 
          className="pollen" 
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}

      {/* NAV */}
      <header className="sticky top-0 z-50 bg-[#F7ECD3]/90 backdrop-blur-md border-b border-[#C9720B]/20 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-[80px] px-6 md:px-10">
          <div className="flex items-center gap-2.5 font-display text-[22px] font-semibold text-[#2B1B0E]">
            <span
              className="w-4 h-4 shadow-[0_0_10px_#E8A93B]"
              style={{ background: "#C9720B", clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
            />
            Associação dos Apicultores
          </div>
          <nav className="hidden md:flex gap-10 text-[14px] font-medium text-[#8A4B12]">
            <a href="#produtores" className="hover:text-[#E8A93B] transition-colors">Produtores</a>
            <a href="#origem" className="hover:text-[#E8A93B] transition-colors">Origem</a>
            <a href="#mel" className="hover:text-[#E8A93B] transition-colors">Catálogo</a>
          </nav>
          <a href="#contato" className="text-[14px] font-bold px-6 py-3 rounded-md bg-[#8A4B12] text-[#F7ECD3] hover:bg-[#C9720B] transition-colors shadow-lg shadow-[#8A4B12]/30">
            Fale Conosco
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1B120A] to-[#2A1B0E]">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1587049352851-8d4e8e10bdfb?q=80&w=2070&auto=format&fit=crop')" }}
        />
        
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-24 md:py-32 grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-16 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-10 h-[1px] bg-[#E8A93B]"></span>
              <span className="text-[13px] uppercase tracking-widest font-semibold text-[#E8A93B]">Sul de Minas Gerais</span>
            </div>
            <h1 className="font-display text-[44px] md:text-[60px] leading-[1.05] text-[#F7ECD3] mb-6">
              O sabor do mel puro começa <br/>
              <em className="italic text-[#E8A93B]">na flor.</em>
            </h1>
            <p className="text-[18px] leading-relaxed text-[#C9B896] max-w-md mb-10 font-light">
              Conheça quem produz, onde fica cada apiário e qual floração deu origem ao mel de alta pureza que chega à sua mesa.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#produtores" className="text-[15px] font-bold px-8 py-4 rounded-md bg-gradient-to-r from-[#E8A93B] to-[#C9720B] text-[#1B120A] hover:scale-105 transition-transform shadow-[0_0_20px_rgba(232,169,59,0.4)]">
                Conhecer Produtores
              </a>
              <a href="#origem" className="text-[15px] font-bold px-8 py-4 rounded-md border border-[#F7ECD3]/30 text-[#F7ECD3] hover:bg-[#F7ECD3]/10 transition-colors">
                Ver Mapa de Origem
              </a>
            </div>
          </div>

          <div className="relative hidden md:block h-[400px]">
            <svg viewBox="0 0 260 380" className="w-full h-full drop-shadow-2xl">
              <polygon points="90,20 150,55 150,110 90,145 30,110 30,55" fill="none" stroke="#E8A93B" strokeWidth="2" opacity="0.3" />
              <polygon points="150,55 210,90 210,145 150,180 90,145 90,110" fill="none" stroke="#E8A93B" strokeWidth="2" opacity="0.2" />
              <polygon points="30,110 90,145 90,200 30,235 -30,200 -30,145" fill="none" stroke="#E8A93B" strokeWidth="2" opacity="0.1" />
              <linearGradient id="honeyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F3CE84" />
                <stop offset="50%" stopColor="#E8A93B" />
                <stop offset="100%" stopColor="#C9720B" />
              </linearGradient>
              <path d="M90 130 Q90 160 90 175 Q90 195 108 195 Q126 195 126 175 Q126 158 108 130 Z" fill="url(#honeyGrad)" />
            </svg>
            <div className="absolute left-1/2 -translate-x-1/2" style={{ top: "192px" }}>
              <div className="drip w-4 h-5 rounded-b-full shadow-lg" style={{ background: "linear-gradient(#F3CE84, #C9720B)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* PRODUTORES */}
      <section id="produtores" className="max-w-6xl mx-auto px-6 md:px-10 py-24 md:py-32 relative z-20">
        <div className="max-w-2xl mb-16">
          <div className="text-[13px] uppercase tracking-widest font-bold text-[#C9720B] mb-3">Produtores Locais</div>
          <h2 className="font-display text-[36px] md:text-[46px] font-medium text-[#2B1B0E] mb-4">
            Quem produz o mel da região
          </h2>
          <p className="text-[16px] text-[#8A4B12] leading-relaxed max-w-md">
            Cada família apicultora mantém o equilíbrio entre produção e conservação ambiental.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCERS.map((p, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-lg border-b-4 border-[#E8A93B] hover:-translate-y-2 transition-transform duration-300">
              <div className="aspect-[4/3] relative">
                <img 
                  src={p.image} 
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B120A]/90 via-[#1B120A]/30 to-transparent"></div>
                <div 
                  className="absolute -bottom-4 left-6 w-10 h-10 flex items-center justify-center text-[15px] font-display font-bold text-[#1B120A] shadow-md z-10"
                  style={{ background: "#E8A93B", clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                >
                  {i + 1}
                </div>
              </div>
              <div className="p-8 pt-10">
                <h3 className="font-display font-semibold text-[22px] text-[#2B1B0E] mb-1">{p.name}</h3>
                <div className="text-[13px] uppercase font-bold tracking-wide text-[#C9720B] mb-4">{p.place}</div>
                <p className="text-[15px] text-[#6B5738] leading-relaxed mb-6 font-light">{p.desc}</p>
                <div className="flex gap-3">
                  <a href="#" className="text-[13px] font-bold border border-[#C9720B]/30 rounded-md px-4 py-2 text-[#8A4B12] hover:bg-[#F7ECD3] transition-colors">WhatsApp</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MAPA DE ORIGEM */}
      <section id="origem" className="py-24 md:py-32" style={{ background: "linear-gradient(175deg, #1B120A 0%, #241708 100%)" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-16 items-center relative z-20">
          <div>
            <div className="text-[13px] uppercase tracking-widest font-bold text-[#E8A93B] mb-3">Diferencial Técnico</div>
            <h2 className="font-display text-[36px] md:text-[46px] font-medium text-[#F7ECD3] mb-6 leading-tight">
              A Origem Mapeada
            </h2>
            <p className="text-[16px] text-[#C9B896] leading-relaxed mb-10 font-light">
              A cor e o sabor do mel são ditados pela natureza. Nossos apiários são georreferenciados junto ao tipo de vegetação predominante — silvestre, eucalipto, laranjeira ou cipó-uva.
            </p>
            <div className="flex flex-col gap-4">
              {[
                ["#E8A93B", "Floração Silvestre"], 
                ["#7A9A63", "Mata de Eucalipto"], 
                ["#C9832B", "Pomar de Laranjeira"], 
                ["#8A5A1E", "Mata Nativa (Cipó-uva)"]
              ].map(([c, l], i) => (
                <div key={i} className="flex items-center gap-4 text-[15px] text-[#E0D3B4] font-medium">
                  <span className="w-4 h-4 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.2)]" style={{ background: c }} />
                  {l}
                </div>
              ))}
            </div>
          </div>
          
          <MapaOrigem />
          
        </div>
      </section>

      {/* CATÁLOGO DE FLORAÇÕES */}
      <section id="mel" className="max-w-6xl mx-auto px-6 md:px-10 py-24 md:py-32 relative z-20">
        <div className="text-center mb-16">
          <div className="text-[13px] uppercase tracking-widest font-bold text-[#C9720B] mb-3">Safra 2026</div>
          <h2 className="font-display text-[36px] md:text-[46px] font-medium text-[#2B1B0E] mb-4">
            Catálogo de Florações
          </h2>
          <p className="text-[16px] text-[#8A4B12] max-w-xl mx-auto font-light">
            Cores, aromas e texturas que refletem exatamente a paisagem onde nossas abelhas trabalharam.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {HONEYS.map((h, i) => (
            <div key={i} className="flex flex-col items-center text-center bg-white p-6 rounded-2xl shadow-sm border border-[#E8A93B]/20 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="vial h-[100px] mb-6">
                <div className="vial-cap" />
                <div 
                  className="w-full transition-all duration-1000 ease-in-out" 
                  style={{ 
                    height: `${h.level}%`, 
                    background: `linear-gradient(to bottom, ${h.light}, ${h.color})`,
                    boxShadow: "inset 0 4px 6px rgba(0,0,0,0.1)"
                  }} 
                />
              </div>
              <h3 className="font-display font-semibold text-[22px] mb-2 text-[#2B1B0E]">{h.name}</h3>
              <p className="text-[14px] text-[#6B5738] leading-relaxed font-light">{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER & CTA */}
      <section className="bg-gradient-to-r from-[#8A4B12] to-[#2B1B0E] py-16 relative z-20 border-b-[8px] border-[#E8A93B]">
        <div id="contato" className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-[32px] md:text-[42px] font-medium text-[#F7ECD3] mb-8">
            Prove o verdadeiro sabor da natureza.
          </h2>
          <a href="#" className="inline-block text-[15px] font-bold px-10 py-5 rounded-md bg-[#E8A93B] text-[#1B120A] hover:bg-[#F3CE84] transition-colors shadow-lg">
            Fazer Pedido pelo WhatsApp
          </a>
        </div>
      </section>
      
      <footer className="bg-[#1B120A] py-8 text-center text-[#F7ECD3]/50 text-[13px] font-light relative z-20">
         © 2026 Associação de Apicultores · Desenvolvido por <strong className="text-[#E8A93B] font-normal">Luiz Felipe Silva</strong>
      </footer>
    </div>
  );
}