/** @type {import('tailwindcss').Config} */
module.exports = {
  // Usa solo content (purge está deprecado en Tailwind v3+)
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Mapea todas tus variables CSS a clases de Tailwind
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        popover: 'var(--popover)',
        'popover-foreground': 'var(--popover-foreground)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        secondary: 'var(--secondary)',
        'secondary-foreground': 'var(--secondary-foreground)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        accent: 'var(--accent)',
        'accent-foreground': 'var(--accent-foreground)',
        destructive: 'var(--destructive)',
        'destructive-foreground': 'var(--destructive-foreground)',
        border: 'var(--border)',
        input: 'var(--input)',
        'input-background': 'var(--input-background)',
        'switch-background': 'var(--switch-background)',
        ring: 'var(--ring)',
        
        // Colores del chart
        'chart-1': 'var(--chart-1)',
        'chart-2': 'var(--chart-2)',
        'chart-3': 'var(--chart-3)',
        'chart-4': 'var(--chart-4)',
        'chart-5': 'var(--chart-5)',
        
        // Colores del sidebar
        sidebar: 'var(--sidebar)',
        'sidebar-foreground': 'var(--sidebar-foreground)',
        'sidebar-primary': 'var(--sidebar-primary)',
        'sidebar-primary-foreground': 'var(--sidebar-primary-foreground)',
        'sidebar-accent': 'var(--sidebar-accent)',
        'sidebar-accent-foreground': 'var(--sidebar-accent-foreground)',
        'sidebar-border': 'var(--sidebar-border)',
        'sidebar-ring': 'var(--sidebar-ring)',
        
        // Colores Orbis personalizados
        'orbis-teal': '#19BDBA',
        'orbis-navy': '#0A3A59',
        'orbis-blue-gray': '#367589',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: 'calc(var(--radius) + 4px)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Define tamaños de texto basados en tu variable --font-size
        base: 'var(--font-size)',
      },
      fontWeight: {
        normal: 'var(--font-weight-normal)',
        medium: 'var(--font-weight-medium)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-in-right': 'slide-in-right 0.5s ease-out',
        'slide-in-left': 'slide-in-left 0.5s ease-out',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'rotate-slow': 'rotate-slow 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(25, 189, 186, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(25, 189, 186, 0.6)' },
        },
        'slide-in-right': {
          from: { transform: 'translateX(100%)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-in-left': {
          from: { transform: 'translateX(-100%)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        'fade-in-up': {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'rotate-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      boxShadow: {
        'orbis': '0 10px 40px rgba(25, 189, 186, 0.2)',
        'orbis-lg': '0 20px 60px rgba(25, 189, 186, 0.3)',
      },
      backgroundImage: {
        'gradient-orbis-primary': 'linear-gradient(135deg, #19BDBA, #367589)',
        'gradient-orbis-secondary': 'linear-gradient(135deg, #367589, #0A3A59)',
        'gradient-orbis-full': 'linear-gradient(135deg, #19BDBA, #367589, #0A3A59)',
      },
    },
  },
  // Safelist para clases que se generan dinámicamente
  safelist: [
    {
      pattern: /^(bg|text|border|ring)-orbis-(teal|navy|blue-gray)$/,
    },
    {
      pattern: /^bg-gradient-orbis-(primary|secondary|full)$/,
    },
    {
      pattern: /^shadow-orbis(-lg)?$/,
    },
    {
      pattern: /^animate-(float|pulse-glow|slide-in-right|slide-in-left|fade-in-up|rotate-slow)$/,
    },
  ],
  plugins: [],
}