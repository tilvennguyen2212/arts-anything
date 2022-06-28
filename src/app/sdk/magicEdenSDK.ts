import { PublicKey } from '@solana/web3.js'
import { account } from '@senswap/sen-js'
import axios from 'axios'

import { Net } from 'shared/runtime'
import Offset from './offset'

const API_KEY = '0a98aba7-8649-4754-8964-e2ff519538d6'

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

export type MagicEdenRarity = Record<
  'moonrank' | 'howrare',
  {
    rank: number
  }
>

export type MagicEdenListingNFT = {
  pdaAddress: string
  auctionHouse: string
  tokenAddress: string
  tokenMint: string
  seller: string
  tokenSize: number
  price: number
  rarity: Partial<MagicEdenRarity>
  extra: {
    img: string
  }
}

export type MagicEdenCreator = {
  address: string
  share: number
}

export type MagicEdenAttribute = {
  trait_type: string
  value: string
}

export type MagicEdenFile = {
  uri: string
  type: 'image/jpeg' | 'image/png' | 'image/gif' | 'video/mp4'
}

export type MagicEdenNFTMetadata = {
  mintAddress: string
  owner: string
  supply: number
  collection: string
  name: string
  updateAuthority: string
  primarySaleHappened: number
  sellerFeeBasisPoints: number
  image: string
  animationUrl: string
  externalUrl: string
  attributes: MagicEdenAttribute[]
  properties: {
    files: MagicEdenFile[]
    category: string
    creators: MagicEdenCreator[]
  }
}

export type MagicEdenBuyNow = {
  buyerAddress: string
  sellerAddress: string
  auctionHouseAddress: string
  mintAddress: string
  accountAddress?: string
  price: number
  buyerReferralAddress?: string
  sellerReferralAddress?: string
  buyerExpiry?: number
  sellerExpiry?: number
}

export type MagicEdenInstruction = {
  tx: {
    type: 'Buffer'
    data: number[]
  }
}

class MagicEdenSDK extends Offset {
  public network: Net
  public endpoint: string

  constructor(network: Net) {
    super()
    this.network = network
    this.endpoint = MagicEdenSDK.ENDPOINTS[this.network]
  }

  static ENDPOINTS: Record<Net, string> = {
    devnet: 'https://api-devnet.magiceden.dev/v2',
    testnet: 'https://api-testnet.magiceden.dev/v2',
    mainnet: 'https://api-mainnet.magiceden.dev/v2',
  }

  static programId = new PublicKey(
    'M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K',
  )

  getCollection = async (symbol: string) => {
    if (!symbol) throw new Error('Invalid symbol')
    const url = `${this.endpoint}/collections/${symbol}`
    const { data } = await axios.get(url)
    if (!data) throw new Error('Invalid symbol')
    return data as MagicEdenCollection
  }

  getCollections = async (offset = 0, limit = 200) => {
    const url = `${this.endpoint}/collections`
    const { data } = await axios.get(url, { params: { offset, limit } })
    return (data || []) as MagicEdenCollection[]
  }

  nextCollections = async (limit = 200) => {
    const offset = this.get('collections')
    const data = await this.getCollections(offset, limit)
    this.set('collections', offset + data.length)
    return data
  }

  getListingNFTs = async (symbol: string, offset = 0, limit = 20) => {
    const url = `${this.endpoint}/collections/${symbol}/listings`
    const { data } = await axios.get(url, { params: { offset, limit } })
    return (data || []) as MagicEdenListingNFT[]
  }

  nextListingNFTs = async (symbol: string, limit = 20) => {
    const offset = this.get(symbol)
    const data = await this.getListingNFTs(symbol, offset, limit)
    this.set(symbol, offset + data.length)
    return data
  }

  getNFTMetadata = async (mintAddress: string) => {
    if (!account.isAddress(mintAddress)) throw new Error('Invalid mint address')
    const url = `${this.endpoint}/tokens/${mintAddress}`
    const { data } = await axios.get(url)
    if (!data) throw new Error('Invalid mint address')
    return data as MagicEdenNFTMetadata
  }

  buyNow = async ({
    buyerAddress,
    sellerAddress,
    auctionHouseAddress = '',
    mintAddress,
    accountAddress,
    price,
    buyerReferralAddress = '',
    sellerReferralAddress = '',
    buyerExpiry = 0,
    sellerExpiry = 0,
  }: MagicEdenBuyNow) => {
    if (!account.isAddress(buyerAddress))
      throw new Error('Invalid buyer address')
    if (!account.isAddress(sellerAddress))
      throw new Error('Invalid seller address')
    if (!account.isAddress(mintAddress)) throw new Error('Invalid mint address')
    if (!account.isAddress(accountAddress))
      throw new Error('Invalid account address')
    const url = `${this.endpoint}/instructions/buy_now`
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      params: {
        buyer: buyerAddress,
        seller: sellerAddress,
        auctionHouseAddress,
        tokenMint: mintAddress,
        tokenATA: accountAddress,
        price,
        buyerReferral: buyerReferralAddress,
        sellerReferral: sellerReferralAddress,
        buyerExpiry,
        sellerExpiry,
      },
    })
    // In process
    // https://gist.github.com/tuphan-dn/ec00b4f54341120959e2b5deb65c0f36
    return data as MagicEdenInstruction
  }
}

export default MagicEdenSDK
