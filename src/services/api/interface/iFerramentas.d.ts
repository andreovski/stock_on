import { IStock } from "./iStock"
import { IWorkers } from "./iWorkers"

export interface IFerramentasSolicitadas {
  id: string
  number: number
  workerId: string
  worker: IWorkers
  tools: IStock[]
  priority: boolean
  note: string
  date: Date
  created_at?: string
}
