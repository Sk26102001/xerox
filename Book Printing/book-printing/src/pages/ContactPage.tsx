import { Link } from 'react-router-dom';
import {
  Phone, Mail, MapPin, Send, Clock, Shield, Users, Printer, ArrowRight, Truck,
  Instagram, MessageSquare
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero / Header */}
      <section className="relative bg-secondary py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)',
              backgroundSize: '20px 20px',
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/20 text-white border border-primary/30 rounded-full px-5 py-2.5 text-sm font-medium mb-6 mt-4">
              <MessageSquare className="h-5 w-5 text-primary" />
              Get in Touch
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-6">
              Contact Us
            </h1>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-6">
              Have questions about printing, binding, pricing, or bulk orders?<br />
              We're here to help — fast responses via WhatsApp, email, or call.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-white/90 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>Mon–Sat: 10 AM – 7 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>GST Invoiced • Secure Payments</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-6">
              {/* WhatsApp / Phone */}
              <div className="bg-white rounded-2xl shadow-xl border border-border p-7 hover:border-primary/50 transition-all duration-300 group">
                <div className="flex items-start gap-5">
                  <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Phone className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-foreground mb-2">Phone / WhatsApp</h3>
                    <p className="text-muted-foreground mb-3">
                      Fastest way to get instant quote or support
                    </p>
                    <a
                      href="https://wa.me/917230001405"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all text-lg"
                    >
                      +91 72300 01405 <ArrowRight className="h-5 w-5" />
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">(WhatsApp preferred)</p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white rounded-2xl shadow-xl border border-border p-7 hover:border-primary/50 transition-all duration-300 group">
                <div className="flex items-start gap-5">
                  <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Mail className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-foreground mb-2">Email Us</h3>
                    <p className="text-muted-foreground mb-3">
                      For quotations, bulk orders, or detailed queries
                    </p>
                    <a
                      href="mailto:info@bookprinters.in"
                      className="text-primary font-medium hover:underline text-lg"
                    >
                      shreeedupub@gmail.com
                    </a>
                    <p className="text-sm text-muted-foreground mt-2">
                      We usually reply within 1–2 hours during business hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="bg-white rounded-2xl shadow-xl border border-border p-7 hover:border-primary/50 transition-all duration-300 group">
                <div className="flex items-start gap-5">
                  <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <MapPin className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-foreground mb-2">Our Location</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Shree Education and Publication Private Limited<br />
                      Mothers school campus,<br />
                      Gaddi maliyan, jonsganj road,<br />
                      Ajmer, Rajasthan 305001<br />
                      India
                    </p>
                    <p className="text-sm text-muted-foreground mt-4">
                      (Pan-India delivery available • Pickup by arrangement)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-2xl border border-border p-8 md:p-10">
                <h2 className="text-3xl font-black text-foreground mb-2">Send us a Message</h2>
                <p className="text-muted-foreground mb-8">
                  Fill in the details below and we'll get back to you quickly.
                </p>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* ... form fields remain unchanged ... */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 XXXXXXXXXX"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-foreground mb-2">Email Address</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-foreground mb-2">Subject</label>
                    <select
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all appearance-none"
                    >
                      <option value="">Select Inquiry Type</option>
                      <option value="quote">Get a Quote / Pricing</option>
                      <option value="order">Place / Track Order</option>
                      <option value="bulk">Bulk or Book Publishing</option>
                      <option value="file">File Upload / Technical Help</option>
                      <option value="other">Other / General Query</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-foreground mb-2">Your Message *</label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Tell us about your printing needs (pages, copies, binding, paper type, etc.)..."
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
                    />
                  </div>

                  <div className="md:col-span-2 flex items-center gap-3">
                    <input type="checkbox" id="terms" className="accent-primary h-5 w-5" required />
                    <label htmlFor="terms" className="text-sm text-muted-foreground">
                      I agree to the <Link to="/terms" className="text-primary hover:underline">Terms & Conditions</Link> 
                    </label>
                  </div>

                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      className="w-full bg-primary text-white font-bold py-4 rounded-lg hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-lg flex items-center justify-center gap-2"
                    >
                      Send Message <Send className="h-5 w-5" />
                    </button>
                  </div>
                </form>

                <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
                  <p>We usually respond within 1–2 hours during business hours.</p>
                  <p className="mt-1">For urgent printing needs, WhatsApp is the fastest option.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: Truck, title: "Pan-India Delivery", desc: "Fast courier to your doorstep" },
              { icon: Users, title: "10,000+ Happy Customers", desc: "Trusted by authors, students & institutes" },
              { icon: Shield, title: "Secure & GST Invoiced", desc: "Razorpay payments • Official invoices" },
            ].map((item) => (
              <div key={item.title} className="bg-white/50 rounded-xl p-6 border border-border">
                <item.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                <h4 className="font-bold text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Updated Instagram Section - matching your screenshot style */}
      <section className="py-12 bg-gradient-to-br from-secondary to-secondary/90">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Instagram Icon */}
          <div className="inline-block mb-6">
            <div className=" text-white p-4 rounded-xl">
              <Instagram className="h-12 w-12 animate-bounce" />
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Follow Us on Instagram
          </h2>

          <p className="text-white/70 text-lg mb-3 max-w-2xl mx-auto">
            See our printed books, customer stories and behind-the-scenes at Shree Publication
          </p>

        

          {/* Gradient Button */}
          <a
            href="https://www.instagram.com/shree_publication"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 text-white font-bold px-10 py-5 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-xl"
          >
            <Instagram className="h-6 w-6" />
            @shree_publication
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}