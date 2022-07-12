import { iTask, ParamsTask, ResultTask } from '../types/global'

const taskDifferenza: iTask = (
  nomeTask: string,
  args: ParamsTask
): Promise<ResultTask> => {
  return new Promise((resolve, reject) => {
    try {
      resolve({ name: nomeTask, result: executeTask(args) })
    } catch (error) {
      reject({ name: nomeTask, error: error })
    }
  })
}

function executeTask(args: ParamsTask) {
  return args.num1 - args.num2
}

export default taskDifferenza
