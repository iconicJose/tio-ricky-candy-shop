import { db } from '@/lib/db';
import Link from 'next/link';

// Sample categories for display
const categories = [
  { name: 'Gummies', slug: 'gummies', description: 'Sweet & tangy chamoy-coated gummies' },
  { name: 'Carne Seca', slug: 'carne-seca', description: 'Traditional dried meat with chili' },
  { name: 'Chamoy Mixes', slug: 'chamoy-mixes', description: 'Our signature chamoy blends' },
];

export default async function HomePage() {
  // Fetch products from database
  let products: Array<{
    id: string;
    name: string;
    description: string | null;
    priceCents: number;
    imageUrl: string | null;
    stockQuantity: number;
  }> = [];
  
  try {
    products = await db.product.findMany({
      where: { active: true },
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        description: true,
        priceCents: true,
        imageUrl: true,
        stockQuantity: true,
      },
    });
  } catch {
    // Database not connected - show empty state
    products = [];
  }

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section style={{
        backgroundColor: 'var(--white)',
        paddingTop: 'clamp(4rem, 12vw, 8rem)',
        paddingBottom: 'clamp(4rem, 12vw, 8rem)',
      }}>
        <div className="container" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}>
          {/* Small decorative text */}
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8125rem',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'var(--warm-orange)',
            marginBottom: '1rem',
          }}>
            Hecho en Casa • Family Made
          </p>

          {/* Main headline - Display font */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            maxWidth: '800px',
          }}>
            Authentic Mexican <br />
            <span style={{ color: 'var(--chamoy-red)' }}>Chamoy Treats</span>
          </h1>

          {/* Subheadline - Body font */}
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'var(--text-secondary)',
            maxWidth: '560px',
            marginBottom: '2.5rem',
            lineHeight: 1.7,
          }}>
            [Client-provided tagline goes here]
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            <Link href="#products" className="btn btn-primary">
              Shop Now
            </Link>
            <Link href="/about" className="btn btn-secondary">
              Our Story
            </Link>
          </div>

          {/* Decorative line */}
          <div style={{
            width: '80px',
            height: '3px',
            background: 'linear-gradient(90deg, var(--chamoy-red), var(--warm-orange))',
            borderRadius: '2px',
            marginTop: '4rem',
            opacity: 0.6,
          }} />
        </div>
      </section>

      {/* ===== FEATURED CATEGORIES ===== */}
      <section style={{
        backgroundColor: 'var(--off-white)',
        padding: 'clamp(2rem, 6vw, 4rem) 0',
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}>
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                style={{
                  display: 'block',
                  padding: '2rem',
                  backgroundColor: 'var(--white)',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  border: '1px solid var(--border-color)',
                  transition: 'all 0.2s ease',
                }}
              >
                <h3 style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem',
                }}>
                  {category.name}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  margin: 0,
                }}>
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS SECTION ===== */}
      <section id="products" className="section" style={{
        backgroundColor: 'var(--white)',
      }}>
        <div className="container">
          {/* Section Header */}
          <div className="category-header">
            <h2>Our Treats</h2>
            <p>Every piece made fresh with authentic chamoy</p>
            <div className="decorative-line" />
          </div>

          {/* Product Grid */}
          {products.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '1.5rem',
            }}>
              {products.map((product) => (
                <article key={product.id} className="product-card">
                  {/* Product Image */}
                  <div className="product-card-image">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} />
                    ) : (
                      <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'var(--gray-100)',
                        fontSize: '4rem',
                      }}>
                        🍬
                      </div>
                    )}
                  </div>
                  
                  {/* Product Info */}
                  <div className="product-card-content">
                    <h3 className="product-card-title">{product.name}</h3>
                    
                    {product.description && (
                      <p style={{
                        fontSize: '0.875rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '0.75rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: 1.5,
                      }}>
                        {product.description}
                      </p>
                    )}
                    
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 'auto',
                    }}>
                     <p className="product-card-price">
                        ${(product.priceCents / 100).toFixed(2)}
                      </p>
                      
                      <span style={{
                        fontSize: '0.75rem',
                        color: product.stockQuantity > 10 ? 'var(--accent-green)' : 'var(--warm-orange)',
                        fontWeight: 500,
                      }}>
                        {product.stockQuantity > 10 ? 'In Stock' : `Only ${product.stockQuantity} left`}
                      </span>
                    </div>
                    
                    <button 
                      className="btn btn-primary"
                      style={{
                        width: '100%',
                        marginTop: '1rem',
                        padding: '0.75rem',
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              backgroundColor: 'var(--gray-50)',
              borderRadius: '12px',
            }}>
              <p style={{
                fontSize: '1.25rem',
                color: 'var(--text-secondary)',
                marginBottom: '1rem',
              }}>
                Products coming soon!
              </p>
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--text-muted)',
              }}>
                Connect to the database and run the seed script to see products.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ===== FAMILY STORY SECTION ===== */}
      <section style={{
        backgroundColor: 'var(--off-white)',
        padding: 'clamp(4rem, 10vw, 6rem) 0',
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '4rem',
            alignItems: 'center',
          }}>
            {/* Image placeholder */}
            <div style={{
              aspectRatio: '4/3',
              backgroundColor: 'var(--gray-200)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '4rem',
            }}>
              👨‍👩‍👧‍👦
            </div>

            {/* Story Content */}
            <div>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--chamoy-red)',
                marginBottom: '1rem',
              }}>
                Our Roots
              </p>

              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
                fontWeight: 600,
                color: 'var(--text-primary)',
                lineHeight: 1.2,
                marginBottom: '1.5rem',
              }}>
                Three Generations of Sabor
              </h2>

              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                marginBottom: '1rem',
              }}>
                [Client-provided story explanation goes here]
              </p>

              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                marginBottom: '2rem',
              }}>
                [A second paragraph of client-provided explanation may go here if needed]
              </p>

              <Link href="/about" className="btn btn-secondary">
                Read Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SIMPLE TRUST BANNER ===== */}
      <section style={{
        backgroundColor: 'var(--white)',
        padding: '3rem 0',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(2rem, 6vw, 4rem)',
            flexWrap: 'wrap',
            textAlign: 'center',
          }}>
            {[
              { icon: '🌶️', text: 'Authentic Recipes' },
              { icon: '👨‍👩‍👧', text: 'Family Owned' },
              { icon: '📦', text: 'Fast Shipping' },
              { icon: '💝', text: 'Made with Love' },
            ].map((item) => (
              <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
