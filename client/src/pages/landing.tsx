import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";

export default function Landing() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen decorative-bg text-foreground">
      <Header />
      
      <section className="py-32 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <img
              src="https://pixabay.com/get/g4d1dc095a9902b388ccf75b8e8c5afe96d222c295b46be2ad86316652229debaa2eef14038fab332691d6aa14ea907c302e3eff0be3071c15ccd876076376b99_1280.jpg"
              alt="Lord Ganesha blessing"
              className="mx-auto mb-8 w-40 h-32 object-cover rounded-full border-4 border-gold floating"
            />
            
            <h1 className="text-6xl md:text-7xl font-bold text-primary mb-6 font-serif gujarati-text">
              વેલકમ
            </h1>
            <h2 className="text-4xl md:text-5xl font-semibold text-secondary mb-8 font-serif">
              Welcome to EkanKotri
            </h2>
            
            <p className="text-xl text-muted-foreground mb-12 gujarati-text max-w-2xl mx-auto">
              ડિજિટલ વેડિંગ ઇન્વિટેશન અને ઇવેન્ટ મેનેજમેન્ટ પ્લેટફોર્મ
            </p>
            
            <div className="space-y-4">
              <Button
                onClick={() => window.location.href = "/"}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-xl px-8 py-4"
                data-testid="button-enter-site"
              >
                <i className="fas fa-home mr-3"></i>
                Enter Website
              </Button>
              
              <div className="mt-8 bg-card rounded-xl p-8 shadow-lg border-2 border-gold/30">
                <h3 className="text-2xl font-semibold text-foreground mb-4">Features</h3>
                <div className="grid md:grid-cols-3 gap-6 text-left">
                  <div className="flex items-start space-x-3">
                    <i className="fas fa-language text-primary text-xl mt-1"></i>
                    <div>
                      <h4 className="font-semibold text-foreground">Multi-language</h4>
                      <p className="text-sm text-muted-foreground">Gujarati & English support</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <i className="fas fa-mobile-alt text-primary text-xl mt-1"></i>
                    <div>
                      <h4 className="font-semibold text-foreground">Mobile Responsive</h4>
                      <p className="text-sm text-muted-foreground">Perfect on all devices</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <i className="fas fa-edit text-primary text-xl mt-1"></i>
                    <div>
                      <h4 className="font-semibold text-foreground">Admin Panel</h4>
                      <p className="text-sm text-muted-foreground">Easy content management</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
