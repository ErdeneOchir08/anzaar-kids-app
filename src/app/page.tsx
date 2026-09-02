import React from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { BenefitsGrid } from '../components/landing/BenefitsGrid';
import { ArchetypePreviewSection } from '../components/landing/ArchetypePreviewSection';
import { TestimonialsSection } from '../components/landing/TestimonialsSection';
import { FaqSection } from '../components/landing/FaqSection';

export default function HomePage() {
  return (
    <div className="w-full">
      <HeroSection />
      <BenefitsGrid />
      <ArchetypePreviewSection />
      <TestimonialsSection />
      <FaqSection />
    </div>
  );
}
