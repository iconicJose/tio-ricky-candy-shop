'use client';

import { useState } from 'react';
import { useCart } from '@/components/CartProvider';

// Candy types from the menu
const candyTypes = [
  'Peach Rings',
  'Gushers',
  'Mango Slices',
  'Gummy Bears',
  'Gummy Worms',
  'Gummy Jarritos',
  'Lil Manguitos',
  'Watermelon Rings',
  'Skwinkles Salsagheti',
  'Skwinkles Rellenos',
  'Sour Patch Kid',
  'Watermelons',
  'Hard or Gummy Skittles',
];

// Chamoy flavors
const flavors = [
  { name: 'Watermelon', color: '#22c55e' },
  { name: 'Strawberry', color: '#ef4444' },
  { name: 'Pineapple', color: '#facc15' },
  { name: 'Mango', color: '#f97316' },
  { name: 'Tamarindo', color: '#92400e' },
];

// Bag sizes with prices
const bagSizes = [
  { name: 'Medium', price: 5 },
  { name: 'Large', price: 10 },
];

// Candy options with prices for trays
const candyOptionsWithPrices = [
  { name: 'Peach Rings', price: 3 },
  { name: 'Gushers', price: 4 },
  { name: 'Mango Slices', price: 3 },
  { name: 'Gummy Bears', price: 2 },
  { name: 'Gummy Worms', price: 2 },
  { name: 'Gummy Jarritos', price: 4 },
  { name: 'Lil Manguitos', price: 5 },
  { name: 'Watermelon Rings', price: 3 },
  { name: 'Skwinkles Salsagheti', price: 4 },
  { name: 'Skwinkles Rellenos', price: 4 },
  { name: 'Sour Patch Kid', price: 3 },
  { name: 'Watermelons', price: 3 },
  { name: 'Hard or Gummy Skittles', price: 3 },
];

// Fruit options with prices (prices are per fruit portion for the tray)
// Total of all fruits = $52, slightly above $50 minimum
const fruitOptions = [
  { name: 'Mango', price: 12 },
  { name: 'Strawberry', price: 10 },
  { name: 'Pineapple', price: 11 },
  { name: 'Watermelon', price: 9 },
  { name: 'Grapes', price: 10 },
];

export default function CandyMixPage() {
  const { addItem } = useCart();
  
  // Candy Mix selections
  const [selectedCandyType, setSelectedCandyType] = useState<string | null>(null);
  const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);
  
  // Tray modals
  const [showCandyTrayModal, setShowCandyTrayModal] = useState(false);
  const [showFruitTrayModal, setShowFruitTrayModal] = useState(false);
  
  // Candy Tray selections
  const [candyTrayCount, setCandyTrayCount] = useState<5 | 6>(6);
  const [selectedCandies, setSelectedCandies] = useState<string[]>([]);
  const [includeChamoyDip, setIncludeChamoyDip] = useState(false);
  const [selectedDipFlavor, setSelectedDipFlavor] = useState<string | null>(null);
  
  // Fruit Tray selections
  const [selectedFruits, setSelectedFruits] = useState<string[]>([]);

  const canAddCandyMix = selectedCandyType && selectedFlavor && selectedSize;
  
  const handleAddCandyMixToCart = () => {
    if (!canAddCandyMix) return;
    
    const size = bagSizes.find(s => s.name === selectedSize);
    if (!size) return;

    addItem({
      id: `candy-mix-${selectedCandyType?.toLowerCase().replace(/\s+/g, '-')}-${selectedFlavor?.toLowerCase()}-${selectedSize?.toLowerCase()}`,
      name: `${selectedCandyType} - ${selectedFlavor} Chamoy`,
      price: size.price,
      size: selectedSize!,
      flavor: selectedFlavor!,
    });

    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
      // Reset selections after adding
      setSelectedCandyType(null);
      setSelectedFlavor(null);
      setSelectedSize(null);
    }, 2000);
  };

  // Candy Tray functions
  const toggleCandySelection = (candy: string) => {
    const maxCandies = includeChamoyDip ? candyTrayCount - 1 : candyTrayCount;
    if (selectedCandies.includes(candy)) {
      setSelectedCandies(selectedCandies.filter(c => c !== candy));
    } else if (selectedCandies.length < maxCandies) {
      setSelectedCandies([...selectedCandies, candy]);
    }
  };

  const getCandyTrayTotal = () => {
    const basePrice = 45;
    return basePrice;
  };

  // Check if candy tray can be added (need candies + flavor if dip selected)
  const canAddCandyTray = () => {
    const maxCandies = includeChamoyDip ? 5 : 6;
    const hasEnoughCandies = selectedCandies.length === maxCandies;
    const hasFlavorIfNeeded = !includeChamoyDip || selectedDipFlavor !== null;
    return hasEnoughCandies && hasFlavorIfNeeded;
  };

  const handleAddCandyTrayToCart = () => {
    if (!canAddCandyTray()) return;

    const dipInfo = includeChamoyDip && selectedDipFlavor 
      ? ` + ${selectedDipFlavor} Chamoy Dip` 
      : '';

    addItem({
      id: `candy-tray-${Date.now()}`,
      name: `Candy Tray (${includeChamoyDip ? 5 : 6} candies${dipInfo})`,
      price: getCandyTrayTotal(),
      customizations: selectedCandies.join(', ') + (includeChamoyDip ? `, ${selectedDipFlavor} Chamoy Dip` : ''),
    });

    setShowCandyTrayModal(false);
    setSelectedCandies([]);
    setCandyTrayCount(6);
    setIncludeChamoyDip(false);
    setSelectedDipFlavor(null);
  };

  // Fruit Tray functions
  const toggleFruitSelection = (fruit: string) => {
    if (selectedFruits.includes(fruit)) {
      setSelectedFruits(selectedFruits.filter(f => f !== fruit));
    } else {
      setSelectedFruits([...selectedFruits, fruit]);
    }
  };

  const getFruitTrayTotal = () => {
    return 50; // Flat fee
  };

  const handleAddFruitTrayToCart = () => {
    if (selectedFruits.length === 0) return;

    addItem({
      id: `fruit-tray-${Date.now()}`,
      name: `Fruit Tray (${selectedFruits.length} fruits)`,
      price: getFruitTrayTotal(),
      customizations: selectedFruits.join(', '),
    });

    setShowFruitTrayModal(false);
    setSelectedFruits([]);
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

      {/* ===== CANDY MIX PRODUCT CONFIGURATOR ===== */}
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
            {/* Progress indicator */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem',
              marginBottom: '2rem',
            }}>
              {[
                { num: 1, label: 'Candy', done: !!selectedCandyType },
                { num: 2, label: 'Flavor', done: !!selectedFlavor },
                { num: 3, label: 'Size', done: !!selectedSize },
              ].map((step, i) => (
                <div key={step.num} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: step.done ? 'var(--chamoy-red)' : 'var(--gray-300)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    transition: 'all 0.3s ease',
                  }}>
                    {step.done ? '✓' : step.num}
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: step.done ? 'var(--chamoy-red)' : 'var(--text-muted)',
                  }}>
                    {step.label}
                  </span>
                  {i < 2 && (
                    <div style={{
                      width: '30px',
                      height: '2px',
                      backgroundColor: 'var(--gray-300)',
                      margin: '0 0.25rem',
                    }} />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Candy Type */}
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
                Choose Your Candy
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                gap: '0.75rem',
              }}>
                {candyTypes.map((candy) => (
                  <button
                    key={candy}
                    onClick={() => setSelectedCandyType(candy)}
                    style={{
                      padding: '0.75rem',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      fontWeight: selectedCandyType === candy ? 700 : 500,
                      color: selectedCandyType === candy ? 'var(--white)' : 'var(--text-primary)',
                      backgroundColor: selectedCandyType === candy ? 'var(--chamoy-red)' : 'var(--white)',
                      border: `2px solid ${selectedCandyType === candy ? 'var(--chamoy-red)' : 'var(--gray-300)'}`,
                      borderRadius: '10px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      textAlign: 'center',
                    }}
                  >
                    {candy}
                  </button>
                ))}
              </div>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                color: 'var(--warm-orange)',
                fontStyle: 'italic',
                marginTop: '1rem',
                textAlign: 'center',
              }}>
                *Don't see your favorite candy? Just ask and we'll try our best to satisfy that craving*
              </p>
            </div>

            {/* Step 2: Flavor */}
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
                Choose Your Chamoy Flavor
              </h3>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '0.75rem',
              }}>
                {flavors.map((flavor) => (
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

            {/* Step 3: Size */}
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
                }}>3</span>
                Choose Your Bag Size
              </h3>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1.5rem',
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
                      padding: '1.25rem 2rem',
                      backgroundColor: selectedSize === size.name ? 'var(--chamoy-red)' : 'var(--white)',
                      border: `3px solid ${selectedSize === size.name ? 'var(--chamoy-red)' : 'var(--gray-300)'}`,
                      borderRadius: '14px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      minWidth: '120px',
                    }}
                  >
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.125rem',
                      fontWeight: 600,
                      color: selectedSize === size.name ? 'var(--white)' : 'var(--text-primary)',
                    }}>
                      {size.name}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.75rem',
                      fontWeight: 700,
                      color: selectedSize === size.name ? 'var(--white)' : 'var(--chamoy-red)',
                    }}>
                      ${size.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Selection Summary & Add to Cart */}
            <div style={{
              backgroundColor: canAddCandyMix ? 'var(--white)' : 'var(--gray-100)',
              borderRadius: '12px',
              padding: '1.25rem',
              border: `2px solid ${canAddCandyMix ? 'var(--chamoy-red)' : 'var(--gray-200)'}`,
              transition: 'all 0.3s ease',
            }}>
              {canAddCandyMix ? (
                <div style={{ textAlign: 'center' }}>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '0.75rem',
                  }}>
                    Your selection:
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '1rem',
                  }}>
                    {selectedSize} {selectedCandyType} with {selectedFlavor} Chamoy
                  </p>
                </div>
              ) : (
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  color: 'var(--text-muted)',
                  textAlign: 'center',
                  marginBottom: '1rem',
                }}>
                  Please complete all 3 selections above to add to cart
                </p>
              )}
              
              <button
                onClick={handleAddCandyMixToCart}
                disabled={!canAddCandyMix}
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: 'var(--white)',
                  backgroundColor: addedToCart ? '#22c55e' : (!canAddCandyMix ? 'var(--gray-300)' : 'var(--chamoy-red)'),
                  border: 'none',
                  borderRadius: '10px',
                  cursor: !canAddCandyMix ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {addedToCart ? '✓ Added to Cart!' : 
                 !canAddCandyMix ? `Select ${!selectedCandyType ? 'Candy' : !selectedFlavor ? 'Flavor' : 'Size'}` :
                 `Add to Cart - $${bagSizes.find(s => s.name === selectedSize)?.price}`}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRAYS SECTION ===== */}
      <section style={{ paddingBottom: 'clamp(2rem, 4vw, 3rem)' }}>
        <div className="container">
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            textAlign: 'center',
            marginBottom: '2rem',
          }}>
            Party Trays
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
            maxWidth: '900px',
            margin: '0 auto',
          }}>
            {/* Candy Tray Card */}
            <div style={{
              backgroundColor: 'var(--gray-50)',
              borderRadius: '16px',
              padding: 'clamp(1.5rem, 4vw, 2rem)',
              border: '2px solid var(--gray-200)',
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
                  Candy Tray
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
                marginBottom: '1.5rem',
              }}>
                A delicious candy platter mixed with our special chamoy flavors. Choose 6 candies or 5 candies + chamoy dip!
              </p>
              <button
                onClick={() => setShowCandyTrayModal(true)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--white)',
                  backgroundColor: 'var(--chamoy-red)',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                }}
              >
                🎨 Customize Tray
              </button>
            </div>

            {/* Fruit Tray Card */}
            <div style={{
              backgroundColor: 'var(--gray-50)',
              borderRadius: '16px',
              padding: 'clamp(1.5rem, 4vw, 2rem)',
              border: '2px solid var(--gray-200)',
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
                  Fruit Tray
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
                Your favorite fruits dipped or drizzled with any of our homemade chamoy. Build your perfect tray!
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                color: 'var(--warm-orange)',
                fontStyle: 'italic',
                marginBottom: '1.5rem',
              }}>
                *Price varies by fruit selection*
              </p>
              <button
                onClick={() => setShowFruitTrayModal(true)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--white)',
                  backgroundColor: 'var(--chamoy-red)',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                }}
              >
                🍓 Customize Tray
              </button>
            </div>
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

      {/* ===== CANDY TRAY MODAL ===== */}
      {showCandyTrayModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem',
        }}>
          <div style={{
            backgroundColor: 'var(--white)',
            borderRadius: '20px',
            width: '100%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflow: 'auto',
            padding: 'clamp(1.5rem, 4vw, 2rem)',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
            }}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--chamoy-red)',
                margin: 0,
              }}>
                Customize Your Candy Tray
              </h2>
              <button
                onClick={() => {
                  setShowCandyTrayModal(false);
                  setSelectedCandies([]);
                  setCandyTrayCount(6);
                  setIncludeChamoyDip(false);
                  setSelectedDipFlavor(null);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  padding: '0.5rem',
                }}
              >
                ✕
              </button>
            </div>

            {/* Tray Option Selection */}
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                marginBottom: '0.75rem',
              }}>
                Choose your tray option:
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => {
                    setCandyTrayCount(6);
                    setIncludeChamoyDip(false);
                    setSelectedCandies([]);
                    setSelectedDipFlavor(null);
                  }}
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '10px',
                    border: `2px solid ${!includeChamoyDip && candyTrayCount === 6 ? 'var(--chamoy-red)' : 'var(--gray-300)'}`,
                    backgroundColor: !includeChamoyDip && candyTrayCount === 6 ? 'var(--chamoy-red)' : 'var(--white)',
                    color: !includeChamoyDip && candyTrayCount === 6 ? 'var(--white)' : 'var(--text-primary)',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  6 Candies
                </button>
                <button
                  onClick={() => {
                    setCandyTrayCount(6);
                    setIncludeChamoyDip(true);
                    setSelectedCandies(selectedCandies.slice(0, 5));
                  }}
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '10px',
                    border: `2px solid ${includeChamoyDip ? 'var(--chamoy-red)' : 'var(--gray-300)'}`,
                    backgroundColor: includeChamoyDip ? 'var(--chamoy-red)' : 'var(--white)',
                    color: includeChamoyDip ? 'var(--white)' : 'var(--text-primary)',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  5 Candies + Chamoy Dip
                </button>
              </div>
            </div>

            {/* Chamoy Flavor Selection (only when dip is included) */}
            {includeChamoyDip && (
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  marginBottom: '0.75rem',
                }}>
                  Choose your chamoy dip flavor:
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {flavors.map((flavor) => (
                    <button
                      key={flavor.name}
                      onClick={() => setSelectedDipFlavor(flavor.name)}
                      style={{
                        padding: '0.5rem 1rem',
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.9375rem',
                        fontWeight: 600,
                        color: selectedDipFlavor === flavor.name ? 'var(--white)' : flavor.color,
                        backgroundColor: selectedDipFlavor === flavor.name ? flavor.color : 'var(--white)',
                        border: `2px solid ${flavor.color}`,
                        borderRadius: '8px',
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

            {/* Candy Selection */}
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                marginBottom: '0.5rem',
              }}>
                Select your candies ({selectedCandies.length}/{includeChamoyDip ? 5 : 6}):
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: '0.5rem',
              }}>
                {candyOptionsWithPrices.map((candy) => {
                  const isSelected = selectedCandies.includes(candy.name);
                  const maxReached = selectedCandies.length >= (includeChamoyDip ? 5 : 6);
                  return (
                    <button
                      key={candy.name}
                      onClick={() => toggleCandySelection(candy.name)}
                      disabled={!isSelected && maxReached}
                      style={{
                        padding: '0.75rem',
                        borderRadius: '8px',
                        border: `2px solid ${isSelected ? 'var(--chamoy-red)' : 'var(--gray-200)'}`,
                        backgroundColor: isSelected ? 'var(--chamoy-red)' : 'var(--white)',
                        color: isSelected ? 'var(--white)' : (maxReached && !isSelected ? 'var(--gray-400)' : 'var(--text-primary)'),
                        fontWeight: 500,
                        fontSize: '0.875rem',
                        cursor: (!isSelected && maxReached) ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s ease',
                        opacity: (!isSelected && maxReached) ? 0.5 : 1,
                      }}
                    >
                      {candy.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Summary */}
            <div style={{
              backgroundColor: 'var(--gray-50)',
              borderRadius: '12px',
              padding: '1rem',
              marginBottom: '1rem',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <span style={{ fontWeight: 600 }}>Tray Total:</span>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--chamoy-red)',
                }}>
                  ${getCandyTrayTotal()}
                </span>
              </div>
              {selectedCandies.length > 0 && (
                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  marginTop: '0.5rem',
                }}>
                  {selectedCandies.join(', ')}{includeChamoyDip && selectedDipFlavor ? `, ${selectedDipFlavor} Chamoy Dip` : includeChamoyDip ? ', Chamoy Dip' : ''}
                </p>
              )}
            </div>

            <button
              onClick={handleAddCandyTrayToCart}
              disabled={!canAddCandyTray()}
              style={{
                width: '100%',
                padding: '1rem',
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                fontWeight: 700,
                color: 'var(--white)',
                backgroundColor: canAddCandyTray() ? 'var(--chamoy-red)' : 'var(--gray-300)',
                border: 'none',
                borderRadius: '10px',
                cursor: canAddCandyTray() ? 'pointer' : 'not-allowed',
              }}
            >
              {(() => {
                const maxCandies = includeChamoyDip ? 5 : 6;
                const candiesNeeded = maxCandies - selectedCandies.length;
                if (candiesNeeded > 0) {
                  return `Select ${candiesNeeded} more candies`;
                }
                if (includeChamoyDip && !selectedDipFlavor) {
                  return 'Select chamoy dip flavor';
                }
                return `Add to Cart - $${getCandyTrayTotal()}`;
              })()}
            </button>
          </div>
        </div>
      )}

      {/* ===== FRUIT TRAY MODAL ===== */}
      {showFruitTrayModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem',
        }}>
          <div style={{
            backgroundColor: 'var(--white)',
            borderRadius: '20px',
            width: '100%',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflow: 'auto',
            padding: 'clamp(1.5rem, 4vw, 2rem)',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
            }}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--chamoy-red)',
                margin: 0,
              }}>
                Customize Your Fruit Tray
              </h2>
              <button
                onClick={() => {
                  setShowFruitTrayModal(false);
                  setSelectedFruits([]);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  padding: '0.5rem',
                }}
              >
                ✕
              </button>
            </div>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9375rem',
              color: 'var(--text-secondary)',
              marginBottom: '1.5rem',
            }}>
              Select the fruits you'd like included in your tray. Flat fee of $50.
            </p>

            {/* Fruit Selection */}
            <div style={{ marginBottom: '1.5rem' }}>
              {fruitOptions.map((fruit) => {
                const isSelected = selectedFruits.includes(fruit.name);
                return (
                  <button
                    key={fruit.name}
                    onClick={() => toggleFruitSelection(fruit.name)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                      padding: '1rem',
                      marginBottom: '0.5rem',
                      borderRadius: '10px',
                      border: `2px solid ${isSelected ? 'var(--chamoy-red)' : 'var(--gray-200)'}`,
                      backgroundColor: isSelected ? 'rgba(220, 38, 38, 0.1)' : 'var(--white)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                    }}>
                      <span style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '6px',
                        border: `2px solid ${isSelected ? 'var(--chamoy-red)' : 'var(--gray-300)'}`,
                        backgroundColor: isSelected ? 'var(--chamoy-red)' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '0.875rem',
                      }}>
                        {isSelected && '✓'}
                      </span>
                      <span style={{
                        fontWeight: isSelected ? 600 : 500,
                        color: 'var(--text-primary)',
                      }}>
                        {fruit.name}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Price Summary */}
            <div style={{
              backgroundColor: 'var(--gray-50)',
              borderRadius: '12px',
              padding: '1rem',
              marginBottom: '1rem',
            }}>
              {selectedFruits.length > 0 ? (
                <>
                  <p style={{
                    fontSize: '0.9375rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '0.5rem',
                  }}>
                    Selected: {selectedFruits.join(', ')}
                  </p>
                </>
              ) : (
                <p style={{
                  fontSize: '0.9375rem',
                  color: 'var(--text-muted)',
                  textAlign: 'center',
                  margin: 0,
                }}>
                  Select fruits for your tray
                </p>
              )}
              <div style={{
                borderTop: selectedFruits.length > 0 ? '2px solid var(--gray-300)' : 'none',
                marginTop: selectedFruits.length > 0 ? '0.75rem' : 0,
                paddingTop: selectedFruits.length > 0 ? '0.75rem' : 0,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <span style={{ fontWeight: 700 }}>Total:</span>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--chamoy-red)',
                }}>
                  $50
                </span>
              </div>
            </div>

            <button
              onClick={handleAddFruitTrayToCart}
              disabled={selectedFruits.length === 0}
              style={{
                width: '100%',
                padding: '1rem',
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                fontWeight: 700,
                color: 'var(--white)',
                backgroundColor: selectedFruits.length > 0 ? 'var(--chamoy-red)' : 'var(--gray-300)',
                border: 'none',
                borderRadius: '10px',
                cursor: selectedFruits.length > 0 ? 'pointer' : 'not-allowed',
              }}
            >
              {selectedFruits.length > 0 
                ? 'Add to Cart - $50'
                : 'Select at least one fruit'}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
