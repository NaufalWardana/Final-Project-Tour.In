import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero";
import Footer from "../../components/Footer";
import PopulerDestination from "../../components/PopulerDestination";
import Features from "../../components/Features";
import Testimonial from "../../components/Testimoni/Testimonial";

const LandingPage = () => {
  return (
    <div>
      {/* Navbar di sini */}
      <Navbar />

      {/* Hero di sini */}
      <Hero />

      {/* Features di sini */}
      <Features />

      {/* PopulerDestination di sini */}
      <PopulerDestination />

      {/* Testimonial di sini */}
      <Testimonial />

      {/* Footer di sini */}
      <Footer />
    </div>
  );
};

export default LandingPage;
