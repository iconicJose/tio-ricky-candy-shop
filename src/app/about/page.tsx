export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section style={{
        backgroundColor: 'var(--white)',
        paddingTop: 'clamp(4rem, 10vw, 6rem)',
        paddingBottom: 'clamp(3rem, 8vw, 5rem)',
      }}>
        <div className="container" style={{
          maxWidth: '800px',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8125rem',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'var(--warm-orange)',
            marginBottom: '1rem',
          }}>
            Nuestra Historia
          </p>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 6vw, 3rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            lineHeight: 1.2,
            marginBottom: '1.5rem',
          }}>
            From Abuela's Kitchen <br />
            to Your Door
          </h1>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.125rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
          }}>
            [Client-provided subtitle goes here]
          </p>
        </div>
      </section>

      {/* Story Content */}
      <section style={{
        backgroundColor: 'var(--off-white)',
        padding: 'clamp(3rem, 8vw, 5rem) 0',
      }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <div style={{
            aspectRatio: '16/9',
            backgroundColor: 'var(--gray-200)',
            borderRadius: '12px',
            marginBottom: '3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '4rem',
          }}>
            👨‍👩‍👧‍👦🍬
          </div>

          <article style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.0625rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.9,
          }}>
            <p style={{ marginBottom: '1.5rem' }}>
              [Client-provided story explanation goes here]
            </p>

            <p style={{ marginBottom: '1.5rem' }}>
              [A second paragraph of client-provided explanation may go here if needed]
            </p>
          </article>
        </div>
      </section>

      {/* Values */}
      <section style={{
        backgroundColor: 'var(--white)',
        padding: 'clamp(3rem, 8vw, 5rem) 0',
      }}>
        <div className="container">
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: 600,
            textAlign: 'center',
            color: 'var(--text-primary)',
            marginBottom: '3rem',
          }}>
            What We Stand For
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
          }}>
            {[
              {
                title: '[Value 1 Title]',
                description: '[Client-provided value description]',
              },
              {
                title: '[Value 2 Title]',
                description: '[Client-provided value description]',
              },
              {
                title: '[Value 3 Title]',
                description: '[Client-provided value description]',
              },
              {
                title: '[Value 4 Title]',
                description: '[Client-provided value description]',
              },
            ].map((value) => (
              <div key={value.title} style={{
                padding: '2rem',
                backgroundColor: 'var(--off-white)',
                borderRadius: '12px',
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem',
                }}>
                  {value.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  margin: 0,
                  lineHeight: 1.6,
                }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
