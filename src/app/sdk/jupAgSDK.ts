import {
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  Transaction,
} from '@solana/web3.js'
import { Jupiter } from '@jup-ag/core'

import { net } from 'shared/runtime'
import configs from 'app/configs'

const {
  sol: { node },
} = configs
const connection = new Connection(node)
const cluster = net === 'mainnet' ? 'mainnet-beta' : net

const USDC_ADDRESS = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
// const UXD_ADDRESS = '7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT'
const SOL_ADDRESS = 'So11111111111111111111111111111111111111112'

export const swapToSOL = async (amount: number, walletAddress: string) => {
  const sol = amount * 1.01
  const { data } = await (
    await fetch('https://price.jup.ag/v1/price?id=SOL&vsToken=USDC')
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
    inputMint: new PublicKey(USDC_ADDRESS),
    outputMint: new PublicKey(SOL_ADDRESS),
    inputAmount,
    slippage: 1,
    forceFetch: true,
  })
  console.log('inputAmount', inputAmount / 10 ** 6)
  console.log('outputAmount', routeInfo.outAmount / LAMPORTS_PER_SOL)
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
