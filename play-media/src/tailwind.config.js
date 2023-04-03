const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    screens: {
      'xs': '475px',
      ...defaultTheme.screens,
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: {
        DEFAULT: '#f7f7f7',
        lighter: '#fafafa',
        light: '#ffffff',
        dark: '#efefef',
      },
      black: {
        DEFAULT: '#232323',
        light: '#3c3c3c',
        lightest: '#666666',
        dark: '#0a0a0a',
        darkest: '#000000',
      },
      gray: {
        DEFAULT: '#cccccc',
        light: '#e5e5e5',
        lighter: '#d5d5d5',
        dark: '#b3b3b3',
      },
      blue: {
        DEFAULT: '#006ef9',
        light: '#3e93ff',
        lighter: '#1c80ff',
        lightest: '#85bfff',
        dark: '#0050b5',
        darkest: '#003271',
      },
      yellow: {
        DEFAULT: '#ffd31c',
        light: '#ffe060',
        lightest: '#ffeda4',
        dark: '#d7ad00',
        darkest: '#937700',
      },
      orange: {
        DEFAULT: '#ff8d00',
        light: '#ffab44',
        lightest: '#ffc988',
        dark: '#cc7000',
        darkest: '#884b00',
      },
      pink: {
        DEFAULT: '#ff1886',
        light: '#ff5caa',
        lightest: '#ffa0ce',
        dark: '#d30065',
        darkest: '#8f0044',
      }
    },
    fontFamily: {
      'sans': 'Saira, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"'
    },
    extend: {

      maxWidth: {
        'container': '66rem',
      },
      backgroundImage: {
        'select-arrow': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18.649' height='11.318' viewBox='0 0 18.649 11.318'%3E%3Cpath id='chevron-down-solid' d='M14.256,134.512l-8.3-8.3a1.025,1.025,0,0,1,0-1.45l.968-.968a1.025,1.025,0,0,1,1.448,0l6.609,6.578,6.609-6.578a1.025,1.025,0,0,1,1.448,0l.968.968a1.025,1.025,0,0,1,0,1.45l-8.3,8.3A1.025,1.025,0,0,1,14.256,134.512Z' transform='translate(-5.656 -123.494)'/%3E%3C/svg%3E%0A\")",
        'checkbox-check': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='17.121' height='13.121' viewBox='0 0 17.121 13.121'%3E%3Cg id='Group_277' data-name='Group 277' transform='translate(1.061 1.061)'%3E%3Cg id='Group_276' data-name='Group 276'%3E%3Cline id='Line_3' data-name='Line 3' x1='6' y1='6' transform='translate(0 5)' fill='none' stroke='%23707070' stroke-width='3'/%3E%3Cline id='Line_4' data-name='Line 4' x1='11' y2='11' transform='translate(4)' fill='none' stroke='%23707070' stroke-width='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A\")",
      }
    },
  },
  plugins: [],
}
