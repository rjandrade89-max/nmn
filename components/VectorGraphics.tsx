import React from 'react';
import { 
  IMG_FLORAL_CORNER_TL, 
  IMG_FLORAL_BOUQUET,
  IMG_FLORAL_SINGLE_1,
  IMG_FLORAL_SINGLE_2,
  IMG_FLORAL_SINGLE_3,
  IMG_FLORAL_NEW_1,
  IMG_FLORAL_NEW_2,
  IMG_FLORAL_NEW_3,
  IMG_ENVELOPE_LINER
} from '../constants';

export const EnvelopeLinerPattern = () => (
  <div style={{ 
         position: 'absolute',
         inset: 0,
         overflow: 'hidden'
       }}>
      <img 
        src={IMG_ENVELOPE_LINER} 
        alt="" 
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
      />
  </div>
);

interface FlowerProps {
  className?: string;
  style?: React.CSSProperties;
  src?: string;
  variant?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const FlowerCorner: React.FC<FlowerProps> = ({ className, style, src }) => {
  // Uses src if provided, otherwise defaults to Top Left corner image
  return (
    <img 
      src={src || IMG_FLORAL_CORNER_TL} 
      className={className} 
      style={{ display: 'block', ...style }} 
      alt="Decoração Floral" 
    />
  );
};

export const FlowerBouquet: React.FC<FlowerProps> = ({ className, style }) => (
  <img 
    src={IMG_FLORAL_BOUQUET} 
    className={className} 
    style={{ display: 'block', ...style }} 
    alt="Bouquet Floral" 
  />
);

export const FlowerSingle: React.FC<FlowerProps> = ({ className, style, variant = 1 }) => {
  let src = IMG_FLORAL_SINGLE_1;
  if (variant === 2) src = IMG_FLORAL_SINGLE_2;
  if (variant === 3) src = IMG_FLORAL_SINGLE_3;
  if (variant === 4) src = IMG_FLORAL_NEW_1;
  if (variant === 5) src = IMG_FLORAL_NEW_2;
  if (variant === 6) src = IMG_FLORAL_NEW_3;

  return (
    <img 
      src={src} 
      className={className} 
      style={{ display: 'block', ...style }} 
      alt="Flor" 
    />
  );
};