import { Fragment, useState } from 'react'

import { Button, Col, Modal, Row } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import CardNFT from './cardNFT'
import TokenToBuy from './tokenToBuy'

import { NFTCardProps } from 'view/collection/nftCard'

export type NFTPluginProps = {
  loading: boolean
  onBuy: () => void
}

const NFTPlugin = ({
  symbol,
  mintAddress,
  onBuy,
  loading,
}: NFTCardProps & NFTPluginProps) => {
  const [visible, setVisible] = useState(false)

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
        width={359}
        closeIcon={<IonIcon name="close-outline" />}
        closable={false}
        bodyStyle={{ padding: 16 }}
      >
        <Row gutter={[16, 16]}>
          {/* <Col span={24}>
            <MagicEdenTitle />
          </Col> */}
          <Col span={24}>
            <CardNFT symbol={symbol} mintAddress={mintAddress} />
          </Col>
          {/* <Col span={24}>
            <InfoNFT />
          </Col> */}
          <Col span={24}>
            <TokenToBuy />
          </Col>
          <Col span={24}>
            <Button type="primary" block onClick={onBuy} loading={loading}>
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
