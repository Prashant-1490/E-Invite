import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CountdownTimer } from "@/components/CountdownTimer";
import { EventTimeline } from "@/components/EventTimeline";
import { CouplesGrid } from "@/components/CouplesGrid";
import { GiftsSection } from "@/components/GiftsSection";
import { VenueSection } from "@/components/VenueSection";
import { useLanguage } from "@/lib/i18n";

export default function Home() {
  const { t } = useLanguage();
  const eventDate = new Date('2024-11-15T08:00:00');

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleQuickCall = () => {
    window.open('tel:9979300114', '_self');
  };

  const handleQuickWhatsApp = () => {
    window.open('https://wa.me/919979300114', '_blank');
  };

  return (
    <div className="min-h-screen decorative-bg text-foreground">
      <Header />
      
      {/* Hero Section with Traditional Design */}
      <section className="relative py-12 bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
        {/* Traditional Border Pattern */}
        <div className="absolute inset-0 border-8 border-gold opacity-20">
          <div className="absolute inset-4 border-4 border-red-600 opacity-30"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Main Ganesh Image */}
          <div className="mb-8">
            <img
              src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200"
              alt="Lord Ganesha blessing"
              className="mx-auto w-24 h-24 object-cover rounded-full border-4 border-gold floating mb-4"
              data-testid="img-ganesh-blessing"
            />
          </div>
          
          <div className="max-w-4xl mx-auto">
            {/* Organization Header */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-red-700 mb-2 gujarati-text">શ્રી યદુવંશી સોરઠીયા સમાજ શિણાય.</h3>
              <div className="flex justify-center items-center mb-4">
                <div className="w-16 h-0.5 bg-gold"></div>
                <div className="mx-4 text-gold text-2xl">❋</div>
                <div className="w-16 h-0.5 bg-gold"></div>
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-red-800 mb-4 font-serif gujarati-text">
              Shinay Samuhlagnotsav 2024
            </h1>
            
            <div className="flex justify-center items-center mb-6">
              <div className="w-24 h-0.5 bg-gold"></div>
              <div className="mx-4 text-gold text-xl">✦</div>
              <div className="w-24 h-0.5 bg-gold"></div>
            </div>

            {/* Date */}
            <h2 className="text-2xl md:text-3xl font-semibold text-red-700 mb-8 gujarati-text">
              15.Nov.2024
            </h2>
            
            {/* Krishna Image and Devotional Text */}
            <div className="bg-white/80 rounded-xl p-6 shadow-lg border-2 border-gold/30 mb-8">
              <img
                src="https://images.unsplash.com/photo-1593766827447-ceda1ba710b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
                alt="Lord Krishna devotional image"
                className="mx-auto mb-4 w-20 h-20 object-cover rounded-full border-2 border-gold"
                data-testid="img-krishna-devotional"
              />
              <p className="text-lg text-red-700 font-semibold gujarati-text">શ્રી કૃષ્ણમ વંદે જગત ગુરૂ</p>
            </div>

            {/* Venue Image */}
            <div className="mb-8">
              <img
                src="https://images.unsplash.com/photo-1604575801055-7fb5e75e7f04?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300"
                alt="Madhuban Vadi Venue"
                className="mx-auto rounded-lg border-4 border-gold shadow-lg"
                data-testid="img-venue"
              />
              <h4 className="text-xl font-bold text-red-700 mt-4 gujarati-text">શ્રી જેમલડાડા અને આઈ શ્રી સાવલ માતાજી</h4>
            </div>

            {/* Countdown Timer in Traditional Style */}
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-6 shadow-lg border-2 border-gold/50 mb-8">
              <p className="text-lg text-red-700 mb-4 gujarati-text font-semibold">તા. ૧૫/૧૧/૨૦૨૪ - કાર્તક સુદ ૧૫ (પૂનમ)</p>
              <CountdownTimer targetDate={eventDate} />
            </div>
          </div>
        </div>
      </section>

      {/* Invitation Content Section */}
      <section className="py-12 bg-gradient-to-r from-orange-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Traditional Invitation Banner */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-4 border-gold/50 mb-8">
              <h3 className="text-2xl font-bold text-red-700 mb-4 gujarati-text">આમંત્રણ પત્રિકા</h3>
              
              <div className="text-left gujarati-text text-red-800 leading-relaxed mb-6">
                <p className="mb-4 font-semibold">સ્નેહ શ્રી.</p>
                <p className="mb-4">
                  પરમ કૃપાળુ આરાધ્ય દેવ શ્રી કૃષ્ણ પરમાત્માની અસીમ કૃપા થી શ્રી યદુવંશી સોરઠીયા યુવા મંડળ-શિણાય દ્વારા આયોજિત 
                  ચોવીશમા (24મા) સમૂહલગ્નોત્સવનું આયોજન કારતક સુદ ૧૫(પુનમ) વિ.સંવત. ૨૦૮૧ તા.૧૫/૧૧/૨૦૨૪ ના શુભ દિવસે નિરધારેલ છે
                </p>
                <p>
                  આ સમૂહલગ્નોત્સવ માં પધારી પ્રભુતા માં પગ માંડતા નવ દંપતી ઓને સુભાષિશ પાઠવવા અને પાંચ ગામના સમૂહ-પ્રસાદનો લાભ લેવા 
                  આપશ્રીને હાર્દિક આમંત્રણ પાઠવીએ છીએ.
                </p>
              </div>

              {/* Main Sponsors */}
              <div className="border-t-2 border-gold/30 pt-6">
                <h4 className="text-xl font-bold text-red-700 mb-4 gujarati-text">સમૂહલગ્નોત્સવના દાતા :</h4>
                <div className="bg-yellow-50 p-4 rounded-lg border-2 border-gold/30">
                  <p className="font-semibold text-red-800 gujarati-text mb-2">સ્વ. રંભુબેન તેમજ સ્વ. કરસનભાઈ પુંજાભાઈ વાણિયા ના સ્મરણાર્થે</p>
                  <p className="font-bold text-red-900 gujarati-text">શ્રી માવજીભાઈ કરસનભાઈ વાણિયા પરિવાર.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Events Section */}
      <section className="py-12 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-xl p-8 shadow-lg border-4 border-gold/50">
              <h3 className="text-2xl font-bold text-red-700 mb-6 gujarati-text">શુભ અવસરો</h3>
              
              <div className="mb-6">
                <p className="text-lg text-red-800 gujarati-text mb-2">તા. 14/11/2024 સાંજે 4 વાગ્યે.</p>
                
                <div className="flex justify-center items-center my-4">
                  <img
                    src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50"
                    alt="Saraswati"
                    className="w-8 h-8 mr-2"
                  />
                  <span className="text-xl font-bold text-red-700 gujarati-text">સરસ્વતી સન્માન સમારોહ</span>
                  <img
                    src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50"
                    alt="Saraswati"
                    className="w-8 h-8 ml-2"
                  />
                </div>
                
                <p className="text-lg font-semibold text-red-800 gujarati-text mb-2">શૈક્ષણિક વર્ષ 2023-24</p>
                <p className="text-lg text-red-800 gujarati-text mb-4">તેમજ</p>
                
                <div className="flex justify-center items-center">
                  <span className="text-xl font-bold text-red-700 gujarati-text">🎵 સંગીત સંધ્યા 🎵</span>
                </div>
              </div>
              
              <div className="border-t-2 border-gold/30 pt-6">
                <h4 className="text-xl font-bold text-red-700 mb-4 gujarati-text">નિમંત્રક</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="text-red-800 gujarati-text font-semibold">શ્રી યદુવંશી સોરઠીયા સમાજ</div>
                  <div className="text-red-800 gujarati-text font-semibold">શ્રી યદુવંશી સોરઠીયા યુવા મંડળ</div>
                </div>
                <p className="text-red-700 gujarati-text mt-4 font-semibold">
                  સ્થળ:શ્રી યદુવંશી સોરઠીયા સમાજ મધુબન વાડી - શિણાય.
                </p>
              </div>
              
              <div className="mt-6 pt-6 border-t-2 border-gold/30">
                <p className="text-red-700 mb-4">For More Contact: <a href="tel:9979300114" className="font-bold text-blue-600">9979300114</a></p>
                <p className="text-red-700">For Online Digital Wedding Card Contact</p>
                <p className="text-red-700">Pankaj Baldaniya: <a href="tel:8141467223" className="font-bold text-blue-600">8141467223</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EventTimeline />
      <CouplesGrid />
      <VenueSection />
      <GiftsSection />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-50">
        <button
          onClick={handleQuickCall}
          className="w-14 h-14 bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
          data-testid="button-quick-call"
        >
          <i className="fas fa-phone text-xl"></i>
        </button>
        <button
          onClick={handleQuickWhatsApp}
          className="w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
          data-testid="button-quick-whatsapp"
        >
          <i className="fab fa-whatsapp text-xl"></i>
        </button>
        <button
          onClick={scrollToTop}
          className="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
          data-testid="button-scroll-top"
        >
          <i className="fas fa-arrow-up text-xl"></i>
        </button>
      </div>

      <Footer />
    </div>
  );
}
