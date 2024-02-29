import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      zIndex: {
        '-1': '-1',
        '-2': '-2',
        '-3': '-3',
         '-4': '-4',
         '-5': '-5',
         '-10': '-10',
         '0': '0',
         '1': '1',
         '2': '2',
         '3': '3',
         '5': '5',
        '10': '10',
        '99': '99',
        '999': '999',
      }, 
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    screens: {                       
      //__________________________custom breakpoints__________________
      xxxs: { max: "359px"},
      xxs: { min: "360px", max: "475px" },
      xs: { min: "475px", max: "640px" },
      sm: { min: "640px", max: "768px" },
      md: { min: "768px", max: "1023px" },
      lg: { min: "1023px", max: "1279px" }, // x from 1024px
      xl: { min: "1279px", max: "1699px" }, // x from 1080px
      '2xl': { min: "1600px" },
      xxsw: { min: "480px" }, // wide view
      xsw: { min: "600px" }, // wide view --blackberry playbook
      xlsw: { min: "635px" }, // wide view
    }, 
  },
  plugins: [
    // require('@headlessui/tailwindcss'),
     //require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
  ],
}
export default config
