import { DEFAULT_EMPTY_ADDRESS, utils } from '@senswap/sen-js'
import {
  util,
  useAccounts,
  useWalletAddress,
  useWalletBalance,
  useMintDecimals,
} from '@sentre/senhub'

export type AccountBalanceReturn = {
  amount: bigint
  decimals: number
  balance: number
  mintAddress: string
}

const buildResult = (
  mintAddress?: string,
  amount?: string,
  decimals?: number,
) => {
  if (
    !util.isAddress(mintAddress) ||
    amount === undefined ||
    decimals === undefined
  )
    return { amount: BigInt(0), decimals: 0, balance: 0 }
  return {
    mintAddress,
    amount,
    decimals,
    balance: Number(utils.undecimalize(BigInt(amount), decimals)),
  }
}

/**
 * Get account balance. This hook needs WalletProvider, MintProvider, and AccountProvider for working.
 * WalletProvider Ref: https://docs.sentre.io/senhub/development/providers/wallet-provider
 * MintProvider Ref: https://docs.sentre.io/senhub/development/providers/mint-provider
 * AccountProvider Ref: https://docs.sentre.io/senhub/development/providers/account-provider
 * @param accountAddress Associated account address
 * @returns AccountBalanceReturn
 * - AccountBalanceReturn.amount: The amount with decimals
 * - AccountBalanceReturn.decimals: The corresponding mint decimals
 * - AccountBalanceReturn.balance: The human-readable balance (undecimalized amount)
 * - AccountBalanceReturn.mintAddress: The corresponding mint
 */
const useAccountBalance = (accountAddress: string) => {
  const walletAddress = useWalletAddress()
  const lamports = useWalletBalance()
  const accounts = useAccounts()
  const { amount, mint: mintAddress } = accounts[accountAddress] || {}
  const decimals = useMintDecimals({ mintAddress }) || 0

  if (!util.isAddress(walletAddress) || !util.isAddress(accountAddress))
    return buildResult()
  if (accountAddress === walletAddress)
    return buildResult(DEFAULT_EMPTY_ADDRESS, lamports.toString(), 9)

  return buildResult(mintAddress, amount.toString(), decimals)
}

export default useAccountBalance
