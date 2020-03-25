export default {
  borderRadius: '3px',
  borderColor: '#E1E8EC',
  boxShadow: '0 0px 5px 0 rgba(59,65,94,.1), 0 1px 1px 0 rgba(0,0,0,.07)',
  primaryGradient: 'linear-gradient(285.46deg, #000000 3.26%, #212331 93.52%)',
  primaryColor: '#4762ff',
  secondaryColor: '#6E7E87',
  primaryTextColor: '#1D275F',
  textShadow: '0 1px 3px rgba(0,0,0,.4)',
  maxWidthDefault: '1136px',
}

const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
}

export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
}
