import { useCallback, useEffect, useMemo, useState } from 'react'
import { useWalletAddress } from '@sentre/senhub'

import useAccountBalance from 'hooks/useAccountBalance'

const usePriceExchange = (price: number, tokenSymbol: string) => {
  const walletAddress = useWalletAddress()
  const [estPrice, setEstPrice] = useState<number>(0)
  const [tokenAccount, setTokenAccount] = useState('')
  const { balance } = useAccountBalance(tokenAccount)
  const validBuy = useMemo(
    () => (balance < estPrice ? false : true),
    [balance, estPrice],
  )

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

  return { estPrice, validBuy }
}

export default usePriceExchange
