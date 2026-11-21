import React from 'react';

/**
 * Renders tactile, high-craft technical & material SVG objects
 * using realistic metallic brass, oiled walnut, and cast-iron shading.
 */
export function ProductVisual({ type, nightMode = false, showBlueprint = false }) {
  const gridStroke = nightMode
    ? 'rgba(239, 233, 222, 0.06)'
    : 'rgba(31, 27, 22, 0.055)';
  const calloutColor = nightMode ? '#d9a45b' : '#7b7266';

  return (
    <svg
      viewBox="0 0 400 260"
      width="100%"
      height="100%"
      style={{ display: 'block' }}
      aria-hidden="true"
    >
      <defs>
        {/* Solid Machined Brass Gradient */}
        <linearGradient id="brass-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e2c37c" />
          <stop offset="45%" stopColor="#c59b49" />
          <stop offset="80%" stopColor="#9d7428" />
          <stop offset="100%" stopColor="#7a5719" />
        </linearGradient>

        {/* Brushed Brass Vertical */}
        <linearGradient id="brass-vert" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ebd193" />
          <stop offset="50%" stopColor="#c69d4b" />
          <stop offset="100%" stopColor="#8b6621" />
        </linearGradient>

        {/* Oiled Claro Walnut Gradient */}
        <linearGradient id="walnut-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#65452d" />
          <stop offset="50%" stopColor="#4c321f" />
          <stop offset="100%" stopColor="#352214" />
        </linearGradient>

        {/* Cast Iron Gradient */}
        <linearGradient id="iron-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3e3b38" />
          <stop offset="50%" stopColor="#282623" />
          <stop offset="100%" stopColor="#181715" />
        </linearGradient>

        {/* Anodized Aluminum Gradient */}
        <linearGradient id="alu-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#dedad2" />
          <stop offset="55%" stopColor="#beb8ae" />
          <stop offset="100%" stopColor="#969086" />
        </linearGradient>

        {/* Warm 2700K Lamp Cone */}
        <radialGradient id="warm-beam" cx="50%" cy="15%" r="75%">
          <stop offset="0%" stopColor="rgba(255, 198, 105, 0.52)" />
          <stop offset="55%" stopColor="rgba(255, 174, 66, 0.16)" />
          <stop offset="100%" stopColor="rgba(255, 174, 66, 0)" />
        </radialGradient>
      </defs>

      {/* Subtle architectural drafting grid */}
      <g stroke={gridStroke} strokeWidth="1">
        <line x1="0" y1="65" x2="400" y2="65" />
        <line x1="0" y1="130" x2="400" y2="130" />
        <line x1="0" y1="195" x2="400" y2="195" />
        <line x1="100" y1="0" x2="100" y2="260" />
        <line x1="200" y1="0" x2="200" y2="260" />
        <line x1="300" y1="0" x2="300" y2="260" />
      </g>

      {/* Ground contact shadow */}
      <ellipse
        cx="200"
        cy="218"
        rx="125"
        ry="10"
        fill={nightMode ? 'rgba(0,0,0,0.45)' : 'rgba(31, 27, 22, 0.08)'}
      />

      {type === 'lamp' && (
        <g>
          {/* Warm 2700K Beam Cone in night mode */}
          {nightMode && (
            <polygon
              points="250,68 125,222 365,222"
              fill="url(#warm-beam)"
            />
          )}

          {/* Heavy Cast-Iron Base */}
          <rect
            x="92"
            y="198"
            width="92"
            height="20"
            rx="4"
            fill="url(#iron-grad)"
          />
          {/* Cork foot line */}
          <rect
            x="96"
            y="217"
            width="84"
            height="3"
            fill="#9b764e"
          />

          {/* Brass Base Collar */}
          <rect
            x="126"
            y="186"
            width="24"
            height="12"
            rx="2"
            fill="url(#brass-grad)"
          />

          {/* Lower Vertical Stem */}
          <rect
            x="134"
            y="92"
            width="8"
            height="96"
            fill="url(#brass-grad)"
          />

          {/* Precision Friction Joint Assembly */}
          <circle
            cx="138"
            cy="88"
            r="13"
            fill="url(#iron-grad)"
            stroke="#c59b49"
            strokeWidth="2"
          />
          <circle cx="138" cy="88" r="6" fill="url(#brass-grad)" />

          {/* Cantilever Boom Arm */}
          <line
            x1="112"
            y1="96"
            x2="266"
            y2="56"
            stroke="url(#brass-grad)"
            strokeWidth="7"
            strokeLinecap="round"
          />

          {/* Counterweight Cylinder */}
          <rect
            x="88"
            y="88"
            width="26"
            height="16"
            rx="3"
            transform="rotate(-14 101 96)"
            fill="url(#brass-grad)"
          />

          {/* Shade Pivot & Milled Brass Shade */}
          <circle cx="264" cy="56" r="6" fill="url(#brass-grad)" />
          <path
            d="M234 56 L294 56 L306 72 L222 72 Z"
            fill="url(#brass-grad)"
          />
          {nightMode && (
            <ellipse
              cx="264"
              cy="72"
              rx="36"
              ry="4"
              fill="#ffe4a3"
            />
          )}

          {/* Blueprint inspection overlay */}
          {showBlueprint && (
            <g
              stroke={calloutColor}
              strokeWidth="1"
              fill={calloutColor}
              fontFamily="JetBrains Mono, monospace"
              fontSize="10"
            >
              <line
                x1="88"
                y1="34"
                x2="306"
                y2="34"
                strokeDasharray="3 3"
              />
              <line x1="88" y1="28" x2="88" y2="40" />
              <line x1="306" y1="28" x2="306" y2="40" />
              <text x="165" y="28" stroke="none">
                REACH 320 mm
              </text>

              <line
                x1="62"
                y1="56"
                x2="62"
                y2="218"
                strokeDasharray="3 3"
              />
              <line x1="56" y1="56" x2="68" y2="56" />
              <line x1="56" y1="218" x2="68" y2="218" />
              <text x="16" y="142" stroke="none">
                420 mm
              </text>

              <circle
                cx="138"
                cy="88"
                r="20"
                fill="none"
                strokeDasharray="2 2"
              />
              <text x="162" y="106" stroke="none">
                ±0.02 mm JOURNAL
              </text>
            </g>
          )}
        </g>
      )}

      {type === 'ruler' && (
        <g>
          {/* Triangular Solid Brass Scale body */}
          <g transform="rotate(-12 200 130)">
            <rect
              x="48"
              y="102"
              width="304"
              height="38"
              rx="3"
              fill="url(#brass-vert)"
            />
            {/* Chamfered Ridge Highlight */}
            <rect
              x="48"
              y="118"
              width="304"
              height="6"
              fill="rgba(255, 245, 214, 0.45)"
            />
            {/* Deep Etched Metric Graduations */}
            {Array.from({ length: 25 }).map((_, idx) => {
              const x = 64 + idx * 11.5;
              const isMajor = idx % 5 === 0;
              return (
                <g key={idx}>
                  <line
                    x1={x}
                    y1="102"
                    x2={x}
                    y2={isMajor ? '115' : '109'}
                    stroke="#231e18"
                    strokeWidth={isMajor ? '1.5' : '1'}
                  />
                  {isMajor && (
                    <text
                      x={x - 4}
                      y="134"
                      fill="#231e18"
                      fontFamily="JetBrains Mono, monospace"
                      fontSize="8"
                    >
                      {idx * 10}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        </g>
      )}

      {type === 'pencil' && (
        <g transform="rotate(-8 200 130)">
          {/* Rear Push Cap */}
          <rect
            x="56"
            y="122"
            width="24"
            height="14"
            rx="2"
            fill="url(#iron-grad)"
          />
          {/* Hexagonal Brass Barrel */}
          <rect
            x="80"
            y="119"
            width="160"
            height="20"
            rx="2"
            fill="url(#brass-vert)"
          />
          <line
            x1="80"
            y1="126"
            x2="240"
            y2="126"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1.5"
          />
          {/* Diamond Knurled Foregrip */}
          <rect
            x="240"
            y="118"
            width="68"
            height="22"
            rx="2"
            fill="#9e762a"
          />
          {Array.from({ length: 14 }).map((_, i) => (
            <line
              key={i}
              x1={244 + i * 4.5}
              y1="118"
              x2={244 + i * 4.5}
              y2="140"
              stroke="rgba(31,27,22,0.35)"
              strokeWidth="1"
            />
          ))}
          {/* Tapered Nose Cone & 3-Jaw Steel Clutch */}
          <polygon
            points="308,119 334,125 334,133 308,139"
            fill="url(#brass-vert)"
          />
          <rect
            x="334"
            y="126"
            width="10"
            height="6"
            fill="url(#iron-grad)"
          />
          {/* 2.0mm Graphite Lead Tip */}
          <polygon
            points="344,127 358,129 344,131"
            fill="#1f1b16"
          />
        </g>
      )}

      {type === 'tray' && (
        <g>
          {/* Solid Claro Walnut Block */}
          <rect
            x="64"
            y="88"
            width="272"
            height="96"
            rx="10"
            fill="url(#walnut-grad)"
          />
          {/* Four Milled Parallel Flutes */}
          {[104, 124, 144, 164].map((y, idx) => (
            <rect
              key={idx}
              x="82"
              y={y}
              width="236"
              height="12"
              rx="6"
              fill="rgba(20, 12, 6, 0.42)"
              stroke="rgba(255, 224, 185, 0.12)"
              strokeWidth="1"
            />
          ))}
          {/* Resting Brass Pen inside Flute 2 */}
          <rect
            x="110"
            y="126"
            width="176"
            height="8"
            rx="4"
            fill="url(#brass-vert)"
          />
          {/* Brass Feet Underneath */}
          <rect
            x="88"
            y="184"
            width="24"
            height="6"
            rx="2"
            fill="url(#brass-grad)"
          />
          <rect
            x="288"
            y="184"
            width="24"
            height="6"
            rx="2"
            fill="url(#brass-grad)"
          />
        </g>
      )}

      {type === 'weight' && (
        <g>
          {/* Rolled Vellum Sheet Base */}
          <path
            d="M72 198 L328 198 L316 208 L84 208 Z"
            fill="#fbf8f1"
            stroke="rgba(31,27,22,0.18)"
          />
          {/* Sand-Cast Iron Anvil Profile */}
          <path
            d="M116 146 L284 146 L272 166 L288 194 L112 194 L128 166 Z"
            fill="url(#iron-grad)"
          />
          {/* Stamped Brass Medallion Inlay */}
          <circle cx="200" cy="172" r="11" fill="url(#brass-grad)" />
          <text
            x="192"
            y="175"
            fill="#1f1b16"
            fontFamily="JetBrains Mono, monospace"
            fontSize="8"
            fontWeight="500"
          >
            820g
          </text>
          {/* Recessed Portuguese Cork Base */}
          <rect
            x="116"
            y="194"
            width="168"
            height="4"
            fill="#a37c52"
          />
        </g>
      )}

      {type === 'dimmer' && (
        <g>
          {/* Braided Linen Cable */}
          <path
            d="M40 144 Q88 144 126 144"
            stroke="#73695c"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M274 144 Q312 144 360 144"
            stroke="#73695c"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
          {/* Bead-Blasted Aluminum Plinth */}
          <rect
            x="122"
            y="78"
            width="156"
            height="122"
            rx="14"
            fill="url(#alu-grad)"
            stroke="rgba(31,27,22,0.16)"
            strokeWidth="1.5"
          />
          {/* Corner Hex Screws */}
          {[
            [136, 92],
            [264, 92],
            [136, 186],
            [264, 186],
          ].map(([cx, cy], idx) => (
            <circle key={idx} cx={cx} cy={cy} r="3.5" fill="#6b655e" />
          ))}
          {/* Weighted Knurled Brass Rotary Dial */}
          <circle
            cx="200"
            cy="139"
            r="42"
            fill="url(#iron-grad)"
          />
          <circle
            cx="200"
            cy="139"
            r="37"
            fill="url(#brass-grad)"
          />
          {/* Machined Indicator Notch */}
          <line
            x1="200"
            y1="108"
            x2="200"
            y2="124"
            stroke="#1f1b16"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      )}

      {type === 'shears' && (
        <g transform="rotate(-10 200 135)">
          {/* Upper & Lower Forged Kurouchi Blades */}
          <path
            d="M185 128 L332 104 L318 128 Z"
            fill="url(#iron-grad)"
          />
          <path
            d="M185 132 L332 156 L318 132 Z"
            fill="#484440"
          />
          {/* Handle Loops */}
          <ellipse
            cx="116"
            cy="104"
            rx="44"
            ry="22"
            fill="none"
            stroke="url(#iron-grad)"
            strokeWidth="10"
          />
          <ellipse
            cx="116"
            cy="156"
            rx="44"
            ry="22"
            fill="none"
            stroke="url(#iron-grad)"
            strokeWidth="10"
          />
          {/* Slotted Solid Brass Tension Pivot Screw */}
          <circle cx="192" cy="130" r="10" fill="url(#brass-grad)" />
          <line
            x1="186"
            y1="126"
            x2="198"
            y2="134"
            stroke="#231e18"
            strokeWidth="2"
          />
        </g>
      )}

      {type === 'bookend' && (
        <g>
          {/* Left Bent Bronze Monolith */}
          <path
            d="M96 64 L110 64 L110 188 L158 188 L158 200 L96 200 Z"
            fill="url(#brass-vert)"
          />
          {/* Archival Folio Stack in Between */}
          <rect
            x="158"
            y="82"
            width="22"
            height="118"
            rx="2"
            fill="#dfd8cb"
            stroke="rgba(31,27,22,0.15)"
          />
          <rect
            x="180"
            y="72"
            width="28"
            height="128"
            rx="2"
            fill="#cfc6b6"
            stroke="rgba(31,27,22,0.15)"
          />
          <rect
            x="208"
            y="90"
            width="20"
            height="110"
            rx="2"
            fill="#e8e2d6"
            stroke="rgba(31,27,22,0.15)"
          />
          {/* Right Bent Bronze Monolith */}
          <path
            d="M286 64 L272 64 L272 188 L228 188 L228 200 L286 200 Z"
            fill="url(#brass-vert)"
          />
        </g>
      )}
    </svg>
  );
}
