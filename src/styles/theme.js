// Gotham Theme Configuration - Palantir-inspired
export const gothamTheme = {
  colors: {
    // Dark backgrounds - almost black
    background: {
      primary: 'bg-[#0a0a0a]',
      secondary: 'bg-[#0f0f0f]',
      glass: 'bg-[#0f0f0f]/90',
      glassHeavy: 'bg-[#0f0f0f]/95',
    },
    // Gotham blue accent - subtle
    primary: {
      text: 'text-[#0088ff]',
      border: 'border-[#0088ff]/30',
      bg: 'bg-[#0088ff]/10',
      hover: 'hover:bg-[#0088ff]/20',
    },
    // Muted status colors
    success: {
      text: 'text-[#00cc66]',
      border: 'border-[#00cc66]/30',
      bg: 'bg-[#00cc66]/10',
    },
    critical: {
      text: 'text-[#ff4444]',
      border: 'border-[#ff4444]/30',
      bg: 'bg-[#ff4444]/10',
    },
    warning: {
      text: 'text-[#ffaa00]',
      border: 'border-[#ffaa00]/30',
      bg: 'bg-[#ffaa00]/10',
    },
  },
  typography: {
    mono: 'font-mono',
    sans: 'font-sans',
  },
  borders: {
    default: 'border-[#1a1a1a]',
    accent: 'border-[#0088ff]/30',
  },
  spacing: {
    tight: 'p-2',
    normal: 'p-4',
    loose: 'p-6',
  },
};

// Legacy theme for compatibility
export const theme = gothamTheme;
