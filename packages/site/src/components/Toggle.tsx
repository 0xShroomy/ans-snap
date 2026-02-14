import { Moon, Sun } from 'lucide-react';
import { useMemo, useState } from 'react';

type Props = {
  onToggle: () => void;
  defaultChecked?: boolean;
};

export const Toggle = ({ onToggle, defaultChecked = false }: Props) => {
  const [checked, setChecked] = useState(defaultChecked);

  const isDark = useMemo(() => checked, [checked]);

  const handleToggle = () => {
    onToggle();
    setChecked((value) => !value);
  };

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      aria-pressed={isDark}
      onClick={handleToggle}
      className={[
        'relative inline-flex h-10 w-20 items-center justify-between rounded-full border border-border/70 bg-card/80 p-[3px]',
        'shadow-sm backdrop-blur transition-all',
        'shadow-[0_18px_40px_-26px_rgba(16,185,129,0.65)]',
      ].join(' ')}
    >
      <span className="absolute inset-[2px] rounded-full bg-card/90" />
      <span
        className={[
          'absolute left-1 top-1 h-8 w-8 rounded-full',
          'bg-gradient-to-br from-primary via-emerald-200 to-lime-200',
          'shadow-[0_14px_30px_-18px_rgba(16,185,129,0.9)] transition-[transform,filter] duration-300 ease-out',
          isDark ? 'translate-x-10' : 'translate-x-0',
        ].join(' ')}
      />
      <Sun
        className={[
          'pointer-events-none absolute left-[20px] top-1/2 z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 transition',
          isDark ? 'text-muted-foreground/60' : 'text-slate-900',
        ].join(' ')}
      />
      <Moon
        className={[
          'pointer-events-none absolute left-[60px] top-1/2 z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 transition',
          isDark ? 'text-slate-900' : 'text-muted-foreground/60',
        ].join(' ')}
      />
      <span className="sr-only">Toggle dark mode</span>
    </button>
  );
};
