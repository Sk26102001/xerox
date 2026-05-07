import { Link } from 'react-router-dom';
import {
  Shield, FileText, Scale, Clock, AlertTriangle, CheckCircle, ArrowRight,
  IndianRupee, Truck, Lock, Gavel,Upload, Ban, FileWarning,Book
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero / Header Section */}
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
              <Shield className="h-5 w-5 text-primary" />
              Legal & Binding
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-6">
              Terms & Conditions
            </h1>

            <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-4">
              Website: <span className="font-semibold">www.bookprinters.in</span>
              <br />
              Operated by: <span className="font-semibold">Shree Education and Publication Private Limited</span>
              <br />
              (Hereinafter referred to as “Company”, “We”, “Our”, or “Us”)
            </p>

            <p className="text-white/70 text-base mt-2">
              Effective Date: 26 February 2026
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-14 md:space-y-16">
            {/* 1. Legal Acceptance */}
            <div className="bg-white rounded-2xl shadow-xl border border-border p-7 md:p-10">
              <div className="flex items-start gap-5 mb-6">
                <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center shrink-0">
                  <Gavel className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-foreground mb-4">
                    1. Legal Acceptance
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    By accessing, browsing, uploading files, placing an order, or making payment on this website, the user (“Customer”) agrees to be legally bound by these Terms & Conditions, Privacy Policy, Refund Policy, and all applicable Indian laws.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4 font-medium">
                    If you do not agree, you must not use this website.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Nature of Services */}
            <div className="bg-white rounded-2xl shadow-xl border border-border p-7 md:p-10">
              <div className="flex items-start gap-5 mb-6">
                <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center shrink-0">
                  <FileText className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-foreground mb-4">
                    2. Nature of Services
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    The Company provides professional printing and binding services including but not limited to:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-muted-foreground">
                    <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary shrink-0" /> Black & White Book Printing</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary shrink-0" /> Colour Textbook Printing</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary shrink-0" /> High-Resolution Image Printing</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary shrink-0" /> Perfect Binding (Glue Binding)</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary shrink-0" /> Hard Binding</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary shrink-0" /> Cover Lamination (Gloss / Matte)</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary shrink-0" /> Custom Size Printing (A4, A5, 6x9, 7x10 etc.)</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary shrink-0" /> Bulk & Short-Run Print Production</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-6">
                    We are a printing service provider only. We are not the publisher, editor, proofreader, or legal verifier of customer content unless separately contracted in writing.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. File Submission */}
            <div className="bg-white rounded-2xl shadow-xl border border-border p-7 md:p-10">
              <div className="flex items-start gap-5 mb-6">
                <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center shrink-0">
                  <Upload className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-foreground mb-4">
                    3. File Submission & Technical Responsibility
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Files must be submitted in print-ready PDF format unless otherwise agreed.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-3 font-medium">
                    Customer is solely responsible for:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex gap-3"><CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" /> Page size settings</li>
                    <li className="flex gap-3"><CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" /> Margin & bleed accuracy</li>
                    <li className="flex gap-3"><CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" /> Resolution (minimum 300 DPI recommended)</li>
                    <li className="flex gap-3"><CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" /> Font embedding</li>
                    <li className="flex gap-3"><CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" /> Grammar & typographical errors</li>
                    <li className="flex gap-3"><CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" /> Mathematical formula formatting</li>
                  </ul>
                  <p className="text-muted-foreground mt-6">
                    We do not re-check formatting unless specifically paid for as a service. Once file is approved for printing, no post-production claims regarding layout shall be accepted.
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Copyright & IP */}
            <div className="bg-white rounded-2xl shadow-xl border border-border p-7 md:p-10">
              <div className="flex items-start gap-5 mb-6">
                <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center shrink-0">
                  <Scale className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-foreground mb-4">
                    4. Copyright, Intellectual Property & Legal Compliance
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    The Customer warrants and represents that:
                  </p>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex gap-3"><CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" /> They own full copyright OR</li>
                    <li className="flex gap-3"><CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" /> They have valid written authorization to print the submitted content.</li>
                  </ul>
                  <p className="text-muted-foreground mt-6 mb-2 font-medium">
                    The Company shall not be liable for:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex gap-3"><Ban className="h-5 w-5 text-red-500 shrink-0 mt-0.5" /> Copyright infringement</li>
                    <li className="flex gap-3"><Ban className="h-5 w-5 text-red-500 shrink-0 mt-0.5" /> Plagiarism claims</li>
                    <li className="flex gap-3"><Ban className="h-5 w-5 text-red-500 shrink-0 mt-0.5" /> Trademark violations</li>
                    <li className="flex gap-3"><Ban className="h-5 w-5 text-red-500 shrink-0 mt-0.5" /> Defamation</li>
                    <li className="flex gap-3"><Ban className="h-5 w-5 text-red-500 shrink-0 mt-0.5" /> Objectionable, illegal, or banned content</li>
                  </ul>
                  <p className="text-muted-foreground mt-6">
                    The Customer agrees to indemnify and hold harmless the Company against any legal claim arising from submitted content.
                  </p>
                </div>
              </div>
            </div>

            {/* 5. Indemnification */}
            <div className="bg-white rounded-2xl shadow-xl border border-border p-7 md:p-10">
              <div className="flex items-start gap-5 mb-6">
                <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center shrink-0">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-foreground mb-4">
                    5. Indemnification Clause
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    The Customer agrees to indemnify, defend, and hold harmless the Company, its directors, employees, and agents against legal proceedings, government penalties, damages, litigation costs, advocate fees arising from violation of any law due to the Customer’s content or misuse of services.
                  </p>
                </div>
              </div>
            </div>

            {/* 6. Pricing */}
            <div className="bg-white rounded-2xl shadow-xl border border-border p-7 md:p-10">
              <div className="flex items-start gap-5 mb-6">
                <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center shrink-0">
                  <IndianRupee className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-foreground mb-4">
                    6. Pricing Structure & Taxation
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Pricing depends on paper GSM (70 GSM, 80 GSM, 100 GSM etc.), page count, quantity slabs, binding type, colour coverage.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    All prices are subject to revision without notice. GST shall be charged as per Government of India regulations. Invoice will be issued under applicable HSN/SAC code.
                  </p>
                </div>
              </div>
            </div>

                        {/* 6. Book publish term & condition */}
            <div className="bg-white rounded-2xl shadow-xl border border-border p-7 md:p-10">
              <div className="flex items-start gap-5 mb-6">
                <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center shrink-0">
                  <Book className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-foreground mb-4">
                    7. Book Publish Terms & Conditions
                  </h2>

                   <ul className="space-y-3 text-muted-foreground">
                    <li className="flex gap-3"><CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" /> The manuscript must be submitted in editable Microsoft Word format.</li>
                    <li className="flex gap-3"><CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />  The package includes basic formatting only. Extensive typing corrections, rewriting, content modifications, or heavy editing will be charged separately.</li>
                     <li className="flex gap-3"><CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />   Any changes requested after final proof approval will be treated as paid revisions.
Additional author copies, courier charges, special design requirements, or urgent delivery requests will be charged extra.</li>
                      <li className="flex gap-3"><CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />   The publishing process (ISBN & design work) will commence only after advance payment confirmation.</li>
                  </ul>

            
    
                </div>
              </div>
            </div>

            {/* 7-17 – Condensed for brevity, but styled similarly */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Payment Terms */}
              <div className="bg-white rounded-2xl shadow-lg border border-border p-7">
                <div className="flex items-center gap-4 mb-5">
                  <Lock className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-black text-foreground">8. Payment Terms</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  100% advance payment required for all new or online orders. Institutional orders may qualify for structured payment terms. Order production begins only after payment clearance. Payment gateway charges (if any) are non-refundable.
                </p>
              </div>

              {/* Proofing & Approval */}
              <div className="bg-white rounded-2xl shadow-lg border border-border p-7">
                <div className="flex items-center gap-4 mb-5">
                  <CheckCircle className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-black text-foreground">9. Proofing & Approval Policy</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Digital proof will be provided upon request. Printing begins only after customer approval. Approval via Email / WhatsApp constitutes legal consent. Post-approval claims regarding formatting or design errors shall not be entertained.
                </p>
              </div>

              {/* Cancellation */}
              <div className="bg-white rounded-2xl shadow-lg border border-border p-7">
                <div className="flex items-center gap-4 mb-5">
                  <Ban className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-black text-foreground">10. Cancellation Policy</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Order cannot be cancelled after production initiation. Cancellation before production may attract administrative charges. Customized printing jobs are strictly non-refundable once processed.
                </p>
              </div>

              {/* Refund */}
              <div className="bg-white rounded-2xl shadow-lg border border-border p-7">
                <div className="flex items-center gap-4 mb-5">
                  <IndianRupee className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-black text-foreground">11. Refund Policy</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Refunds considered only for manufacturing defect, incorrect quantity, or major production error by Company. Not applicable for minor colour variation (5–10% acceptable), courier delay, or subjective dissatisfaction. Refund timeline: 7–10 working days.
                </p>
              </div>

              {/* Shipping */}
              <div className="bg-white rounded-2xl shadow-lg border border-border p-7">
                <div className="flex items-center gap-4 mb-5">
                  <Truck className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-black text-foreground">12. Shipping & Risk Transfer</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Shipping charges extra unless mentioned. Risk transfers to customer upon handover to courier. Company not liable for transit damage (unless insured), courier delays, natural calamities. Unboxing video may be mandatory for claims.
                </p>
              </div>

              {/* Limitation of Liability */}
              <div className="bg-white rounded-2xl shadow-lg border border-border p-7">
                <div className="flex items-center gap-4 mb-5">
                  <AlertTriangle className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-black text-foreground">13. Limitation of Liability</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Company’s total liability shall not exceed the amount paid for the specific order. Not liable for indirect losses, loss of academic opportunity, business losses, reputation damages, examination disqualification.
                </p>
              </div>
            </div>

            {/* Remaining sections in full blocks */}
            <div className="bg-white rounded-2xl shadow-xl border border-border p-7 md:p-10">
              <div className="flex items-start gap-5 mb-6">
                <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-foreground mb-4">
                    14. Force Majeure
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Company shall not be responsible for delay or failure caused by natural disasters, government restrictions, machinery breakdown, power failure, labour strikes, pandemic situations.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-border p-7 md:p-10">
              <div className="flex items-start gap-5 mb-6">
                <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center shrink-0">
                  <Lock className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-foreground mb-4">
                    15. Data Privacy & Confidentiality
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Customer data shall be used strictly for order processing, communication, billing & dispatch. We do not sell personal data. Files may be stored temporarily for production and record purposes.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-border p-7 md:p-10">
              <div className="flex items-start gap-5 mb-6">
                <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center shrink-0">
                  <Ban className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-foreground mb-4">
                    16. Termination of Service
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    The Company reserves the right to reject any content, cancel suspicious orders, suspend user account, report illegal content to authorities without prior notice.
                  </p>
                </div>
              </div>
            </div>

            {/* Governing Law */}
            <div className="bg-white rounded-2xl shadow-xl border border-border p-7 md:p-10">
              <div className="flex items-start gap-5 mb-6">
                <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center shrink-0">
                  <Scale className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-foreground mb-4">
                    17. Governing Law & Jurisdiction
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    These Terms shall be governed under Indian Law. All disputes shall fall under exclusive jurisdiction of courts in Ajmer, Rajasthan.
                  </p>
                </div>
              </div>
            </div>

            {/* Severability */}
            <div className="bg-white rounded-2xl shadow-xl border border-border p-7 md:p-10">
              <div className="flex items-start gap-5 mb-6">
                <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center shrink-0">
                  <FileWarning className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-foreground mb-4">
                    18. Severability
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    If any clause is found invalid by court of law, remaining clauses shall remain enforceable.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16 text-muted-foreground text-sm">
            <p>© {new Date().getFullYear()} www.bookprinters.in – Shree Education and Publication Private Limited. All rights reserved.</p>
            <p className="mt-2">
              For questions, contact us via WhatsApp or our <Link to="/contact" className="text-primary hover:underline">Contact Page</Link>.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}