import { Transaction, Connection, Commitment } from '@solana/web3.js'
import { util } from '@sentre/senhub'
import axios from 'axios'

import Offset from './offset'
import {
  MagicEdenCollection,
  MagicEdenPopularCollection,
  MagicEdenListingNFT,
  MagicEdenNFTMetadata,
  ListStatus,
  MagicEdenMyNFT,
  MagicEdenCollectionStat,
} from './types'

export const MIN_SEARCH_LENGTH = 3

class MagicEdenSDK extends Offset {
  private api: string = 'https://api-mainnet.magiceden.dev/v2'
  private connection: Connection
  private stat: string = 'https://stats-mainnet.magiceden.io/collection_stats'
  private service: string = 'https://cors.sentre.io/magic-eden'
  private referralAddress: string =
    '9doo2HZQEmh2NgfT3Yx12M89aoBheycYqH1eaR5gKb3e'
  private auctionHouseAddress: string =
    'E8cU1WiRWjanGxmn96ewBgk9vPTcL6AEZ1t6F6fkgUWe'

  constructor(rpc: string) {
    super()
    this.connection = new Connection(rpc)
  }

  private getAPI = ({
    path,
    params,
    auth = false,
  }: {
    path: string
    params?: Record<string, any>
    auth?: boolean
  }) => {
    if (params) for (const key in params) params[key] = params[key].toString()
    const origin = this.api + path
    const searchParams = params
      ? `?${new URLSearchParams(params).toString()}`
      : ''
    const encodedURI = encodeURIComponent(`${origin}${searchParams}`)
    return `${this.service}/forward/${encodedURI}?auth=${auth}`
  }

  private getStat = ({
    path,
    params,
  }: {
    path: string
    params?: Record<string, any>
  }) => {
    if (params) for (const key in params) params[key] = params[key].toString()
    const origin = this.stat + path
    const searchParams = params
      ? `?${new URLSearchParams(params).toString()}`
      : ''
    const encodedURI = encodeURIComponent(`${origin}${searchParams}`)
    return `${this.service}/forward/${encodedURI}`
  }

  getMyNFTs = async (
    walletAddress: string,
    listStatus: ListStatus = 'both',
  ) => {
    if (!util.isAddress(walletAddress))
      throw new Error('Invalid wallet address')
    const offset = 0
    const limit = 500
    const url = this.getAPI({
      path: `/wallets/${walletAddress}/tokens`,
      params: {
        offset,
        limit,
        listStatus,
      },
    })
    const { data } = await axios.get(url)
    if (!data) throw new Error('Invalid wallet address')
    return data as MagicEdenMyNFT[]
  }

  getCollection = async (symbol: string) => {
    if (!symbol) throw new Error('Invalid symbol')
    const url = `${this.service}/collections/${symbol}`
    const { data } = await axios.get(url)
    if (!data) throw new Error('Invalid symbol')
    return data as MagicEdenCollection
  }

  getCollectionStat = async (symbol: string) => {
    if (!symbol) throw new Error('Invalid symbol')
    const url = this.getAPI({ path: `/collections/${symbol}/stats` })
    const { data } = await axios.get(url)
    if (!data) throw new Error('Invalid symbol')
    return data as MagicEdenCollectionStat
  }

  getCollections = async (offset = 0, limit = 50) => {
    const url = `${this.service}/collections?offset=${offset}&limit=${limit}`
    const { data } = await axios.get(url)
    return (data || []) as MagicEdenCollection[]
  }

  getPopularCollections = async (window = '1d', limit = 12) => {
    const url = this.getStat({
      path: '/popular_collections/sol',
      params: {
        window,
        limit,
      },
    })
    const { data } = await axios.get(url)
    return (data || []) as MagicEdenPopularCollection[]
  }

  nextCollections = async (limit = 50) => {
    const offset = this.get('collections')
    const data = await this.getCollections(offset, limit)
    this.set('collections', offset + data.length)
    return data
  }

  searchCollections = async (search = '') => {
    if (!search || search.length <= MIN_SEARCH_LENGTH) return undefined
    const offset = 0
    const limit = 5
    const url = `${this.service}/collections?search=${search}&offset=${offset}&limit=${limit}`
    const { data } = await axios.get(url)
    return (data || []) as MagicEdenCollection[]
  }

  getListingNFTs = async (symbol: string, offset = 0, limit = 20) => {
    const params = { offset, limit }
    const url = this.getAPI({ path: `/collections/${symbol}/listings`, params })
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
    if (!util.isAddress(mintAddress)) throw new Error('Invalid mint address')
    const url = this.getAPI({ path: `/tokens/${mintAddress}` })
    const { data } = await axios.get(url)
    if (!data) throw new Error('Invalid mint address')
    return data as MagicEdenNFTMetadata
  }

  buyNow = async ({
    buyerAddress,
    sellerAddress,
    auctionHouseAddress,
    mintAddress,
    price,
    sellerReferralAddress,
  }: {
    buyerAddress: string
    sellerAddress: string
    auctionHouseAddress: string
    mintAddress: string
    price: number
    sellerReferralAddress: string
  }) => {
    if (!util.isAddress(buyerAddress)) throw new Error('Invalid buyer address')
    if (!util.isAddress(sellerAddress))
      throw new Error('Invalid seller address')
    if (!util.isAddress(mintAddress)) throw new Error('Invalid mint address')

    const accountAddress = await util.deriveAssociatedAddress(
      sellerAddress,
      mintAddress,
    )
    const params = {
      buyer: buyerAddress,
      seller: sellerAddress,
      auctionHouseAddress,
      tokenMint: mintAddress,
      tokenATA: accountAddress,
      price,
      buyerReferral: this.referralAddress,
      sellerReferral: sellerReferralAddress,
      buyerExpiry: 0,
      sellerExpiry: -1,
    }
    const url = this.getAPI({
      path: '/instructions/buy_now',
      params,
      auth: true,
    })
    const { data } = await axios.get(url)
    return Transaction.from(Buffer.from(data.txSigned))
  }

  sell = async ({
    sellerAddress,
    mintAddress,
    price,
  }: {
    sellerAddress: string
    mintAddress: string
    price: number
  }) => {
    if (!util.isAddress(sellerAddress))
      throw new Error('Invalid seller address')
    if (!util.isAddress(mintAddress)) throw new Error('Invalid mint address')

    const accountAddress = await util.deriveAssociatedAddress(
      sellerAddress,
      mintAddress,
    )
    const params = {
      seller: sellerAddress,
      auctionHouseAddress: this.auctionHouseAddress,
      tokenMint: mintAddress,
      tokenAccount: accountAddress,
      price,
      sellerReferral: this.referralAddress,
      expiry: -1,
    }
    const url = this.getAPI({
      path: '/instructions/sell',
      params,
      auth: true,
    })
    const { data } = await axios.get(url)
    return Transaction.from(Buffer.from(data.txSigned))
  }

  cancel = async ({
    sellerAddress,
    mintAddress,
    price,
  }: {
    sellerAddress: string
    mintAddress: string
    price: number
  }) => {
    if (!util.isAddress(sellerAddress))
      throw new Error('Invalid seller address')
    if (!util.isAddress(mintAddress)) throw new Error('Invalid mint address')

    const accountAddress = await util.deriveAssociatedAddress(
      sellerAddress,
      mintAddress,
    )
    const params = {
      seller: sellerAddress,
      auctionHouseAddress: this.auctionHouseAddress,
      tokenMint: mintAddress,
      tokenAccount: accountAddress,
      price,
      sellerReferral: this.referralAddress,
      expiry: -1,
    }
    const url = this.getAPI({
      path: '/instructions/sell_cancel',
      params,
      auth: true,
    })
    const { data } = await axios.get(url)
    return Transaction.from(Buffer.from(data.txSigned))
  }

  sendAndConfirm = async (
    signedTx: Transaction,
    commitment: Commitment = 'confirmed',
  ) => {
    const txId = await this.connection.sendRawTransaction(
      signedTx.serialize(),
      {
        skipPreflight: true,
        preflightCommitment: 'confirmed',
      },
    )
    await this.connection.confirmTransaction(txId, commitment)
    return txId
  }
}

export * from './types'
export default MagicEdenSDK
