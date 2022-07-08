import { env } from '@sentre/senhub'
import manifest from './manifest.config'
import pagination from './pagination.config'

const configs = {
  manifest: manifest[env],
  pagination: pagination[env],
}

/**
 * Module exports
 */
export default configs
