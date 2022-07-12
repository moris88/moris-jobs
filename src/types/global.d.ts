/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ParamsTask {
  [key: string]: any
}

export interface Task {
  name: string
  result: any
}

export interface ResultTask {
  name: string
  result?: any
  error?: any
}

export type iTask = (nomeTask: string, args: ParamsTask) => Promise<ResultTask>
