import { IStock } from "./iStock"
import { IWorkers } from "./iWorkers"

export interface IFerramentasSolicitadas {
  id: string
  number: number
  worker: IWorkers
  tools: IStock[]
  note: string
  date: Date
  created_at?: string
}
