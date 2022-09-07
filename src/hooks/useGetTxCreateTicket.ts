import { useCallback } from 'react'
import { Connection, Keypair, PublicKey } from '@solana/web3.js'
import { AnchorProvider } from '@project-serum/anchor'
import NodeWallet from '@project-serum/anchor/dist/cjs/nodewallet'
import { rpc, useWalletAddress } from '@sentre/senhub'
import LuckyWheelProgram from '@sentre/lucky-wheel-core'

import configs from 'configs'

export const useGetTxCreateTicket = () => {
  const walletAddress = useWalletAddress()

  const getTxCreateTicket = useCallback(async () => {
    const ticket = new Keypair()
    const ticketSigner = new NodeWallet(ticket)
    const connection = new Connection(rpc, 'confirmed')
    const wrappedWallet = {
      publicKey: new PublicKey(walletAddress),
      signAllTransactions: window.sentre.wallet.signAllTransactions,
      signTransaction: window.sentre.wallet.signTransaction,
    }
    const provider = new AnchorProvider(connection, wrappedWallet, {
      commitment: 'confirmed',
      skipPreflight: true,
    })
    const program = new LuckyWheelProgram(provider, configs.lottery.programId)
    const { tx } = await program.initializeTicket({
      campaign: new PublicKey(configs.lottery.campaignId),
      ticket,
      sendAndConfirm: false,
    })
    tx.feePayer = tx.feePayer || wrappedWallet.publicKey
    tx.recentBlockhash =
      tx.recentBlockhash ||
      (await provider.connection.getLatestBlockhash('confirmed')).blockhash
    const partiallySignedTx = await ticketSigner.signTransaction(tx)
    return partiallySignedTx
  }, [walletAddress])

  return getTxCreateTicket
}
