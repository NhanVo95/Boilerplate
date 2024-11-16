/* eslint-disable indent */
export const colorTokens = (mode) => ({
  ...(mode === 'dark'
    ? {
        background: '#141b2d',
        white: '#ffffff',
        whiteTransparent: 'rgba(255,255,255,0.2)',
        blackTransparent: 'rgba(0,0,0,0.3)',

        // Black Color
        primary: {}
      }
    : {
        background: '#fcfcfc',
        white: '#ffffff',
        whiteTransparent: 'rgba(255,255,255,0.2)',
        blackTransparent: 'rgba(0,0,0,0.3)',

        // Black Color
        primary: {}
      })
})
