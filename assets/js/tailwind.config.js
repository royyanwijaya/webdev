tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-sans)', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            },
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                muted: {
                    DEFAULT: 'var(--muted)',
                    foreground: 'var(--muted-foreground)'
                },
                secondary: {
                    DEFAULT: 'var(--secondary)',
                    foreground: 'var(--secondary-foreground)'
                },
                border: 'var(--border)',
                primary: {
                    DEFAULT: 'var(--primary)',
                    foreground: 'var(--primary-foreground)'
                },
                footer: {
                    bg: 'var(--footer-bg)',
                    border: 'var(--footer-border)',
                    muted: 'var(--footer-text-muted)',
                }
            },
            borderRadius: {
                DEFAULT: 'var(--radius)',
            }
        }
    }
}
