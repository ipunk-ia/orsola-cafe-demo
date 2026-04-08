/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef, ReactNode } from "react";
import { Menu, X, Instagram, Phone, MapPin, Clock, Coffee, ShoppingBag, Utensils, Star, ArrowRight, ChevronRight } from "lucide-react";

// --- SVG Illustrations (Hand-drawn style) ---

const CoffeeCupSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M30 40C30 40 30 75 50 75C70 75 70 40 70 40H30Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M70 45C70 45 85 45 85 55C85 65 70 65 70 65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M40 25C40 25 42 15 45 20C48 25 50 15 50 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M55 25C55 25 57 15 60 20C63 25 65 15 65 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M25 85H75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const TableChairsSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M30 60H70L65 85H35L30 60Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M40 60V45H60V60" stroke="currentColor" strokeWidth="1.5" />
    <path d="M15 85V55H25V85" stroke="currentColor" strokeWidth="1.5" />
    <path d="M15 65H25" stroke="currentColor" strokeWidth="1.5" />
    <path d="M75 85V55H85V85" stroke="currentColor" strokeWidth="1.5" />
    <path d="M75 65H85" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const ScooterSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="30" cy="75" r="10" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="70" cy="75" r="10" stroke="currentColor" strokeWidth="1.5" />
    <path d="M30 75H70" stroke="currentColor" strokeWidth="1.5" />
    <path d="M25 65L40 40H70L80 65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M45 40V30H65V40" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const MapPinSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M50 85C50 85 80 60 80 40C80 23.4315 66.5685 10 50 10C33.4315 10 20 23.4315 20 40C20 60 50 85 50 85Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="50" cy="40" r="8" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const CoffeeBeanSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <ellipse cx="50" cy="50" rx="30" ry="40" transform="rotate(45 50 50)" stroke="currentColor" strokeWidth="1.5" />
    <path d="M35 65C35 65 45 50 55 50C65 50 75 35 75 35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const WhiskSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M40 20H60V40H40V20Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M40 40C40 40 20 80 50 80C80 80 60 40 60 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M50 40V80" stroke="currentColor" strokeWidth="1.5" />
    <path d="M45 45V75" stroke="currentColor" strokeWidth="1.5" />
    <path d="M55 45V75" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

// --- Components ---

const SectionLabel = ({ children }: { children: ReactNode }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="font-serif text-sm uppercase tracking-widest text-red-primary mb-4"
  >
    / {children}
  </motion.div>
);

const Button = ({ children, href, variant = "outline", className = "" }: { children: ReactNode, href: string, variant?: "outline" | "filled", className?: string }) => {
  const baseStyles = "inline-flex items-center justify-center px-8 py-3 rounded-full font-sans text-sm transition-all duration-300 border-1.5";
  const variants = {
    outline: "border-red-primary text-red-primary hover:bg-red-primary hover:text-cream-50",
    filled: "bg-red-primary border-red-primary text-cream-50 hover:bg-red-dark hover:border-red-dark"
  };

  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Menu", href: "#menu" },
    { name: "Visit Us", href: "#visit" },
    { name: "Order", href: "#order" },
    { name: "Gallery", href: "#vibes" }
  ];

  return (
    <div className="relative min-h-screen selection:bg-red-primary selection:text-cream-50">
      <div className="noise-overlay" />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-cream-50/90 backdrop-blur-md border-b border-cream-200 py-4" : "bg-transparent py-6"}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" className="font-display italic text-2xl text-red-dark hover:text-red-primary transition-colors">
            Orsola Café
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, i) => (
              <div key={link.name} className="flex items-center">
                <a 
                  href={link.href} 
                  className="font-sans text-sm text-text-mid hover:text-red-primary transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-red-primary transition-all duration-300 group-hover:w-full" />
                </a>
                {i < navLinks.length - 1 && <span className="ml-8 text-red-primary opacity-30">·</span>}
              </div>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsMenuOpen(true)} className="md:hidden text-red-dark">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-cream-100 flex flex-col p-8"
          >
            <div className="flex justify-end mb-12">
              <button onClick={() => setIsMenuOpen(false)} className="text-red-dark">
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col space-y-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className="font-display italic text-4xl text-red-dark"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="mt-auto">
              <p className="font-serif italic text-text-light mb-4">Open everyday · 7 AM – 10 PM</p>
              <div className="flex space-x-4">
                <a href="https://instagram.com/orsolacafe" target="_blank" rel="noopener noreferrer" className="text-red-primary"><Instagram /></a>
                <a href="tel:082327063193" className="text-red-primary"><Phone /></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-10 gap-12 items-center">
          <div className="lg:col-span-6 z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-7xl md:text-9xl font-display italic text-red-dark leading-[0.9] mb-8"
            >
              All day<br />dining.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-text-mid font-sans max-w-lg mb-12 text-balance"
            >
              Serving great coffee & matcha in the heart of Semarang.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <Button href="https://esborder.qs.esb.co.id/ORSLA/ORCF/order?mode=delivery">Order Delivery <ArrowRight className="ml-2 w-4 h-4" /></Button>
              <Button href="https://drive.google.com/file/d/1Dl0dx38kC8bMuVqJUzYspjPo5oUpNArV/view?pli=1">View Menu</Button>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="font-serif italic text-text-light"
            >
              Open everyday · 7 AM – 10 PM
            </motion.p>
          </div>

          <div className="lg:col-span-4 relative flex justify-center items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="bg-cream-100 rounded-full w-64 h-64 md:w-80 md:h-80 flex items-center justify-center relative"
            >
              <CoffeeCupSVG className="w-40 h-40 text-red-primary" />
              
              {/* Spinning Badge */}
              <div className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 w-32 h-32 md:w-40 md:h-40 animate-spin-slow">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                  <text className="font-hand text-[10px] fill-red-primary tracking-[0.1em]">
                    <textPath xlinkHref="#circlePath">
                      ★ SPECIALTY COFFEE · MATCHA · SEMARANG · 
                    </textPath>
                  </text>
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-cream-100">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <SectionLabel>About</SectionLabel>
            <h2 className="text-4xl md:text-5xl text-red-dark mb-8 leading-tight">
              A place to gather, slow down, and sip something good.
            </h2>
            <div className="space-y-6 text-lg text-text-mid font-sans leading-relaxed max-w-xl">
              <p>
                Nestled in Brumbungan, central Semarang, Orsola Café is your all-day dining destination. 
                Whether you're here for a pour-over, a bowl of matcha, or a leisurely meal — 
                we've got a seat for you.
              </p>
              <p>
                Indoor, outdoor, and always welcoming. We believe in the ritual of the morning coffee and the calm of the afternoon tea.
              </p>
            </div>
            <div className="h-px bg-red-primary/20 w-32 my-8" />
            <div className="font-hand text-xl text-red-primary flex items-center gap-3">
              <Star className="fill-red-primary w-5 h-5" />
              <span>4.6 — 206 Google Reviews</span>
            </div>
          </div>

          <div className="space-y-6">
            {[
              { icon: <Clock className="w-6 h-6" />, title: "Open 7 AM – 10 PM · Daily", desc: "Serving you from sunrise to late night." },
              { icon: <MapPin className="w-6 h-6" />, title: "Jl. Melati Selatan No.6 · Semarang Tengah", desc: "In the heart of the city's creative hub." },
              { icon: <Utensils className="w-6 h-6" />, title: "Prayer room available · Ask our staff", desc: "Comfortable space for your daily prayers." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-cream-50 p-8 rounded-2xl border-l-4 border-red-primary shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-red-primary mb-4">{item.icon}</div>
                <h3 className="font-sans font-bold text-text-dark mb-1">{item.title}</h3>
                <p className="text-text-mid text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Highlights */}
      <section id="menu" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <SectionLabel>Fan Favorites</SectionLabel>
            <h2 className="text-6xl md:text-8xl font-display italic text-red-dark mt-4">The usuals.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Truffle Fries", cat: "Food", desc: "Crispy, golden, and generously truffle-dusted.", tag: "Must Try" },
              { name: "Dirty Peach", cat: "Drinks", desc: "Our signature twist — fruity meets bold espresso.", tag: "Fan Favorite" },
              { name: "Pistachio Latte", cat: "Coffee", desc: "Nutty, creamy, and perfectly balanced.", tag: "Must Try" },
              { name: "Matcha Series", cat: "Matcha", desc: "Ceremonial-grade matcha, made the right way.", tag: "Fan Favorite" },
              { name: "Hamburg Burger", cat: "Food", desc: "Juicy, stacked, and seriously satisfying.", tag: "Must Try" },
              { name: "Cheesecake", cat: "Dessert", desc: "100% approved — creamy, dense, just right.", tag: "Fan Favorite" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-cream-100 p-8 rounded-3xl border border-cream-200 flex flex-col h-full group"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="px-4 py-1 rounded-full border border-red-primary text-red-primary text-[10px] uppercase tracking-widest font-sans">
                    {item.cat}
                  </span>
                  <CoffeeBeanSVG className="w-6 h-6 text-red-primary/20 group-hover:text-red-primary/40 transition-colors" />
                </div>
                <h3 className="text-2xl text-text-dark mb-3 leading-tight">{item.name}</h3>
                <p className="text-text-mid text-sm mb-8 flex-grow leading-relaxed">{item.desc}</p>
                <div className="font-hand text-red-primary text-lg">{item.tag}</div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button 
              variant="filled" 
              href="https://drive.google.com/file/d/1Dl0dx38kC8bMuVqJUzYspjPo5oUpNArV/view?pli=1"
              className="px-12"
            >
              See Full Menu <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Ordering Section */}
      <section id="order" className="py-24 bg-red-primary text-cream-50 overflow-hidden relative">
        <div className="absolute top-0 right-0 opacity-10 -mr-20 -mt-20">
          <WhiskSVG className="w-96 h-96" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mb-16">
            <h2 className="text-5xl md:text-7xl font-display italic mb-6">Order however you like.</h2>
            <p className="text-xl font-sans opacity-80">Dine in, pick up, or get it delivered to your door.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <TableChairsSVG className="w-12 h-12" />, 
                title: "Dine In", 
                label: "Makan di tempat", 
                desc: "Visit us at Jl. Melati Selatan No.6. We've got indoor and outdoor seating.",
                btn: null
              },
              { 
                icon: <ScooterSVG className="w-12 h-12" />, 
                title: "Delivery", 
                label: "Antar ke pintumu", 
                desc: "Order online for delivery. Note: delivery may be paused during heavy rain.",
                btn: { text: "Order Now", href: "https://esborder.qs.esb.co.id/ORSLA/ORCF/order?mode=delivery", note: "*Unavailable during rain" }
              },
              { 
                icon: <ShoppingBag className="w-12 h-12" />, 
                title: "Takeaway", 
                label: "Ambil di tepi jalan", 
                desc: "Order ahead and pick up at curbside. Quick and easy.",
                btn: { text: "Order Pickup", href: "https://esborder.qs.esb.co.id/ORSLA/ORCF/order?mode=delivery" }
              }
            ].map((item, i) => (
              <div key={i} className="bg-cream-50/10 border border-cream-50/20 p-8 rounded-3xl flex flex-col h-full backdrop-blur-sm">
                <div className="mb-6">{item.icon}</div>
                <h3 className="text-2xl font-display italic mb-1">{item.title}</h3>
                <div className="text-xs uppercase tracking-widest opacity-60 mb-4">{item.label}</div>
                <p className="text-sm opacity-80 mb-8 flex-grow leading-relaxed">{item.desc}</p>
                {item.btn && (
                  <div>
                    <a 
                      href={item.btn.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-cream-50 font-sans text-sm group"
                    >
                      {item.btn.text} <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    {item.btn.note && <p className="text-[10px] italic opacity-50 mt-2">{item.btn.note}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Us */}
      <section id="visit" className="py-24 bg-cream-100">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel>Location</SectionLabel>
            <h2 className="text-5xl font-display italic text-red-dark mb-8">Come find us.</h2>
            <div className="space-y-8 font-sans text-text-mid">
              <div>
                <p className="text-lg text-text-dark font-bold mb-1">Jl. Melati Selatan No.6</p>
                <p>Brumbungan, Semarang Tengah</p>
                <p>Semarang, Jawa Tengah 50135</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-widest opacity-60 mb-2">Phone</p>
                <a href="tel:082327063193" className="text-lg text-red-primary hover:underline">0823-2706-3193</a>
              </div>
              <div>
                <p className="text-sm uppercase tracking-widest opacity-60 mb-2">Hours</p>
                <p className="text-lg text-text-dark">Monday – Sunday</p>
                <p className="text-lg text-text-dark">7:00 AM – 10:00 PM</p>
              </div>
              <Button variant="filled" href="https://www.google.com/maps/place/Orsola+Cafe/@-6.9828881,110.4233219,15z/data=!4m6!3m5!1s0x2e708b5c5c5c5c5d:0x5c5c5c5c5c5c5c5c!8m2!3d-6.9828881!4d110.4233219!16s%2Fg%2F11t_x_x_x">
                Open in Google Maps
              </Button>
            </div>
          </div>

          <a 
            href="https://www.google.com/maps/place/Orsola+Cafe/@-6.9828881,110.4233219,15z/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative aspect-square bg-cream-50 rounded-3xl border-2 border-dashed border-red-primary/30 flex flex-col items-center justify-center group overflow-hidden"
          >
            <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity" style={{ backgroundImage: "linear-gradient(#B22222 1px, transparent 1px), linear-gradient(90deg, #B22222 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            <motion.div 
              whileHover={{ y: -10 }}
              className="z-10 flex flex-col items-center"
            >
              <MapPinSVG className="w-16 h-16 text-red-primary mb-4" />
              <h3 className="text-3xl font-display italic text-red-dark">Orsola Café</h3>
              <p className="font-serif italic text-text-light">Semarang Tengah</p>
            </motion.div>
          </a>
        </div>
      </section>

      {/* Vibes Section */}
      <section id="vibes" className="py-24">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-5xl font-display italic text-red-dark mb-2">The vibe.</h2>
            <p className="font-serif italic text-text-light text-xl">"Tempat yang super gemeeesss!"</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
            <div className="md:col-span-1 md:row-span-1 bg-red-primary p-8 rounded-3xl flex flex-col justify-center text-cream-50">
              <div className="text-4xl font-display italic mb-2">★ 4.6</div>
              <div className="text-xs uppercase tracking-widest opacity-60">206 Google Reviews</div>
            </div>
            <div className="md:col-span-2 md:row-span-1 bg-cream-100 p-8 rounded-3xl border border-red-primary/20 flex items-center">
              <p className="text-xl md:text-2xl font-serif italic text-text-dark leading-snug">
                "Makanannya jujur enak, pelayanan ramah sekali. Recommended buat hangout!"
              </p>
            </div>
            <div className="md:col-span-1 md:row-span-2 bg-cream-200 p-8 rounded-3xl flex flex-col justify-center items-center text-center">
              <TableChairsSVG className="w-24 h-24 text-red-primary mb-6" />
              <h3 className="text-xl font-display italic text-red-dark">Indoor & Outdoor Seating</h3>
            </div>
            <div className="md:col-span-1 md:row-span-1 bg-red-dark p-8 rounded-3xl text-cream-50 flex flex-col justify-center">
              <ul className="space-y-1 font-sans text-sm uppercase tracking-widest">
                <li>Pistachio Latte</li>
                <li>Truffle Fries</li>
                <li>Hamburg Burger</li>
              </ul>
            </div>
            <div className="md:col-span-1 md:row-span-1 bg-cream-100 p-8 rounded-3xl flex items-center justify-center border border-cream-300">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-red-primary mx-auto mb-2" />
                <p className="font-sans text-sm font-bold">Musholla tersedia</p>
              </div>
            </div>
            <div className="md:col-span-2 md:row-span-1 bg-cream-50 border border-cream-200 p-8 rounded-3xl flex items-center justify-center">
              <h3 className="text-3xl md:text-5xl font-display italic text-red-dark">More than a café — it's a mood.</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-red-dark text-cream-50 pt-20 pb-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-display italic mb-4">Orsola Café</h2>
              <p className="font-sans opacity-70 max-w-xs leading-relaxed">
                All day dining. Serving great coffee & matcha in the heart of Semarang.
              </p>
            </div>
            <div>
              <h3 className="font-serif italic text-lg mb-6">Quick Links</h3>
              <ul className="space-y-4 font-sans text-sm opacity-70">
                <li><a href="#menu" className="hover:text-cream-50 hover:opacity-100 transition-all">Menu</a></li>
                <li><a href="#order" className="hover:text-cream-50 hover:opacity-100 transition-all">Order</a></li>
                <li><a href="#visit" className="hover:text-cream-50 hover:opacity-100 transition-all">Location</a></li>
                <li><a href="https://instagram.com/orsolacafe" target="_blank" rel="noopener noreferrer" className="hover:text-cream-50 hover:opacity-100 transition-all">Instagram</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif italic text-lg mb-6">Connect</h3>
              <ul className="space-y-4 font-sans text-sm opacity-70">
                <li><a href="https://instagram.com/orsolacafe" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-100"><Instagram size={16} /> @orsolacafe</a></li>
                <li><a href="tel:082327063193" className="flex items-center gap-2 hover:opacity-100"><Phone size={16} /> 0823-2706-3193</a></li>
                <li className="flex items-start gap-2"><MapPin size={16} className="mt-1" /> <span>Jl. Melati Selatan No.6, Semarang</span></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-cream-50/10 text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] opacity-40">
              © 2025 Orsola Café · Semarang, Indonesia
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
