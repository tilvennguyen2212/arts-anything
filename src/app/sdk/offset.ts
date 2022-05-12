const SUFFIX = '-offset'

class Offset {
  private _offset: Record<string, number>
  constructor() {
    this._offset = {}
  }

  private key = (key: string) => {
    if (!key) throw new Error('The key cannot be empty.')
    return key + SUFFIX
  }

  set = (key: string, offset: number) => {
    const k = this.key(key)
    this._offset[k] = offset
  }

  get = (key: string) => {
    const k = this.key(key)
    return this._offset[k] || 0
  }
}

export default Offset
