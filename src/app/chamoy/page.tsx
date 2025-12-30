'use client';

import { useState } from 'react';
import { useCart } from '@/components/CartProvider';

// Chamoy flavors (for Rim Dip and Keychain Bottle)
const chamoyFlavors = [
  { name: 'Watermelon', color: '#22c55e' },
  { name: 'Strawberry', color: '#ef4444' },
  { name: 'Pineapple', color: '#facc15' },
  { name: 'Mango', color: '#f97316' },
  { name: 'Tamarindo', color: '#92400e' },
];

// Product types
const productTypes = [
  { 
    id: 'rim-dip', 
    name: 'Chamoy Rim Dip', 
    size: '8oz', 
    price: 10,
    description: 'A thick, sweet and spicy sauce. Perfect for adding a bold kick to any snacks, fruits and drinks.',
    hasFlavors: true,
  },
  { 
    id: 'chili-powder', 
    name: 'Chili Powder', 
    size: '8oz', 
    price: 8,
    description: 'Our homemade spicy chili mix. Spice up your fruit or drinks, goes perfectly with our chamoy rim dip.',
    hasFlavors: false,
  },
  { 
    id: 'keychain-bottle', 
    name: 'Chamoy Key Chain Bottle', 
    size: '2oz', 
    price: 6,
    description: 'Travel size chamoy. Perfect for on the go, anywhere and anytime ($2 extra with mini Tajín/holder)',
    hasFlavors: true,
  },
];

export default function ChamoyPage() {
  const { addItem } = useCart();
  
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);

  const currentProduct = productTypes.find(p => p.id === selectedProduct);
  const needsFlavor = currentProduct?.hasFlavors ?? false;
  const canAddToCart = selectedProduct && (!needsFlavor || selectedFlavor);

  const handleAddToCart = () => {
    if (!canAddToCart || !currentProduct) return;

    const flavorText = needsFlavor && selectedFlavor ? ` - ${selectedFlavor}` : '';
    
    addItem({
      id: `chamoy-${currentProduct.id}${selectedFlavor ? `-${selectedFlavor.toLowerCase()}` : ''}-${Date.now()}`,
      name: `${currentProduct.name}${flavorText}`,
      price: currentProduct.price,
      size: currentProduct.size,
      flavor: needsFlavor ? selectedFlavor! : undefined,
    });

    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
      setSelectedProduct(null);
      setSelectedFlavor(null);
    }, 2000);
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--white)' }}>
      {/* Decorative Top Border - Dripping Effect */}
      <div style={{
        background: 'linear-gradient(180deg, var(--chamoy-red) 0%, var(--chamoy-red) 60%, transparent 100%)',
        height: '120px',
        position: 'relative',
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
            fill="var(--chamoy-red)"
          />
        </svg>
      </div>

      {/* Page Header */}
      <section style={{
        paddingTop: 'clamp(2rem, 6vw, 3rem)',
        paddingBottom: 'clamp(1rem, 2vw, 1.5rem)',
        textAlign: 'center',
      }}>
        <div className="container">
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 8vw, 4rem)',
            fontWeight: 700,
            color: 'var(--chamoy-red)',
            marginBottom: '1rem',
            textTransform: 'uppercase',
          }}>
            Pik-A-Mela Chamoy
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            color: 'var(--text-primary)',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: 1.7,
            fontStyle: 'italic',
          }}>
            Our special homemade sweet and spicy chamoy perfect for any occasion. Goes well with any of your favorite fruit, drinks and candy
          </p>
        </div>
      </section>

      {/* ===== CHAMOY PRODUCT CONFIGURATOR ===== */}
      <section style={{ paddingBottom: 'clamp(2rem, 4vw, 3rem)' }}>
        <div className="container">
          <div style={{
            backgroundColor: 'var(--gray-50)',
            borderRadius: '20px',
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            border: '2px solid var(--gray-200)',
            maxWidth: '800px',
            margin: '0 auto',
          }}>
            {/* Step 1: Product Type */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <span style={{
                  backgroundColor: 'var(--chamoy-red)',
                  color: 'white',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.875rem',
                }}>1</span>
                Choose Your Product
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}>
                {productTypes.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => {
                      setSelectedProduct(product.id);
                      if (!product.hasFlavors) {
                        setSelectedFlavor(null);
                      }
                    }}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '1.25rem',
                      fontFamily: 'var(--font-body)',
                      fontSize: '1rem',
                      fontWeight: selectedProduct === product.id ? 700 : 500,
                      color: selectedProduct === product.id ? 'var(--white)' : 'var(--text-primary)',
                      backgroundColor: selectedProduct === product.id ? 'var(--chamoy-red)' : 'var(--white)',
                      border: `2px solid ${selectedProduct === product.id ? 'var(--chamoy-red)' : 'var(--gray-300)'}`,
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      textAlign: 'left',
                    }}
                  >
                    <div>
                      <div style={{ 
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.125rem',
                        fontWeight: 700,
                        marginBottom: '0.25rem',
                      }}>
                        {product.name}
                        <span style={{ 
                          fontWeight: 400, 
                          fontSize: '0.875rem',
                          marginLeft: '0.5rem',
                          opacity: 0.8,
                        }}>
                          {product.size}
                        </span>
                      </div>
                      <div style={{ 
                        fontSize: '0.875rem',
                        opacity: 0.9,
                        lineHeight: 1.5,
                      }}>
                        {product.description}
                      </div>
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      marginLeft: '1rem',
                      whiteSpace: 'nowrap',
                    }}>
                      ${product.price}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Flavor (only for products with flavors) */}
            {selectedProduct && currentProduct?.hasFlavors && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}>
                  <span style={{
                    backgroundColor: 'var(--chamoy-red)',
                    color: 'white',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.875rem',
                  }}>2</span>
                  Choose Your Flavor
                </h3>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: '0.75rem',
                }}>
                  {chamoyFlavors.map((flavor) => (
                    <button
                      key={flavor.name}
                      onClick={() => setSelectedFlavor(flavor.name)}
                      style={{
                        padding: '0.75rem 1.25rem',
                        fontFamily: 'var(--font-display)',
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: selectedFlavor === flavor.name ? 'var(--white)' : flavor.color,
                        backgroundColor: selectedFlavor === flavor.name ? flavor.color : 'var(--white)',
                        border: `3px solid ${flavor.color}`,
                        borderRadius: '10px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {flavor.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chili Powder Note */}
            {selectedProduct === 'chili-powder' && (
              <div style={{
                backgroundColor: 'var(--warm-orange)',
                color: 'white',
                padding: '1rem',
                borderRadius: '10px',
                marginBottom: '2rem',
                textAlign: 'center',
              }}>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9375rem',
                  margin: 0,
                }}>
                  🌶️ Our chili powder is a single signature blend - no flavor selection needed!
                </p>
              </div>
            )}

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!canAddToCart}
              style={{
                width: '100%',
                padding: '1rem',
                fontFamily: 'var(--font-body)',
                fontSize: '1.125rem',
                fontWeight: 700,
                color: 'var(--white)',
                backgroundColor: addedToCart ? '#22c55e' : (!canAddToCart ? 'var(--gray-300)' : 'var(--chamoy-red)'),
                border: 'none',
                borderRadius: '10px',
                cursor: !canAddToCart ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {addedToCart ? '✓ Added to Cart!' : 
               !selectedProduct ? 'Select a Product' :
               (needsFlavor && !selectedFlavor) ? 'Select a Flavor' :
               `Add to Cart - $${currentProduct?.price}`}
            </button>
          </div>
        </div>
      </section>

      {/* Extra Info */}
      <section style={{ paddingBottom: 'clamp(2rem, 4vw, 3rem)' }}>
        <div className="container">
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center',
          }}>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--chamoy-red)',
              marginBottom: '0.5rem',
            }}>
              Don't forget!
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.125rem',
              color: 'var(--text-secondary)',
              fontStyle: 'italic',
            }}>
              If you can't dip it you can squirt it! 🌶️
            </p>
          </div>
        </div>
      </section>

      {/* Decorative Bottom Border */}
      <div style={{
        background: 'linear-gradient(0deg, var(--chamoy-red) 0%, var(--chamoy-red) 60%, transparent 100%)',
        height: '120px',
        position: 'relative',
        marginTop: 'auto',
      }}>
        <svg 
          viewBox="0 0 500 50" 
          preserveAspectRatio="none" 
          style={{
            position: 'absolute',
            top: '-1px',
            left: 0,
            width: '100%',
            height: '50px',
            transform: 'rotate(180deg)',
          }}
        >
          <path 
            d="M0,0 L0,30 Q25,50 50,30 Q75,10 100,30 Q125,50 150,30 Q175,10 200,30 Q225,50 250,30 Q275,10 300,30 Q325,50 350,30 Q375,10 400,30 Q425,50 450,30 Q475,10 500,30 L500,0 Z" 
            fill="var(--chamoy-red)"
          />
        </svg>
      </div>
    </main>
  );
}
