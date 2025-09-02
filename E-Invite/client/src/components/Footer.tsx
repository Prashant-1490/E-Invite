import { useLanguage } from "@/lib/i18n";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-bold mb-4 font-serif">EkanKotri.in</h4>
            <p className="text-primary-foreground/80 gujarati-text">ડિજિટલ વેડિંગ કાર્ડ સેવા</p>
            <p className="text-primary-foreground/80">Digital Wedding Card Services</p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 gujarati-text">સેવાઓ</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li className="gujarati-text">ઑનલાઇન આમંત્રણ કાર્ડ</li>
              <li>Digital Invitations</li>
              <li className="gujarati-text">ઇવેન્ટ મેનેજમેન્ટ</li>
              <li>Multi-language Support</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" data-testid="link-facebook" className="text-primary-foreground/80 hover:text-white transition-colors">
                <i className="fab fa-facebook text-2xl"></i>
              </a>
              <a href="#" data-testid="link-whatsapp" className="text-primary-foreground/80 hover:text-white transition-colors">
                <i className="fab fa-whatsapp text-2xl"></i>
              </a>
              <a href="#" data-testid="link-instagram" className="text-primary-foreground/80 hover:text-white transition-colors">
                <i className="fab fa-instagram text-2xl"></i>
              </a>
              <a href="#" data-testid="link-email" className="text-primary-foreground/80 hover:text-white transition-colors">
                <i className="fas fa-envelope text-2xl"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/80">&copy; 2024 EkanKotri.in - All rights reserved | Created with ❤️ for Shinay Community</p>
        </div>
      </div>
    </footer>
  );
}
