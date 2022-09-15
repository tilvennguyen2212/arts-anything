import { useCallback } from 'react'
import { Connection, Keypair, PublicKey, SystemProgram } from '@solana/web3.js'
import { AnchorProvider } from '@project-serum/anchor'
import NodeWallet from '@project-serum/anchor/dist/cjs/nodewallet'
import { rpc, useWalletAddress } from '@sentre/senhub'
import LuckyWheelProgram from '@sentre/lucky-wheel-core'
import { hash } from 'tweetnacl'
import xor from 'buffer-xor'

import configs from 'configs'

const {
  lottery: { programId, campaignId, taxmanAddress, platformFee },
} = configs

export const useGetTxCreateTicket = () => {
  const walletAddress = useWalletAddress()

  const getTxCreateTicket = useCallback(
    async (seed: Buffer) => {
      const ticket = Keypair.fromSeed(
        xor(
          Buffer.from(hash(seed).slice(0, 32)),
          Buffer.from(hash(seed).slice(32, 64)),
        ),
      )
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
      const program = new LuckyWheelProgram(provider, programId)
      // Init Ix
      const { tx } = await program.initializeTicket({
        campaign: new PublicKey(campaignId),
        ticket,
        sendAndConfirm: false,
      })
      // Fee Ix
      const ix = SystemProgram.transfer({
        fromPubkey: new PublicKey(walletAddress),
        toPubkey: new PublicKey(taxmanAddress),
        lamports: platformFee,
      })
      tx.add(ix)
      // Tx info
      tx.feePayer = tx.feePayer || wrappedWallet.publicKey
      tx.recentBlockhash =
        tx.recentBlockhash ||
        (await provider.connection.getLatestBlockhash('confirmed')).blockhash
      const partiallySignedTx = await ticketSigner.signTransaction(tx)
      return partiallySignedTx
    },
    [walletAddress],
  )

  return getTxCreateTicket
}
