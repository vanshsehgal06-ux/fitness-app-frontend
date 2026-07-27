import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";
import HeroShowcase from "../components/sections/HeroShowcase";
import Programs from "../components/sections/Programs";
import CTA from "../components/sections/CTA";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Screen 1 */}
      <Hero />

      {/* Screen 2 */}
      <HeroShowcase />

      {/* Screen 3 */}
      <Programs />

      {/* Screen 4 */}
      <CTA/>

      {/* Screen 5 */}
      <Footer/>


    </>
  );
}
