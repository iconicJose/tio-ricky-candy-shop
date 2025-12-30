export default function CarneSecaPage() {
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
            Traditional Favorite
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '1rem',
          }}>
            Carne Seca
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 2vw, 1.125rem)',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            Traditional dried meat with chili — a beloved classic snack
          </p>
        </div>
      </section>

      {/* Product Display */}
      <section style={{
        paddingBottom: 'clamp(3rem, 8vw, 5rem)',
      }}>
        <div className="container">
          <div style={{
            backgroundColor: 'var(--gray-50)',
            borderRadius: '16px',
            padding: 'clamp(2rem, 6vw, 4rem)',
            border: '1px solid var(--gray-200)',
            textAlign: 'center',
            maxWidth: '700px',
            margin: '0 auto',
          }}>
            {/* Decorative element */}
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: 'var(--chamoy-red)',
              borderRadius: '50%',
              margin: '0 auto 2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{
                fontSize: '2rem',
              }}>
                🥩
              </span>
            </div>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '1.5rem',
            }}>
              Carne Seca
            </h2>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.0625rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              marginBottom: '1.5rem',
              maxWidth: '500px',
              margin: '0 auto 1.5rem',
            }}>
              Our carne seca is a traditional dried beef snack seasoned with authentic Mexican spices. 
              Savory, slightly spicy, and perfectly chewy — a true taste of tradition.
            </p>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9375rem',
              color: 'var(--text-muted)',
              lineHeight: 1.7,
              fontStyle: 'italic',
            }}>
              Made with care using time-honored family recipes
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
