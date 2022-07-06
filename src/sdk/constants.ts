export type AcceptedPaymentMetadata = {
  address: string
  symbols: string
  url: string
}
export type AcceptedPayment = Record<string, AcceptedPaymentMetadata>
export const ACCEPTED_TOKENS: AcceptedPayment = {
  usdc: {
    address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    symbols: 'USDC',
    url: 'https://www.circle.com/en/usdc',
  },
  uxd: {
    address: '7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT',
    symbols: 'UXD',
    url: 'https://uxd.fi/',
  },
  usdt: {
    address: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
    symbols: 'USDT',
    url: 'https://tether.to/',
  },
  usdh: {
    address: 'USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX',
    symbols: 'USDH',
    url: 'https://hubbleprotocol.io/',
  },
}
