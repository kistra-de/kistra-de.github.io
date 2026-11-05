import { Header } from "@/components/Header";
import { KistraBackground } from "@/components/KistraBackground";
import { HomeSection } from "@/components/sections/HomeSection";
import { ContactSection } from "@/components/sections/ContactSection";

const Index = () => {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <KistraBackground />
      <Header />
      <main className="relative z-10">
        <HomeSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
