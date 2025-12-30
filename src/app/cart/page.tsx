'use client';

import Link from 'next/link';
import { useCart, CartLineItem } from '@/components/CartProvider';

function CartLineItemRow({ item }: { item: CartLineItem }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr auto auto',
      gap: '1.5rem',
      alignItems: 'center',
      padding: '1.5rem 0',
      borderBottom: '1px solid var(--gray-200)',
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
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.875rem',
          color: 'var(--text-secondary)',
          margin: 0,
        }}>
          {item.flavor} • {item.size}
        </p>
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

              <button
                disabled
                style={{
                  width: '100%',
                  padding: '1rem',
                  backgroundColor: 'var(--gray-300)',
                  color: 'var(--gray-500)',
                  border: 'none',
                  borderRadius: '8px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'not-allowed',
                  marginBottom: '1rem',
                }}
              >
                Checkout (Coming Soon)
              </button>

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
