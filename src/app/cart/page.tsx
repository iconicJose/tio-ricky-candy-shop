'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart, CartLineItem } from '@/components/CartProvider';

// Candy options for edit modal
const candyOptions = [
  'Peach Rings', 'Gushers', 'Mango Slices', 'Gummy Bears', 'Gummy Worms',
  'Gummy Jarritos', 'Lil Manguitos', 'Watermelon Rings', 'Skwinkles Salsagheti',
  'Skwinkles Rellenos', 'Sour Patch Kid', 'Watermelons', 'Hard or Gummy Skittles',
];

const chamoyFlavors = [
  { name: 'Watermelon', color: '#22c55e' },
  { name: 'Strawberry', color: '#ef4444' },
  { name: 'Pineapple', color: '#facc15' },
  { name: 'Mango', color: '#f97316' },
  { name: 'Tamarindo', color: '#92400e' },
];

const fruitOptions = ['Mango', 'Strawberry', 'Pineapple', 'Watermelon', 'Grapes'];

function CartLineItemRow({ item }: { item: CartLineItem }) {
  const { updateQuantity, removeItem, addItem } = useCart();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  
  // Parse customizations
  const customizationList = item.customizations 
    ? item.customizations.split(', ').filter(c => c.trim())
    : [];
  
  const hasCustomizations = customizationList.length > 0;
  const isTray = item.productName.includes('Tray');
  const isCandyTray = item.productName.includes('Candy Tray');
  const isFruitTray = item.productName.includes('Fruit Tray');

  // For inline removal
  const handleRemoveCustomization = (customToRemove: string) => {
    const newCustomizations = customizationList.filter(c => c !== customToRemove);
    if (newCustomizations.length === 0) {
      // If no customizations left, remove the item
      removeItem(item.id);
    } else {
      // Update the item with new customizations
      // For now, we'll remove and re-add since we can't directly edit
      removeItem(item.id);
      addItem({
        id: item.productId,
        name: item.productName,
        price: item.priceCents / 100,
        flavor: item.flavor,
        size: item.size,
        customizations: newCustomizations.join(', '),
      });
    }
  };

  return (
    <>
      <div style={{
        padding: '1.5rem 0',
        borderBottom: '1px solid var(--gray-200)',
      }}>
        {/* Main Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto auto',
          gap: '1.5rem',
          alignItems: 'center',
        }}>
          {/* Product Info */}
          <div>
            <h3 style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: '0.25rem',
            }}>
              {item.productName}
            </h3>
            
            {/* Customizations - Clickable to expand */}
            {hasCustomizations && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'var(--text-muted)',
                  marginBottom: '0.25rem',
                  textAlign: 'left',
                }}
              >
                <span style={{
                  transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                  fontSize: '0.75rem',
                }}>
                  ▶
                </span>
                <span style={{ textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                  {customizationList.length} item{customizationList.length > 1 ? 's' : ''} selected
                </span>
              </button>
            )}
            
            {/* Non-tray items show flavor/size */}
            {!isTray && item.flavor && (
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                margin: 0,
              }}>
                {item.flavor}{item.size ? ` • ${item.size}` : ''}
              </p>
            )}
            
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              color: 'var(--chamoy-red)',
              fontWeight: 500,
              marginTop: '0.25rem',
            }}>
              ${(item.priceCents / 100).toFixed(2)} each
            </p>
          </div>

          {/* Quantity Controls */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              style={{
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--gray-100)',
                border: '1px solid var(--gray-300)',
                borderRadius: '6px',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                fontSize: '1.25rem',
                fontWeight: 500,
                color: 'var(--text-primary)',
              }}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              fontWeight: 500,
              color: 'var(--text-primary)',
              minWidth: '2rem',
              textAlign: 'center',
            }}>
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              style={{
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--gray-100)',
                border: '1px solid var(--gray-300)',
                borderRadius: '6px',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                fontSize: '1.25rem',
                fontWeight: 500,
                color: 'var(--text-primary)',
              }}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Line Total & Remove */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '0.5rem',
          }}>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.125rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              margin: 0,
            }}>
              ${((item.priceCents * item.quantity) / 100).toFixed(2)}
            </p>
            <button
              onClick={() => removeItem(item.id)}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                color: 'var(--text-muted)',
                textDecoration: 'underline',
                padding: 0,
              }}
            >
              Remove
            </button>
          </div>
        </div>

        {/* Expanded Customizations */}
        {isExpanded && hasCustomizations && (
          <div style={{
            marginTop: '1rem',
            padding: '1rem',
            backgroundColor: 'var(--white)',
            borderRadius: '8px',
            border: '1px solid var(--gray-200)',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.75rem',
            }}>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                margin: 0,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                Selected Items
              </p>
              {isTray && (
                <button
                  onClick={() => setShowEditModal(true)}
                  style={{
                    backgroundColor: 'var(--chamoy-red)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.375rem 0.75rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  ✏️ Edit Selection
                </button>
              )}
            </div>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}>
              {customizationList.map((custom, index) => (
                <span
                  key={index}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: 'var(--gray-100)',
                    padding: '0.375rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.8125rem',
                    fontFamily: 'var(--font-body)',
                    color: 'var(--text-primary)',
                  }}
                >
                  {custom}
                  <button
                    onClick={() => handleRemoveCustomization(custom)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      fontSize: '1rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1,
                    }}
                    title={`Remove ${custom}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <EditTrayModal
          item={item}
          isCandyTray={isCandyTray}
          isFruitTray={isFruitTray}
          currentCustomizations={customizationList}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </>
  );
}

// Edit Modal Component
function EditTrayModal({
  item,
  isCandyTray,
  isFruitTray,
  currentCustomizations,
  onClose,
}: {
  item: CartLineItem;
  isCandyTray: boolean;
  isFruitTray: boolean;
  currentCustomizations: string[];
  onClose: () => void;
}) {
  const { removeItem, addItem } = useCart();
  
  // Parse current state
  const hasChamoyDip = currentCustomizations.some(c => c.includes('Chamoy Dip'));
  const currentDipFlavor = hasChamoyDip 
    ? currentCustomizations.find(c => c.includes('Chamoy Dip'))?.replace(' Chamoy Dip', '') || null
    : null;
  const currentCandies = currentCustomizations.filter(c => !c.includes('Chamoy Dip'));
  
  const [selectedItems, setSelectedItems] = useState<string[]>(
    isCandyTray ? currentCandies : currentCustomizations
  );
  const [includeDip, setIncludeDip] = useState(hasChamoyDip);
  const [dipFlavor, setDipFlavor] = useState<string | null>(currentDipFlavor);
  
  const maxCandies = includeDip ? 5 : 6;
  const options = isCandyTray ? candyOptions : fruitOptions;
  
  const toggleSelection = (option: string) => {
    if (selectedItems.includes(option)) {
      setSelectedItems(selectedItems.filter(i => i !== option));
    } else if (isCandyTray && selectedItems.length < maxCandies) {
      setSelectedItems([...selectedItems, option]);
    } else if (isFruitTray) {
      setSelectedItems([...selectedItems, option]);
    }
  };
  
  const handleSave = () => {
    // Build new customizations string
    let newCustomizations = selectedItems.join(', ');
    if (includeDip && dipFlavor) {
      newCustomizations += `, ${dipFlavor} Chamoy Dip`;
    }
    
    // Calculate new name
    let newName = item.productName;
    if (isCandyTray) {
      const dipInfo = includeDip && dipFlavor ? ` + ${dipFlavor} Chamoy Dip` : '';
      newName = `Candy Tray (${includeDip ? 5 : 6} candies${dipInfo})`;
    } else if (isFruitTray) {
      newName = `Fruit Tray (${selectedItems.length} fruits)`;
    }
    
    // Remove old, add new
    removeItem(item.id);
    addItem({
      id: `${isCandyTray ? 'candy' : 'fruit'}-tray-${Date.now()}`,
      name: newName,
      price: item.priceCents / 100,
      customizations: newCustomizations,
    });
    
    onClose();
  };
  
  const canSave = isCandyTray 
    ? (selectedItems.length === maxCandies && (!includeDip || dipFlavor))
    : selectedItems.length > 0;

  return (
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
        borderRadius: '16px',
        width: '100%',
        maxWidth: '550px',
        maxHeight: '85vh',
        overflow: 'auto',
        padding: 'clamp(1.25rem, 4vw, 2rem)',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--chamoy-red)',
            margin: 0,
          }}>
            Edit {isCandyTray ? 'Candy' : 'Fruit'} Tray
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '0.25rem',
              color: 'var(--text-muted)',
            }}
          >
            ✕
          </button>
        </div>

        {/* Candy Tray Options */}
        {isCandyTray && (
          <div style={{ marginBottom: '1.25rem' }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              marginBottom: '0.5rem',
              fontSize: '0.9375rem',
            }}>
              Tray Option:
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  setIncludeDip(false);
                  setDipFlavor(null);
                }}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  border: `2px solid ${!includeDip ? 'var(--chamoy-red)' : 'var(--gray-300)'}`,
                  backgroundColor: !includeDip ? 'var(--chamoy-red)' : 'var(--white)',
                  color: !includeDip ? 'var(--white)' : 'var(--text-primary)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                }}
              >
                6 Candies
              </button>
              <button
                onClick={() => {
                  setIncludeDip(true);
                  if (selectedItems.length > 5) {
                    setSelectedItems(selectedItems.slice(0, 5));
                  }
                }}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  border: `2px solid ${includeDip ? 'var(--chamoy-red)' : 'var(--gray-300)'}`,
                  backgroundColor: includeDip ? 'var(--chamoy-red)' : 'var(--white)',
                  color: includeDip ? 'var(--white)' : 'var(--text-primary)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                }}
              >
                5 Candies + Dip
              </button>
            </div>
          </div>
        )}

        {/* Chamoy Flavor Selection (for dip) */}
        {isCandyTray && includeDip && (
          <div style={{ marginBottom: '1.25rem' }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              marginBottom: '0.5rem',
              fontSize: '0.9375rem',
            }}>
              Chamoy Dip Flavor:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {chamoyFlavors.map((flavor) => (
                <button
                  key={flavor.name}
                  onClick={() => setDipFlavor(flavor.name)}
                  style={{
                    padding: '0.375rem 0.875rem',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: dipFlavor === flavor.name ? 'var(--white)' : flavor.color,
                    backgroundColor: dipFlavor === flavor.name ? flavor.color : 'var(--white)',
                    border: `2px solid ${flavor.color}`,
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                >
                  {flavor.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Selection Grid */}
        <div style={{ marginBottom: '1.25rem' }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            marginBottom: '0.5rem',
            fontSize: '0.9375rem',
          }}>
            {isCandyTray 
              ? `Select Candies (${selectedItems.length}/${maxCandies}):`
              : `Select Fruits (${selectedItems.length} selected):`
            }
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
            gap: '0.5rem',
          }}>
            {options.map((option) => {
              const isSelected = selectedItems.includes(option);
              const isDisabled = isCandyTray && !isSelected && selectedItems.length >= maxCandies;
              return (
                <button
                  key={option}
                  onClick={() => toggleSelection(option)}
                  disabled={isDisabled}
                  style={{
                    padding: '0.625rem',
                    borderRadius: '8px',
                    border: `2px solid ${isSelected ? 'var(--chamoy-red)' : 'var(--gray-200)'}`,
                    backgroundColor: isSelected ? 'var(--chamoy-red)' : 'var(--white)',
                    color: isSelected ? 'var(--white)' : (isDisabled ? 'var(--gray-400)' : 'var(--text-primary)'),
                    fontWeight: 500,
                    fontSize: '0.8125rem',
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                    opacity: isDisabled ? 0.5 : 1,
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--gray-200)',
        }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: '0.875rem',
              backgroundColor: 'var(--gray-100)',
              color: 'var(--text-primary)',
              border: '1px solid var(--gray-300)',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.9375rem',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!canSave}
            style={{
              flex: 1,
              padding: '0.875rem',
              backgroundColor: canSave ? 'var(--chamoy-red)' : 'var(--gray-300)',
              color: 'var(--white)',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.9375rem',
              cursor: canSave ? 'pointer' : 'not-allowed',
              fontFamily: 'var(--font-body)',
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  const { cart, subtotalCents, totalQuantity } = useCart();

  if (cart.items.length === 0) {
    return (
      <main style={{ minHeight: '60vh', backgroundColor: 'var(--white)' }}>
        <section style={{
          paddingTop: 'clamp(4rem, 10vw, 6rem)',
          paddingBottom: 'clamp(4rem, 10vw, 6rem)',
        }}>
          <div className="container" style={{
            maxWidth: '600px',
            textAlign: 'center',
          }}>
            <div style={{
              fontSize: '4rem',
              marginBottom: '1.5rem',
            }}>
              🛒
            </div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '1rem',
            }}>
              Your cart is empty
            </h1>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              marginBottom: '2rem',
              lineHeight: 1.7,
            }}>
              Looks like you haven't added any chamoy treats yet!
            </p>
            <Link
              href="/"
              style={{
                display: 'inline-block',
                padding: '0.875rem 2rem',
                backgroundColor: 'var(--chamoy-red)',
                color: 'var(--white)',
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                fontWeight: 600,
                textDecoration: 'none',
                borderRadius: '8px',
                transition: 'background-color 0.2s',
              }}
            >
              Continue Shopping
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '60vh', backgroundColor: 'var(--white)' }}>
      {/* Page Header */}
      <section style={{
        paddingTop: 'clamp(2rem, 6vw, 3rem)',
        paddingBottom: 'clamp(1rem, 3vw, 2rem)',
      }}>
        <div className="container">
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '0.5rem',
          }}>
            Your Cart
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'var(--text-secondary)',
          }}>
            {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
          </p>
        </div>
      </section>

      {/* Cart Content */}
      <section style={{
        paddingBottom: 'clamp(3rem, 8vw, 5rem)',
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2rem',
          }}>
            {/* Cart Items */}
            <div style={{
              backgroundColor: 'var(--gray-50)',
              borderRadius: '12px',
              padding: 'clamp(1rem, 3vw, 1.5rem)',
              border: '1px solid var(--gray-200)',
            }}>
              {cart.items.map((item) => (
                <CartLineItemRow key={item.id} item={item} />
              ))}
            </div>

            {/* Order Summary */}
            <div style={{
              backgroundColor: 'var(--gray-50)',
              borderRadius: '12px',
              padding: 'clamp(1.5rem, 4vw, 2rem)',
              border: '1px solid var(--gray-200)',
              maxWidth: '400px',
            }}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '1.5rem',
              }}>
                Order Summary
              </h2>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                marginBottom: '1.5rem',
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9375rem',
                }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                    ${(subtotalCents / 100).toFixed(2)}
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9375rem',
                }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Shipping</span>
                  <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    $_
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9375rem',
                }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Tax</span>
                  <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    $_
                  </span>
                </div>
              </div>

              <div style={{
                borderTop: '1px solid var(--gray-300)',
                paddingTop: '1rem',
                marginBottom: '1.5rem',
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: 'var(--font-body)',
                }}>
                  <span style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                  }}>
                    Total
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--chamoy-red)',
                  }}>
                    $_
                  </span>
                </div>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  marginTop: '0.25rem',
                  fontStyle: 'italic',
                }}>
                  (Shipping & tax calculated at checkout)
                </p>
              </div>

              <Link
                href="/checkout"
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '1rem',
                  backgroundColor: 'var(--chamoy-red)',
                  color: 'var(--white)',
                  border: 'none',
                  borderRadius: '8px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  marginBottom: '1rem',
                  textAlign: 'center',
                  textDecoration: 'none',
                  transition: 'background-color 0.2s ease',
                }}
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9375rem',
                  color: 'var(--chamoy-red)',
                  textDecoration: 'none',
                  fontWeight: 500,
                }}
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
