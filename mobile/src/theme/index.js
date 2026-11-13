// iOS-style design tokens.
//
// Colours are Apple's light-mode system palette (systemBlue, systemGroupedBackground,
// label / secondaryLabel, separator ...). Type sizes follow the iOS text styles
// (Large Title 34, Title 2 22, Headline / Body 17, Footnote 13 ...).
//
// The font itself is the platform system font: San Francisco on an iPhone,
// Roboto on Android. SF cannot be bundled into an Android build.

const system = {
  blue: '#007AFF',
  green: '#34C759',
  red: '#FF3B30',
  orange: '#FF9500',
  yellow: '#FFCC00',
  indigo: '#5856D6',
  teal: '#30B0C7',
  purple: '#AF52DE',
  gray: '#8E8E93',
  gray2: '#AEAEB2',
  gray3: '#C7C7CC',
  gray4: '#D1D1D6',
  gray5: '#E5E5EA',
  gray6: '#F2F2F7',
};

export const colors = {
  ...system,

  // Surfaces
  background: '#F2F2F7', // systemGroupedBackground
  surface: '#FFFFFF', // secondarySystemGroupedBackground
  surfaceAlt: '#F2F2F7',
  bar: '#F9F9F9', // navigation / tab bar material
  fill: 'rgba(118, 118, 128, 0.12)', // tertiarySystemFill
  separator: 'rgba(60, 60, 67, 0.29)',
  border: 'rgba(60, 60, 67, 0.29)',
  divider: 'rgba(60, 60, 67, 0.29)',
  scrim: 'rgba(0, 0, 0, 0.4)',

  // Labels
  text: '#000000',
  textMuted: 'rgba(60, 60, 67, 0.6)', // secondaryLabel
  textSubtle: 'rgba(60, 60, 67, 0.3)', // tertiaryLabel
  textInverse: '#FFFFFF',

  // Semantic aliases
  link: system.blue,
  primary: system.blue,
  success: system.green,
  successText: '#248A3D', // accessible green for small text
  danger: system.red,
  warning: system.orange,
  warningBg: 'rgba(255, 149, 0, 0.14)',
  warningText: '#C93400', // accessible orange for small text

  // Tints (15% fills behind tinted buttons and badges)
  blueTint: 'rgba(0, 122, 255, 0.14)',
  greenTint: 'rgba(52, 199, 89, 0.16)',
  redTint: 'rgba(255, 59, 48, 0.14)',
  orangeTint: 'rgba(255, 149, 0, 0.16)',

  // Quick-action tiles
  tileBlue: system.blue,
  tileOrange: system.orange,
  tileGreen: system.green,
  tileIndigo: system.indigo,
  tileTeal: system.teal,
  tileRed: system.red,
};

// Bottom padding for scroll content on tab screens. The tab bar sits beside
// the content (not over it), so this is ordinary breathing room.
export const TAB_BAR_CLEARANCE = 40;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  page: 16,
};

export const radius = {
  sm: 7,
  md: 10,
  lg: 12,
  xl: 14,
  tile: 18,
  pill: 999,
};

// iOS text styles.
export const typography = {
  largeTitle: { fontSize: 34, lineHeight: 41, fontWeight: '700', letterSpacing: 0.35, color: colors.text },
  title1: { fontSize: 28, lineHeight: 34, fontWeight: '700', letterSpacing: 0.35, color: colors.text },
  title2: { fontSize: 22, lineHeight: 28, fontWeight: '700', letterSpacing: 0.3, color: colors.text },
  title3: { fontSize: 20, lineHeight: 25, fontWeight: '600', letterSpacing: 0.3, color: colors.text },
  headline: { fontSize: 17, lineHeight: 22, fontWeight: '600', letterSpacing: -0.4, color: colors.text },
  body: { fontSize: 17, lineHeight: 22, fontWeight: '400', letterSpacing: -0.4, color: colors.text },
  callout: { fontSize: 16, lineHeight: 21, fontWeight: '400', letterSpacing: -0.3, color: colors.text },
  subhead: { fontSize: 15, lineHeight: 20, fontWeight: '400', letterSpacing: -0.2, color: colors.text },
  footnote: { fontSize: 13, lineHeight: 18, fontWeight: '400', letterSpacing: -0.1, color: colors.textMuted },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: '400', color: colors.textMuted },
  // Uppercase grey header above an inset grouped section.
  sectionHeader: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.2,
  },
};

// iOS grouped surfaces are flat: separation comes from the grey background,
// not from drop shadows.
export const shadow = {
  card: {},
};

export const hairline = { height: 0.5, backgroundColor: colors.separator };

export default { colors, spacing, radius, typography, shadow, hairline };
