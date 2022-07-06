import { Fragment, useState } from 'react'

import { Button, Col, Modal, Row } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import Title from './title'
import MagicEdenTitle from './magicEdenTitle'
import CardNFT from './cardNFT'
import TokenToBuy from './tokenToBuy'
import InfoNFT from './infoNFT'

const NftPlugin = () => {
  const [visible, setVisible] = useState(false)
  return (
    <Fragment>
      <Button onClick={() => setVisible(true)} block>
        NFT PAY
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
        title={<Title />}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <MagicEdenTitle />
          </Col>
          <Col span={24}>
            <CardNFT />
          </Col>
          <Col span={24}>
            <InfoNFT />
          </Col>
          <Col span={24}>
            <TokenToBuy />
          </Col>
        </Row>
      </Modal>
    </Fragment>
  )
}

export default NftPlugin
