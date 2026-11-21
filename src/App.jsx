import React, { useState, useMemo } from 'react';
import {
  ShoppingBag,
  Search,
  X,
  Plus,
  Minus,
  Sun,
  Moon,
  Ruler,
  ArrowRight,
  Check,
  SlidersHorizontal,
  Wrench,
  Package,
  ShieldCheck,
} from 'lucide-react';
import { CATEGORIES, PRODUCTS, MATERIALS_DATA } from './data/products.js';
import { ProductVisual } from './components/ProductVisual.jsx';

const FREE_SHIPPING_THRESHOLD = 180;

export default function App() {
  // Interactive Hero Stage State
  const [heroNightMode, setHeroNightMode] = useState(false);
  const [heroBlueprint, setHeroBlueprint] = useState(true);

  // Catalog Filter & Sort State
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // Shopping Bag State (Pre-populated with 1 item so the bag feels alive)
  const [bagItems, setBagItems] = useState([
    { productId: 'kw-02', quantity: 1 },
  ]);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [recentlyAddedId, setRecentlyAddedId] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Quick-View Technical Specification Modal State
  const [inspectedProduct, setInspectedProduct] = useState(null);

  // Newsletter Dispatch State
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const flagshipProduct = PRODUCTS[0];

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const list = PRODUCTS.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      const matchesQuery =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.material.toLowerCase().includes(query) ||
        item.catalogNo.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.price - a.price);
    }
    if (sortBy === 'weight-desc') {
      return [...list].sort((a, b) => b.weightGrams - a.weightGrams);
    }
    return list;
  }, [activeCategory, searchQuery, sortBy]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { all: PRODUCTS.length };
    for (const prod of PRODUCTS) {
      counts[prod.category] = (counts[prod.category] || 0) + 1;
    }
    return counts;
  }, []);

  // Bag calculations
  const detailedBag = useMemo(() => {
    return bagItems
      .map((entry) => {
        const product = PRODUCTS.find((p) => p.id === entry.productId);
        return product ? { ...product, quantity: entry.quantity } : null;
      })
      .filter(Boolean);
  }, [bagItems]);

  const totalBagCount = useMemo(
    () => detailedBag.reduce((sum, item) => sum + item.quantity, 0),
    [detailedBag]
  );

  const subtotal = useMemo(
    () =>
      detailedBag.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [detailedBag]
  );

  const shippingCost =
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 14;
  const orderTotal = subtotal + shippingCost;
  const freeShippingProgress = Math.min(
    100,
    Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );

  function handleAddToBag(productId) {
    setOrderPlaced(false);
    setBagItems((prev) => {
      const exists = prev.find((item) => item.productId === productId);
      if (exists) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });

    setRecentlyAddedId(productId);
    setTimeout(() => {
      setRecentlyAddedId((current) =>
        current === productId ? null : current
      );
    }, 1200);
  }

  function handleUpdateQuantity(productId, delta) {
    setBagItems((prev) =>
      prev
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function handleRemoveFromBag(productId) {
    setBagItems((prev) => prev.filter((item) => item.productId !== productId));
  }

  function handleCheckout() {
    setOrderPlaced(true);
    setBagItems([]);
  }

  function handleNewsletterSubmit(e) {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
    }
  }

  return (
    <div>
      {/* Top Workshop Dispatch Bar */}
      <div className="top-dispatch-bar">
        <div className="container top-dispatch-inner">
          <span className="mono">
            BATCH 09 PRODUCTION · KYOTO &amp; PORTLAND WORKSHOPS
          </span>
          <span className="tabular">
            Complimentary courier dispatch on orders over ${FREE_SHIPPING_THRESHOLD}
          </span>
        </div>
      </div>

      {/* Main Navigation Header (64px tall, quiet chrome) */}
      <header className="site-header">
        <div className="container header-inner">
          <a href="#" className="brand-link">
            <span className="brand-mark">US</span>
            <span className="brand-name">Uperskill Shop</span>
            <span className="brand-origin">EST. 2019 · 35.0116° N</span>
          </a>

          <nav className="nav-links" aria-label="Main navigation">
            <a href="#catalog" className="nav-link">
              Objects
            </a>
            <a href="#materials" className="nav-link">
              Materials
            </a>
            <a href="#workshop" className="nav-link">
              Workshop
            </a>
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className="icon-btn"
              onClick={() => {
                const el = document.getElementById('catalog-search');
                if (el) el.focus();
              }}
            >
              <Search size={16} strokeWidth={1.5} />
              <span>Find</span>
            </button>

            <button
              type="button"
              className="bag-btn"
              onClick={() => setIsBagOpen(true)}
              aria-label="Open shopping bag"
            >
              <ShoppingBag size={16} strokeWidth={1.5} />
              <span>Bag</span>
              <span className="bag-count tabular">{totalBagCount}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Asymmetric Split Hero */}
      <section className="hero-section">
        <div className="container hero-grid">
          {/* Left Column: Calm Space & Specific Copy */}
          <div className="hero-content">
            <div className="batch-tag">
              <span className="status-dot" />
              <span>Autumn / Winter Batch 09 · Ready to ship</span>
            </div>

            <h1 className="hero-headline">
              Desk instruments milled from solid brass and walnut
            </h1>

            <p className="hero-subhead">
              Small-batch lighting, drafting scales, and weighted stationery
              machined without synthetic coatings so every surface records the
              work of your hands.
            </p>

            <div className="hero-actions">
              <a href="#catalog" className="btn-primary">
                <span>Browse batch 09</span>
                <ArrowRight size={16} strokeWidth={1.5} />
              </a>
              <a href="#materials" className="btn-secondary">
                <span>Material specifications</span>
              </a>
            </div>

            <div className="hero-specs-row">
              <div className="spec-item">
                <span className="spec-label">Machining tolerance</span>
                <span className="spec-value">±0.02 mm</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Primary alloy</span>
                <span className="spec-value">C36000 Brass</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Dispatch lead time</span>
                <span className="spec-value">2 business days</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Flagship Object Stage */}
          <div className={`hero-stage ${heroNightMode ? 'night-mode' : ''}`}>
            <div className="stage-top-bar">
              <div className="stage-catalog-id">
                <span>CAT. NO. {flagshipProduct.catalogNo}</span>
                <span>·</span>
                <span className="tabular">{flagshipProduct.weightGrams}g</span>
              </div>

              <div className="stage-controls">
                <button
                  type="button"
                  className={`stage-toggle-btn ${!heroNightMode ? 'active' : ''}`}
                  onClick={() => setHeroNightMode(false)}
                >
                  <Sun size={14} strokeWidth={1.5} />
                  <span>Daylight</span>
                </button>
                <button
                  type="button"
                  className={`stage-toggle-btn ${heroNightMode ? 'active' : ''}`}
                  onClick={() => setHeroNightMode(true)}
                >
                  <Moon size={14} strokeWidth={1.5} />
                  <span>2700K beam</span>
                </button>
                <button
                  type="button"
                  className={`stage-toggle-btn ${heroBlueprint ? 'active' : ''}`}
                  onClick={() => setHeroBlueprint((v) => !v)}
                >
                  <Ruler size={14} strokeWidth={1.5} />
                  <span>Tolerances</span>
                </button>
              </div>
            </div>

            <div className="stage-canvas">
              <ProductVisual
                type="lamp"
                nightMode={heroNightMode}
                showBlueprint={heroBlueprint}
              />
            </div>

            <div className="stage-bottom-bar">
              <div className="stage-product-meta">
                <span className="stage-product-title">
                  {flagshipProduct.name}
                </span>
                <span className="stage-product-sub">
                  {flagshipProduct.material} · {flagshipProduct.dimensions}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  className="btn-accent"
                  style={{ height: '36px', padding: '0 16px' }}
                  onClick={() => handleAddToBag(flagshipProduct.id)}
                >
                  {recentlyAddedId === flagshipProduct.id ? (
                    <>
                      <Check size={16} strokeWidth={1.5} />
                      <span>Added to bag</span>
                    </>
                  ) : (
                    <span className="tabular">
                      Add to bag — ${flagshipProduct.price}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="catalog" className="catalog-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Current production objects</h2>
              <p className="section-subtitle">
                Each piece is stamped with its catalog number, inspected with
                pin gauges, and packed in waxed Kraft paper.
              </p>
            </div>
            <span className="mono" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              SHOWING {filteredProducts.length} OF {PRODUCTS.length} INSTRUMENTS
            </span>
          </div>

          {/* Filter & Search Toolbar */}
          <div className="catalog-toolbar">
            <div className="category-tabs" role="tablist">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  className={`category-tab ${
                    activeCategory === cat.id ? 'active' : ''
                  }`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <span>{cat.label}</span>
                  <span className="tab-count tabular">
                    {categoryCounts[cat.id] || 0}
                  </span>
                </button>
              ))}
            </div>

            <div className="toolbar-controls">
              <div className="search-box">
                <Search
                  size={16}
                  strokeWidth={1.5}
                  className="search-icon"
                />
                <input
                  id="catalog-search"
                  type="text"
                  className="search-input"
                  placeholder="Search catalog"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search catalog"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="clear-search-btn"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                  >
                    <X size={14} strokeWidth={1.5} />
                  </button>
                )}
              </div>

              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort products"
              >
                <option value="featured">Sort: Catalog order</option>
                <option value="price-asc">Price: Low to high</option>
                <option value="price-desc">Price: High to low</option>
                <option value="weight-desc">Mass: Heavy to light</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div
              style={{
                padding: '64px 24px',
                textAlign: 'center',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--hairline)',
                borderRadius: 'var(--radius-card)',
              }}
            >
              <p
                style={{
                  fontSize: '16px',
                  fontWeight: 500,
                  marginBottom: '8px',
                }}
              >
                No instruments match "{searchQuery}"
              </p>
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  marginBottom: '20px',
                }}
              >
                Try clearing the search filter or switching to all objects.
              </p>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
              >
                Reset catalog filters
              </button>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => {
                const isAdded = recentlyAddedId === product.id;
                return (
                  <article key={product.id} className="product-card">
                    <div className="product-card-top">
                      <span className="product-cat-no">
                        CAT. {product.catalogNo}
                      </span>
                      <span className="product-weight tabular">
                        {product.weightGrams}g
                      </span>
                    </div>

                    <div
                      className="product-visual-box"
                      onClick={() => setInspectedProduct(product)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setInspectedProduct(product);
                        }
                      }}
                      aria-label={`Inspect ${product.name} specifications`}
                    >
                      <ProductVisual type={product.visualType} />
                      <span className="inspect-hint">
                        <SlidersHorizontal size={12} strokeWidth={1.5} />
                        <span>Spec sheet</span>
                      </span>
                    </div>

                    <div className="product-info">
                      <span className="product-material">
                        {product.material}
                      </span>

                      <div className="product-title-row">
                        <h3
                          className="product-name"
                          onClick={() => setInspectedProduct(product)}
                        >
                          {product.name}
                        </h3>
                        <span className="product-price tabular">
                          ${product.price}
                        </span>
                      </div>

                      <p className="product-summary">{product.summary}</p>

                      {/* Signature architectural dimension line */}
                      <div className="product-dimension-bar">
                        <div className="dimension-line">
                          <span className="dimension-rule" />
                          <span className="tabular">{product.dimensions}</span>
                          <span className="dimension-rule" />
                        </div>
                      </div>

                      <div className="product-card-actions">
                        <button
                          type="button"
                          className={`add-btn ${isAdded ? 'added' : ''}`}
                          onClick={() => handleAddToBag(product.id)}
                        >
                          {isAdded ? (
                            <>
                              <Check size={15} strokeWidth={1.5} />
                              <span>Added to bag</span>
                            </>
                          ) : (
                            <>
                              <Plus size={15} strokeWidth={1.5} />
                              <span>Add to bag</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          className="spec-btn"
                          onClick={() => setInspectedProduct(product)}
                          title="Inspect technical tolerances"
                          aria-label={`Inspect ${product.name}`}
                        >
                          <Ruler size={16} strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Materials & Tolerances Section */}
      <section id="materials" className="materials-section">
        <div className="container materials-layout">
          <div>
            <div className="batch-tag">
              <span>RAW STOCK &amp; PATINA</span>
            </div>
            <h2 className="section-title">
              Built to patinate, not wear out
            </h2>
            <p className="section-subtitle" style={{ marginTop: '16px' }}>
              Most commercial desk accessories hide zinc die-castings under
              electroplated lacquer. When that coating chips, the tool looks
              broken. We mill from solid bar stock and hardwood planks so wear
              only deepens the surface character.
            </p>
          </div>

          <div className="materials-grid">
            {MATERIALS_DATA.map((mat, index) => (
              <div
                key={mat.id}
                className={`material-card ${index === 0 ? 'wide' : ''}`}
              >
                <div>
                  <div className="material-index">MATERIAL {mat.id}</div>
                  <h3 className="material-title">{mat.name}</h3>
                  <p className="material-desc">{mat.summary}</p>
                </div>

                <table className="material-specs-table">
                  <tbody>
                    {mat.specs.map((row) => (
                      <tr key={row.label}>
                        <td>{row.label}</td>
                        <td className="tabular">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop Standards Section */}
      <section id="workshop" className="workshop-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Workshop standards</h2>
              <p className="section-subtitle">
                Every instrument ships directly from our Kyoto and Portland
                benches with spare wear parts included.
              </p>
            </div>
          </div>

          <div className="workshop-grid">
            <div className="workshop-card">
              <div className="workshop-card-header">
                <Wrench size={18} strokeWidth={1.5} />
                <h3 className="workshop-card-title">
                  Standard threads &amp; serviceability
                </h3>
              </div>
              <p className="workshop-card-body">
                No proprietary fasteners or glued housings. Every lamp joint,
                lead clutch, and shear pivot uses standard metric machine screws
                that can be tensioned with a flathead driver.
              </p>
            </div>

            <div className="workshop-card">
              <div className="workshop-card-header">
                <Package size={18} strokeWidth={1.5} />
                <h3 className="workshop-card-title">
                  Plastic-free archival packing
                </h3>
              </div>
              <p className="workshop-card-body">
                Instruments are wrapped in unbleached Japanese waxed paper and
                nested in heavy corrugated board boxes stamped with the lot
                date and inspector initials.
              </p>
            </div>

            <div className="workshop-card">
              <div className="workshop-card-header">
                <ShieldCheck size={18} strokeWidth={1.5} />
                <h3 className="workshop-card-title">
                  Lifetime mechanical repair
                </h3>
              </div>
              <p className="workshop-card-body">
                If a collet spring, dimmer encoder, or brass pivot bushing ever
                wears out from studio use, return the tool to either workshop
                for complimentary re-machining.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '12px',
                }}
              >
                <span className="brand-mark">US</span>
                <span className="brand-name">Uperskill Shop</span>
              </div>
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  maxWidth: '24rem',
                  marginBottom: '16px',
                }}
              >
                Batch release notes are sent four times a year when new milled
                runs leave the lathe. No seasonal sales or promotional blasts.
              </p>

              {subscribed ? (
                <div
                  className="mono"
                  style={{
                    fontSize: '13px',
                    color: 'var(--positive)',
                    padding: '10px 12px',
                    backgroundColor: 'var(--bg-page)',
                    borderRadius: 'var(--radius-control)',
                    border: '1px solid var(--hairline)',
                    display: 'inline-block',
                  }}
                >
                  Recorded for Batch 10 production dispatch notes
                </div>
              ) : (
                <form
                  className="newsletter-form"
                  onSubmit={handleNewsletterSubmit}
                >
                  <input
                    type="email"
                    required
                    className="newsletter-input"
                    placeholder="architect@studio.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    aria-label="Email address for batch dispatch notes"
                  />
                  <button type="submit" className="newsletter-btn">
                    Subscribe
                  </button>
                </form>
              )}
            </div>

            <div>
              <h4 className="footer-heading">Catalog</h4>
              <ul className="footer-list">
                {CATEGORIES.map((cat) => (
                  <li key={cat.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveCategory(cat.id);
                        const el = document.getElementById('catalog');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      {cat.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="footer-heading">Workshops &amp; Care</h4>
              <ul className="footer-list">
                <li>
                  <span>Kyoto Bench: Nakagyo-ku, Teramachi-dori</span>
                </li>
                <li>
                  <span>Portland Bench: SE Industrial Way, Bay 4</span>
                </li>
                <li>
                  <a href="#materials">Unlacquered brass care guide</a>
                </li>
                <li>
                  <a href="#workshop">Repair &amp; spare parts ledger</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <span className="mono">
              © {new Date().getFullYear()} UPERSKILL SHOP. ALL DIMENSIONS IN
              MILLIMETERS.
            </span>
            <span className="mono">BATCH 09 · TOLERANCE ±0.02 MM</span>
          </div>
        </div>
      </footer>

      {/* Technical Specification Quick-View Modal */}
      {inspectedProduct && (
        <div
          className="backdrop-center"
          onClick={() => setInspectedProduct(null)}
        >
          <div
            className="spec-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-product-title"
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '16px',
                borderBottom: '1px solid var(--hairline)',
              }}
            >
              <div className="mono" style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                TECHNICAL SPECIFICATION SHEET · CAT. NO.{' '}
                {inspectedProduct.catalogNo}
              </div>
              <button
                type="button"
                className="spec-btn"
                onClick={() => setInspectedProduct(null)}
                aria-label="Close specification sheet"
              >
                <X size={16} strokeWidth={1.5} />
              </button>
            </div>

            <div className="spec-modal-grid">
              <div>
                <div className="spec-modal-visual">
                  <ProductVisual
                    type={inspectedProduct.visualType}
                    showBlueprint={true}
                  />
                </div>
                <div style={{ marginTop: '12px' }}>
                  <div className="dimension-line">
                    <span className="dimension-rule" />
                    <span className="tabular">
                      {inspectedProduct.dimensions} ·{' '}
                      {inspectedProduct.weightGrams}g
                    </span>
                    <span className="dimension-rule" />
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                      gap: '12px',
                      marginBottom: '8px',
                    }}
                  >
                    <h3
                      id="modal-product-title"
                      style={{ fontSize: '22px', fontWeight: 500 }}
                    >
                      {inspectedProduct.name}
                    </h3>
                    <span
                      className="mono tabular"
                      style={{ fontSize: '20px', fontWeight: 500 }}
                    >
                      ${inspectedProduct.price}
                    </span>
                  </div>

                  <p
                    style={{
                      fontSize: '14px',
                      color: 'var(--text-secondary)',
                      marginBottom: '16px',
                    }}
                  >
                    {inspectedProduct.summary}
                  </p>

                  <table
                    className="material-specs-table"
                    style={{ marginBottom: '16px' }}
                  >
                    <tbody>
                      <tr>
                        <td>Material</td>
                        <td>{inspectedProduct.material}</td>
                      </tr>
                      <tr>
                        <td>Surface finish</td>
                        <td>{inspectedProduct.finish}</td>
                      </tr>
                      <tr>
                        <td>Dimensions</td>
                        <td className="tabular">{inspectedProduct.dimensions}</td>
                      </tr>
                      <tr>
                        <td>Net mass</td>
                        <td className="tabular">
                          {inspectedProduct.weightGrams}g
                        </td>
                      </tr>
                      <tr>
                        <td>Tolerance / Detail</td>
                        <td>{inspectedProduct.tolerance}</td>
                      </tr>
                      <tr>
                        <td>Workshop origin</td>
                        <td>{inspectedProduct.origin}</td>
                      </tr>
                      <tr>
                        <td>Availability</td>
                        <td>{inspectedProduct.batch}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div
                    style={{
                      padding: '12px',
                      backgroundColor: 'var(--bg-raised)',
                      borderRadius: 'var(--radius-control)',
                      fontSize: '12px',
                      color: 'var(--text-secondary)',
                      marginBottom: '20px',
                    }}
                  >
                    <strong style={{ color: 'var(--text-primary)' }}>
                      Patina note:
                    </strong>{' '}
                    {inspectedProduct.agingNote}
                  </div>
                </div>

                <button
                  type="button"
                  className="btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => {
                    handleAddToBag(inspectedProduct.id);
                    setInspectedProduct(null);
                    setIsBagOpen(true);
                  }}
                >
                  <Plus size={16} strokeWidth={1.5} />
                  <span className="tabular">
                    Add to bag — ${inspectedProduct.price}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Slide-Over Shopping Bag Drawer */}
      {isBagOpen && (
        <div className="backdrop" onClick={() => setIsBagOpen(false)}>
          <aside
            className="bag-drawer"
            onClick={(e) => e.stopPropagation()}
            aria-label="Shopping bag"
          >
            <div className="drawer-header">
              <div className="drawer-title">
                <ShoppingBag size={18} strokeWidth={1.5} />
                <span>Dispatch bag</span>
                <span
                  className="mono tabular"
                  style={{ fontSize: '12px', color: 'var(--text-muted)' }}
                >
                  ({totalBagCount})
                </span>
              </div>
              <button
                type="button"
                className="spec-btn"
                onClick={() => setIsBagOpen(false)}
                aria-label="Close bag"
              >
                <X size={16} strokeWidth={1.5} />
              </button>
            </div>

            <div className="drawer-body">
              {/* Free Courier Shipping Threshold Meter */}
              <div className="shipping-meter">
                <div className="shipping-meter-text tabular">
                  {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                    <span>
                      Complimentary insured courier shipping unlocked
                    </span>
                  ) : (
                    <span>
                      Add ${FREE_SHIPPING_THRESHOLD - subtotal} more for
                      complimentary courier shipping
                    </span>
                  )}
                </div>
                <div className="shipping-bar-track">
                  <div
                    className="shipping-bar-fill"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {orderPlaced ? (
                <div
                  style={{
                    padding: '32px 20px',
                    backgroundColor: 'var(--bg-raised)',
                    borderRadius: 'var(--radius-card)',
                    border: '1px solid var(--hairline)',
                    textAlign: 'center',
                  }}
                >
                  <div
                    className="mono"
                    style={{
                      fontSize: '12px',
                      color: 'var(--positive)',
                      marginBottom: '8px',
                    }}
                  >
                    DISPATCH TICKET #KW-9042 RECORDED
                  </div>
                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: 500,
                      marginBottom: '8px',
                    }}
                  >
                    Thank you for your order
                  </h3>
                  <p
                    style={{
                      fontSize: '14px',
                      color: 'var(--text-secondary)',
                      marginBottom: '20px',
                    }}
                  >
                    Our bench technicians will inspect your instruments, stamp
                    the packing slip, and dispatch within 2 business days.
                  </p>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => {
                      setOrderPlaced(false);
                      setIsBagOpen(false);
                    }}
                  >
                    Return to catalog
                  </button>
                </div>
              ) : detailedBag.length === 0 ? (
                <div
                  style={{
                    padding: '48px 16px',
                    textAlign: 'center',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <p style={{ fontSize: '15px', marginBottom: '16px' }}>
                    Your dispatch bag is empty
                  </p>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setIsBagOpen(false)}
                  >
                    Browse Batch 09 objects
                  </button>
                </div>
              ) : (
                <div className="bag-items-list">
                  {detailedBag.map((item) => (
                    <div key={item.id} className="bag-item">
                      <div className="bag-item-thumb">
                        <ProductVisual type={item.visualType} />
                      </div>
                      <div>
                        <div className="bag-item-header">
                          <span className="bag-item-name">{item.name}</span>
                          <span className="bag-item-price tabular">
                            ${item.price * item.quantity}
                          </span>
                        </div>
                        <div className="bag-item-meta">
                          CAT. {item.catalogNo} · {item.weightGrams}g · $
                          {item.price} each
                        </div>
                        <div className="bag-item-controls">
                          <div className="qty-stepper">
                            <button
                              type="button"
                              className="qty-btn"
                              onClick={() => handleUpdateQuantity(item.id, -1)}
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} strokeWidth={1.5} />
                            </button>
                            <span className="qty-val tabular">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              className="qty-btn"
                              onClick={() => handleUpdateQuantity(item.id, 1)}
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} strokeWidth={1.5} />
                            </button>
                          </div>

                          <button
                            type="button"
                            className="remove-btn"
                            onClick={() => handleRemoveFromBag(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {detailedBag.length > 0 && (
              <div className="drawer-footer">
                <div className="summary-row">
                  <span>Combined instrument mass</span>
                  <span className="mono tabular">
                    {detailedBag.reduce(
                      (sum, i) => sum + i.weightGrams * i.quantity,
                      0
                    )}
                    g
                  </span>
                </div>
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span className="mono tabular">${subtotal}</span>
                </div>
                <div className="summary-row">
                  <span>Insured courier shipping</span>
                  <span className="mono tabular">
                    {shippingCost === 0 ? 'Complimentary' : `$${shippingCost}`}
                  </span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span className="mono tabular">${orderTotal}</span>
                </div>

                <button
                  type="button"
                  className="btn-primary"
                  style={{ width: '100%' }}
                  onClick={handleCheckout}
                >
                  <span>Complete workshop order</span>
                  <ArrowRight size={16} strokeWidth={1.5} />
                </button>
              </div>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
