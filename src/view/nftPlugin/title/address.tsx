import { useState } from 'react'
import copy from 'copy-to-clipboard'

import { util } from '@sentre/senhub'
import { Space, Typography, Tooltip } from 'antd'

const Address = ({ address }: { address: string }) => {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    copy(address)
    setCopied(true)
    await util.asyncWait(1500)
    setCopied(false)
  }

  return (
    <Space>
      <Typography.Text style={{ fontSize: 16 }}>
        Dong (
        <Tooltip title="Copied" visible={copied}>
          <Typography.Text onClick={onCopy} style={{ cursor: 'pointer' }}>
            {util.shortenAddress(address)}
          </Typography.Text>
        </Tooltip>
        )
      </Typography.Text>
    </Space>
  )
}

export default Address
