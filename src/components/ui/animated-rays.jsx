// "use client";
// import { useEffect, useState } from "react";
// import { cn } from "@/lib/utils";

// export function AnimatedRays({
//     className = "",
//     children
// }) {
//     const [isDark, setIsDark] = useState(false);
//     const [mounted, setMounted] = useState(false);

//     useEffect(() => {
//         setMounted(true);
//         const checkDark = () => {
//             const theme = document.documentElement.getAttribute("data-theme");
//             return theme === "dark" || theme === "black";
// };
//         setIsDark(checkDark());

//         const observer = new MutationObserver(() => setIsDark(checkDark()));
//         observer.observe(document.documentElement, {
//             attributes: true,
//             attributeFilter: ["class"],
//         });
//         return () => observer.disconnect();
//     }, []);

//     if (!mounted) return null;

//     const stripes = `repeating-linear-gradient(
//         100deg,
//         var(--stripe-color) 0%,
//         var(--stripe-color) 7%,
//         transparent 10%,
//         transparent 12%,
//         var(--stripe-color) 16%
//     )`;
//     const rainbow = `
//         repeating-linear-gradient(
//         100deg,
//         #00d4ff 10%,
//         #7c3aed 20%,
//         #ff0080 30%,
//         #00e5ff 40%,
//         #9333ea 50%,
//         #00d4ff 60%
//     )`;
//     return (
//         <section className={cn("relative w-full min-h-screen overflow-hidden", className)}>
//             {/* Aurora Background — matches original .hero */}
//             <div className="absolute inset-0 bg-[#050816]" />
//             <div
//                 className="absolute inset-0"
//                 style={{
//                     backgroundImage: `${stripes}, ${rainbow}`,
//                     backgroundSize: "300%, 200%",
//                     backgroundPosition: "50% 50%, 50% 50%",
//                     filter: isDark
//                         ? "blur(12px) opacity(60%) saturate(180%)"
//                         : "blur(12px) opacity(35%) brightness(0.6)",
//                     maskImage: "linear-gradient(to bottom, black, black)",
//                     WebkitMaskImage: "linear-gradient(to bottom, black, black)",
//                 }}>
//                 {/* Animated overlay — matches original .hero::after */}
//                 <div className="absolute inset-0 animate-aurora-bg"
//                     style={{
//                         backgroundImage: `${stripes}, ${rainbow}`,
//                         backgroundSize: "200%, 100%",
//                         backgroundAttachment: "fixed",
//                         mixBlendMode: "difference",
//                     }} />
//             </div>
            
//             {children && (
//                 <div
//                     className="relative z-20 min-h-screen">
//                     {children}
//                 </div>
//             )}
//         </section>
//     );
// }

// export default AnimatedRays;
