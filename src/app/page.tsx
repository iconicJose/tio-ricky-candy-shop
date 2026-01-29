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
          viewBox="0 0 1200 110"
          preserveAspectRatio="none"
          style={{ display: 'block', width: '100%', height: '72px', overflow: 'visible' }}
        >
          {/* Single continuous drip silhouette (more "drippy" than separate ellipses) */}
          <path
            d="
              M0 0
              H1200
              V18
              C1180 18 1165 18 1155 26
              C1140 36 1148 64 1128 72
              C1105 82 1090 58 1085 42
              C1080 30 1070 20 1050 22
              C1025 24 1030 50 1015 60
              C995 74 970 58 970 38
              C970 24 960 18 940 18
              C920 18 920 30 910 40
              C900 52 906 78 880 84
              C850 90 844 56 850 40
              C856 26 842 18 820 18
              C792 18 804 30 792 44
              C780 60 786 96 752 98
              C716 100 722 58 732 44
              C742 30 730 18 708 18
              C680 18 686 30 676 42
              C664 56 668 86 642 88
              C612 90 612 58 620 44
              C630 26 616 18 592 18
              C566 18 572 28 560 44
              C546 64 552 96 520 96
              C488 96 490 64 502 44
              C512 26 494 18 470 18
              C444 18 450 30 436 46
              C420 64 428 92 396 92
              C366 92 366 66 376 46
              C388 24 370 18 350 18
              C326 18 330 28 318 40
              C304 54 306 80 284 80
              C260 80 258 58 264 42
              C272 26 262 18 240 18
              C212 18 218 34 206 48
              C192 66 194 92 160 92
              C126 92 130 62 140 48
              C152 30 140 18 118 18
              C88 18 94 34 84 46
              C72 62 76 86 48 86
              C18 86 20 44 28 34
              C36 22 26 18 0 18
              Z
            "
            fill="var(--chamoy-red)"
            style={{ filter: 'drop-shadow(0 0 14px rgba(255, 38, 90, 0.55))' }}
          />
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
