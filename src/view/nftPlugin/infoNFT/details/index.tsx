import { ReactNode, useState } from 'react'
import { useSelector } from 'react-redux'
import copy from 'copy-to-clipboard'
import { util } from '@sentre/senhub'

import { Avatar, Col, Row, Space, Tooltip, Typography } from 'antd'

import { AppState } from 'model'
import { useMetadata } from 'hooks/useMetadata'
// import SolLogo from 'static/images/sol-logo.svg'
import SolScanLogo from 'static/images/solscan-logo.svg'

export type ItemDetailProps = {
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
    copy(address)
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
      {/* <Typography.Text>
        <Avatar shape="square" src={SolLogo} size={20} style={{ padding: 3 }} />
      </Typography.Text> */}
      <Tooltip title="Copied" open={copied}>
        <Typography.Text onClick={onCopy}>
          {util.shortenAddress(address)}
        </Typography.Text>
      </Tooltip>
    </Space>
  )
}

export type DetailsProps = { symbol: string; mintAddress: string }

const Details = ({ symbol, mintAddress }: DetailsProps) => {
  const nftInfo = useMetadata(mintAddress)
  const { tokenMint, tokenAddress } = useSelector(
    (state: AppState) => state.listing[symbol][mintAddress],
  )
  return (
    <Row
      gutter={[8, 8]}
      className="scrollbar"
      style={{ maxHeight: 150, padding: '0 12px' }}
    >
      <Col span={24}>
        <ItemDetail
          title="Mint address"
          content={<SolScanAddress address={tokenMint} />}
        />
      </Col>
      <Col span={24}>
        <ItemDetail
          title="Token address"
          content={<SolScanAddress address={tokenAddress} />}
        />
      </Col>
      <Col span={24}>
        <ItemDetail
          title="Owner"
          content={<SolScanAddress address={nftInfo.owner} />}
        />
      </Col>
      <Col span={24}>
        <ItemDetail
          title="Artist Royalties"
          content={`${nftInfo.sellerFeeBasisPoints / 100}%`}
        />
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
