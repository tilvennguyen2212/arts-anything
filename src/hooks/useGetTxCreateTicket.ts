import { useCallback } from 'react'
import { Connection, PublicKey } from '@solana/web3.js'
import { AnchorProvider, Wallet } from '@project-serum/anchor'
import { rpc, useWalletAddress } from '@sentre/senhub'
import LuckyWheelProgram from '@sentre/lucky-wheel-core'

import configs from 'configs'

export const useGetTxCreateTicket = () => {
  const walletAddress = useWalletAddress()

  const getTxCreateTicket = useCallback(async () => {
    const connection = new Connection(rpc, 'confirmed')

    const wrapWallet: Wallet = {
      payer: undefined as any,
      publicKey: new PublicKey(walletAddress),
      signAllTransactions: window.sentre.wallet.signAllTransactions,
      signTransaction: window.sentre.wallet.signTransaction,
    }
    const provider = new AnchorProvider(connection, wrapWallet, {
      commitment: 'confirmed',
      skipPreflight: true,
    })
    const program = new LuckyWheelProgram(provider, configs.lottery.programId)
    const { tx } = await program.initializeTicket({
      campaign: new PublicKey(configs.lottery.campaignId),
      sendAndConfirm: false,
    })
    return tx
  }, [walletAddress])

  return getTxCreateTicket
}
