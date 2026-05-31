---
Task ID: 1
Agent: full-stack-developer
Task: Improve 3D visuals and Scroll-to-Anchor navigation for portfolio

Work Log:
- Enhanced Navigation component with IntersectionObserver-based active section detection
- Added useActiveSection shared hook for both Navigation and FloatingSideNav
- Added FloatingSideNav component (dot indicators on right side, visible on md+ screens)
- Added smooth scroll with scroll-padding-top: 80px in CSS
- Enhanced ProjectPipeline3D: hex platforms under nodes, rotating rings on all nodes, energy beams between nodes, grid floor, 50 data chips, tilt perspective, color-coded status indicators
- Enhanced HeroScene3D: radar sweep shader, 400 signal particles (multi-color: blue/teal/indigo), second holographic ring, circuit trace animations, center glow pulse
- Enhanced SkillsScene3D: pulsing glow on nodes, animated connection lines with data stream particles, subtle constellation rotation, DataStreamParticles component
- Enhanced GlobalBackground3D: 250 particles (from 150), slow-rotating background ring, floating shapes opacity 0.12 (from 0.08), scan-line effect in CSS
- Enhanced TimelineScene3D: 70 data particles (from 40), node glow effects, traveling particles along timeline, glowing connection lines between nodes, pulsing timeline line
- Enhanced OscilloscopeScene3D: major grid lines, tick marks on crosshair, CH1/CH2 indicators on body
- Enhanced DNAHelixScene3D: 80 background particles (from 50), orbital particles around helix, smoother motion
- Enhanced LogicGatesScene3D: truth tables per gate, input signal shader displays, animated signal pulses on wires, input/output pin animations
- Added scan-line-effect div in Home component
- Fixed ESLint warning in LogicGatesScene3D.tsx

Stage Summary:
- All 8 3D components enhanced with richer visual effects
- Navigation now tracks active section via IntersectionObserver with visual highlighting
- FloatingSideNav dot indicators added for desktop navigation
- CSS updated with scroll-padding-top, floating side nav styles, scan-line animation
- All lint checks pass cleanly
