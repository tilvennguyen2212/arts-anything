import { useCallback, useState } from 'react'
import { useWallet } from '@sentre/senhub'

import { Button, Col, Row, Segmented } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import CollectionList from './collectionList'

import { ACCEPTED_TOKENS } from 'sdk/magicEdenSDK'
import { sendAndConfirm, swapToSOL } from 'sdk/jupAgSDK'

const Collections = () => {
  const [loading, setLoading] = useState(false)
  const {
    wallet: { address: walletAddress },
  } = useWallet()

  const onJupAg = useCallback(async () => {
    try {
      setLoading(true)
      const amount = 0.001
      const txs = await swapToSOL({
        amount,
        walletAddress,
        payment: ACCEPTED_TOKENS.usdc,
      })
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
        <Row gutter={[16, 16]}>
          <Col flex="auto">
            <Segmented
              size="large"
              options={[
                { label: '💎 Recent', value: 'recent' },
                { label: '🔥 Hot', value: 'hot', disabled: true },
                { label: '⏳ Comming', value: 'comming', disabled: true },
              ]}
            />
          </Col>
          <Col>
            <Button
              onClick={onJupAg}
              icon={<IonIcon name="send-outline" />}
              loading={loading}
            >
              Jup Ag
            </Button>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <CollectionList />
      </Col>
    </Row>
  )
}

export default Collections
