import { Env } from '@sentre/senhub'

const HOT_LIST = [
  'degods',
  'okay_bears',
  'degentown',
  'primates',
  'shadowy_super_coder_dao',
  'trippin_ape_tribe',
  'justape',
  'yeah_tigers',
  'solana_monkey_business',
  'blocksmith_labs',
  'bubblegoose_ballers',
  'aurory',
  'degenerate_ape_academy',
  'communi3',
  'solpunks',
  'stepn',
]

/**
 * Contructor
 */
type Conf = {
  limit: number
  hotList: string[]
}

const conf: Record<Env, Conf> = {
  /**
   * Development configurations
   */
  development: {
    limit: 12,
    hotList: HOT_LIST,
  },

  /**
   * Staging configurations
   */
  staging: {
    limit: 12,
    hotList: HOT_LIST,
  },

  /**
   * Production configurations
   */
  production: {
    limit: 12,
    hotList: HOT_LIST,
  },
}

/**
 * Module exports
 */
export default conf
