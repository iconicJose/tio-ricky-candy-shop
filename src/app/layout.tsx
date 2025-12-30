import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { CartProvider } from '@/components/CartProvider';
import { Header } from '@/components/Header';

export const metadata: Metadata = {
  title: 'Pik-A-Mela | Authentic Mexican Chamoy Treats',
  description: 'Family-made chamoy candies, gummies, and Mexican treats. Handcrafted with love using traditional recipes.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {/* Header */}
          <Header />

          {/* Main Content */}
          <main>
            {children}
          </main>

          {/* Footer */}
          <footer style={{
            backgroundColor: 'var(--gray-900)',
            color: 'var(--white)',
            padding: '4rem 0 2rem',
            marginTop: '4rem',
          }}>
            <div className="container">
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '3rem',
                marginBottom: '3rem',
              }}>
                {/* Brand Column */}
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    marginBottom: '1rem',
                    color: 'var(--white)',
                  }}>
                    Pik-A-Mela
                  </h3>
                  <p style={{
                    fontSize: '0.875rem',
                    color: 'var(--gray-400)',
                    lineHeight: 1.7,
                  }}>
                    Family-made chamoy candies and traditional recipes.
                  </p>
                </div>

                {/* Quick Links */}
                <div>
                  <h4 style={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '1rem',
                    color: 'var(--gray-300)',
                  }}>
                    Shop
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {['Gummies', 'Carne Seca', 'Chamoy Mixes', 'Gift Boxes'].map((item) => (
                      <li key={item} style={{ marginBottom: '0.5rem' }}>
                        <Link href="/" style={{
                          color: 'var(--gray-400)',
                          textDecoration: 'none',
                          fontSize: '0.875rem',
                          transition: 'color 0.2s',
                        }}>
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact */}
                <div>
                  <h4 style={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '1rem',
                    color: 'var(--gray-300)',
                  }}>
                    Contact
                  </h4>
                  <p style={{
                    fontSize: '0.875rem',
                    color: 'var(--gray-400)',
                    marginBottom: '0.5rem',
                  }}>
                    rick@email.com
                  </p>
                  <p style={{
                    fontSize: '0.875rem',
                    color: 'var(--gray-400)',
                  }}>
                    Chicago, Illinois
                  </p>
                </div>
              </div>

              {/* Bottom Bar */}
              <div style={{
                borderTop: '1px solid var(--gray-800)',
                paddingTop: '2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
              }}>
                <p style={{
                  fontSize: '0.8125rem',
                  color: 'var(--gray-500)',
                  margin: 0,
                }}>
                  © 2024 Pik-A-Mela. Hecho con ❤️ en Chicago.
                </p>
                <Link href="/admin" style={{
                  fontSize: '0.8125rem',
                  color: 'var(--gray-500)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}>
                  Admin Login
                </Link>
              </div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
