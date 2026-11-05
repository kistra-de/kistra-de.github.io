import { Fragment, useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Kontakt", href: "#contact" },
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith("/")) {
      window.location.href = href;
      return;
    }
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-foreground/10 bg-background/78 backdrop-blur-xl">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
            className="group flex items-center text-foreground transition-colors"
          >
            <span className="font-mono text-base font-bold uppercase tracking-[0.35em] text-foreground transition-colors group-hover:text-accent md:text-lg">KISTRA</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-2.5 md:flex">
            {navItems.map((item, index) => (
              <Fragment key={item.label}>
                {index > 0 && (
                    <span aria-hidden="true" className="text-sm leading-none text-accent">
                    ·
                  </span>
                )}
                <a
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                  className="font-mono text-xs tracking-[0.22em] text-foreground/62 hover:text-foreground nav-link-hover transition-colors uppercase"
                >
                  {item.label}
                </a>
              </Fragment>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden rounded-xl border border-foreground/10 p-2 text-foreground transition-colors hover:text-accent"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden border-t border-foreground/10 py-6">
            <div className="flex flex-col gap-4">
              {navItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                  className="font-mono text-sm tracking-[0.22em] text-foreground/80 hover:text-accent transition-colors uppercase animate-slide-in-left"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
