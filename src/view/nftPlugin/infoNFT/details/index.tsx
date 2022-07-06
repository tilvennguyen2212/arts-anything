import { ReactNode, useState } from 'react'

import { Avatar, Col, Row, Space, Tooltip, Typography } from 'antd'
import SolLogo from 'static/images/sol-logo.svg'
import SolScanLogo from 'static/images/solscan-logo.svg'
import { util } from '@sentre/senhub'
import CopyToClipboard from 'react-copy-to-clipboard'

type ItemDetailProps = {
  title?: string
  content?: ReactNode
}

const ItemDetail = ({ title, content }: ItemDetailProps) => {
  return (
    <Row>
      <Col flex="auto">
        <Typography.Text className="caption">{title}</Typography.Text>
      </Col>
      <Col>
        <Typography.Text className="caption">{content}</Typography.Text>
      </Col>
    </Row>
  )
}
const SolScanAddress = ({ address }: { address: string }) => {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    setCopied(true)
    await util.asyncWait(1500)
    setCopied(false)
  }

  return (
    <Space style={{ cursor: 'pointer' }}>
      <Typography.Text
        onClick={() => window.open(util.explorer(address), '_blank')}
      >
        <Avatar src={SolScanLogo} size={16} />
      </Typography.Text>
      <Typography.Text>
        <Avatar shape="square" src={SolLogo} size={20} style={{ padding: 3 }} />
      </Typography.Text>
      <Tooltip title="Copied" visible={copied}>
        <CopyToClipboard text={address} onCopy={onCopy}>
          <Typography.Text>{util.shortenAddress(address)}</Typography.Text>
        </CopyToClipboard>
      </Tooltip>
    </Space>
  )
}

const Details = () => {
  return (
    <Row
      gutter={[8, 8]}
      className="scrollbar"
      style={{ maxHeight: 150, padding: '0 12px' }}
    >
      <Col span={24}>
        <ItemDetail
          title="Mint address"
          content={
            <SolScanAddress address="s9PuJosqhC8pdKJThNxH97wUtKZHyUGAUyVwpzPg49j" />
          }
        />
      </Col>
      <Col span={24}>
        <ItemDetail
          title="Token address"
          content={
            <SolScanAddress address="s9PuJosqhC8pdKJThNxH97wUtKZHyUGAUyVwpzPg49j" />
          }
        />
      </Col>
      <Col span={24}>
        <ItemDetail
          title="Owner"
          content={
            <SolScanAddress address="s9PuJosqhC8pdKJThNxH97wUtKZHyUGAUyVwpzPg49j" />
          }
        />
      </Col>
      <Col span={24}>
        <ItemDetail title="Artist Royalties" content="7.5%" />
      </Col>
      <Col span={24}>
        <ItemDetail title="Transaction Fee" content="2%" />
      </Col>
      <Col span={24}>
        <ItemDetail title="Listing/Bidding/Cancel" content="Free" />
      </Col>
    </Row>
  )
}

export default Details
