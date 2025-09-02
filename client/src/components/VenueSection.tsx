import { useQuery } from "@tanstack/react-query";
import { type ContactInfo } from "@shared/schema";
import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { LoadingSkeleton } from "@/components/ui/loading";

export function VenueSection() {
  const { language, t } = useLanguage();
  const { data: contacts, isLoading } = useQuery<ContactInfo[]>({
    queryKey: ["/api/contact-info"],
  });

  const primaryContact = contacts?.find(c => c.isPrimary) || contacts?.[0];

  const handleGetDirections = () => {
    if (primaryContact) {
      const address = language === "gujarati" ? primaryContact.addressGujarati : primaryContact.addressEnglish;
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
      window.open(googleMapsUrl, '_blank');
    }
  };

  const handleCopyLocation = async () => {
    if (primaryContact) {
      const address = language === "gujarati" ? primaryContact.addressGujarati : primaryContact.addressEnglish;
      try {
        await navigator.clipboard.writeText(address);
        // You could add a toast notification here
      } catch (err) {
        console.error('Failed to copy address:', err);
      }
    }
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-br from-secondary/10 via-background to-primary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4 font-serif gujarati-text">{t("venue")}</h2>
            <div className="w-24 h-1 bg-gold mx-auto mt-4 rounded-full"></div>
          </div>
          <LoadingSkeleton className="h-96 w-full max-w-4xl mx-auto" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-secondary/10 via-background to-primary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4 font-serif gujarati-text">{t("venue")}</h2>
          <div className="w-24 h-1 bg-gold mx-auto mt-4 rounded-full"></div>
        </div>

        {primaryContact && (
          <div className="max-w-4xl mx-auto bg-card rounded-xl shadow-lg border-2 border-gold/30 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-8">
                <h4 className="text-2xl font-bold text-primary mb-4 gujarati-text">
                  {language === "gujarati" ? primaryContact.organizationGujarati : primaryContact.organizationEnglish}
                </h4>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-map-marker-alt text-primary text-xl"></i>
                    <span className="text-muted-foreground gujarati-text">
                      {language === "gujarati" ? primaryContact.addressGujarati : primaryContact.addressEnglish}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-phone text-primary text-xl"></i>
                    <a
                      href={`tel:${primaryContact.phoneNumber}`}
                      className="text-primary hover:text-primary/80 transition-colors font-semibold"
                      data-testid="link-phone-primary"
                    >
                      {primaryContact.phoneNumber}
                    </a>
                  </div>
                  {primaryContact.whatsappNumber && (
                    <div className="flex items-center space-x-3">
                      <i className="fab fa-whatsapp text-green-600 text-xl"></i>
                      <a
                        href={`https://wa.me/${primaryContact.whatsappNumber}`}
                        className="text-green-600 hover:text-green-700 transition-colors font-semibold"
                        data-testid="link-whatsapp-primary"
                      >
                        {primaryContact.whatsappNumber}
                      </a>
                    </div>
                  )}
                  {primaryContact.email && (
                    <div className="flex items-center space-x-3">
                      <i className="fas fa-envelope text-primary text-xl"></i>
                      <a
                        href={`mailto:${primaryContact.email}`}
                        className="text-primary hover:text-primary/80 transition-colors"
                        data-testid="link-email-primary"
                      >
                        {primaryContact.email}
                      </a>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex space-x-4">
                  <Button
                    onClick={handleGetDirections}
                    className="bg-primary hover:bg-primary/90"
                    data-testid="button-get-directions"
                  >
                    <i className="fas fa-directions mr-2"></i>
                    {t("getDirections")}
                  </Button>
                  <Button
                    onClick={handleCopyLocation}
                    className="bg-secondary hover:bg-secondary/90"
                    data-testid="button-copy-location"
                  >
                    <i className="fas fa-copy mr-2"></i>
                    {t("copyLocation")}
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1604575801055-7fb5e75e7f04?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=400"
                  alt="Traditional Indian wedding venue"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-semibold">
                    {language === "gujarati" ? primaryContact.addressGujarati : primaryContact.addressEnglish}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
