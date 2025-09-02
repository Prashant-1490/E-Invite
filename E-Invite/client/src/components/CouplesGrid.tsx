import { useQuery } from "@tanstack/react-query";
import { type Couple } from "@shared/schema";
import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { LoadingSkeleton } from "@/components/ui/loading";

export function CouplesGrid() {
  const { language, t } = useLanguage();
  const { data: couples, isLoading } = useQuery<Couple[]>({
    queryKey: ["/api/couples"],
  });

  const handleWhatsAppShare = (couple: Couple) => {
    const url = `${window.location.origin}/invitation/${couple.coupleSlug}`;
    const message = `${language === "gujarati" ? couple.groomNameGujarati : couple.groomNameEnglish} & ${language === "gujarati" ? couple.brideNameGujarati : couple.brideNameEnglish} Wedding Invitation: ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4 font-serif gujarati-text">{t("couples")}</h2>
            <div className="w-24 h-1 bg-gold mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[...Array(9)].map((_, i) => (
              <LoadingSkeleton key={i} className="h-96 w-full" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4 font-serif gujarati-text">{t("couples")}</h2>
          <div className="w-24 h-1 bg-gold mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {couples?.map((couple) => (
            <div
              key={couple.id}
              className="bg-background rounded-xl shadow-lg border-2 border-gold/30 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105"
              data-testid={`couple-card-${couple.coupleSlug}`}
            >
              <img
                src={couple.imageUrl || "https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"}
                alt={`${language === "gujarati" ? couple.groomNameGujarati : couple.groomNameEnglish} & ${language === "gujarati" ? couple.brideNameGujarati : couple.brideNameEnglish}`}
                className="w-full h-48 object-cover"
                data-testid={`couple-image-${couple.coupleSlug}`}
              />
              <div className="p-6">
                <h4 className="text-2xl font-bold text-center text-primary mb-2 gujarati-text">
                  {language === "gujarati" 
                    ? `${couple.groomNameGujarati} & ${couple.brideNameGujarati}`
                    : `${couple.groomNameEnglish} & ${couple.brideNameEnglish}`
                  }
                </h4>
                <div className="flex justify-center space-x-4 mb-4">
                  <Button
                    className="bg-primary hover:bg-primary/90 text-sm"
                    data-testid={`button-view-invitation-${couple.coupleSlug}`}
                  >
                    <i className="fas fa-scroll mr-2"></i>
                    {t("viewInvitation")}
                  </Button>
                  <Button
                    onClick={() => handleWhatsAppShare(couple)}
                    className="bg-green-600 hover:bg-green-700 text-white text-sm"
                    data-testid={`button-share-whatsapp-${couple.coupleSlug}`}
                  >
                    <i className="fab fa-whatsapp mr-2"></i>
                    {t("share")}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
