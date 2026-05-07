import { Link } from 'react-router-dom';
import { BookOpen, Phone, Mail, MapPin, Instagram, Facebook, Twitter, ArrowRight } from 'lucide-react';
import logo from '@/assets/logo2.png';

export default function Footer() {
  return (
    <footer className="bg-secondary text-white">
      {/* Top Banner */}
      <div className="bg-primary py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white font-semibold text-lg">Ready to Print Your Book?</p>
          <Link
            to="/order"
            className="flex items-center gap-2 bg-white text-primary font-bold px-6 py-2 rounded-md hover:bg-white/90 transition-all duration-200 hover:scale-105"
          >
            Start Your Order <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h1 className="text-xl font-bold text-white tracking-wide">
  BOOK PRINTER.IN
</h1>
            <p className="text-white/70 text-sm leading-relaxed">
              Your trusted printing partner in India. High quality book printing, Xerox, Bulk order printing,      digital printing and binding services.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/shree_publication?igsh=MXhmY3l5dWowN24zeg=="
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-primary transition-all duration-200 hover:scale-110"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 bg-white/10 rounded-full hover:bg-primary transition-all duration-200 hover:scale-110"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-white border-b border-primary pb-2">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/order', label: 'Place Order' },
                { href: '/tracking', label: 'Track Order' },
                { href: '/history', label: 'Order History' },
                { href: '/auth', label: 'Login / Register' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-primary text-sm transition-colors duration-200 flex items-center gap-1 hover:gap-2"
                  >
                    <ArrowRight className="h-3 w-3" /> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-bold text-white border-b border-primary pb-2">Our Services</h3>
            <ul className="space-y-2">
              {[
                'Book Printing & Publishing',
                'Notes and Documents Printing',
                'Digital Printing',
                'Spiral Binding',
                'Perfect Glue Binding',
                'Hardbound Binding',
                'Lamination Services',
              ].map((service) => (
                <li key={service} className="text-white/70 text-sm flex items-center gap-1">
                  <ArrowRight className="h-3 w-3 text-primary" /> {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-bold text-white border-b border-primary pb-2">Contact Us</h3>
            <div className="space-y-3">
              <a
                href="tel:+917230001405"
                className="flex items-start gap-3 text-white/70 hover:text-primary text-sm transition-colors duration-200"
              >
                <Phone className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                <span>+91 7230001405</span>
              </a>
              <a
                href="mailto:info@bookprinters.in"
                className="flex items-start gap-3 text-white/70 hover:text-primary text-sm transition-colors duration-200"
              >
                <Mail className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                <span>shreeedupub@gmail.com</span>
              </a>
              <div className="flex items-start gap-3 text-white/70 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                <span>Rajasthan, India</span>
              </div>
              <div className="mt-4 p-3 bg-white/5 rounded-md border border-white/10">
                <p className="text-white/60 text-xs font-medium mb-1">Business Hours</p>
                <p className="text-white text-sm">Mon–Sat: 9:00 AM – 8:00 PM</p>
                <p className="text-white/60 text-xs mt-1">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-xs">
            © 2026 BookPrinters.in. All rights reserved. | GST Registered
          </p>
          <div className="flex items-center gap-4">
            <Link to="/terms" className="text-white/50 hover:text-primary text-xs transition-colors duration-200">Privacy Policy</Link>
            <Link to="/terms" className="text-white/50 hover:text-primary text-xs transition-colors duration-200">Terms of Service</Link>
            <Link to="/terms" className="text-white/50 hover:text-primary text-xs transition-colors duration-200">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
