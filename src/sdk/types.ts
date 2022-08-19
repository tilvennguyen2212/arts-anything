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

export type MagicEdenPopularCollection = {
  collectionSymbol: string
  fp: number
  image: string
  name: string
  ownerCount: number
  rank: number
  tokenCount: number
  totalVol: number
  txns: number
  updatedAt: number
  vol: number
  volDelta: number
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
