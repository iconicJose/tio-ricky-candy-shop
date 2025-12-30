'use client';

import Link from 'next/link';
import { useCart } from './CartProvider';

export function CartButton() {
  const { totalQuantity, isAnimating } = useCart();

  return (
    <Link
      href="/cart"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        backgroundColor: 'transparent',
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
        cursor: 'pointer',
        fontFamily: 'var(--font-body)',
        fontSize: '0.875rem',
        fontWeight: 500,
        color: 'var(--text-primary)',
        transition: 'all 0.2s',
        textDecoration: 'none',
        position: 'relative',
        transform: isAnimating ? 'scale(1.1)' : 'scale(1)',
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        style={{
          transition: 'transform 0.2s ease',
          transform: isAnimating ? 'scale(1.15)' : 'scale(1)',
        }}
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
      Cart
      {totalQuantity > 0 && (
        <span
          style={{
            position: 'absolute',
            top: '-6px',
            right: '-6px',
            backgroundColor: 'var(--chamoy-red)',
            color: 'white',
            fontSize: '0.6875rem',
            fontWeight: 700,
            minWidth: '18px',
            height: '18px',
            borderRadius: '9px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 4px',
            lineHeight: 1,
            animation: isAnimating ? 'cartBadgePop 0.3s ease' : 'none',
          }}
        >
          {totalQuantity > 99 ? '99+' : totalQuantity}
        </span>
      )}
      <style jsx>{`
        @keyframes cartBadgePop {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.3);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </Link>
  );
}
