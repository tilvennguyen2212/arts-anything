import { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

import { Space, Typography, Tooltip } from 'antd'
import { util } from '@sentre/senhub'

const Address = ({ address }: { address: string }) => {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    setCopied(true)
    await util.asyncWait(1500)
    setCopied(false)
  }

  return (
    <Space>
      <Typography.Text style={{ fontSize: 16 }}>
        Dong (
        <Tooltip title="Copied" visible={copied}>
          <CopyToClipboard text={address} onCopy={onCopy}>
            <Typography.Text style={{ cursor: 'pointer' }}>
              {util.shortenAddress(address)}
            </Typography.Text>
          </CopyToClipboard>
        </Tooltip>
        )
      </Typography.Text>
    </Space>
  )
}

export default Address
