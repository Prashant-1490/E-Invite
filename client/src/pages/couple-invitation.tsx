import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { type Couple } from "@shared/schema";
import { useLanguage } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { LoadingSkeleton } from "@/components/ui/loading";
import { EventTimeline } from "@/components/EventTimeline";
import { VenueSection } from "@/components/VenueSection";
import { GiftsSection } from "@/components/GiftsSection";

export default function CoupleInvitation() {
  const [, params] = useRoute("/invitation/:slug");
  const { language, t } = useLanguage();
  
  const { data: couple, isLoading, error } = useQuery<Couple>({
    queryKey: ["/api/couples", params?.slug],
    queryFn: async () => {
      if (!params?.slug) throw new Error("No couple slug provided");
      const response = await fetch(`/api/couples/${params.slug}`);
      if (!response.ok) throw new Error("Failed to fetch couple");
      return response.json();
    },
    enabled: !!params?.slug,
  });

  const handleWhatsAppShare = () => {
    if (!couple) return;
    const url = window.location.href;
    const message = `${language === "gujarati" ? couple.groomNameGujarati : couple.groomNameEnglish} & ${language === "gujarati" ? couple.brideNameGujarati : couple.brideNameEnglish} Wedding Invitation: ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen decorative-bg">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <LoadingSkeleton className="h-96 w-full max-w-4xl mx-auto" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !couple) {
    return (
      <div className="min-h-screen decorative-bg">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-destructive mb-4">Invitation Not Found</h1>
          <p className="text-muted-foreground mb-8">The wedding invitation you're looking for could not be found.</p>
          <Button onClick={() => window.location.href = "/"}>
            Return to Home
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen decorative-bg text-foreground">
      <Header />
      
      {/* Hero Section with Couple Information */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Couple Image */}
            {couple.imageUrl && (
              <div className="mb-8">
                <img
                  src={couple.imageUrl}
                  alt={`${language === "gujarati" ? couple.groomNameGujarati : couple.groomNameEnglish} & ${language === "gujarati" ? couple.brideNameGujarati : couple.brideNameEnglish}`}
                  className="mx-auto w-80 h-80 object-cover rounded-full border-8 border-gold shadow-2xl"
                />
              </div>
            )}
            
            {/* Couple Names */}
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 font-serif gujarati-text">
              {language === "gujarati" 
                ? `${couple.groomNameGujarati} & ${couple.brideNameGujarati}`
                : `${couple.groomNameEnglish} & ${couple.brideNameEnglish}`
              }
            </h1>
            
            <div className="bg-white/90 rounded-xl p-8 shadow-lg border-4 border-gold/50 mb-8">
              <h2 className="text-3xl font-semibold text-red-700 mb-4 gujarati-text">
                {language === "gujarati" ? "લગ્નનું આમંત્રણ" : "Wedding Invitation"}
              </h2>
              <p className="text-lg text-red-800 gujarati-text">
                {language === "gujarati" 
                  ? "આપને અને આપના પરિવારને અમારા શુભ લગ્ન સમારોહમાં ઉપસ્થિત રહેવા માટે હાર્દિક આમંત્રણ આપીએ છીએ"
                  : "We cordially invite you and your family to attend our wedding ceremony"
                }
              </p>
            </div>

            {/* Share Button */}
            <div className="flex justify-center space-x-4">
              <Button
                onClick={handleWhatsAppShare}
                className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-3"
              >
                <i className="fab fa-whatsapp mr-2"></i>
                {t("share")}
              </Button>
              <Button
                onClick={() => window.location.href = "/"}
                className="bg-primary hover:bg-primary/90 text-lg px-8 py-3"
              >
                <i className="fas fa-home mr-2"></i>
                {language === "gujarati" ? "મુખ્ય પૃષ્ઠ" : "Home"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Event Timeline */}
      <EventTimeline />

      {/* Venue Information */}
      <VenueSection />

      {/* Gifts Section */}
      <GiftsSection />

      <Footer />
    </div>
  );
}
