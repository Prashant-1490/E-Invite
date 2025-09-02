import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export function Header() {
  const { language, setLanguage, t } = useLanguage();

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
    </header>
  );
}
