import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                soft: '#a4a4a4',
                main: '#0EA5E9FF',
                mainAlt: '#0d43dc',
                light: '#a2a1a6',
                dark: '#313338',
                darker: '#1d1d23',
                white: '#FFF',
                error: '#ff002d',
                transparent: 'transparent',
                current: 'currentColor',
                btnPrimary: '#5865f2',
                btnHover: '#3c45a5',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [],
}
export default config
