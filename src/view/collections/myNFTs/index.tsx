import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useWalletAddress, util } from '@sentre/senhub'

import { Col, Row } from 'antd'
import ViewedList from './viewedList'

import { AppDispatch, AppState } from 'model'
import { getMyNFTs } from 'model/mine.controller'
import MyNFTCard from 'components/myNFTCard'
import { magicEdenSDK } from 'model/collections.controller'

const MyNFTs = () => {
  const [handlingAddress, setHandlingAddress] = useState('')
  const dispatch = useDispatch<AppDispatch>()
  const walletAddress = useWalletAddress()
  const mine = useSelector((state: AppState) => state.mine)

  const onSell = useCallback(
    async (mintAddress: string, price: string) => {
      try {
        setHandlingAddress(mintAddress)
        const sellTransaction = await magicEdenSDK.sell({
          sellerAddress: walletAddress,
          mintAddress,
          price: Number(price),
        })
        const signedTx = await window.sentre.solana.signTransaction(
          sellTransaction,
        )
        const txId = await magicEdenSDK.sendAndConfirm(signedTx)
        return window.notify({
          type: 'success',
          description: `Successfully list the NFT. Click to view details.`,
          onClick: () => window.open(util.explorer(txId), '_blank'),
        })
      } catch (er: any) {
        return window.notify({
          type: 'error',
          description: er.response?.data?.message || er.message,
        })
      } finally {
        return setHandlingAddress('')
      }
    },
    [walletAddress],
  )

  const onCancel = useCallback(
    async (mintAddress: string, price: string) => {
      try {
        setHandlingAddress(mintAddress)
        const sellTransaction = await magicEdenSDK.cancel({
          sellerAddress: walletAddress,
          mintAddress,
          price: Number(price),
        })
        const signedTx = await window.sentre.solana.signTransaction(
          sellTransaction,
        )
        const txId = await magicEdenSDK.sendAndConfirm(signedTx)
        return window.notify({
          type: 'success',
          description: `Successfully cancel the NFT. Click to view details.`,
          onClick: () => window.open(util.explorer(txId), '_blank'),
        })
      } catch (er: any) {
        return window.notify({
          type: 'error',
          description: er.response?.data?.message || er.message,
        })
      } finally {
        return setHandlingAddress('')
      }
    },
    [walletAddress],
  )

  useEffect(() => {
    if (util.isAddress(walletAddress)) dispatch(getMyNFTs(walletAddress))
  }, [walletAddress, dispatch])

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Row gutter={[24, 24]}>
          {Object.keys(mine).map((mintAddress) => (
            <Col key={mintAddress} xs={12} sm={8} lg={6}>
              <MyNFTCard
                mintAddress={mintAddress}
                onSell={onSell}
                onCancel={onCancel}
                loading={mintAddress === handlingAddress}
              />
            </Col>
          ))}
        </Row>
        <Col span={24} />
      </Col>
      <Col span={24} />
      <Col span={24}>
        <ViewedList />
      </Col>
    </Row>
  )
}

export default MyNFTs
