import { Net, rpc } from 'shared/runtime'

/**
 * Contructor
 */
type Conf = {
  node: string
  metaplexAddress: string
}

const conf: Record<Net, Conf> = {
  /**
   * Development configurations
   */
  devnet: {
    node: rpc,
    metaplexAddress: 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
  },

  /**
   * Staging configurations
   */
  testnet: {
    node: rpc,
    metaplexAddress: 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
  },

  /**
   * Production configurations
   */
  mainnet: {
    node: rpc,
    metaplexAddress: 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
  },
}

/**
 * Module exports
 */
export default conf
