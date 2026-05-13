import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, Dog, Cat, X } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import SearchBar from '../components/SearchBar';
import AdSlot from '../components/AdSlot';
import { foodDatabase, categories, type FoodItem, type PetType, type FoodCategory, type SafetyLevel } from '../data/foods';

interface AllFoodsPageProps {
  onSelectFood: (food: FoodItem, pet: PetType) => void;
  onNavigate: (page: string, data?: Record<string, string>) => void;
  initialCategory?: string;
}

export default function AllFoodsPage({ onSelectFood, onNavigate, initialCategory }: AllFoodsPageProps) {
  const [selectedPet, setSelectedPet] = useState<PetType>('dogs');
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | 'all'>(
    (initialCategory as FoodCategory) || 'all'
  );
  const [selectedSafety, setSelectedSafety] = useState<SafetyLevel | 'all'>('all');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory as FoodCategory);
    }
  }, [initialCategory]);

  const filtered = foodDatabase.filter(food => {
    if (selectedCategory !== 'all' && food.category !== selectedCategory) return false;
    if (selectedSafety !== 'all' && food.pets[selectedPet].safety !== selectedSafety) return false;
    return true;
  });

  const safetyConfig = {
    safe: { bg: 'bg-safe-light/30', border: 'border-safe/10', badge: 'bg-safe text-white', text: 'text-safe-dark' },
    caution: { bg: 'bg-caution-light/30', border: 'border-caution/10', badge: 'bg-caution text-white', text: 'text-caution-dark' },
    toxic: { bg: 'bg-danger-light/30', border: 'border-danger/10', badge: 'bg-danger text-white', text: 'text-danger-dark' },
  };

  const breadcrumbItems = initialCategory
    ? [{ label: 'All Foods', page: 'foods' }, { label: categories.find(c => c.id === initialCategory)?.name || initialCategory }]
    : [{ label: 'All Foods' }];

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedSafety('all');
  };

  const hasFilters = selectedCategory !== 'all' || selectedSafety !== 'all';

  return (
    <div>
      <Breadcrumbs items={breadcrumbItems} onNavigate={onNavigate} />

      <div className="container-main pb-20">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-black text-text-primary">
            {initialCategory
              ? `${categories.find(c => c.id === initialCategory)?.emoji} ${categories.find(c => c.id === initialCategory)?.name}`
              : '🍽️ All Foods'}
          </h1>
          <p className="text-text-secondary mt-3 max-w-lg mx-auto">
            Browse our complete pet food safety database
          </p>
        </div>

        {/* Search */}
        <div className="mb-10 max-w-[600px] mx-auto">
          <SearchBar onSelect={onSelectFood} variant="sticky" showTrending={false} />
        </div>

        {/* Filters */}
        <div className="card-soft rounded-2xl p-6 sm:p-8 mb-10">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand/10 rounded-xl flex items-center justify-center">
                <Filter className="w-5 h-5 text-brand" aria-hidden="true" />
              </div>
              <h2 className="font-bold text-text-primary text-lg">Filters</h2>
            </div>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center justify-center gap-1.5 text-sm text-text-muted hover:text-danger transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
                Clear all
              </button>
            )}
          </div>

          <div className="space-y-6">
            {/* Pet Filter */}
            <div>
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Pet Type</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedPet('dogs')}
                  className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    selectedPet === 'dogs' ? 'bg-gradient-to-r from-brand to-brand-dark text-white shadow-md' : 'bg-white text-text-secondary hover:shadow-md border border-slate-100'
                  }`}
                  aria-pressed={selectedPet === 'dogs'}
                >
                  <Dog className="w-4 h-4" aria-hidden="true" /> Dogs
                </button>
                <button
                  onClick={() => setSelectedPet('cats')}
                  className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    selectedPet === 'cats' ? 'bg-gradient-to-r from-brand to-brand-dark text-white shadow-md' : 'bg-white text-text-secondary hover:shadow-md border border-slate-100'
                  }`}
                  aria-pressed={selectedPet === 'cats'}
                >
                  <Cat className="w-4 h-4" aria-hidden="true" /> Cats
                </button>
              </div>
            </div>

            {/* Safety Filter */}
            <div>
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Safety Level</p>
              <div className="flex flex-wrap gap-3">
                {[
                  { value: 'all' as const, label: 'All', color: 'bg-white text-text-secondary border border-slate-100' },
                  { value: 'safe' as const, label: '✓ Safe', color: 'bg-safe text-white' },
                  { value: 'caution' as const, label: '⚠ Caution', color: 'bg-caution text-white' },
                  { value: 'toxic' as const, label: '☠ Toxic', color: 'bg-danger text-white' },
                ].map(s => (
                  <button
                    key={s.value}
                    onClick={() => setSelectedSafety(s.value)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                      selectedSafety === s.value
                        ? s.value === 'all' ? 'bg-text-primary text-white' : s.color
                        : 'bg-white text-text-secondary hover:shadow-md border border-slate-100'
                    }`}
                    aria-pressed={selectedSafety === s.value}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Category</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    selectedCategory === 'all' ? 'bg-text-primary text-white' : 'bg-white text-text-secondary hover:shadow-md border border-slate-100'
                  }`}
                  aria-pressed={selectedCategory === 'all'}
                >
                  All
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                      selectedCategory === cat.id ? 'bg-brand text-white' : 'bg-white text-text-secondary hover:shadow-md border border-slate-100'
                    }`}
                    aria-pressed={selectedCategory === cat.id}
                  >
                    <span aria-hidden="true">{cat.emoji}</span> {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-sm text-text-muted">
            {filtered.length} {filtered.length === 1 ? 'food' : 'foods'} found
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((food, i) => {
            const data = food.pets[selectedPet];
            const sc = safetyConfig[data.safety];
            return (
              <motion.button
                key={food.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.03 * i }}
                onClick={() => onSelectFood(food, selectedPet)}
                className={`card-soft ${sc.bg} rounded-xl p-6 text-left cursor-pointer group`}
                aria-label={`Can ${selectedPet} eat ${food.name}? ${data.safety}`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl flex-shrink-0" aria-hidden="true">{food.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <h3 className="font-bold text-text-primary text-lg">{food.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${sc.badge} flex-shrink-0`}>
                        {data.safety}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary line-clamp-2">{data.summary}</p>
                    <p className="text-sm text-brand font-medium mt-3 group-hover:underline">
                      Learn more →
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 card-soft rounded-2xl">
            <p className="text-5xl mb-4" aria-hidden="true">🔍</p>
            <p className="font-semibold text-text-primary text-lg">No foods found</p>
            <p className="text-sm text-text-secondary mt-2">Try adjusting your filters</p>
            <button
              onClick={clearFilters}
              className="mt-6 px-6 py-3 bg-brand text-white rounded-xl text-sm font-semibold hover:shadow-md transition-all cursor-pointer"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* AdSense slot */}
        <div className="mt-12">
          <AdSlot variant="banner" />
        </div>
      </div>
    </div>
  );
}
