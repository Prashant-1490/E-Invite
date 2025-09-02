import { useQuery } from "@tanstack/react-query";
import { type Gift } from "@shared/schema";
import { useLanguage } from "@/lib/i18n";
import { LoadingSkeleton } from "@/components/ui/loading";

export function GiftsSection() {
  const { language, t } = useLanguage();
  const { data: gifts, isLoading } = useQuery<Gift[]>({
    queryKey: ["/api/gifts"],
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4 font-serif gujarati-text">{t("gifts")}</h2>
            <div className="w-24 h-1 bg-gold mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[...Array(12)].map((_, i) => (
              <LoadingSkeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4 font-serif gujarati-text">{t("gifts")}</h2>
          <div className="w-24 h-1 bg-gold mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {gifts?.map((gift) => (
            <div
              key={gift.id}
              className="bg-card rounded-lg shadow-md border border-gold/30 p-6 hover:shadow-lg transition-shadow"
              data-testid={`gift-${gift.id}`}
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                  <i className={`fas fa-${gift.giftIcon}`}></i>
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold text-foreground mb-2 text-sm gujarati-text">
                    {language === "gujarati" ? gift.donorNameGujarati : (gift.donorNameEnglish || gift.donorNameGujarati)}
                  </h5>
                  {(gift.organizationGujarati || gift.organizationEnglish) && (
                    <p className="text-xs text-muted-foreground mb-2">
                      {language === "gujarati" ? gift.organizationGujarati : (gift.organizationEnglish || gift.organizationGujarati)}
                    </p>
                  )}
                  <p className="text-sm text-secondary font-medium gujarati-text">
                    {language === "gujarati" ? gift.giftDescriptionGujarati : (gift.giftDescriptionEnglish || gift.giftDescriptionGujarati)}
                  </p>
                  {gift.amount && (
                    <p className="text-sm font-bold text-primary mt-2">₹{gift.amount}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-lg text-muted-foreground gujarati-text">
            કુલ દાન: {gifts?.length || 0}+ આઇટમ્સ
          </p>
        </div>
      </div>
    </section>
  );
}
