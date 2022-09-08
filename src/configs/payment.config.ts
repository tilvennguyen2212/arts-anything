import { AcceptedPayment } from '@sentre/otc-sdk'
import { Net } from '@sentre/senhub'

/**
 * Contructor
 */

type Conf = {
  whitelist: AcceptedPayment
}

export const WHITELIST: AcceptedPayment = {
  usdc: {
    address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    symbol: 'USDC',
    decimals: 6,
    url: 'https://www.circle.com/en/usdc',
  },
  uxd: {
    address: '7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT',
    symbol: 'UXD',
    decimals: 6,
    url: 'https://uxd.fi/',
  },
  usdt: {
    address: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
    symbol: 'USDT',
    decimals: 6,
    url: 'https://tether.to/',
  },
  usdh: {
    address: 'USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX',
    symbol: 'USDH',
    decimals: 6,
    url: 'https://hubbleprotocol.io/',
  },
}

const conf: Record<Net, Conf> = {
  /**
   * Devnet configurations
   */
  devnet: {
    whitelist: WHITELIST,
  },

  /**
   * Testnet configurations
   */
  testnet: {
    whitelist: WHITELIST,
  },

  /**
   * Mainnet configurations
   */
  mainnet: {
    whitelist: WHITELIST,
  },
}

/**
 * Module exports
 */
export default conf
