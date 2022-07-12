import axios from 'axios'
import { iTask, ParamsTask, ResultTask } from '../types/global'

const taskRequestGet: iTask = async (
  nomeTask: string,
  args: ParamsTask
): Promise<ResultTask> => {
  return await axios
    .get(args.url)
    .then((response) => {
      return {
        name: nomeTask,
        result: response.data,
      }
    })
    .catch((error) => {
      return {
        name: nomeTask,
        error: error,
      }
    })
}

export default taskRequestGet
