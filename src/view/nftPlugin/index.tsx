import { Fragment, useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Infix, useInfix, useWalletAddress, util } from '@sentre/senhub'
import { OTC } from '@sentre/otc-sdk'

import { Alert, Button, Col, Modal, Row } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import MagicEdenTitle from './magicEdenTitle'
import CardNFT from './cardNFT'
import TokenToBuy from './tokenToBuy'
import InfoNFT from './infoNFT'

import { AppDispatch, AppState } from 'model'
import { magicEdenSDK } from 'model/collections.controller'
import usePriceExchange from 'hooks/usePriceExchange'
import { useGetTxCreateTicket } from 'hooks/useGetTxCreateTicket'
import { setCongratulation } from 'model/lucky.controller'

const otcSDK = new OTC()
const NETWORK_FEE = 0.00001
const CREATE_ACCOUNT_FEE = 0.00203928 + 0.00201144

export type NFTPluginProps = { symbol: string; mintAddress: string }

const NFTPlugin = ({ symbol, mintAddress }: NFTPluginProps) => {
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [tokenSymbol, setTokenSymbol] = useState('sol')
  const { seller, sellerReferral, price, tokenMint, auctionHouse } =
    useSelector((state: AppState) => state.listing[symbol][mintAddress])
  const walletAddress = useWalletAddress()
  const infix = useInfix()
  const getTxCreateTicket = useGetTxCreateTicket()
  const dispatch = useDispatch<AppDispatch>()

  const isMobile = useMemo(() => infix < Infix.md, [infix])
  const tokenName = useMemo(() => tokenSymbol.toUpperCase(), [tokenSymbol])
  const priceNFT = price + NETWORK_FEE + CREATE_ACCOUNT_FEE
  const { estPrice, validBuy } = usePriceExchange(priceNFT, tokenSymbol)
  const onCongrats = useCallback(
    () => dispatch(setCongratulation(true)),
    [dispatch],
  )

  const onBuy = useCallback(async () => {
    try {
      setLoading(true)
      const { wallet } = window.sentre
      let txs = []
      if (tokenSymbol !== 'sol') {
        const setupTransaction = await otcSDK.exchange({
          walletAddress,
          tokenSymbol,
          solAmount: priceNFT,
        })
        txs.push(setupTransaction)
      }
      const buyNowTransaction = await magicEdenSDK.buyNow({
        buyerAddress: walletAddress,
        sellerAddress: seller,
        auctionHouseAddress: auctionHouse,
        sellerReferralAddress: sellerReferral,
        mintAddress: tokenMint,
        price,
      })
      txs.push(buyNowTransaction)
      // Add lottery ticket
      const txCreateTicket = await getTxCreateTicket(
        buyNowTransaction.serializeMessage(),
      )
      txs.push(txCreateTicket)

      const signedTxs = await wallet.signAllTransactions(txs)
      const txIds = await magicEdenSDK.sendAndConfirm(signedTxs)
      setVisible(false)
      window.notify({
        type: 'success',
        description: `Successfully buy the NFT. Click to view details.`,
        onClick: () =>
          window.open(util.explorer(txIds[txIds.length - 1]), '_blank'),
      })
      return onCongrats()
    } catch (er: any) {
      return window.notify({
        type: 'error',
        description: er.response?.data?.message || er.message,
      })
    } finally {
      return setLoading(false)
    }
  }, [
    tokenSymbol,
    walletAddress,
    seller,
    auctionHouse,
    sellerReferral,
    tokenMint,
    price,
    getTxCreateTicket,
    priceNFT,
    onCongrats,
  ])

  return (
    <Fragment>
      <Button
        onClick={() => setVisible(true)}
        type="primary"
        icon={isMobile ? undefined : <IonIcon name="card-outline" />}
      >
        Buy
      </Button>
      <Modal
        className="modal-nft-plugin"
        visible={visible}
        footer={false}
        onCancel={() => setVisible(false)}
        width={368}
        closeIcon={<IonIcon name="close-outline" />}
        bodyStyle={{ padding: 16 }}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <MagicEdenTitle />
          </Col>
          <Col span={24}>
            <CardNFT symbol={symbol} mintAddress={mintAddress} />
          </Col>
          <Col span={24}>
            <InfoNFT symbol={symbol} mintAddress={mintAddress} />
          </Col>
          <Col span={24}>
            <TokenToBuy value={tokenSymbol} onChange={setTokenSymbol} />
          </Col>
          <Col span={24}>
            <Alert
              message={`Estimated payment is ${util
                .numeric(estPrice)
                .format('0,0.[0000]')} ${tokenName}.`}
              type="info"
              showIcon
            />
          </Col>
          {!validBuy && (
            <Col span={24}>
              <Alert
                message={`Not enough ${tokenName} in your balance. Please add more ${tokenName}, or select another token!`}
                type="warning"
                showIcon
              />
            </Col>
          )}
          <Col span={24}>
            <Button
              type="primary"
              onClick={onBuy}
              loading={loading}
              block
              disabled={!validBuy}
            >
              Buy Now
            </Button>
          </Col>
          {/* <Col span={24}>
            <Button type="text" block>
              Search NFT
            </Button>
          </Col> */}
        </Row>
      </Modal>
    </Fragment>
  )
}

export default NFTPlugin
