import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Dog, Cat, Share2, Bookmark, AlertOctagon } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import VerdictCard from '../components/VerdictCard';
import ToxicityCalculator from '../components/ToxicityCalculator';
import DosageTable from '../components/DosageTable';
import EmergencyProtocol from '../components/EmergencyProtocol';
import FAQSection from '../components/FAQSection';
import RelatedFoods from '../components/RelatedFoods';
import SafeAlternatives from '../components/SafeAlternatives';
import AdSlot from '../components/AdSlot';
import NewsletterSignup from '../components/NewsletterSignup';
import { getRelatedFoods, type FoodItem, type PetType } from '../data/foods';

interface FoodDetailPageProps {
  food: FoodItem;
  pet: PetType;
  onSelectFood: (food: FoodItem, pet: PetType) => void;
  onNavigate: (page: string, data?: Record<string, string>) => void;
}

export default function FoodDetailPage({ food, pet, onSelectFood, onNavigate }: FoodDetailPageProps) {
  const petData = food.pets[pet];
  const relatedFoods = getRelatedFoods(food);
  const otherPet: PetType = pet === 'dogs' ? 'cats' : 'dogs';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [food.id, pet]);

  const petName = pet === 'dogs' ? 'Dogs' : 'Cats';
  const categoryName = food.category.charAt(0).toUpperCase() + food.category.slice(1);

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Can ${petName} Eat ${food.name}? ${petData.safety === 'safe' ? 'Yes, It\'s Safe!' : petData.safety === 'toxic' ? 'No, It\'s Toxic!' : 'With Caution'}`,
    description: petData.summary,
    author: { '@type': 'Organization', name: 'PetSafe Eats' },
    publisher: { '@type': 'Organization', name: 'PetSafe Eats' },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://petsafeeats.com/can-${pet}-eat-${food.slug}`,
    },
  };

  const faqJsonLd = food.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: food.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null;

  return (
    <div>
      {/* JSON-LD Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <Breadcrumbs
        items={[
          { label: petName, page: 'pet', data: { pet } },
          { label: categoryName, page: 'category', data: { category: food.category } },
          { label: food.name },
        ]}
        onNavigate={onNavigate}
      />

      {/* IMMEDIATE ACTION PLAN - High-contrast Red Box for Toxic Foods */}
      {petData.safety === 'toxic' && petData.emergencySteps && (
        <div className="container-main mb-8">
          <div className="bg-gradient-to-r from-danger to-danger-dark text-white rounded-2xl overflow-hidden animate-fade-in-up">
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center animate-pulse-danger">
                  <AlertOctagon className="w-8 h-8 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black">⚠️ IMMEDIATE ACTION PLAN</h2>
                  <p className="text-white/80 text-sm mt-1">If your {pet === 'dogs' ? 'dog' : 'cat'} ate {food.name.toLowerCase()}</p>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                <a
                  href="tel:+18557647661"
                  className="flex items-center gap-4 bg-white/10 hover:bg-white/20 rounded-xl p-4 transition-colors"
                >
                  <span className="text-2xl" aria-hidden="true">📞</span>
                  <div>
                    <p className="font-bold">Pet Poison Helpline</p>
                    <p className="text-white/80 text-sm">(855) 764-7661 — 24/7</p>
                  </div>
                </a>
                <a
                  href="tel:+18884264435"
                  className="flex items-center gap-4 bg-white/10 hover:bg-white/20 rounded-xl p-4 transition-colors"
                >
                  <span className="text-2xl" aria-hidden="true">🏥</span>
                  <div>
                    <p className="font-bold">ASPCA Poison Control</p>
                    <p className="text-white/80 text-sm">(888) 426-4435 — 24/7</p>
                  </div>
                </a>
              </div>
              
              <div className="mt-6 bg-white/10 rounded-xl p-5">
                <p className="font-bold text-lg mb-4">🚨 Do This NOW:</p>
                <ol className="space-y-3">
                  {petData.emergencySteps.slice(0, 3).map((step, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-7 h-7 bg-white text-danger rounded-full flex items-center justify-center text-sm font-bold">
                        {i + 1}
                      </span>
                      <span className="text-white/90">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container-main pb-20">
        {/* Pet Switch + Share buttons */}
        <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
          <div className="flex items-center gap-3">
            <span className="text-sm text-text-muted">View for:</span>
            <button
              onClick={() => onSelectFood(food, 'dogs')}
              className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                pet === 'dogs' 
                  ? 'bg-gradient-to-r from-brand to-brand-dark text-white shadow-lg' 
                  : 'bg-white text-text-secondary hover:shadow-md border border-slate-100'
              }`}
              aria-pressed={pet === 'dogs'}
            >
              <Dog className="w-4 h-4" aria-hidden="true" />
              Dogs
            </button>
            <button
              onClick={() => onSelectFood(food, 'cats')}
              className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                pet === 'cats' 
                  ? 'bg-gradient-to-r from-brand to-brand-dark text-white shadow-lg' 
                  : 'bg-white text-text-secondary hover:shadow-md border border-slate-100'
              }`}
              aria-pressed={pet === 'cats'}
            >
              <Cat className="w-4 h-4" aria-hidden="true" />
              Cats
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 hover:shadow-md transition-all cursor-pointer flex items-center justify-center" aria-label="Share this page">
              <Share2 className="w-4 h-4 text-text-secondary" aria-hidden="true" />
            </button>
            <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 hover:shadow-md transition-all cursor-pointer flex items-center justify-center" aria-label="Bookmark this page">
              <Bookmark className="w-4 h-4 text-text-secondary" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Verdict Card */}
            <VerdictCard
              foodName={food.name}
              foodEmoji={food.emoji}
              pet={pet}
              safety={petData.safety}
              summary={petData.summary}
            />

            {/* Detailed Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card-soft rounded-2xl p-8"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-brand" aria-hidden="true" />
                </div>
                <h2 className="text-xl font-bold text-text-primary">Detailed Information</h2>
              </div>
              <p className="text-text-secondary leading-relaxed">{petData.details}</p>
            </motion.div>

            <AdSlot variant="inline" />

            {/* Full Emergency Protocol */}
            {(petData.safety === 'toxic' || (petData.safety === 'caution' && petData.symptoms)) && petData.emergencySteps && petData.symptoms && (
              <EmergencyProtocol
                foodName={food.name}
                symptoms={petData.symptoms}
                timeToSymptoms={petData.timeToSymptoms}
                emergencySteps={petData.emergencySteps}
              />
            )}

            {/* Dosage Table */}
            {petData.dosage && (
              <DosageTable dosage={petData.dosage} foodName={food.name} />
            )}

            {/* Toxicity Calculator */}
            <ToxicityCalculator
              foodName={food.name}
              safety={petData.safety}
              toxicComponent={petData.toxicComponent}
            />

            {/* FAQs */}
            <FAQSection
              faqs={food.faqs}
              foodName={food.name}
              petType={petName}
            />

            {/* Check other pet */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={() => onSelectFood(food, otherPet)}
              className="w-full card-soft rounded-xl p-6 flex items-center justify-center gap-4 cursor-pointer group"
              aria-label={`Check if ${otherPet} can eat ${food.name}`}
            >
              {otherPet === 'dogs' ? <Dog className="w-5 h-5 text-brand" aria-hidden="true" /> : <Cat className="w-5 h-5 text-brand" aria-hidden="true" />}
              <span className="font-semibold text-text-primary">
                Can {otherPet === 'dogs' ? 'dogs' : 'cats'} eat {food.name.toLowerCase()} too?
              </span>
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase ${
                food.pets[otherPet].safety === 'safe' ? 'bg-safe text-white'
                  : food.pets[otherPet].safety === 'caution' ? 'bg-caution text-white'
                  : 'bg-danger text-white'
              }`}>
                {food.pets[otherPet].safety}
              </span>
            </motion.button>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <RelatedFoods foods={relatedFoods} pet={pet} onSelect={onSelectFood} />
            <AdSlot variant="sidebar" />
            <SafeAlternatives petType={pet} />
            <NewsletterSignup />
          </aside>
        </div>
      </div>
    </div>
  );
}
