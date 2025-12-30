'use client';

import { useState } from 'react';
import { useCart } from '@/components/CartProvider';

// Product types for Antojitos
const productTypes = [
  { 
    id: 'churro-puffs', 
    name: 'Churro Puffs', 
    price: 0.01,
    description: 'Crispy, cinnamon-sugar coated puffs with that classic churro flavor. Perfect for snacking!',
    emoji: '🥐',
  },
  { 
    id: 'carne-seca', 
    name: 'Carne Seca', 
    price: 0.01,
    description: 'Traditional Mexican dried beef jerky. Savory, spiced, and perfect for any occasion.',
    emoji: '🥩',
  },
];

// Count sizes (placeholder until prices confirmed)
const countSizes = [
  { name: '10 ct', size: '0.001g', priceMultiplier: 1 },
  { name: '25 ct', size: '0.001g', priceMultiplier: 1 },
  { name: '50 ct', size: '0.001g', priceMultiplier: 1 },
];

export default function AntojitosPage() {
  const { addItem } = useCart();
  
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);

  const currentProduct = productTypes.find(p => p.id === selectedProduct);
  const currentSize = countSizes.find(s => s.name === selectedSize);
  const canAddToCart = selectedProduct && selectedSize;
  
  const finalPrice = currentProduct && currentSize 
    ? currentProduct.price * currentSize.priceMultiplier 
    : 0;

  const handleAddToCart = () => {
    if (!canAddToCart || !currentProduct || !currentSize) return;

    addItem({
      id: `antojitos-${currentProduct.id}-${currentSize.name.toLowerCase().replace(' ', '-')}-${Date.now()}`,
      name: `${currentProduct.name} (${currentSize.name})`,
      price: finalPrice,
      size: currentSize.size,
    });

    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
      setSelectedProduct(null);
      setSelectedSize(null);
    }, 2000);
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--white)', display: 'flex', flexDirection: 'column' }}>
      {/* Decorative Top Border */}
      <div style={{
        background: 'linear-gradient(180deg, var(--warm-orange) 0%, var(--warm-orange) 60%, transparent 100%)',
        height: '120px',
        position: 'relative',
        flexShrink: 0,
      }}>
        <svg 
          viewBox="0 0 500 50" 
          preserveAspectRatio="none" 
          style={{
            position: 'absolute',
            bottom: '-1px',
            left: 0,
            width: '100%',
            height: '50px',
          }}
        >
          <path 
            d="M0,0 L0,30 Q25,50 50,30 Q75,10 100,30 Q125,50 150,30 Q175,10 200,30 Q225,50 250,30 Q275,10 300,30 Q325,50 350,30 Q375,10 400,30 Q425,50 450,30 Q475,10 500,30 L500,0 Z" 
            fill="var(--warm-orange)"
          />
        </svg>
      </div>

      {/* Page Content */}
      <div className="container" style={{ padding: '3rem 1rem', maxWidth: '800px', margin: '0 auto', flex: 1 }}>
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            color: 'var(--warm-orange)',
            marginBottom: '0.5rem',
          }}>
            Antojitos
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'var(--text-secondary)',
          }}>
            Savory Mexican snacks made fresh
          </p>
        </div>

        {/* Step 1: Choose Product */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.125rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <span style={{
              backgroundColor: 'var(--warm-orange)',
              color: 'white',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.875rem',
              fontWeight: 700,
            }}>1</span>
            Choose Your Snack
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
          }}>
            {productTypes.map((product) => (
              <button
                key={product.id}
                onClick={() => {
                  setSelectedProduct(product.id);
                  setSelectedSize(null);
                }}
                style={{
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: selectedProduct === product.id 
                    ? '2px solid var(--warm-orange)' 
                    : '2px solid var(--border-color)',
                  backgroundColor: selectedProduct === product.id 
                    ? 'rgba(249, 115, 22, 0.05)' 
                    : 'var(--white)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'left',
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                  {product.emoji}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '0.25rem',
                }}>
                  {product.name}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8125rem',
                  color: 'var(--text-secondary)',
                  margin: 0,
                  lineHeight: 1.5,
                }}>
                  {product.description}
                </p>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--text-muted)',
                  marginTop: '0.75rem',
                  marginBottom: 0,
                  fontStyle: 'italic',
                }}>
                  Price TBD
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Choose Count */}
        {selectedProduct && (
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.125rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <span style={{
                backgroundColor: 'var(--warm-orange)',
                color: 'white',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.875rem',
                fontWeight: 700,
              }}>2</span>
              Choose Your Count
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
            }}>
              {countSizes.map((size) => {
                return (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSize(size.name)}
                    style={{
                      padding: '1.25rem',
                      borderRadius: '12px',
                      border: selectedSize === size.name 
                        ? '2px solid var(--warm-orange)' 
                        : '2px solid var(--border-color)',
                      backgroundColor: selectedSize === size.name 
                        ? 'rgba(249, 115, 22, 0.05)' 
                        : 'var(--white)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      textAlign: 'center',
                    }}
                  >
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      marginBottom: '0.25rem',
                    }}>
                      {size.name}
                    </p>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      marginBottom: '0.5rem',
                      fontStyle: 'italic',
                    }}>
                      {size.size}
                    </p>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: 'var(--text-muted)',
                      margin: 0,
                      fontStyle: 'italic',
                    }}>
                      $TBD
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        {canAddToCart && (
          <div style={{
            position: 'sticky',
            bottom: '1rem',
            backgroundColor: 'var(--white)',
            padding: '1rem',
            borderRadius: '16px',
            boxShadow: '0 -4px 20px rgba(0,0,0,0.1)',
            border: '1px solid var(--border-color)',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
            }}>
              <div>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '0.25rem',
                }}>
                  {currentProduct?.name} ({currentSize?.name})
                </p>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: 'var(--text-muted)',
                  margin: 0,
                  fontStyle: 'italic',
                }}>
                  $0.01 <span style={{ fontSize: '0.75rem' }}>(placeholder - price TBD)</span>
                </p>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={addedToCart}
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: addedToCart ? '#22c55e' : 'var(--warm-orange)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: addedToCart ? 'default' : 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}
            >
              {addedToCart ? (
                <>
                  <span>✓</span> Added to Cart!
                </>
              ) : (
                <>
                  <span>🛒</span> Add to Cart
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Bottom Decorative Border - Fixed to bottom */}
      <div style={{ flexShrink: 0, marginTop: 'auto', marginBottom: '-4rem' }}>
        <svg 
          viewBox="0 0 500 50" 
          preserveAspectRatio="none" 
          style={{
            display: 'block',
            width: '100%',
            height: '50px',
          }}
        >
          <path 
            d="M0,50 L0,20 Q25,0 50,20 Q75,40 100,20 Q125,0 150,20 Q175,40 200,20 Q225,0 250,20 Q275,40 300,20 Q325,0 350,20 Q375,40 400,20 Q425,0 450,20 Q475,40 500,20 L500,50 Z" 
            fill="var(--warm-orange)"
          />
        </svg>
        <div style={{ 
          backgroundColor: 'var(--warm-orange)', 
          height: '40px',
        }} />
      </div>
    </main>
  );
}
