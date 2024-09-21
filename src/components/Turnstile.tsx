// src/components/Turnstile.tsx
import { Turnstile } from '@marsidev/react-turnstile';
import React, { forwardRef } from 'react';

interface TurnstileComponentProps {
  onVerify: (token: string) => void;
  containerClassName?: string;
}

export const TurnstileComponent = forwardRef<
  HTMLDivElement,
  TurnstileComponentProps
>(({ onVerify, containerClassName }, ref) => {
  return (
    <div
      ref={ref}
      className={`flex justify-center ${containerClassName || ''}`}
    >
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
});

TurnstileComponent.displayName = 'TurnstileComponent';
