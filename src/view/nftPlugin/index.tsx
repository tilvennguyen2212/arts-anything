import { Fragment, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { useWallet, util } from '@sentre/senhub'

import { Button, Col, Modal, Row } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import MagicEdenTitle from './magicEdenTitle'
import CardNFT from './cardNFT'
import TokenToBuy from './tokenToBuy'

import { AppState } from 'model'
import { magicEdenSDK } from 'model/collections.controller'
import { sendAndConfirm } from 'sdk/jupAgSDK'
import OTCSDK from 'sdk/otcSDK'

const otcSDK = new OTCSDK()

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

  const onBuy = useCallback(async () => {
    try {
      setLoading(true)
      const { wallet } = window.sentre
      let txs = []
      if (tokenSymbol !== 'sol') {
        const setupTransaction = await otcSDK.exchange({
          walletAddress,
          tokenSymbol,
          solAmount: price,
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
      const txIds = await sendAndConfirm(signedTxs)
      setVisible(false)
      return window.notify({
        type: 'success',
        description: `Successfully buy the NFT ${name}. Click to view details.`,
        onClick: () => window.open(util.explorer(txIds[1]), '_blank'),
      })
    } catch (er: any) {
      return window.notify({
        type: 'error',
        description: er.message,
      })
    } finally {
      return setLoading(false)
    }
  }, [walletAddress, tokenSymbol, seller, auctionHouse, tokenMint, price, name])

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
            <Button type="primary" onClick={onBuy} loading={loading} block>
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
