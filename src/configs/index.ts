import { env, net } from '@sentre/senhub'
import manifest from './manifest.config'
import pagination from './pagination.config'
import payment from './payment.config'
import lottery from './lottery.config'

const configs = {
  manifest: manifest[env],
  pagination: pagination[env],
  payment: payment[net],
  lottery: lottery[net],
}

/**
 * Module exports
 */
export default configs
