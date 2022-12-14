import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Avatar, Button, Col, Modal, Row, Space, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import Confetti from 'react-confetti'

import { AppDispatch, AppState } from 'model'
import { Events, setCongratulation } from 'model/event.controller'
import LuckyTicket from 'static/images/lucky-ticket.png'

const Congratulation = () => {
  const dispatch = useDispatch<AppDispatch>()
  const visible = useSelector(
    (state: AppState) => state.event.congratulation === Events.LuckyWheel,
  )

  const onDetail = () =>
    window.open(
      'https://hub.sentre.io/app/lucky_wheel?autoInstall=true',
      '_blank',
    )

  const onCancel = useCallback(() => {
    dispatch(setCongratulation(Events.None))
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
            Got A Lucky Ticket!
          </Typography.Title>
        </Col>
        <Col span={24}>
          <Row gutter={[24, 24]} justify="center">
            <Col>
              <Avatar size={311} shape="circle" src={LuckyTicket} />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Space direction="vertical">
            <Typography.Text>
              🎉 Congrats! You have received{' '}
              <span style={{ fontWeight: 700, fontSize: 16 }}>
                1 Lucky Ticket
              </span>
              . You can use it to spin{' '}
              <a
                href="https://hub.sentre.io/app/lucky_wheel?autoInstall=true"
                target="_blank"
                rel="noreferrer"
              >
                The Lucky Wheel
              </a>{' '}
              and have a chance to win great prizes up to{' '}
              <span style={{ fontWeight: 700, fontSize: 16 }}>$50,000</span>.
            </Typography.Text>
          </Space>
        </Col>
        <Col span={24}>
          <Button type="primary" onClick={onDetail} block>
            Spin Now!
          </Button>
        </Col>
      </Row>
    </Modal>
  )
}

export default Congratulation
