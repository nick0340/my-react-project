import { useState } from 'react';
import { Calculator, Scale, AlertTriangle, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import type { SafetyLevel } from '../data/foods';

interface ToxicityCalculatorProps {
  foodName: string;
  safety: SafetyLevel;
  toxicComponent?: string;
}

export default function ToxicityCalculator({ foodName, safety, toxicComponent }: ToxicityCalculatorProps) {
  const [weight, setWeight] = useState(10);
  const [unit, setUnit] = useState<'kg' | 'lbs'>('kg');
  const [quantity, setQuantity] = useState(5);

  const weightInKg = unit === 'lbs' ? weight * 0.453592 : weight;

  const calculateRisk = (): { level: 'Low' | 'Medium' | 'High' | 'Critical'; color: string; description: string } => {
    if (safety === 'safe') {
      const ratio = quantity / (weightInKg * 5);
      if (ratio < 0.5) return { level: 'Low', color: 'safe', description: 'This amount is within safe limits for your pet\'s size.' };
      if (ratio < 1) return { level: 'Medium', color: 'caution', description: 'This is approaching the upper limit. Monitor your pet for any signs of digestive upset.' };
      return { level: 'High', color: 'danger', description: 'This exceeds recommended amounts. Reduce the serving size.' };
    }
    
    if (safety === 'caution') {
      const ratio = quantity / (weightInKg * 2);
      if (ratio < 0.3) return { level: 'Low', color: 'safe', description: 'A small amount may be tolerated, but monitor closely.' };
      if (ratio < 0.7) return { level: 'Medium', color: 'caution', description: 'This amount could cause issues. Consider contacting your vet.' };
      return { level: 'High', color: 'danger', description: 'This is a concerning amount. Contact your veterinarian.' };
    }
    
    const ratio = quantity / weightInKg;
    if (ratio < 0.5) return { level: 'Medium', color: 'caution', description: `Even small amounts of ${foodName.toLowerCase()} can be dangerous. Contact your vet.` };
    if (ratio < 2) return { level: 'High', color: 'danger', description: 'This is a dangerous amount. Seek immediate veterinary attention.' };
    return { level: 'Critical', color: 'danger', description: 'THIS IS A LIFE-THREATENING EMERGENCY. Rush to the nearest emergency vet immediately!' };
  };

  const risk = calculateRisk();

  const riskColors = {
    Low: { bg: 'bg-safe-light', text: 'text-safe-dark', bar: 'bg-gradient-to-r from-safe to-emerald-500', width: '25%', badge: 'bg-safe text-white' },
    Medium: { bg: 'bg-caution-light', text: 'text-caution-dark', bar: 'bg-gradient-to-r from-caution to-amber-500', width: '50%', badge: 'bg-caution text-white' },
    High: { bg: 'bg-danger-light', text: 'text-danger-dark', bar: 'bg-gradient-to-r from-danger to-rose-500', width: '75%', badge: 'bg-danger text-white' },
    Critical: { bg: 'bg-danger', text: 'text-white', bar: 'bg-gradient-to-r from-danger-dark to-danger', width: '100%', badge: 'bg-danger-dark text-white' },
  };

  const rc = riskColors[risk.level];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="card-soft rounded-2xl overflow-hidden"
      role="region"
      aria-labelledby="calculator-title"
    >
      <div className="px-8 py-6 bg-gradient-to-r from-brand/5 to-transparent border-b border-slate-100 flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-brand to-brand-dark rounded-xl flex items-center justify-center shadow-lg">
          <Calculator className="w-6 h-6 text-white" aria-hidden="true" />
        </div>
        <div>
          <h3 id="calculator-title" className="font-bold text-text-primary text-lg">Toxicity Risk Calculator</h3>
          <p className="text-sm text-text-secondary">Estimate the risk based on your pet's weight</p>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Weight Input */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-text-primary mb-4">
            <div className="w-8 h-8 bg-brand/10 rounded-lg flex items-center justify-center">
              <Scale className="w-4 h-4 text-brand" aria-hidden="true" />
            </div>
            Pet's Weight
          </label>
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="range"
                min={1}
                max={unit === 'kg' ? 80 : 176}
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-brand"
                aria-label={`Pet weight: ${weight} ${unit}`}
              />
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-text-muted">1 {unit}</span>
                <span className="text-xl font-bold text-brand">{weight} {unit}</span>
                <span className="text-xs text-text-muted">{unit === 'kg' ? '80' : '176'} {unit}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => { setUnit('kg'); setWeight(Math.round(weight * (unit === 'lbs' ? 0.453592 : 1))); }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${unit === 'kg' ? 'bg-brand text-white shadow-md' : 'bg-slate-50 text-text-secondary hover:bg-slate-100'}`}
                aria-pressed={unit === 'kg'}
              >
                kg
              </button>
              <button
                onClick={() => { setUnit('lbs'); setWeight(Math.round(weight * (unit === 'kg' ? 2.20462 : 1))); }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${unit === 'lbs' ? 'bg-brand text-white shadow-md' : 'bg-slate-50 text-text-secondary hover:bg-slate-100'}`}
                aria-pressed={unit === 'lbs'}
              >
                lbs
              </button>
            </div>
          </div>
        </div>

        {/* Quantity Input */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-text-primary mb-4">
            <div className="w-8 h-8 bg-brand/10 rounded-lg flex items-center justify-center">
              <Info className="w-4 h-4 text-brand" aria-hidden="true" />
            </div>
            Quantity Consumed (grams/pieces)
          </label>
          <input
            type="range"
            min={1}
            max={100}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full h-2.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-brand"
            aria-label={`Quantity consumed: ${quantity} grams`}
          />
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-text-muted">1g</span>
            <span className="text-xl font-bold text-brand">{quantity}g</span>
            <span className="text-xs text-text-muted">100g</span>
          </div>
        </div>

        {/* Toxic Component */}
        {toxicComponent && (
          <div className="flex items-start gap-4 p-5 bg-danger-light rounded-xl border border-danger/20">
            <div className="w-10 h-10 bg-danger/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-danger" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold text-danger-dark">Toxic Component</p>
              <p className="text-sm text-danger-dark/80 mt-1">{toxicComponent}</p>
            </div>
          </div>
        )}

        {/* Risk Result */}
        <div 
          className={`rounded-xl p-6 ${rc.bg} transition-all`}
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center justify-between mb-4">
            <span className={`text-sm font-semibold ${rc.text}`}>Estimated Risk Level</span>
            <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${rc.badge} shadow-sm`}>
              {risk.level}
            </span>
          </div>
          
          {/* Risk Bar */}
          <div className="h-3 bg-white/60 rounded-full overflow-hidden mb-4 shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: rc.width }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={`h-full ${rc.bar} rounded-full`}
            />
          </div>
          
          <p className={`text-sm ${rc.text} leading-relaxed`}>
            {risk.description}
          </p>
        </div>

        <p className="text-xs text-text-muted text-center">
          ⚠️ This calculator provides estimates only and should not replace professional veterinary advice.
        </p>
      </div>
    </motion.div>
  );
}
