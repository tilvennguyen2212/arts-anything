import { useCallback, useState } from 'react'

import { Button, Col, Row, Space } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import { useRoute } from 'hooks/useRoute'
import { NFTPlatform } from 'sdk'
import { useWallet } from '@sentre/senhub'
import { sendAndConfirm, swapToSOL } from 'sdk/jupAgSDK'

const Home = () => {
  const [loading, setLoading] = useState(false)
  const { to } = useRoute()
  const {
    wallet: { address: walletAddress },
  } = useWallet()

  const onDetails = useCallback(
    (platform: NFTPlatform) => to(`/${platform}`),
    [to],
  )

  const onJupAg = useCallback(async () => {
    try {
      setLoading(true)
      const amount = 0.001
      const txs = await swapToSOL({ amount, walletAddress })
      const signedTxs = await window.sentre.wallet.signAllTransactions(txs)
      const txIds = await sendAndConfirm(signedTxs)
      return console.log(txIds)
    } catch (er: any) {
      return window.notify({ type: 'error', description: er.message })
    } finally {
      return setLoading(false)
    }
  }, [walletAddress])

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Space>
          <Button
            onClick={() => onDetails('magicEden')}
            icon={<IonIcon name="images-outline" />}
          >
            Magic Eden
          </Button>
          <Button
            onClick={onJupAg}
            icon={<IonIcon name="send-outline" />}
            loading={loading}
          >
            Jup Ag
          </Button>
        </Space>
      </Col>
    </Row>
  )
}

export default Home
