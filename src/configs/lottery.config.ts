import { Net } from '@sentre/senhub'

/**
 * Contructor
 */
type Conf = {
  programId: string
  campaignId: string
}

const conf: Record<Net, Conf> = {
  /**
   * Devnet configurations
   */
  devnet: {
    programId: '38k8ejgfKJ2VKRApCMkev1hQwqobTTZPLnX11t2dxAXA',
    campaignId: '8cFGT2AKmVvbmHMNZ23SNbL6rvqAcvZ79TXtanmEEBDm',
  },

  /**
   * Testnet configurations
   */
  testnet: {
    programId: '38k8ejgfKJ2VKRApCMkev1hQwqobTTZPLnX11t2dxAXA',
    campaignId: '8cFGT2AKmVvbmHMNZ23SNbL6rvqAcvZ79TXtanmEEBDm',
  },

  /**
   * Production configurations
   */
  mainnet: {
    programId: '3sFeMcoZbqRJVVZpv2jvK6zfDopJ48B2vxzTBsHPoSJ7',
    campaignId: '6o6qwGH8WzntHBg5rf64zPUQJKGr7WtGgBhhfhEwpHj8',
  },
}

/**
 * Module exports
 */
export default conf
