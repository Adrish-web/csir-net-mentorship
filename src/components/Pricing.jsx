import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Check,
  Copy,
  CreditCard,
  ShieldCheck,
  Sparkles,
  Loader2,
  IndianRupee,
  Gift,
  X,
  CheckCircle,
  SmartphoneNfc,
  QrCode
} from "lucide-react";
import { BRAND, IMAGES, PRICING_INCLUDES } from "../lib/constants";

// --- CONFIGURATIONS ---
const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_YourKeyIdHere";
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwD1178An3LfvJjV63mZBCOiaXBFg5vANulzuc9i1t-2SVBgxgbJZUpLHeby0vO43gcjw/exec";

// DEVICE DETECTION (Are they on a phone or a computer?)
const isMobile = typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// --- ANIMATION ---
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

// --- HELPER: Load Razorpay SDK ---
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const Pricing = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  
  // NEW STATE: Controls the Upsell Popup after getting free notes
  const [showPaymentPrompt, setShowPaymentPrompt] = useState(false);

  // --- 1. GOOGLE SHEETS FORM SUBMISSION ---
  const submitLead = async (opts = {}) => {
    if (!form.name || !form.email || !form.phone) {
      toast.error("Please fill all required fields.");
      return false;
    }

    try {
      setSubmitting(true);
      const data = new URLSearchParams();
      data.append("name", form.name);
      data.append("email", form.email);
      data.append("phone", form.phone);
      
      let finalMessage = form.message;
      if (opts.paymentId) {
        finalMessage += `\n[✅ PAID VIA: ${opts.paymentId}]`;
      }
      data.append("message", finalMessage);

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: data,
        mode: "no-cors", 
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      if (!opts.silent) {
        setForm(prev => ({ ...prev, message: "" }));
        setShowPaymentPrompt(true);
      }
      return true;
    } catch (e) {
      toast.error("Could not submit. Please check your connection.");
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  // --- 2. RAZORPAY PAYMENT ---
  const handleRazorpayPayment = async () => {
    if (RAZORPAY_KEY_ID === "rzp_test_YourKeyIdHere" || !RAZORPAY_KEY_ID) {
      toast.error("Developer Error: Razorpay Key is missing in .env file.");
      return;
    }

    // UX FLOW: If form is NOT filled, auto-scroll down to the form!
    if (!form.name || !form.email || !form.phone) {
      toast.error("Please fill your details here first so we can enroll you after payment!");
      
      const formEl = document.getElementById("lead-form-container");
      if (formEl) {
        formEl.scrollIntoView({ behavior: "smooth", block: "center" });
        formEl.classList.add("ring-2", "ring-cyan-500", "shadow-[0_0_30px_rgba(6,182,212,0.4)]");
        setTimeout(() => formEl.classList.remove("ring-2", "ring-cyan-500", "shadow-[0_0_30px_rgba(6,182,212,0.4)]"), 2000);
      }
      return;
    }

    setSubmitting(true);
    const res = await loadRazorpayScript();

    if (!res) {
      toast.error("Razorpay failed to load. Please check your internet connection.");
      setSubmitting(false);
      return;
    }

    try {
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: 1500 * 100, 
        currency: "INR",
        name: BRAND.name,
        description: "CSIR NET Dec 2026 Batch",
        handler: async function (response) {
          toast.success("Payment Successful! Enrolling you now...");
          await submitLead({ silent: true, paymentId: `Razorpay - ${response.razorpay_payment_id}` }); 
          toast.success("Welcome to the batch! Please check your email.");
          
          setForm({ name: "", email: "", phone: "", message: "" }); 
          setShowPaymentPrompt(false);
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: { color: "#06b6d4" },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      paymentObject.on("payment.failed", function (response) {
        toast.error("Payment Failed: " + response.error.description);
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to open Razorpay.");
    } finally {
      setSubmitting(false);
    }
  };

  // --- 3. DYNAMIC UPI PAYMENT (Mobile App vs PC QR Code) ---
  const handleUpiPayment = async () => {
    if (!form.name || !form.email || !form.phone) {
      toast.error("Please fill your details here first so we can enroll you after payment!");
      
      const formEl = document.getElementById("lead-form-container");
      if (formEl) {
        formEl.scrollIntoView({ behavior: "smooth", block: "center" });
        formEl.classList.add("ring-2", "ring-yellow-500", "shadow-[0_0_30px_rgba(234,179,8,0.4)]");
        setTimeout(() => formEl.classList.remove("ring-2", "ring-yellow-500", "shadow-[0_0_30px_rgba(234,179,8,0.4)]"), 2000);
      }
      return;
    }

    if (isMobile) {
      // MOBILE: Submit intent silently, close modal, open UPI apps natively
      await submitLead({ silent: true, paymentId: "UPI Direct Intent" });
      toast.success("Opening UPI Apps... Please complete the payment there!");
      setShowPaymentPrompt(false);
      
      const upiUrl = `upi://pay?pa=${BRAND.upiId}&pn=Adrish%20Ghosh&am=1500&cu=INR&tn=CSIR%20NET%20Dec%202026`;
      window.location.href = upiUrl;
      setForm({ name: "", email: "", phone: "", message: "" });
    } else {
      // PC / DESKTOP: Close modal, scroll to the QR Code section beautifully
      toast.info("Please scan the QR code to complete your payment.");
      setShowPaymentPrompt(false);
      
      const qrEl = document.getElementById("upi-qr-section");
      if (qrEl) {
        qrEl.scrollIntoView({ behavior: "smooth", block: "center" });
        qrEl.classList.add("ring-2", "ring-cyan-500", "shadow-[0_0_30px_rgba(6,182,212,0.4)]");
        setTimeout(() => qrEl.classList.remove("ring-2", "ring-cyan-500", "shadow-[0_0_30px_rgba(6,182,212,0.4)]"), 2000);
      }
    }
  };

  // --- 4. COPY UPI ID ---
  const copyUpi = async () => {
    try {
      await navigator.clipboard.writeText(BRAND.upiId);
      toast.success("UPI ID copied to clipboard!");
    } catch {
      toast.error("Could not copy UPI ID");
    }
  };

  return (
    <section id="pricing" data-testid="pricing-section" className="relative py-24 md:py-32 overflow-hidden">
      
      {/* 🚀 POST-LEAD UPSELL MODAL 🚀 */}
      <AnimatePresence>
        {showPaymentPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            {/* Dark Blur Backdrop */}
            <div 
              className="absolute inset-0 bg-[#0B1120]/90 backdrop-blur-xl" 
              onClick={() => setShowPaymentPrompt(false)} 
            />
            
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="relative z-10 w-full max-w-md bg-[#181e2a] border border-cyan-500/30 rounded-3xl shadow-[0_0_50px_rgba(6,182,212,0.15)] p-6 sm:p-8 flex flex-col items-center text-center overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />

              <button
                onClick={() => setShowPaymentPrompt(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-500/30 flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              
              <h3 className="font-display text-2xl font-bold text-white mb-2">
                Free Notes Sent! 🎉
              </h3>
              <p className="text-slate-300 text-[15px] leading-relaxed mb-6">
                Your sample chapter is securely on its way to <span className="text-white font-medium">{form.email}</span>.<br /><br />
                Ready to secure your seat in the CSIR NET Dec 2026 batch? <span className="text-cyan-300 font-semibold">Complete your enrollment now.</span>
              </p>

              <div className="flex flex-col gap-3 w-full">
                <button
                  type="button"
                  onClick={() => {
                    setShowPaymentPrompt(false);
                    handleRazorpayPayment(); 
                  }}
                  className="w-full pulse-cta inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-white font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg"
                >
                  <CreditCard className="w-5 h-5" />
                  Pay ₹1500 via Razorpay
                </button>

                {/* DYNAMIC UPI BUTTON */}
                <button
                  type="button"
                  onClick={handleUpiPayment}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-white font-semibold bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 shadow-lg"
                >
                  {isMobile ? <SmartphoneNfc className="w-5 h-5" /> : <QrCode className="w-5 h-5" />}
                  {isMobile ? "Pay via UPI App" : "Scan UPI QR"}
                </button>
              </div>
              
              <button
                type="button"
                onClick={() => setShowPaymentPrompt(false)}
                className="mt-5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                Maybe later, I'll review the free notes first.
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="orb bg-cyan-500/20 w-[460px] h-[460px] -top-20 right-0" />
      <div className="orb bg-yellow-500/10 w-[360px] h-[360px] bottom-0 -left-20" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div {...fadeUp} className="max-w-3xl">
          <span className="text-xs sm:text-sm uppercase tracking-[0.25em] font-medium text-cyan-400">
            Enrollment
          </span>
          <h2 className="font-display mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
            Limited Seats.{" "}
            <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
              Serious aspirants only.
            </span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-slate-300 leading-relaxed">
            Reserve your seat for the CSIR NET Dec 2026 batch. Monthly UPI mandate — cancel anytime.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Pricing card */}
          <motion.div
            {...fadeUp}
            data-testid="pricing-card"
            className="lg:col-span-7 rounded-3xl p-8 md:p-10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-md border border-cyan-400/30 shadow-[0_8px_40px_rgba(6,182,212,0.1)] relative overflow-hidden"
          >
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/15 border border-yellow-400/30 text-yellow-200 text-[11px] font-medium uppercase tracking-wider">
                <Sparkles className="w-3 h-3" /> Best Value
              </span>
            </div>

            <div className="flex items-baseline gap-1.5">
              <IndianRupee className="w-7 h-7 text-cyan-300 mb-1" />
              <span data-testid="price-amount" className="font-display text-6xl sm:text-7xl font-bold text-white tracking-tight leading-none">
                1500
              </span>
              <span className="text-slate-400 text-base ml-2">/ month</span>
            </div>
            <p className="mt-3 text-slate-300 text-sm">
              All-inclusive. No hidden fees. Cancel anytime.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PRICING_INCLUDES.map((p, i) => (
                <div key={i} data-testid={`pricing-include-${i}`} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 grid place-items-center rounded-full bg-cyan-400/15 border border-cyan-400/30">
                    <Check className="w-3 h-3 text-cyan-300" />
                  </span>
                  <span className="text-sm text-slate-200">{p}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                data-testid="razorpay-button"
                onClick={handleRazorpayPayment}
                disabled={submitting}
                className="pulse-cta group inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-white font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
                Subscribe with Razorpay
              </button>

              {/* DYNAMIC UPI BUTTON FOR PRICING CARD */}
              <button
                type="button"
                onClick={handleUpiPayment}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-white font-semibold bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 transition-all duration-300"
              >
                {isMobile ? <SmartphoneNfc className="w-4 h-4" /> : <QrCode className="w-4 h-4" />}
                {isMobile ? "Pay via UPI App" : "Scan UPI QR"}
              </button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-300" />
                256-bit Secure
              </span>
              <span>•</span>
              <span>Monthly UPI Autopay supported</span>
              <span>•</span>
              <span>Instant access after payment</span>
            </div>
          </motion.div>

          {/* UPI + Lead capture */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <motion.div
              {...fadeUp}
              id="upi-qr-section"
              data-testid="upi-card"
              className="rounded-3xl p-6 md:p-8 bg-white/5 backdrop-blur-md border border-white/10 transition-all duration-500"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-cyan-400 font-medium">UPI Direct</div>
                  <div className="mt-1 font-display text-xl font-semibold text-white">Scan to Pay</div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-[10px] uppercase tracking-wider">
                  GPay · PhonePe · Paytm
                </span>
              </div>

              <div className="mt-5 flex items-center justify-center">
                <div className="relative p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                  <img src={IMAGES.qr} alt="UPI QR Code" className="w-44 h-44 object-cover rounded-xl" />
                  <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-md text-[10px] bg-yellow-400 text-black font-semibold">
                    ₹1500
                  </span>
                </div>
              </div>

              <div className="mt-5 rounded-xl bg-black/30 border border-white/10 p-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">UPI ID</div>
                  <div data-testid="upi-id-display" className="text-sm text-white font-mono truncate">{BRAND.upiId}</div>
                </div>
                <button
                  type="button"
                  data-testid="copy-upi-button"
                  onClick={copyUpi}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cyan-500/15 border border-cyan-400/30 text-cyan-200 text-xs hover:bg-cyan-500/25"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy
                </button>
              </div>

              <p className="mt-4 text-[11px] text-slate-400 leading-relaxed">
                After payment, fill the form below so we can confirm your enrollment and send batch access within 24 hours.
              </p>
            </motion.div>

            {/* FORM WRAPPER: Removed framer-motion directly on the <form> element to fix scrolling glitch */}
            <motion.div {...fadeUp} id="lead-form-container" className="rounded-3xl p-6 md:p-8 bg-white/5 backdrop-blur-md border border-white/10 transition-all duration-500">
              <form
                id="lead-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  submitLead(); 
                }}
                data-testid="lead-form"
              >
                <div className="relative mb-6 rounded-2xl bg-gradient-to-br from-purple-500/15 to-cyan-500/5 border border-purple-500/30 p-5 overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/30 blur-3xl rounded-full pointer-events-none" />
                  
                  <div className="flex items-center gap-2 mb-2 relative z-10">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.4)]">
                      <Gift className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-purple-300 font-bold">
                      Free Gift Inside
                    </span>
                  </div>
                  
                  <div className="relative z-10 font-display text-2xl font-bold text-white leading-tight">
                    Claim Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300">Free Premium Chapter</span>
                  </div>
                  
                  <p className="relative z-10 mt-2 text-[13px] text-slate-300 leading-relaxed">
                    Tell us where to send your <span className="text-white font-semibold">free full-chapter PDF</span>. 
                  </p>
                  
                  <div className="relative z-10 mt-3 pt-3 border-t border-purple-500/20">
                    <p className="text-cyan-300/90 text-xs flex items-start gap-1.5 font-medium">
                      <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      Already paid? Fill this out to finalize your enrollment.
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-3">
                  <input
                    data-testid="lead-name-input"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Full name"
                    className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/60 transition-colors"
                  />
                  <input
                    data-testid="lead-email-input"
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Email (We'll send notes here)"
                    className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/60 transition-colors"
                  />
                  <input
                    data-testid="lead-phone-input"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="Phone (WhatsApp preferred)"
                    className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/60 transition-colors"
                  />
                  <textarea
                    data-testid="lead-message-input"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Anything we should know? (optional)"
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/60 resize-none transition-colors"
                  />
                </div>

                <button
                  data-testid="lead-submit-button"
                  type="submit"
                  disabled={submitting}
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 disabled:opacity-70 transition-all shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Gift className="w-4 h-4" />}
                  Send Free Notes & Enroll
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
