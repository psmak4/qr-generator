import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface FeatureCardProps {
  icon: IconDefinition;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="rounded-xl border border-(--color-border) bg-(--color-background) p-6 text-center">
      <FontAwesomeIcon 
        icon={icon} 
        className="mb-3 h-8 w-8 text-(--color-primary)" 
        aria-hidden="true" 
      />
      <h3 className="mb-2 font-medium text-(--color-text-primary)">{title}</h3>
      <p className="text-sm text-(--color-text-secondary)">{description}</p>
    </div>
  );
}
