/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResultTask } from '../types/global'

class Results {
  private listResults: ResultTask[]

  constructor() {
    this.listResults = []
  }

  add(name: string, result: any) {
    this.listResults.push({ name: name, result: result })
  }

  get(name: string) {
    return this.listResults.find((el) => el.name === name)
  }
}

export default Results
