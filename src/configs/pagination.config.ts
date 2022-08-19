import { Env } from '@sentre/senhub'

/**
 * Contructor
 */
type Conf = {
  limit: number
}

const conf: Record<Env, Conf> = {
  /**
   * Development configurations
   */
  development: {
    limit: 12,
  },

  /**
   * Production configurations
   */
  production: {
    limit: 12,
  },
}

/**
 * Module exports
 */
export default conf
