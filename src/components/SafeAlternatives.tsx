import { motion } from 'framer-motion';
import { ExternalLink, ShoppingCart, Star, BadgeCheck } from 'lucide-react';

interface SafeAlternativesProps {
  petType: string;
}

const products = [
  {
    name: 'Blue Buffalo Life Protection',
    image: '🦴',
    rating: 4.7,
    reviews: '42,300+',
    price: '$54.98',
    description: 'Natural adult dry dog food with real chicken',
    tag: 'Best Seller',
    pet: 'dogs',
  },
  {
    name: 'Wellness CORE Grain-Free',
    image: '🥩',
    rating: 4.6,
    reviews: '18,500+',
    price: '$62.99',
    description: 'High protein, grain-free dry food',
    tag: 'Vet Recommended',
    pet: 'dogs',
  },
  {
    name: 'Greenies Dental Treats',
    image: '🪥',
    rating: 4.8,
    reviews: '85,200+',
    price: '$29.98',
    description: 'Natural dental treats for clean teeth',
    tag: 'Top Rated',
    pet: 'dogs',
  },
  {
    name: 'Purina Fancy Feast',
    image: '🐟',
    rating: 4.7,
    reviews: '31,400+',
    price: '$24.99',
    description: 'Gourmet wet cat food variety pack',
    tag: 'Best Seller',
    pet: 'cats',
  },
  {
    name: 'Blue Buffalo Tastefuls',
    image: '🍗',
    rating: 4.5,
    reviews: '12,800+',
    price: '$31.98',
    description: 'Natural indoor adult dry cat food',
    tag: 'Indoor Formula',
    pet: 'cats',
  },
  {
    name: 'Greenies Feline SmartBites',
    image: '🐱',
    rating: 4.6,
    reviews: '22,100+',
    price: '$8.49',
    description: 'Healthy treats for skin & fur',
    tag: 'Vet Recommended',
    pet: 'cats',
  },
];

export default function SafeAlternatives({ petType }: SafeAlternativesProps) {
  const filteredProducts = products.filter(p => p.pet === petType).slice(0, 3);

  return (
    <motion.aside
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="card-soft rounded-2xl overflow-hidden"
      aria-labelledby="alternatives-title"
    >
      <div className="px-6 py-5 bg-gradient-to-r from-brand/5 to-transparent border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 bg-gradient-to-br from-brand to-brand-dark rounded-xl flex items-center justify-center shadow-md">
            <ShoppingCart className="w-5 h-5 text-white" aria-hidden="true" />
          </div>
          <div>
            <h3 id="alternatives-title" className="font-bold text-text-primary">Recommended Safe Treats</h3>
            <p className="text-xs text-text-secondary mt-0.5">Vet-approved products</p>
          </div>
        </div>
        <span className="text-[10px] text-text-muted bg-slate-50 px-2 py-1 rounded font-medium">Sponsored</span>
      </div>

      <div className="p-4 space-y-3">
        {filteredProducts.map((product, i) => (
          <motion.a
            key={product.name}
            href="#"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-brand/30 hover:shadow-md bg-white transition-all group"
            aria-label={`${product.name} - ${product.price}`}
          >
            <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center text-3xl flex-shrink-0" aria-hidden="true">
              {product.image}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <BadgeCheck className="w-3.5 h-3.5 text-brand flex-shrink-0" aria-label="Verified" />
                <span className="text-[10px] bg-brand-light text-brand-dark px-2 py-0.5 rounded font-semibold">
                  {product.tag}
                </span>
              </div>
              <p className="font-semibold text-sm text-text-primary truncate">{product.name}</p>
              <p className="text-xs text-text-secondary truncate">{product.description}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-caution text-caution" aria-hidden="true" />
                  <span className="text-xs font-semibold text-text-primary">{product.rating}</span>
                </div>
                <span className="text-[10px] text-text-muted">({product.reviews})</span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-lg font-bold text-brand">{product.price}</p>
              <span className="inline-flex items-center gap-1 text-[10px] text-brand font-medium group-hover:underline">
                View <ExternalLink className="w-2.5 h-2.5" aria-hidden="true" />
              </span>
            </div>
          </motion.a>
        ))}
      </div>

      <div className="p-4 pt-0">
        <a 
          href="#" 
          className="block text-center py-3.5 bg-gradient-to-r from-brand to-brand-dark text-white text-sm font-semibold rounded-xl hover:shadow-lg transition-all"
        >
          View All Safe Treats →
        </a>
      </div>
    </motion.aside>
  );
}
