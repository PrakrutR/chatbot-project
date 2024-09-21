// src/components/Turnstile.tsx
'use client';

import { Turnstile, TurnstileProps } from '@marsidev/react-turnstile';

interface ExtendedTurnstileProps extends TurnstileProps {
  onVerify: (token: string) => void;
  containerClassName?: string;
}

const TurnstileComponent: React.FC<ExtendedTurnstileProps> = ({
  onVerify,
  containerClassName,
  siteKey,
  ...turnstileProps
}) => {
  return (
    <div className={`flex justify-center ${containerClassName || ''}`}>
      <Turnstile
        siteKey={siteKey || process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY!}
        onSuccess={onVerify}
        {...turnstileProps}
      />
    </div>
  );
};

export default TurnstileComponent;
