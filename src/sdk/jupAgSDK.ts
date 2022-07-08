import { Cluster, Connection, PublicKey, Transaction } from '@solana/web3.js'
import { Jupiter } from '@jup-ag/core'

import configs from 'configs'
import { AcceptedPaymentMetadata } from './otcSDK'

const {
  sol: { node },
} = configs
const connection = new Connection(node)

export const swapToSOL = async ({
  amount,
  payment,
  walletAddress,
  cluster = 'mainnet-beta',
}: {
  amount: number
  payment: AcceptedPaymentMetadata
  walletAddress: string
  cluster?: Cluster
}) => {
  const sol = amount * 1.01
  const { address, symbol } = payment
  const { data } = await (
    await fetch(`https://price.jup.ag/v1/price?id=SOL&vsToken=${symbol}`)
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

export const estimateExchangePrice = async ({
  tokenSymbol,
  nftPrice,
}: {
  tokenSymbol: string
  nftPrice: number
}) => {
  const solPrice = nftPrice
  const { data } = await (
    await fetch(`https://price.jup.ag/v1/price?id=SOL&vsToken=${tokenSymbol}`)
  ).json()

  const estimatePrice = solPrice * data.price

  return { estimatePrice, solPrice, tokenInfo: data }
}
