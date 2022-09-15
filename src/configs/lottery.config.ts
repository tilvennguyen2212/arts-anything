import { Net } from '@sentre/senhub'

/**
 * Contructor
 */
type Conf = {
  programId: string
  campaignId: string
  taxmanAddress: string
  platformFee: number
}

const conf: Record<Net, Conf> = {
  /**
   * Devnet configurations
   */
  devnet: {
    programId: '38k8ejgfKJ2VKRApCMkev1hQwqobTTZPLnX11t2dxAXA',
    campaignId: '8cFGT2AKmVvbmHMNZ23SNbL6rvqAcvZ79TXtanmEEBDm',
    taxmanAddress: '9doo2HZQEmh2NgfT3Yx12M89aoBheycYqH1eaR5gKb3e',
    platformFee: 5000000,
  },

  /**
   * Testnet configurations
   */
  testnet: {
    programId: '',
    campaignId: '',
    taxmanAddress: '',
    platformFee: 5000000,
  },

  /**
   * Production configurations
   */
  mainnet: {
    programId: '3sFeMcoZbqRJVVZpv2jvK6zfDopJ48B2vxzTBsHPoSJ7',
    campaignId: '6o6qwGH8WzntHBg5rf64zPUQJKGr7WtGgBhhfhEwpHj8',
    taxmanAddress: '9doo2HZQEmh2NgfT3Yx12M89aoBheycYqH1eaR5gKb3e',
    platformFee: 5000000,
  },
}

/**
 * Module exports
 */
export default conf
