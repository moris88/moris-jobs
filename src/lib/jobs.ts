import { Task } from '../types/global'
import Logger from './logger'

class Jobs {
  tasks: Promise<Task>[]
  results: Task[]
  logger = new Logger()

  constructor(logger: Logger) {
    this.logger = logger
    this.tasks = []
    this.results = []
  }

  stopTask = (msg = '') => {
    if (msg === '') {
      throw new Error('STOP -> forced execution')
    } else {
      throw new Error('STOP EXECUTION -> ' + msg)
    }
  }

  addTask = (promise: Promise<Task>): void => {
    this.tasks.push(promise)
  }

  startTasks = async (
    type: 'parallel' | 'sequential'
  ): Promise<void | Task[]> => {
    switch (type) {
      case 'parallel':
        return Promise.all(this.tasks)
          .then((result) => {
            this.logger.info(result)
            return result
          })
          .catch((error) => {
            throw new Error(error)
          })
      case 'sequential':
        return await this.tasks.forEach(async (task) => {
          await task
            .then(async (result) => {
              this.logger.info('UGO')
              this.logger.info(this.results)
              this.results.push(result)
              this.logger.info(result)
              return result
            })
            .catch((error) => {
              throw new Error(error)
            })
        })
    }
  }

  getRisultato = (nameTask: string): Task | undefined => {
    this.logger.info(this.results)
    const item = this.results.find((el) => el.name === nameTask)
    this.logger.info(item)
    return item
  }
}

export default Jobs
