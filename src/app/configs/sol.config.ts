import { Net, rpc } from 'shared/runtime'

/**
 * Contructor
 */
type Conf = {
  node: string
}

const conf: Record<Net, Conf> = {
  /**
   * Development configurations
   */
  devnet: {
    node: rpc,
  },

  /**
   * Staging configurations
   */
  testnet: {
    node: rpc,
  },

  /**
   * Production configurations
   */
  mainnet: {
    node: rpc,
  },
}

/**
 * Module exports
 */
export default conf
