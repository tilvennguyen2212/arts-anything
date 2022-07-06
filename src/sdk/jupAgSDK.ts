import {
  Cluster,
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  Transaction,
} from '@solana/web3.js'
import { Jupiter } from '@jup-ag/core'

import configs from 'configs'

const {
  sol: { node },
} = configs
const connection = new Connection(node)

export const INPUTS = {
  usdc: {
    address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    symbols: 'USDC',
  },
  uxd: {
    address: '7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT',
    symbols: 'UXD',
  },
}

export const swapToSOL = async ({
  amount,
  walletAddress,
  cluster = 'mainnet-beta',
}: {
  amount: number
  walletAddress: string
  cluster?: Cluster
}) => {
  const sol = amount * 1.01
  const { address, symbols } = INPUTS.usdc
  const { data } = await (
    await fetch(`https://price.jup.ag/v1/price?id=SOL&vsToken=${symbols}`)
  ).json()
  const inputAmount = sol * data.price * 10 ** 6
  const jupiter = await Jupiter.load({
    connection,
    cluster,
    user: new PublicKey(walletAddress),
  })
  const {
    routesInfos: [routeInfo],
  } = await jupiter.computeRoutes({
    inputMint: new PublicKey(address),
    outputMint: new PublicKey('So11111111111111111111111111111111111111112'),
    inputAmount,
    slippage: 1,
    forceFetch: true,
  })
  console.log('Input Amount', inputAmount / 10 ** 6)
  console.log(
    'Minimum Output Amount',
    routeInfo.outAmountWithSlippage / LAMPORTS_PER_SOL,
  )
  console.log(routeInfo)
  const {
    transactions: { setupTransaction, swapTransaction, cleanupTransaction },
  } = await jupiter.exchange({ routeInfo })
  const txs = [setupTransaction, swapTransaction, cleanupTransaction].filter(
    (tx) => tx,
  ) as Transaction[]
  return txs
}

export const sendAndConfirm = async (signedTxs: Transaction[]) => {
  let txIds = []
  for (const signedTx of signedTxs) {
    const txId = await connection.sendRawTransaction(signedTx.serialize(), {
      skipPreflight: true,
      preflightCommitment: 'confirmed',
    })
    await connection.confirmTransaction(txId)
    txIds.push(txId)
  }
  return txIds
}
