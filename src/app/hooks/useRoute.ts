import configs from 'app/configs'
import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

const {
  manifest: { appId },
} = configs

export type AppRoute = {
  root: string
  to: (subroute: string) => void
  extend: (subroute: string) => string
  back: () => void
}

export const useRoute = (): AppRoute => {
  const history = useHistory()

  const root = `/app/${appId}`
  const extend = useCallback((subroute: string) => root + subroute, [root])
  const to = useCallback(
    (subroute: string) => history.push(extend(subroute)),
    [history, extend],
  )
  const back = useCallback(() => history.goBack(), [history])

  return { root, extend, to, back }
}
