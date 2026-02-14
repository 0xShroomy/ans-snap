import type { ReactNode } from 'react';

type Props = {
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  disabled?: boolean;
};

export const Card = ({ title, children, footer, disabled }: Props) => {
  return (
    <div
      className={[
        'rounded-3xl border border-border/70 bg-card/80 shadow-sm backdrop-blur-xl',
        disabled ? 'opacity-60' : '',
      ].join(' ')}
    >
      <div className="p-6">
        {title ? (
          <h3 className="mb-3 font-display text-lg font-semibold text-foreground">
            {title}
          </h3>
        ) : null}
        <div className="text-sm leading-relaxed text-muted-foreground">
          {children}
        </div>
      </div>
      {footer ? (
        <div className="border-t border-border/60 p-4">{footer}</div>
      ) : null}
    </div>
  );
};
