import Link from 'next/link';

// Sample categories for display
const categories = [
  { name: 'Candy Mix', slug: 'chamoy-mixes', description: 'Homemade chamoy candies in 5 delicious flavors' },
  { name: 'Pik-A-Mela Chamoy', slug: 'chamoy', description: 'Our special homemade sweet and spicy chamoy' },
  { name: 'Antojitos', slug: 'antojitos', description: 'Churro puffs, carne seca & more savory treats' },
];

export default function HomePage() {
  return (
    <>
      {/* Dripping Chamoy Effect */}
      <div style={{ lineHeight: 0, marginTop: '-1px' }}>
        <svg
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          style={{ display: 'block', width: '100%', height: '60px' }}
        >
          {/* Main chamoy bar at top */}
          <rect x="0" y="0" width="1200" height="12" fill="var(--chamoy-red)" />
          {/* Individual drips hanging down */}
          <ellipse cx="35" cy="12" rx="18" ry="35" fill="var(--chamoy-red)" />
          <ellipse cx="100" cy="12" rx="22" ry="55" fill="var(--chamoy-red)" />
          <ellipse cx="165" cy="12" rx="16" ry="32" fill="var(--chamoy-red)" />
          <ellipse cx="240" cy="12" rx="24" ry="60" fill="var(--chamoy-red)" />
          <ellipse cx="308" cy="12" rx="14" ry="28" fill="var(--chamoy-red)" />
          <ellipse cx="382" cy="12" rx="20" ry="48" fill="var(--chamoy-red)" />
          <ellipse cx="447" cy="12" rx="15" ry="34" fill="var(--chamoy-red)" />
          <ellipse cx="520" cy="12" rx="24" ry="62" fill="var(--chamoy-red)" />
          <ellipse cx="588" cy="12" rx="14" ry="26" fill="var(--chamoy-red)" />
          <ellipse cx="662" cy="12" rx="20" ry="46" fill="var(--chamoy-red)" />
          <ellipse cx="728" cy="12" rx="15" ry="32" fill="var(--chamoy-red)" />
          <ellipse cx="800" cy="12" rx="22" ry="56" fill="var(--chamoy-red)" />
          <ellipse cx="868" cy="12" rx="14" ry="30" fill="var(--chamoy-red)" />
          <ellipse cx="942" cy="12" rx="20" ry="50" fill="var(--chamoy-red)" />
          <ellipse cx="1005" cy="12" rx="16" ry="38" fill="var(--chamoy-red)" />
          <ellipse cx="1080" cy="12" rx="24" ry="58" fill="var(--chamoy-red)" />
          <ellipse cx="1148" cy="12" rx="14" ry="28" fill="var(--chamoy-red)" />
        </svg>
      </div>

      {/* ===== HERO SECTION ===== */}
      <section style={{
        backgroundColor: 'var(--background)',
        paddingTop: 'clamp(2rem, 8vw, 5rem)',
        paddingBottom: 'clamp(4rem, 12vw, 8rem)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Piñata Confetti Burst */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          {/* Top left cluster */}
          <span style={{ position: 'absolute', top: '8%', left: '5%', fontSize: '1.5rem', opacity: 0.8, transform: 'rotate(-15deg)' }}>🍬</span>
          <span style={{ position: 'absolute', top: '15%', left: '12%', fontSize: '1rem', opacity: 0.7, transform: 'rotate(20deg)' }}>💛</span>
          <span style={{ position: 'absolute', top: '25%', left: '8%', fontSize: '1.25rem', opacity: 0.6, transform: 'rotate(-30deg)' }}>🍭</span>
          <span style={{ position: 'absolute', top: '5%', left: '18%', fontSize: '0.875rem', opacity: 0.5, transform: 'rotate(45deg)' }}>✨</span>
          
          {/* Top right cluster */}
          <span style={{ position: 'absolute', top: '10%', right: '8%', fontSize: '1.5rem', opacity: 0.8, transform: 'rotate(15deg)' }}>🍬</span>
          <span style={{ position: 'absolute', top: '18%', right: '15%', fontSize: '1rem', opacity: 0.7, transform: 'rotate(-25deg)' }}>💜</span>
          <span style={{ position: 'absolute', top: '28%', right: '6%', fontSize: '1.25rem', opacity: 0.6, transform: 'rotate(30deg)' }}>🍭</span>
          <span style={{ position: 'absolute', top: '8%', right: '20%', fontSize: '0.875rem', opacity: 0.5, transform: 'rotate(-40deg)' }}>✨</span>
          
          {/* Mid left */}
          <span style={{ position: 'absolute', top: '45%', left: '3%', fontSize: '1.25rem', opacity: 0.5, transform: 'rotate(10deg)' }}>🧡</span>
          <span style={{ position: 'absolute', top: '55%', left: '10%', fontSize: '1rem', opacity: 0.4, transform: 'rotate(-20deg)' }}>🍬</span>
          
          {/* Mid right */}
          <span style={{ position: 'absolute', top: '42%', right: '4%', fontSize: '1.25rem', opacity: 0.5, transform: 'rotate(-10deg)' }}>💚</span>
          <span style={{ position: 'absolute', top: '58%', right: '12%', fontSize: '1rem', opacity: 0.4, transform: 'rotate(25deg)' }}>🍬</span>
          
          {/* Bottom scattered */}
          <span style={{ position: 'absolute', bottom: '15%', left: '15%', fontSize: '1rem', opacity: 0.4, transform: 'rotate(35deg)' }}>💗</span>
          <span style={{ position: 'absolute', bottom: '20%', right: '18%', fontSize: '1rem', opacity: 0.4, transform: 'rotate(-35deg)' }}>💙</span>
          <span style={{ position: 'absolute', bottom: '10%', left: '25%', fontSize: '0.875rem', opacity: 0.3, transform: 'rotate(15deg)' }}>✨</span>
          <span style={{ position: 'absolute', bottom: '8%', right: '25%', fontSize: '0.875rem', opacity: 0.3, transform: 'rotate(-15deg)' }}>✨</span>
        </div>

        <div className="container" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
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
            [catchy tagline by ricky]
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

      {/* ===== OUR TREATS - CATEGORIES ===== */}
      <section id="products" className="section" style={{
        backgroundColor: 'var(--off-white)',
        padding: 'clamp(2rem, 6vw, 4rem) 0',
      }}>
        <div className="container">
          {/* Section Header */}
          <div className="category-header">
            <h2>Our Treats</h2>
            <p>Every piece made fresh with authentic chamoy</p>
            <div className="decorative-line" />
          </div>

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
                  backgroundColor: 'var(--background)',
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

      {/* ===== SIMPLE TRUST BANNER ===== */}
      <section style={{
        backgroundColor: 'var(--background)',
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
