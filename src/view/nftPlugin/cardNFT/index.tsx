import IonIcon from '@sentre/antd-ionicon'
import { Button, Col, Image, Row, Space, Typography } from 'antd'
import ImageNFT from './imageNFT'
import SolLogo from 'static/images/sol-logo.svg'

const CardNFT = () => {
  return (
    <Row gutter={[16, 16]} wrap={false}>
      <Col>
        <ImageNFT
          src="https://bafybeidihp4ez5lw4sqqxu4kwcvhjc2qhm2szz7kkayyee425oamdfzrkm.ipfs.dweb.link/9975.png?ext=png"
          size={87}
        />
      </Col>
      <Col flex="auto">
        <Space direction="vertical" size={0}>
          <Typography.Text className="t-16">Okay Bear #5108</Typography.Text>
          <Space size={0}>
            <Button type="text" icon={<IonIcon name="earth-outline" />} />
            <Button type="text" icon={<IonIcon name="logo-twitter" />} />
            <Button type="text" icon={<IonIcon name="logo-discord" />} />
          </Space>
          <Space>
            <Typography.Text className="t-16">182.9</Typography.Text>
            <Image src={SolLogo} height={18} width={20} />
          </Space>
        </Space>
      </Col>
    </Row>
  )
}

export default CardNFT
