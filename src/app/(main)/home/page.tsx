import CTA from "@/components/LandingPage/CTA";
import Features from "@/components/LandingPage/Features";
import Hero from "@/components/LandingPage/Hero";
import States from "@/components/LandingPage/States";
import Testimonials from "@/components/LandingPage/Testimonials";

export default function Home() {
    return <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <Hero />
        <States />
        <Features />
        <Testimonials />
        <CTA />
    </div>;
}
