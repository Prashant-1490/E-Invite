import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [location, setLocation] = useLocation();

  const scrollToSection = (sectionId: string) => {
    // If not on home page, navigate to home first
    if (location !== '/') {
      setLocation('/');
      // Wait for navigation then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    } else {
      // Already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleNavigation = (path: string, sectionId?: string) => {
    if (sectionId) {
      scrollToSection(sectionId);
    } else {
      setLocation(path);
    }
  };

  const navigationItems = [
    { label: "Home", labelGuj: "હોમ", path: "/", sectionId: "home" },
    { label: "Couples", labelGuj: "જોડકું", path: "/", sectionId: "couples" },
    { label: "Events", labelGuj: "ઇવેન્ટ્સ", path: "/", sectionId: "events" },
    { label: "Gifts", labelGuj: "ભેટો", path: "/", sectionId: "gifts" },
    { label: "Contact Us", labelGuj: "અમારો સંપર્ક", path: "/", sectionId: "footer" }
  ];

  const isActiveSection = (sectionId?: string) => {
    if (location !== '/') return false;
    if (!sectionId) return false;
    // You could add logic here to detect which section is currently in view
    return false;
  };

  return (
    <header className="bg-card shadow-lg border-b-2 border-gold">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="text-3xl text-gold">
              <i className="fas fa-om"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary font-serif">EkanKotri</h1>
              <p className="text-sm text-muted-foreground">Digital Wedding Invitations</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant={language === "gujarati" ? "default" : "outline"}
              onClick={() => setLanguage("gujarati")}
              data-testid="button-language-gujarati"
              className="bg-primary hover:bg-primary/90"
            >
              ગુજરાતી
            </Button>
            <Button
              variant={language === "english" ? "default" : "outline"}
              onClick={() => setLanguage("english")}
              data-testid="button-language-english"
              className="bg-secondary hover:bg-secondary/90"
            >
              English
            </Button>
          </div>
        </div>
      </div>
      
      {/* Navigation Toolbar */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-t border-gold/20">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-center space-x-1 py-3">
            {navigationItems.map((item, index) => {
              const isActive = location === item.path && isActiveSection(item.sectionId);
              return (
                <button
                  key={index}
                  onClick={() => handleNavigation(item.path, item.sectionId)}
                  className={`
                    px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-primary/20 hover:text-primary
                    ${isActive 
                      ? "bg-primary text-white shadow-lg scale-105" 
                      : "text-muted-foreground hover:scale-105"
                    }
                  `}
                  data-testid={`nav-${item.label.toLowerCase().replace(" ", "-")}`}
                >
                  {language === "gujarati" ? item.labelGuj : item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
