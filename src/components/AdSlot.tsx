interface AdSlotProps {
  variant?: 'sidebar' | 'inline' | 'banner';
}

export default function AdSlot({ variant = 'inline' }: AdSlotProps) {
  const styles = {
    sidebar: 'min-h-[280px]',
    inline: 'min-h-[100px]',
    banner: 'min-h-[90px]',
  };

  const labels = {
    sidebar: '300x250',
    inline: '728x90',
    banner: '970x90',
  };

  return (
    <div 
      className={`card-soft rounded-xl flex flex-col items-center justify-center ${styles[variant]} overflow-hidden`}
      role="complementary"
      aria-label="Advertisement"
    >
      <div className="text-center p-6">
        <p className="text-[10px] text-text-muted font-medium uppercase tracking-widest mb-2">Advertisement</p>
        <p className="text-xs text-text-muted">AdSense-Ready Slot ({labels[variant]})</p>
        <div className="mt-3 text-2xl opacity-20" aria-hidden="true">📣</div>
      </div>
    </div>
  );
}
