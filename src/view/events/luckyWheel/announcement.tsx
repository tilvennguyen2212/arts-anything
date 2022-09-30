import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Avatar, Button, Col, Modal, Row, Space, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import Confetti from 'react-confetti'

import { AppDispatch, AppState } from 'model'
import { Events, setAnnouncement } from 'model/event.controller'
import LuckyWheel from 'static/images/lucky-wheel.png'

const Announcement = () => {
  const dispatch = useDispatch<AppDispatch>()
  const visible = useSelector(
    (state: AppState) => state.event.announcement === Events.LuckyWheel,
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
            The Lucky Wheel Event
          </Typography.Title>
        </Col>
        <Col span={24}>
          <Row gutter={[24, 24]} justify="center">
            <Col>
              <Avatar size={311} shape="circle" src={LuckyWheel} />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Space direction="vertical">
            <Typography.Text>
              🎉 Buying NFTs by stable tokens (USDC, USDT, UXD, ...), you will
              have a chance to join{' '}
              <span style={{ fontWeight: 700, fontSize: 16 }}>
                The Lucky Wheel
              </span>{' '}
              and win great prizes up to{' '}
              <span style={{ fontWeight: 700, fontSize: 16 }}>$50,000</span>.
            </Typography.Text>
            <Typography.Text>
              <span style={{ fontWeight: 700, fontSize: 16 }}>
                How to play?
              </span>{' '}
              Everytime you buy an NFT on AnyArts you will receive a ticket to
              join{' '}
              <a
                href="https://hub.sentre.io/app/lucky_wheel?autoInstall=true"
                target="_blank"
                rel="noreferrer"
              >
                The Lucky Wheel here!
              </a>
            </Typography.Text>
          </Space>
        </Col>
        <Col span={24}>
          <Button type="primary" onClick={onCancel} block>
            Got It!
          </Button>
        </Col>
      </Row>
    </Modal>
  )
}

export default Announcement
