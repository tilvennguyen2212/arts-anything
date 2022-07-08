import { Fragment, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { useWallet, util } from '@sentre/senhub'

import { Alert, Button, Col, Modal, Row, Space, Tag, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import MagicEdenTitle from './magicEdenTitle'
import CardNFT from './cardNFT'
import TokenToBuy from './tokenToBuy'

import { AppState } from 'model'
import { magicEdenSDK } from 'model/collections.controller'
import OTCSDK from 'sdk/otcSDK'
import usePriceExchange from 'hooks/usePriceExchange'

const otcSDK = new OTCSDK()
const NETWORK_FEE = 0.00001
const CREATE_ACCOUNT_FEE = 0.00203928 + 0.00201144
export type NFTPluginProps = { symbol: string; mintAddress: string }

const NFTPlugin = ({ symbol, mintAddress }: NFTPluginProps) => {
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [tokenSymbol, setTokenSymbol] = useState('sol')
  const {
    listing: {
      [symbol]: { [mintAddress]: nft },
    },
    metadata: { [mintAddress]: metadata },
  } = useSelector((state: AppState) => state)
  const {
    wallet: { address: walletAddress },
  } = useWallet()

  const { seller, price, tokenMint, auctionHouse } = nft
  const { name } = metadata || {}
  const priceNFT = price + NETWORK_FEE + CREATE_ACCOUNT_FEE

  const { estPrice, validBuy } = usePriceExchange(priceNFT, tokenSymbol)

  const onBuy = useCallback(async () => {
    console.log('validBuy: ', validBuy)
    if (!validBuy)
      return window.notify({
        type: 'error',
        description:
          'You are not enough ' +
          tokenSymbol.toUpperCase() +
          '. Please select another token!',
      })
    try {
      setLoading(true)
      const { wallet } = window.sentre
      let txs = []
      if (tokenSymbol !== 'sol') {
        const setupTransaction = await otcSDK.exchange({
          walletAddress,
          tokenSymbol,
          solAmount: priceNFT,
        })
        txs.push(setupTransaction)
      }
      const buyNowTransaction = await magicEdenSDK.buyNow({
        buyerAddress: walletAddress,
        sellerAddress: seller,
        auctionHouseAddress: auctionHouse,
        mintAddress: tokenMint,
        price,
      })
      txs.push(buyNowTransaction)
      const signedTxs = await wallet.signAllTransactions(txs)
      const txIds = await magicEdenSDK.sendAndConfirm(signedTxs)
      setVisible(false)
      return window.notify({
        type: 'success',
        description: `Successfully buy the NFT ${name}. Click to view details.`,
        onClick: () => window.open(util.explorer(txIds[1]), '_blank'),
      })
    } catch (er: any) {
      return window.notify({
        type: 'error',
        description: er.response?.data || er.message,
      })
    } finally {
      return setLoading(false)
    }
  }, [
    priceNFT,
    validBuy,
    tokenSymbol,
    walletAddress,
    seller,
    auctionHouse,
    tokenMint,
    price,
    name,
  ])

  return (
    <Fragment>
      <Button
        onClick={() => setVisible(true)}
        type="primary"
        icon={<IonIcon name="card-outline" />}
      >
        Buy
      </Button>
      <Modal
        className="modal-nft-plugin"
        visible={visible}
        footer={false}
        onCancel={() => setVisible(false)}
        width={368}
        closeIcon={<IonIcon name="close-outline" />}
        bodyStyle={{ padding: 16 }}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <MagicEdenTitle />
          </Col>
          <Col span={24}>
            <CardNFT symbol={symbol} mintAddress={mintAddress} />
          </Col>
          {/* <Col span={24}>
            <InfoNFT />
          </Col> */}
          <Col span={24}>
            <TokenToBuy value={tokenSymbol} onChange={setTokenSymbol} />
          </Col>
          <Col span={24}>
            <Typography.Text>
              Minimum estimated balance required
            </Typography.Text>
          </Col>
          <Col span={24}>
            <Space direction="vertical" size={8}>
              <Tag
                style={{
                  padding: '6px 16px',
                  border: '1px solid #1BFAEF',
                  background: 'rgba(27, 250, 239, 0.1)',
                }}
              >
                <Typography.Title level={3} style={{ color: '#1BFAEF' }}>
                  {util.numeric(estPrice).format('0,0.[0000]')}{' '}
                  {tokenSymbol.toUpperCase()}
                </Typography.Title>
              </Tag>
              {!validBuy && (
                <Alert
                  message={
                    'You are not enough ' +
                    tokenSymbol.toUpperCase() +
                    '. Please select another token!'
                  }
                  type="warning"
                  showIcon
                />
              )}
            </Space>
          </Col>
          <Col span={24}>
            <Button
              type="primary"
              onClick={onBuy}
              loading={loading}
              block
              disabled={!validBuy}
            >
              Buy Now
            </Button>
          </Col>
          {/* <Col span={24}>
            <Button type="text" block>
              Search NFT
            </Button>
          </Col> */}
        </Row>
      </Modal>
    </Fragment>
  )
}

export default NFTPlugin
