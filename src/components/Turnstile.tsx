// src/components/Turnstile.tsx
'use client';

import { Turnstile } from '@marsidev/react-turnstile';

interface TurnstileComponentProps {
  onVerify: (token: string) => void;
  containerClassName?: string;
}

const TurnstileComponent: React.FC<TurnstileComponentProps> = ({
  onVerify,
  containerClassName,
}) => {
  return (
    <div className={`flex justify-center ${containerClassName || ''}`}>
      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY!}
        onSuccess={onVerify}
        options={{
          theme: 'light',
          size: 'normal',
        }}
      />
    </div>
  );
};

export default TurnstileComponent;
