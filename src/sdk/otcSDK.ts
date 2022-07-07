import axios from 'axios'
import { account } from '@senswap/sen-js'
import { Transaction } from '@solana/web3.js'

export type AcceptedPaymentMetadata = {
  address: string
  symbol: string
  decimals: number
  url: string
}
export type AcceptedPayment = Record<string, AcceptedPaymentMetadata>

export const CACHED_WHITELIST: AcceptedPayment = {
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

class OTCSDK {
  public service: string
  constructor(service: string = 'https://cors.sentre.io/otc') {
    this.service = service
  }

  getWhitelist = async () => {
    const url = `${this.service}/whitelist`
    const { data } = await axios.get(url)
    return data as AcceptedPayment
  }

  exchange = async ({
    walletAddress,
    tokenSymbol,
    solAmount,
  }: {
    walletAddress: string
    tokenSymbol: string
    solAmount: number
  }) => {
    if (!account.isAddress(walletAddress))
      throw new Error('Invalid wallet address')
    if (!Object.keys(CACHED_WHITELIST).includes(tokenSymbol.toLowerCase()))
      throw new Error('Unsupported token symbol')
    if (solAmount <= 0) throw new Error('SOL amount must be greater than zero')

    const url = `${this.service}/exchange/${walletAddress}/${tokenSymbol}/${solAmount}`
    const {
      data: { signedTx },
    } = await axios.get(url)
    if (!signedTx) throw new Error('Cannot build the exchange transaction')
    const buf = Buffer.from(signedTx)
    return Transaction.from(buf)
  }
}

export default OTCSDK
