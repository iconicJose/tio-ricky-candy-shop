'use client';

import { useState } from 'react';
import { useCart } from './CartProvider';

const FLAVORS = ['Watermelon', 'Strawberry', 'Pineapple', 'Mango', 'Tamarindo'] as const;
const SIZES = [
  { name: 'Medium', price: 5, priceCents: 500 },
  { name: 'Large', price: 10, priceCents: 1000 },
] as const;

type Flavor = typeof FLAVORS[number];
type SizeName = typeof SIZES[number]['name'];

interface CandyMixSelectorProps {
  showAddToCart?: boolean;
}

export function CandyMixSelector({ showAddToCart = true }: CandyMixSelectorProps) {
  const [selectedFlavor, setSelectedFlavor] = useState<Flavor | null>(null);
  const [selectedSize, setSelectedSize] = useState<SizeName | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const { addItem } = useCart();

  const canAddToCart = selectedFlavor !== null && selectedSize !== null;

  const handleFlavorClick = (flavor: Flavor) => {
    setSelectedFlavor(selectedFlavor === flavor ? null : flavor);
    setShowValidation(false);
  };

  const handleSizeClick = (size: SizeName) => {
    setSelectedSize(selectedSize === size ? null : size);
    setShowValidation(false);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    action: () => void
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  const handleAddToCart = async () => {
    if (!canAddToCart) {
      setShowValidation(true);
      return;
    }
    
    setIsAdding(true);
    try {
      const sizeData = SIZES.find(s => s.name === selectedSize)!;
      
      addItem(
        'candy-mix',
        'Candy Mix',
        selectedFlavor,
        selectedSize,
        sizeData.priceCents
      );
      
      // Brief delay for feedback
      await new Promise((resolve) => setTimeout(resolve, 300));
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div style={{
      backgroundColor: 'var(--gray-50)',
      borderRadius: '16px',
      padding: 'clamp(1.5rem, 4vw, 2.5rem)',
      border: '1px solid var(--gray-200)',
    }}>
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(1.5rem, 4vw, 2rem)',
        fontWeight: 700,
        color: 'var(--text-primary)',
        marginBottom: '1rem',
      }}>
        Candy Mix
      </h2>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '1rem',
        color: 'var(--text-secondary)',
        lineHeight: 1.7,
        marginBottom: '1.5rem',
        fontStyle: 'italic',
      }}>
        "our homemade chamoy candies (dulces enchilados) drenched in our 5 different delicious flavors of your choice…"
      </p>

      {/* Flavors */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.875rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--warm-orange)',
          marginBottom: '1rem',
        }}>
          Available Flavors
        </h3>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}>
          {FLAVORS.map((flavor) => {
            const isSelected = selectedFlavor === flavor;
            return (
              <button
                key={flavor}
                type="button"
                role="radio"
                aria-checked={isSelected}
                tabIndex={0}
                onClick={() => handleFlavorClick(flavor)}
                onKeyDown={(e) => handleKeyDown(e, () => handleFlavorClick(flavor))}
                style={{
                  backgroundColor: isSelected ? 'var(--gray-200)' : 'var(--white)',
                  border: isSelected ? '2px solid var(--gray-400)' : '1px solid var(--gray-300)',
                  borderRadius: '20px',
                  padding: isSelected ? '0.5rem 1rem' : '0.5rem 1rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  fontWeight: isSelected ? 600 : 500,
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                  outline: 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = 'scale(1.03)';
                    e.currentTarget.style.backgroundColor = 'var(--gray-100)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.backgroundColor = 'var(--white)';
                  }
                }}
                onFocus={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 0 2px var(--chamoy-red)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {flavor}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sizes */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1rem',
        marginBottom: showAddToCart ? '1.5rem' : '0',
      }}>
        {SIZES.map((size) => {
          const isSelected = selectedSize === size.name;
          return (
            <button
              key={size.name}
              type="button"
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onClick={() => handleSizeClick(size.name)}
              onKeyDown={(e) => handleKeyDown(e, () => handleSizeClick(size.name))}
              style={{
                backgroundColor: isSelected ? 'var(--gray-100)' : 'var(--white)',
                borderRadius: '12px',
                padding: '1.25rem',
                textAlign: 'center',
                border: isSelected ? '2px solid var(--gray-400)' : '1px solid var(--gray-200)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                transform: isSelected ? 'scale(1.03)' : 'scale(1)',
                outline: 'none',
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.backgroundColor = 'var(--gray-50)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.backgroundColor = 'var(--white)';
                }
              }}
              onFocus={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 2px var(--chamoy-red)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '0.25rem',
              }}>
                {size.name}
              </p>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--chamoy-red)',
                margin: 0,
              }}>
                ${size.price}
              </p>
            </button>
          );
        })}
      </div>

      {/* Add to Cart Button */}
      {showAddToCart && (
        <>
          {showValidation && !canAddToCart && (
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              color: 'var(--chamoy-red)',
              marginBottom: '0.75rem',
              textAlign: 'center',
            }}>
              {!selectedFlavor && !selectedSize
                ? 'Please select a flavor and size'
                : !selectedFlavor
                ? 'Please select a flavor'
                : 'Please select a size'}
            </p>
          )}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAdding}
            style={{
              width: '100%',
              padding: '1rem',
              backgroundColor: canAddToCart ? 'var(--chamoy-red)' : 'var(--gray-300)',
              color: canAddToCart ? 'var(--white)' : 'var(--gray-500)',
              border: 'none',
              borderRadius: '8px',
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: isAdding ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              opacity: isAdding ? 0.7 : 1,
            }}
            onMouseEnter={(e) => {
              if (canAddToCart && !isAdding) {
                e.currentTarget.style.backgroundColor = 'var(--chamoy-dark)';
              }
            }}
            onMouseLeave={(e) => {
              if (canAddToCart) {
                e.currentTarget.style.backgroundColor = 'var(--chamoy-red)';
              }
            }}
          >
            {isAdding ? 'Adding...' : 'Add to Cart'}
          </button>
        </>
      )}
    </div>
  );
}
