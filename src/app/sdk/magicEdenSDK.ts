import axios from 'axios'
import { Net } from 'shared/runtime'

export const ENDPOINTS: Record<Net, string> = {
  devnet: 'https://api-devnet.magiceden.dev/v2',
  testnet: 'https://api-testnet.magiceden.dev/v2',
  mainnet: 'https://api-mainnet.magiceden.dev/v2',
}

export type MagicEdenCollection = {
  categories: string[]
  description: string
  discord: string
  image: string
  name: string
  symbol: string
  twitter: string
  website: string
}

export type MagicEdenNFT = {
  pdaAddress: string
  auctionHouse: string
  tokenAddress: string
  tokenMint: string
  seller: string
  tokenSize: number
  price: number
}

class MagicEdenSDK {
  public network: Net
  public endpoint: string

  constructor(network: Net) {
    this.network = network
    this.endpoint = ENDPOINTS[this.network]
  }

  getCollections = async (offset = 0, limit = 200) => {
    const url = `${this.endpoint}/collections`
    const { data } = await axios.get(url, { params: { offset, limit } })
    return data as MagicEdenCollection[]
  }

  getNFTs = async (symbol: string, offset = 0, limit = 20) => {
    const url = `${this.endpoint}/collections/${symbol}/listings`
    const { data } = await axios.get(url, { params: { offset, limit } })
    return data as MagicEdenNFT | undefined
  }
}

export default MagicEdenSDK
