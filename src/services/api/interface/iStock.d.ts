export interface IStock {
  id: string
  name: string
  mod: string
  size: number
  amount: number
  state: string
  locate: string
  created_at: string
}

export interface IStockGetItemById {
  id: string
}
