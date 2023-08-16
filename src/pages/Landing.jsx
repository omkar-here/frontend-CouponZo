import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import Footer from "../Components/Footer";

function Landing() {
  return (
    <div className="bg-white border-gray-200 dark:bg-gray-900 h-full min-h-screen dark:border-gray-700">
      <Navbar />
      <div className="bg-white m-auto text-white">
        <Hero />
      </div>
      <Footer />
    </div>
  );
}

export default Landing;
