// src/components/Turnstile.tsx
'use client';

import { Turnstile, TurnstileProps } from '@marsidev/react-turnstile';

interface ExtendedTurnstileProps extends Omit<TurnstileProps, 'onSuccess'> {
  onVerify: (token: string) => void;
  containerClassName?: string;
  siteKey: string; // Make siteKey required
}

const TurnstileComponent: React.FC<ExtendedTurnstileProps> = ({
  onVerify,
  containerClassName,
  siteKey,
  ...turnstileProps
}) => {
  return (
    <div className={`flex justify-center ${containerClassName || ''}`}>
      <Turnstile siteKey={siteKey} onSuccess={onVerify} {...turnstileProps} />
    </div>
  );
};

export default TurnstileComponent;
