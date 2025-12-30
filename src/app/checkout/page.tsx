'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { getStripe } from '@/lib/stripe-client';
import { useCart } from '@/components/CartProvider';

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
}

interface ShippingAddress {
  line1: string;
  line2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

// Checkout Form Component (inside Elements provider)
function CheckoutForm({ 
  customerInfo, 
  shippingAddress,
  orderTotals,
}: { 
  customerInfo: CustomerInfo;
  shippingAddress: ShippingAddress;
  orderTotals: { subtotal: number; shipping: number; tax: number; total: number };
}) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-confirmation`,
      },
      redirect: 'if_required',
    });

    if (error) {
      setErrorMessage(error.message || 'Payment failed. Please try again.');
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      // Payment successful
      clearCart();
      router.push(`/order-confirmation?payment_intent=${paymentIntent.id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{
        backgroundColor: 'var(--gray-50)',
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '1.5rem',
      }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.125rem',
          fontWeight: 700,
          marginBottom: '1rem',
          color: 'var(--text-primary)',
        }}>
          Payment Details
        </h3>
        <PaymentElement />
      </div>

      {errorMessage && (
        <div style={{
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '1rem',
          color: '#dc2626',
          fontSize: '0.875rem',
        }}>
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        style={{
          width: '100%',
          padding: '1rem',
          fontFamily: 'var(--font-body)',
          fontSize: '1.125rem',
          fontWeight: 700,
          color: 'var(--white)',
          backgroundColor: isProcessing ? 'var(--gray-400)' : 'var(--chamoy-red)',
          border: 'none',
          borderRadius: '10px',
          cursor: isProcessing ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.2s ease',
        }}
      >
        {isProcessing ? 'Processing...' : `Pay $${orderTotals.total.toFixed(2)}`}
      </button>
    </form>
  );
}

// Main Checkout Page
export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal } = useCart();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [orderTotals, setOrderTotals] = useState({ subtotal: 0, shipping: 0, tax: 0, total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Customer Info State
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: '',
  });

  // Shipping Address State
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    line1: '',
    line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'US',
  });

  // Form validation
  const [formComplete, setFormComplete] = useState(false);

  useEffect(() => {
    const isComplete = 
      customerInfo.name.trim() !== '' &&
      customerInfo.email.trim() !== '' &&
      shippingAddress.line1.trim() !== '' &&
      shippingAddress.city.trim() !== '' &&
      shippingAddress.state.trim() !== '' &&
      shippingAddress.postal_code.trim() !== '';
    setFormComplete(isComplete);
  }, [customerInfo, shippingAddress]);

  // Create Payment Intent when form is complete
  useEffect(() => {
    if (!formComplete || items.length === 0) {
      setIsLoading(false);
      return;
    }

    const createPaymentIntent = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: items.map(item => ({
              id: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              size: item.size,
              flavor: item.flavor,
              customizations: item.customizations,
            })),
            customerInfo,
            shippingAddress,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to create payment');
        }

        setClientSecret(data.clientSecret);
        setOrderTotals({
          subtotal: data.subtotal,
          shipping: data.shipping,
          tax: data.tax,
          total: data.total,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    createPaymentIntent();
  }, [formComplete, items, customerInfo, shippingAddress]);

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && !isLoading) {
      router.push('/cart');
    }
  }, [items, isLoading, router]);

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    fontFamily: 'var(--font-body)',
    fontSize: '1rem',
    border: '2px solid var(--gray-300)',
    borderRadius: '8px',
    marginBottom: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  };

  const labelStyle = {
    display: 'block',
    fontFamily: 'var(--font-body)',
    fontSize: '0.875rem',
    fontWeight: 600,
    color: 'var(--text-primary)',
    marginBottom: '0.5rem',
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--off-white)', padding: '2rem 0' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 700,
          color: 'var(--chamoy-red)',
          marginBottom: '2rem',
          textAlign: 'center',
        }}>
          Checkout
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
        }}>
          {/* Left Column - Forms */}
          <div>
            {/* Order Summary */}
            <div style={{
              backgroundColor: 'var(--white)',
              borderRadius: '16px',
              padding: '1.5rem',
              marginBottom: '1.5rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 700,
                marginBottom: '1rem',
                color: 'var(--text-primary)',
              }}>
                Order Summary
              </h2>
              
              {items.map((item) => (
                <div key={item.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  paddingBottom: '0.75rem',
                  marginBottom: '0.75rem',
                  borderBottom: '1px solid var(--gray-200)',
                }}>
                  <div style={{ flex: 1 }}>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '0.25rem',
                    }}>
                      {item.name}
                    </p>
                    {(item.size || item.flavor) && (
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.8125rem',
                        color: 'var(--text-muted)',
                      }}>
                        {[item.size, item.flavor].filter(Boolean).join(' • ')}
                      </p>
                    )}
                    {item.customizations && (
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)',
                        marginTop: '0.25rem',
                      }}>
                        {item.customizations}
                      </p>
                    )}
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8125rem',
                      color: 'var(--text-muted)',
                      marginTop: '0.25rem',
                    }}>
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    color: 'var(--chamoy-red)',
                  }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}

              {/* Totals */}
              <div style={{ marginTop: '1rem' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem',
                }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                  <span style={{ fontWeight: 600 }}>${getTotal().toFixed(2)}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem',
                }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Shipping</span>
                  <span style={{ fontWeight: 600 }}>Free</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem',
                }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Tax</span>
                  <span style={{ fontWeight: 600 }}>$0.00</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '0.75rem',
                  borderTop: '2px solid var(--gray-200)',
                  marginTop: '0.75rem',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '1.125rem',
                  }}>Total</span>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '1.25rem',
                    color: 'var(--chamoy-red)',
                  }}>${getTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div style={{
              backgroundColor: 'var(--white)',
              borderRadius: '16px',
              padding: '1.5rem',
              marginBottom: '1.5rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 700,
                marginBottom: '1rem',
                color: 'var(--text-primary)',
              }}>
                Contact Information
              </h2>

              <label style={labelStyle}>
                Full Name *
                <input
                  type="text"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  style={inputStyle}
                  placeholder="John Doe"
                  required
                />
              </label>

              <label style={labelStyle}>
                Email Address *
                <input
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                  style={inputStyle}
                  placeholder="john@example.com"
                  required
                />
              </label>

              <label style={labelStyle}>
                Phone Number (optional)
                <input
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                  style={inputStyle}
                  placeholder="(555) 123-4567"
                />
              </label>
            </div>

            {/* Shipping Address */}
            <div style={{
              backgroundColor: 'var(--white)',
              borderRadius: '16px',
              padding: '1.5rem',
              marginBottom: '1.5rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 700,
                marginBottom: '1rem',
                color: 'var(--text-primary)',
              }}>
                Shipping Address
              </h2>

              <label style={labelStyle}>
                Street Address *
                <input
                  type="text"
                  value={shippingAddress.line1}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, line1: e.target.value })}
                  style={inputStyle}
                  placeholder="123 Main Street"
                  required
                />
              </label>

              <label style={labelStyle}>
                Apartment, Suite, etc. (optional)
                <input
                  type="text"
                  value={shippingAddress.line2}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, line2: e.target.value })}
                  style={inputStyle}
                  placeholder="Apt 4B"
                />
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <label style={labelStyle}>
                  City *
                  <input
                    type="text"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    style={inputStyle}
                    placeholder="Chicago"
                    required
                  />
                </label>

                <label style={labelStyle}>
                  State *
                  <input
                    type="text"
                    value={shippingAddress.state}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                    style={inputStyle}
                    placeholder="IL"
                    required
                  />
                </label>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <label style={labelStyle}>
                  ZIP Code *
                  <input
                    type="text"
                    value={shippingAddress.postal_code}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, postal_code: e.target.value })}
                    style={inputStyle}
                    placeholder="60601"
                    required
                  />
                </label>

                <label style={labelStyle}>
                  Country
                  <select
                    value={shippingAddress.country}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                    style={inputStyle}
                  >
                    <option value="US">United States</option>
                  </select>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column - Payment */}
          <div>
            <div style={{
              backgroundColor: 'var(--white)',
              borderRadius: '16px',
              padding: '1.5rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              position: 'sticky',
              top: '2rem',
            }}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 700,
                marginBottom: '1rem',
                color: 'var(--text-primary)',
              }}>
                Payment
              </h2>

              {!formComplete ? (
                <div style={{
                  backgroundColor: 'var(--gray-100)',
                  borderRadius: '12px',
                  padding: '2rem',
                  textAlign: 'center',
                }}>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    color: 'var(--text-muted)',
                    marginBottom: '1rem',
                  }}>
                    Please fill in your contact and shipping information to proceed with payment.
                  </p>
                  <div style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-muted)',
                  }}>
                    Required fields: Name, Email, Address, City, State, ZIP
                  </div>
                </div>
              ) : isLoading ? (
                <div style={{
                  backgroundColor: 'var(--gray-100)',
                  borderRadius: '12px',
                  padding: '2rem',
                  textAlign: 'center',
                }}>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    color: 'var(--text-secondary)',
                  }}>
                    Loading payment form...
                  </p>
                </div>
              ) : error ? (
                <div style={{
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  textAlign: 'center',
                }}>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    color: '#dc2626',
                    marginBottom: '1rem',
                  }}>
                    {error}
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    style={{
                      padding: '0.5rem 1rem',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      color: 'var(--white)',
                      backgroundColor: 'var(--chamoy-red)',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                    }}
                  >
                    Try Again
                  </button>
                </div>
              ) : clientSecret ? (
                <Elements
                  stripe={getStripe()}
                  options={{
                    clientSecret,
                    appearance: {
                      theme: 'stripe',
                      variables: {
                        colorPrimary: '#dc2626',
                        fontFamily: 'system-ui, sans-serif',
                      },
                    },
                  }}
                >
                  <CheckoutForm
                    customerInfo={customerInfo}
                    shippingAddress={shippingAddress}
                    orderTotals={orderTotals}
                  />
                </Elements>
              ) : null}

              {/* Security Note */}
              <div style={{
                marginTop: '1.5rem',
                padding: '1rem',
                backgroundColor: 'var(--gray-50)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}>
                <span style={{ fontSize: '1.5rem' }}>🔒</span>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8125rem',
                  color: 'var(--text-muted)',
                  margin: 0,
                }}>
                  Your payment is secured by Stripe. We never store your card details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
