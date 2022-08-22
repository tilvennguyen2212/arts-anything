import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useWalletAddress, util } from '@sentre/senhub'

import { Col, Row } from 'antd'
import ViewedList from './viewedList'

import { AppDispatch, AppState } from 'model'
import { getMyNFTs } from 'model/mine.controller'
import MyNFTCard from 'components/myNFTCard'

const MyNFTs = () => {
  const dispatch = useDispatch<AppDispatch>()
  const walletAddress = useWalletAddress()
  const mine = useSelector((state: AppState) => state.mine)

  const onSell = useCallback((mintAddress: string, price: string) => {
    return console.log(price, mintAddress)
  }, [])
  const onCancel = useCallback((mintAddress: string) => {
    return console.log(mintAddress)
  }, [])

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
