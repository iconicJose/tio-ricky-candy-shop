import { CandyMixSelector } from '@/components/CandyMixSelector';

export default function ChamoyMixesPage() {
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
            Our Signature Products
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '1rem',
          }}>
            Chamoy Mixes
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 2vw, 1.125rem)',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            Our signature chamoy blends and homemade treats
          </p>
        </div>
      </section>

      {/* Candy Mix Section */}
      <section style={{
        paddingBottom: 'clamp(2rem, 4vw, 3rem)',
      }}>
        <div className="container">
          <div style={{ marginBottom: '2rem' }}>
            <CandyMixSelector showAddToCart={true} />
          </div>
        </div>
      </section>

      {/* Trays Section */}
      <section style={{
        paddingBottom: 'clamp(2rem, 4vw, 3rem)',
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}>
            {/* Candy Tray */}
            <div style={{
              backgroundColor: 'var(--gray-50)',
              borderRadius: '16px',
              padding: 'clamp(1.5rem, 4vw, 2rem)',
              border: '1px solid var(--gray-200)',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1rem',
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  margin: 0,
                }}>
                  Candy Tray
                </h3>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--chamoy-red)',
                }}>
                  $45
                </span>
              </div>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                margin: 0,
              }}>
                A delicious candy platter mixed with our special chamoy flavors with the option of 6 candies or 5 candies and one chamoy dip
              </p>
            </div>

            {/* Fruit Tray */}
            <div style={{
              backgroundColor: 'var(--gray-50)',
              borderRadius: '16px',
              padding: 'clamp(1.5rem, 4vw, 2rem)',
              border: '1px solid var(--gray-200)',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1rem',
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  margin: 0,
                }}>
                  Fruit Tray
                </h3>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--chamoy-red)',
                }}>
                  $50+
                </span>
              </div>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: '0.75rem',
              }}>
                Your favorite fruits dipped or drizzled with any of our homemade chamoy
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8125rem',
                color: 'var(--warm-orange)',
                fontStyle: 'italic',
                margin: 0,
              }}>
                Price may vary on season for fruits
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chamoy Products Section */}
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
            Chamoy Products
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}>
            {/* Chamoy Rim Dip */}
            <div style={{
              backgroundColor: 'var(--gray-50)',
              borderRadius: '16px',
              padding: 'clamp(1.5rem, 4vw, 2rem)',
              border: '1px solid var(--gray-200)',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '0.75rem',
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  margin: 0,
                }}>
                  Chamoy Rim Dip
                </h3>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8125rem',
                  color: 'var(--text-muted)',
                }}>
                  8oz
                </span>
              </div>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--chamoy-red)',
                marginBottom: '0.75rem',
              }}>
                $10
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                margin: 0,
              }}>
                A thick, sweet and spicy sauce. Perfect for adding a bold kick to any snacks, fruits and drinks.
              </p>
            </div>

            {/* Chili Powder */}
            <div style={{
              backgroundColor: 'var(--gray-50)',
              borderRadius: '16px',
              padding: 'clamp(1.5rem, 4vw, 2rem)',
              border: '1px solid var(--gray-200)',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '0.75rem',
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  margin: 0,
                }}>
                  Chili Powder
                </h3>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8125rem',
                  color: 'var(--text-muted)',
                }}>
                  8oz
                </span>
              </div>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--chamoy-red)',
                marginBottom: '0.75rem',
              }}>
                $8
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                margin: 0,
              }}>
                Our homemade spicy chili mix. Spice up your fruit or drinks, goes perfectly with our chamoy rim dip.
              </p>
            </div>

            {/* Chamoy Key Chain Bottle */}
            <div style={{
              backgroundColor: 'var(--gray-50)',
              borderRadius: '16px',
              padding: 'clamp(1.5rem, 4vw, 2rem)',
              border: '1px solid var(--gray-200)',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '0.75rem',
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  margin: 0,
                }}>
                  Chamoy Key Chain Bottle
                </h3>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8125rem',
                  color: 'var(--text-muted)',
                }}>
                  2oz
                </span>
              </div>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--chamoy-red)',
                marginBottom: '0.75rem',
              }}>
                $6
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: '0.5rem',
              }}>
                Travel size chamoy. Perfect for on the go, anywhere and anytime ($2 extra with mini Tajin/holder)
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'var(--warm-orange)',
                fontWeight: 500,
                fontStyle: 'italic',
                margin: 0,
              }}>
                Don't forget! If you can't dip it you can squirt it!
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
