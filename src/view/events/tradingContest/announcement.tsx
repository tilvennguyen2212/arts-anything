import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Avatar, Button, Col, Modal, Row, Space, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import Confetti from 'react-confetti'

import { AppDispatch, AppState } from 'model'
import { Events, setAnnouncement } from 'model/event.controller'
import TradingContest from 'static/images/trading-contest.png'

export const onDetail = () => {
  window.open('https://academy.sentre.io/any-arts-trading-contest/', '_blank')
}

const Announcement = () => {
  const dispatch = useDispatch<AppDispatch>()
  const visible = useSelector(
    (state: AppState) => state.event.announcement === Events.TradingContest,
  )

  const onCancel = useCallback(() => {
    return dispatch(setAnnouncement(Events.None))
  }, [dispatch])

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      footer={null}
      closeIcon={<IonIcon name="close" />}
      centered
    >
      <Row gutter={[48, 48]}>
        <Confetti style={{ width: '100%', height: 456 }} numberOfPieces={100} />
        <Col span={24} style={{ marginTop: 24 }}>
          <Typography.Title level={2} style={{ textAlign: 'center' }}>
            The Trading Contest
          </Typography.Title>
        </Col>
        <Col span={24}>
          <Row gutter={[24, 24]} justify="center">
            <Col>
              <Avatar size={311} shape="circle" src={TradingContest} />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Space direction="vertical">
            <Typography.Text>
              💵 Got stablecoins? BUY NFTs{' '}
              <span style={{ fontWeight: 700, fontSize: 16 }}>
                using stablecoins
              </span>{' '}
              on Any Arts NOW and win:
            </Typography.Text>
            <Typography.Text>
              ✨ An exclusive{' '}
              <span style={{ fontWeight: 700, fontSize: 16 }}>
                FARMER PASS NFT
              </span>{' '}
              for Top 3 Traders to super-boost your APR!
            </Typography.Text>
            <Typography.Text>
              ✨ A shared pool of{' '}
              <span style={{ fontWeight: 700, fontSize: 16 }}>25,000 SNTR</span>{' '}
              for 5 lucky traders!
            </Typography.Text>
          </Space>
        </Col>
        <Col span={12}>
          <Button type="text" onClick={onCancel} block>
            Skip It
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type="primary"
            onClick={onDetail}
            icon={<IonIcon name="open-outline" />}
            block
          >
            Read More
          </Button>
        </Col>
      </Row>
    </Modal>
  )
}

export default Announcement
