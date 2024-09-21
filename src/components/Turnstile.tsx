import { Turnstile } from '@marsidev/react-turnstile';
import React, { forwardRef } from 'react';

interface TurnstileComponentProps {
  onVerify: (token: string) => void;
  containerClassName?: string;
}

export interface TurnstileRef {
  reset: () => void;
}

export const TurnstileComponent = forwardRef<
  TurnstileRef,
  TurnstileComponentProps
>(({ onVerify, containerClassName }, ref) => {
  const turnstileRef = React.useRef<React.ElementRef<typeof Turnstile>>(null);

  React.useImperativeHandle(ref, () => ({
    reset: () => {
      if (turnstileRef.current) {
        turnstileRef.current.reset();
      }
    },
  }));

  return (
    <div className={`flex justify-center ${containerClassName || ''}`}>
      <Turnstile
        ref={turnstileRef}
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
