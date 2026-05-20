import { useState } from "react";
import { Toaster } from "sonner";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { TrustBanner } from "./components/TrustBanner";
import { Features } from "./components/Features";
import { Mentor } from "./components/Mentor";
import { Research } from "./components/Research";
import { Pricing } from "./components/Pricing";
import { Footer } from "./components/Footer";
import { DropNotification } from "./components/DropNotification";
import { SyllabusModal } from "./components/SyllabusModal";
import { OfferNotification } from "./components/OfferNotification";
import "./App.css";

function App() {
  const [isSyllabusOpen, setIsSyllabusOpen] = useState(false);

  const scrollToPricing = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToMentor = () => {
    document.getElementById("mentor")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="App relative">
      <Navbar onEnroll={scrollToPricing} />
      
      <DropNotification onOpenModal={() => setIsSyllabusOpen(true)} />
      <SyllabusModal isOpen={isSyllabusOpen} onClose={() => setIsSyllabusOpen(false)} />
      
      {/* New promotional notification */}
      <OfferNotification />

      <main>
        <Hero onPrimary={scrollToPricing} onSecondary={scrollToMentor} />
        <TrustBanner />
        <Features />
        <Mentor />
        <Research /> 
        <Pricing />
      </main>
      
      <Footer />
      
      <Toaster theme="dark" position="bottom-right" />
    </div>
  );
}

export default App;
