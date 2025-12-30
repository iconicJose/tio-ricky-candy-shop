'use client';

import { useState } from 'react';
import { useCart } from '@/components/CartProvider';

const flavors = [
  { name: 'Watermelon', color: '#22c55e' },
  { name: 'Strawberry', color: '#ef4444' },
  { name: 'Pineapple', color: '#facc15' },
  { name: 'Mango', color: '#f97316' },
  { name: 'Tamarindo', color: '#92400e' },
];

const bagSizes = [
  { name: 'Medium', price: 5 },
  { name: 'Large', price: 10 },
];

export default function CandyMixPage() {
  const { addItem } = useCart();
  const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [candyTrayAdded, setCandyTrayAdded] = useState(false);
  const [fruitTrayAdded, setFruitTrayAdded] = useState(false);

  const handleAddBagToCart = () => {
    if (!selectedFlavor || !selectedSize) return;
    
    const size = bagSizes.find(s => s.name === selectedSize);
    if (!size) return;

    addItem({
      id: `candy-mix-${selectedFlavor.toLowerCase()}-${selectedSize.toLowerCase()}`,
      name: `Candy Mix - ${selectedFlavor}`,
      price: size.price,
      size: selectedSize,
      flavor: selectedFlavor,
    });

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleAddTrayToCart = (trayType: 'candy' | 'fruit') => {
    if (trayType === 'candy') {
      addItem({
        id: 'candy-tray',
        name: 'Candy Tray',
        price: 45,
      });
      setCandyTrayAdded(true);
      setTimeout(() => setCandyTrayAdded(false), 2000);
    } else {
      addItem({
        id: 'fruit-tray',
        name: 'Fruit Tray',
        price: 50,
      });
      setFruitTrayAdded(true);
      setTimeout(() => setFruitTrayAdded(false), 2000);
    }
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
        paddingBottom: 'clamp(1.5rem, 4vw, 2rem)',
        textAlign: 'center',
      }}>
        <div className="container">
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 8vw, 4rem)',
            fontWeight: 700,
            color: 'var(--chamoy-red)',
            marginBottom: '1.5rem',
            textTransform: 'uppercase',
            letterSpacing: '0.02em',
          }}>
            Candy Mix
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
            Our homemade chamoy candies (dulces enchilados) drenched in our 5 different delicious flavors of your choice...
          </p>
        </div>
      </section>

      {/* Flavors Section */}
      <section style={{
        paddingBottom: 'clamp(2rem, 4vw, 3rem)',
      }}>
        <div className="container">
          <div style={{
            textAlign: 'center',
            marginBottom: '2rem',
          }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '1rem',
            }}>
              Flavors:
            </h2>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.5rem 1rem',
            }}>
              {flavors.map((flavor) => (
                <button
                  key={flavor.name}
                  onClick={() => setSelectedFlavor(flavor.name)}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.125rem, 2.5vw, 1.375rem)',
                    fontWeight: 700,
                    color: selectedFlavor === flavor.name ? 'var(--white)' : flavor.color,
                    backgroundColor: selectedFlavor === flavor.name ? flavor.color : 'transparent',
                    border: `2px solid ${flavor.color}`,
                    borderRadius: '8px',
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {flavor.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Candy Bag Sizes */}
      <section style={{
        paddingBottom: 'clamp(2rem, 4vw, 3rem)',
      }}>
        <div className="container">
          <div style={{
            backgroundColor: 'var(--gray-50)',
            borderRadius: '16px',
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            border: '1px solid var(--gray-200)',
            maxWidth: '600px',
            margin: '0 auto',
          }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '1.5rem',
              textAlign: 'center',
            }}>
              Candy Bag Sizes:
            </h2>
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
            }}>
              {bagSizes.map((size) => (
                <button
                  key={size.name}
                  onClick={() => setSelectedSize(size.name)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '1rem 2rem',
                    backgroundColor: selectedSize === size.name ? 'var(--chamoy-red)' : 'var(--white)',
                    border: `2px solid ${selectedSize === size.name ? 'var(--chamoy-red)' : 'var(--gray-300)'}`,
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: selectedSize === size.name ? 'var(--white)' : 'var(--text-primary)',
                  }}>
                    {size.name}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: selectedSize === size.name ? 'var(--white)' : 'var(--chamoy-red)',
                  }}>
                    ${size.price}
                  </span>
                </button>
              ))}
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddBagToCart}
              disabled={!selectedFlavor || !selectedSize}
              style={{
                width: '100%',
                padding: '1rem',
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--white)',
                backgroundColor: addedToCart ? '#22c55e' : ((!selectedFlavor || !selectedSize) ? 'var(--gray-300)' : 'var(--chamoy-red)'),
                border: 'none',
                borderRadius: '8px',
                cursor: (!selectedFlavor || !selectedSize) ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {addedToCart ? '✓ Added to Cart!' : 
               (!selectedFlavor && !selectedSize) ? 'Select Flavor & Size' :
               !selectedFlavor ? 'Select a Flavor' :
               !selectedSize ? 'Select a Size' :
               `Add ${selectedSize} ${selectedFlavor} to Cart - $${bagSizes.find(s => s.name === selectedSize)?.price}`}
            </button>
          </div>
        </div>
      </section>

      {/* Trays Section */}
      <section style={{
        paddingBottom: 'clamp(2rem, 4vw, 3rem)',
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            maxWidth: '800px',
            margin: '0 auto',
          }}>
            {/* Candy Tray */}
            <div style={{
              backgroundColor: 'var(--gray-50)',
              borderRadius: '16px',
              padding: 'clamp(1.5rem, 4vw, 2rem)',
              border: '1px solid var(--gray-200)',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1rem',
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--chamoy-red)',
                  margin: 0,
                }}>
                  Candy Tray:
                </h3>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: 'var(--chamoy-red)',
                }}>
                  $45
                </span>
              </div>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: '1rem',
              }}>
                A delicious candy platter mixed with our special chamoy flavors with the option of 6 candies or 5 candies and one chamoy dip
              </p>
              <button
                onClick={() => handleAddTrayToCart('candy')}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--white)',
                  backgroundColor: candyTrayAdded ? '#22c55e' : 'var(--chamoy-red)',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                }}
              >
                {candyTrayAdded ? '✓ Added!' : 'Add to Cart'}
              </button>
            </div>

            {/* Fruit Tray */}
            <div style={{
              backgroundColor: 'var(--gray-50)',
              borderRadius: '16px',
              padding: 'clamp(1.5rem, 4vw, 2rem)',
              border: '1px solid var(--gray-200)',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1rem',
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--chamoy-red)',
                  margin: 0,
                }}>
                  Fruit Tray:
                </h3>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: 'var(--chamoy-red)',
                }}>
                  $50+
                </span>
              </div>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: '0.5rem',
              }}>
                Your favorite fruits dipped or drizzled with any of our homemade chamoy
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                color: 'var(--warm-orange)',
                fontStyle: 'italic',
                marginBottom: '1rem',
              }}>
                *Price may vary on season for fruits*
              </p>
              <button
                onClick={() => handleAddTrayToCart('fruit')}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--white)',
                  backgroundColor: fruitTrayAdded ? '#22c55e' : 'var(--chamoy-red)',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                }}
              >
                {fruitTrayAdded ? '✓ Added!' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Bottom Border - Dripping Effect */}
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
