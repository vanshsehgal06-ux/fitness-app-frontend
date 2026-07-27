export default function CinematicBackground({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020202] text-white">

      {/* Base */}
      <div className="absolute inset-0 bg-[#020202]" />

      {/* Main Left Light */}
      <div
        className="absolute -top-[350px] -left-[350px] h-[1200px] w-[1200px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.08) 25%, rgba(255,255,255,0.03) 50%, transparent 75%)",
          filter: "blur(180px)",
        }}
      />

      {/* Secondary Right Light */}
      <div
        className="absolute top-[15%] -right-[300px] h-[900px] w-[900px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)",
          filter: "blur(180px)",
        }}
      />

      {/* Hero Glow */}
      <div
        className="absolute top-0 left-1/2 h-[500px] w-[1200px] -translate-x-1/2"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.12), rgba(255,255,255,0.03), transparent)",
          filter: "blur(80px)",
        }}
      />

      {/* Floating Fog */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="fog fog-1" />
        <div className="fog fog-2" />
      </div>

      {/* Film Grain */}
      <div className="film-grain" />

      {/* Dark Edge Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 28%, rgba(0,0,0,.92) 100%)",
        }}
      />

      {/* Bottom Fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        {children}
      </div>

    </div>
  );
}