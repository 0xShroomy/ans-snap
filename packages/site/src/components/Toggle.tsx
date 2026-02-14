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
      onClick={handleToggle}
      className="relative inline-flex h-10 w-[92px] items-center justify-between rounded-full border border-border/70 bg-card/80 px-3 shadow-sm backdrop-blur"
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
      <span
        className={[
          'pointer-events-none relative z-10 text-sm',
          isDark ? 'opacity-60' : 'opacity-100',
        ].join(' ')}
      >
        ☀
      </span>
      <span
        className={[
          'pointer-events-none relative z-10 text-sm',
          isDark ? 'opacity-100' : 'opacity-60',
        ].join(' ')}
      >
        ☾
      </span>
      <span className="sr-only">Toggle dark mode</span>
    </button>
  );
};
