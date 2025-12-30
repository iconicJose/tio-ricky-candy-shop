import { CandyMixSelector } from '@/components/CandyMixSelector';

export default function GummiesPage() {
  const gummyOptions = [
    'Peach Rings',
    'Gushers',
    'Mango Slices',
    'Gummy Bears',
    'Gummy Worms',
    'Gummy Jarritos',
    'Lil Manguitos',
    'Watermelon Rings',
    'Skwinkles Salsaghetti',
    'Skwinkles Rellenos',
    'Sour Patch Kid',
    'Watermelons',
    'Hard or Gummy Skittles',
  ];

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--white)' }}>
      {/* Page Header */}
      <section style={{
        paddingTop: 'clamp(3rem, 8vw, 5rem)',
        paddingBottom: 'clamp(2rem, 4vw, 3rem)',
        textAlign: 'center',
      }}>
        <div className="container">
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8125rem',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'var(--warm-orange)',
            marginBottom: '1rem',
          }}>
            Candy Selection
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '1rem',
          }}>
            Gummies
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 2vw, 1.125rem)',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            Sweet & tangy chamoy-coated gummy candy options. These are selectable candy types for our candy mix offerings.
          </p>
        </div>
      </section>

      {/* Candy Mix Selector */}
      <section style={{
        paddingBottom: 'clamp(2rem, 4vw, 3rem)',
      }}>
        <div className="container">
          <CandyMixSelector showAddToCart={true} />
        </div>
      </section>

      {/* Gummy Options Grid */}
      <section style={{
        paddingBottom: 'clamp(3rem, 8vw, 5rem)',
      }}>
        <div className="container">
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '1.5rem',
            textAlign: 'center',
          }}>
            Available Gummy Types
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '3rem',
          }}>
            {gummyOptions.map((gummy) => (
              <div
                key={gummy}
                style={{
                  backgroundColor: 'var(--gray-50)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  textAlign: 'center',
                  border: '1px solid var(--gray-200)',
                  transition: 'all 0.2s ease',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                }}>
                  {gummy}
                </span>
              </div>
            ))}
          </div>

          {/* Note */}
          <div style={{
            backgroundColor: 'var(--cream)',
            borderRadius: '12px',
            padding: '2rem',
            textAlign: 'center',
            border: '1px solid var(--gray-200)',
          }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              fontStyle: 'italic',
              margin: 0,
            }}>
              Don't see your favorite candy? Just ask and we'll try our best to satisfy that craving.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
