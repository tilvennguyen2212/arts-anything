import { Transaction, PublicKey, Connection } from '@solana/web3.js'
import { utils } from '@project-serum/anchor'
import { Net } from '@sentre/senhub'
import { account } from '@senswap/sen-js'
import axios from 'axios'

import Offset from './offset'
import {
  MagicEdenCollection,
  MagicEdenListingNFT,
  MagicEdenNFTMetadata,
} from './types'

class MagicEdenSDK extends Offset {
  public network: Net
  public endpoint: string
  public connection: Connection
  public service: string

  constructor({
    network,
    service = 'https://cors.sentre.io/magic-eden',
  }: {
    network: Net
    service?: string
  }) {
    super()
    this.network = network
    this.service = service
    this.endpoint = MagicEdenSDK.ENDPOINTS[this.network]
    this.connection = new Connection(MagicEdenSDK.RPCS[this.network])
  }

  static ENDPOINTS: Record<Net, string> = {
    devnet: 'https://api-devnet.magiceden.dev/v2',
    testnet: 'https://api-testnet.magiceden.dev/v2',
    mainnet: 'https://api-mainnet.magiceden.dev/v2',
  }
  static RPCS: Record<Net, string> = {
    devnet: 'https://devnet.genesysgo.net',
    testnet: 'https://api.testnet.solana.com',
    mainnet: 'https://ssc-dao.genesysgo.net/',
  }
  static DEFAULT_REFERRAL: string =
    'autMW8SgBkVYeBgqYiTuJZnkvDZMVU2MHJh9Jh7CSQ2'

  private getURL = ({
    path,
    params,
    auth = false,
  }: {
    path: string
    params?: Record<string, any>
    auth?: boolean
  }) => {
    if (params) for (const key in params) params[key] = params[key].toString()
    const origin = this.endpoint + path
    const searchParams = params ? new URLSearchParams(params).toString() : ''
    const encodedURI = encodeURIComponent(`${origin}?${searchParams}`)
    return `${this.service}/${encodedURI}?auth=${auth}`
  }

  getCollection = async (symbol: string) => {
    if (!symbol) throw new Error('Invalid symbol')
    const url = this.getURL({ path: `/collections/${symbol}` })
    const { data } = await axios.get(url)
    if (!data) throw new Error('Invalid symbol')
    return data as MagicEdenCollection
  }

  getCollections = async (offset = 0, limit = 200) => {
    const params = { offset, limit }
    const url = this.getURL({ path: '/collections', params })
    const { data } = await axios.get(url)
    return (data || []) as MagicEdenCollection[]
  }

  nextCollections = async (limit = 200) => {
    const offset = this.get('collections')
    const data = await this.getCollections(offset, limit)
    this.set('collections', offset + data.length)
    return data
  }

  getListingNFTs = async (symbol: string, offset = 0, limit = 20) => {
    const params = { offset, limit }
    const url = this.getURL({ path: `/collections/${symbol}/listings`, params })
    const { data } = await axios.get(url)
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
    const url = this.getURL({ path: `/tokens/${mintAddress}` })
    const { data } = await axios.get(url)
    if (!data) throw new Error('Invalid mint address')
    return data as MagicEdenNFTMetadata
  }

  // In process
  // M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K
  // https://gist.github.com/tuphan-dn/ec00b4f54341120959e2b5deb65c0f36
  buyNow = async ({
    buyerAddress,
    sellerAddress,
    auctionHouseAddress = '',
    mintAddress,
    price,
    buyerReferralAddress = MagicEdenSDK.DEFAULT_REFERRAL,
    sellerReferralAddress = MagicEdenSDK.DEFAULT_REFERRAL,
    buyerExpiry = 0,
    sellerExpiry = -1,
  }: {
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
  }) => {
    if (!account.isAddress(buyerAddress))
      throw new Error('Invalid buyer address')
    if (!account.isAddress(sellerAddress))
      throw new Error('Invalid seller address')
    if (!account.isAddress(mintAddress)) throw new Error('Invalid mint address')

    const accountPublicKey = await utils.token.associatedAddress({
      mint: new PublicKey(mintAddress),
      owner: new PublicKey(sellerAddress),
    })
    const accountAddress = accountPublicKey.toBase58()
    const params = {
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
    }
    const url = this.getURL({
      path: '/instructions/buy_now',
      params,
      auth: true,
    })
    const { data } = await axios.get(url)
    return Transaction.from(Buffer.from(data.txSigned))
  }
}

export * from './types'
export default MagicEdenSDK
