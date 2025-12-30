'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const paymentIntentId = searchParams.get('payment_intent');
  const [orderNumber, setOrderNumber] = useState<string>('');

  useEffect(() => {
    // Generate a simple order number from payment intent or timestamp
    if (paymentIntentId) {
      setOrderNumber(paymentIntentId.slice(-8).toUpperCase());
    } else {
      setOrderNumber(Date.now().toString(36).toUpperCase());
    }
  }, [paymentIntentId]);

  return (
    <main style={{ 
      minHeight: '100vh', 
      backgroundColor: 'var(--off-white)', 
      padding: '4rem 0',
      display: 'flex',
      alignItems: 'center',
    }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        <div style={{
          backgroundColor: 'var(--white)',
          borderRadius: '20px',
          padding: 'clamp(2rem, 6vw, 3rem)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          textAlign: 'center',
        }}>
          {/* Success Icon */}
          <div style={{
            width: '80px',
            height: '80px',
            backgroundColor: '#22c55e',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
          }}>
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="white" 
              strokeWidth="3"
              style={{ width: '40px', height: '40px' }}
            >
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '0.75rem',
          }}>
            Order Confirmed!
          </h1>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.125rem',
            color: 'var(--text-secondary)',
            marginBottom: '2rem',
          }}>
            Thank you for your order! We're preparing your delicious chamoy treats.
          </p>

          {/* Order Number */}
          <div style={{
            backgroundColor: 'var(--gray-50)',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '2rem',
          }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              color: 'var(--text-muted)',
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              Order Number
            </p>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--chamoy-red)',
              letterSpacing: '0.1em',
            }}>
              #{orderNumber}
            </p>
          </div>

          {/* What's Next */}
          <div style={{
            textAlign: 'left',
            backgroundColor: 'var(--gray-50)',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '2rem',
          }}>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '1rem',
            }}>
              What's Next?
            </h3>
            <ul style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9375rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              paddingLeft: '1.25rem',
              margin: 0,
            }}>
              <li>You'll receive a confirmation email shortly</li>
              <li>We'll notify you when your order ships</li>
              <li>Questions? Email us at rick@email.com</li>
            </ul>
          </div>

          {/* Continue Shopping Button */}
          <Link 
            href="/"
            style={{
              display: 'inline-block',
              padding: '1rem 2rem',
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              fontWeight: 700,
              color: 'var(--white)',
              backgroundColor: 'var(--chamoy-red)',
              borderRadius: '10px',
              textDecoration: 'none',
              transition: 'background-color 0.2s ease',
            }}
          >
            Continue Shopping
          </Link>

          {/* Fun Message */}
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'var(--warm-orange)',
            marginTop: '2rem',
            fontStyle: 'italic',
          }}>
            Get ready for some delicious chamoy! 🌶️❤️
          </p>
        </div>
      </div>
    </main>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <main style={{ 
        minHeight: '100vh', 
        backgroundColor: 'var(--off-white)', 
        padding: '4rem 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <p>Loading...</p>
      </main>
    }>
      <OrderConfirmationContent />
    </Suspense>
  );
}
