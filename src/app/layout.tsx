import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { CartProvider } from '@/components/CartProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const saved = localStorage.getItem('pik-a-mela-theme');
                const theme = saved === 'light' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', theme);
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
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
                    {[
                      { name: 'Candy Mix', href: '/chamoy-mixes' },
                      { name: 'Pik-A-Mela Chamoy', href: '/chamoy' },
                      { name: 'Antojitos', href: '/antojitos' },
                    ].map((item) => (
                      <li key={item.name} style={{ marginBottom: '0.5rem' }}>
                        <Link href={item.href} style={{
                          color: 'var(--gray-400)',
                          textDecoration: 'none',
                          fontSize: '0.875rem',
                          transition: 'color 0.2s',
                        }}>
                          {item.name}
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
                    email@email.com
                  </p>
                  <p style={{
                    fontSize: '0.875rem',
                    color: 'var(--gray-400)',
                    marginBottom: '0.5rem',
                  }}>
                    Chicago, Illinois
                  </p>
                  
                  {/* Social Links */}
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    {/* Instagram */}
                    <a 
                      href="https://www.instagram.com/pik_a_mela/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ 
                        color: 'var(--gray-400)', 
                        transition: 'color 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      aria-label="Instagram"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    
                    {/* TikTok */}
                    <a 
                      href="https://www.tiktok.com/@pikamela.chamoy" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ 
                        color: 'var(--gray-400)', 
                        transition: 'color 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      aria-label="TikTok"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                      </svg>
                    </a>
                  </div>
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
        </ThemeProvider>
      </body>
    </html>
  );
}
