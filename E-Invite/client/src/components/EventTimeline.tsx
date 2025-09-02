import { useQuery } from "@tanstack/react-query";
import { type Event } from "@shared/schema";
import { useLanguage } from "@/lib/i18n";
import { LoadingSkeleton } from "@/components/ui/loading";

export function EventTimeline() {
  const { language, t } = useLanguage();
  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4 font-serif gujarati-text">{t("events")}</h2>
            <div className="w-24 h-1 bg-gold mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            {[...Array(6)].map((_, i) => (
              <LoadingSkeleton key={i} className="h-24 w-full" />
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
          <h2 className="text-4xl font-bold text-primary mb-4 font-serif gujarati-text">{t("events")}</h2>
          <div className="w-24 h-1 bg-gold mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {events?.map((event) => (
              <div
                key={event.id}
                className={`bg-card rounded-xl p-6 shadow-lg border-l-4 border-${event.colorScheme} hover:shadow-xl transition-shadow`}
                data-testid={`event-${event.id}`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 bg-${event.colorScheme} rounded-full flex items-center justify-center text-${event.colorScheme}-foreground`}>
                    <i className={`fas fa-${event.icon} text-2xl`}></i>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-foreground gujarati-text">
                      {language === "gujarati" ? event.nameGujarati : event.nameEnglish}
                    </h4>
                    <p className="text-muted-foreground gujarati-text">
                      {language === "gujarati" ? event.timeGujarati : event.timeEnglish}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-semibold text-${event.colorScheme}`}>
                      {new Date(event.datetime).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                      })}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(event.datetime).toLocaleDateString('en-US', {
                        weekday: 'long'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
