import { useCallback, useEffect, useState } from 'react'
import { useWallet } from '@sentre/senhub'

import useAccountBalance from 'shared/hooks/useAccountBalance'

const usePriceExchange = (price: number, tokenSymbol: string) => {
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const [estPrice, setEstPrice] = useState<number>(0)
  const [tokenAccount, setTokenAccount] = useState('')
  const { balance } = useAccountBalance(tokenAccount)

  const estimateExchangePrice = async ({
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

  const estimatePrice = useCallback(async () => {
    if (tokenSymbol === 'sol') {
      setTokenAccount(walletAddress)
      return setEstPrice(price)
    }

    const { splt } = window.sentre
    const { estimatePrice, tokenInfo } = await estimateExchangePrice({
      tokenSymbol: tokenSymbol,
      nftPrice: price,
    })
    const tokenAddres = await splt.deriveAssociatedAddress(
      walletAddress,
      tokenInfo?.vsToken,
    )
    setTokenAccount(tokenAddres)
    return setEstPrice(estimatePrice)
  }, [price, tokenSymbol, walletAddress])

  useEffect(() => {
    estimatePrice()
  }, [estimatePrice])

  const validBuy = useCallback(() => {
    let isValid = true
    if (balance < estPrice) isValid = false
    return isValid
  }, [balance, estPrice])

  return { estPrice, validBuy }
}

export default usePriceExchange
