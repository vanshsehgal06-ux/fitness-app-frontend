import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";
import Programs from "../components/sections/Programs";
import Features from "@/components/sections/Features";
import Pricing from "../components/sections/Pricing"
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Screen 1 */}
      <Hero />

      {/* Screen 2 */}
      <Programs />

      {/* Screen 3 */}
      <Features />

      {/* Screen 4 */}
      <Pricing/>

      {/* Screen 5 */}
      <Footer/>


    </>
  );
}
