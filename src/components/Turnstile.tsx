// src/components/Turnstile.tsx
'use client';

import { Turnstile } from '@marsidev/react-turnstile';

interface TurnstileProps {
  onVerify: (token: string) => void;
}

const TurnstileComponent: React.FC<TurnstileProps> = ({ onVerify }) => {
  return (
    <Turnstile
      siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY!}
      onSuccess={onVerify}
    />
  );
};

export default TurnstileComponent;
