import Logger from './lib/logger'
import taskDifferenza from './tasks/taskDifferenza'
import taskRequestGet from './tasks/taskRequestGet'
import taskSomma from './tasks/taskSomma'

const listaRisultati = []
const logger = new Logger()
logger.start()
;(async () => {
  try {
    listaRisultati.push(
      await taskSomma('task_somma', { num1: 3, num2: 5 })
        .then((result) => result)
        .catch((error) => {
          throw new Error(error)
        })
    )
    listaRisultati.push(
      await taskDifferenza('task_differenza', {
        num1: listaRisultati.find((el) => el.name === 'task_somma')?.result,
        num2: 2,
      })
        .then((result) => result)
        .catch((error) => {
          throw new Error(error)
        })
    )
    listaRisultati.push(
      await taskRequestGet('task_request', {
        url: 'https://jsonplaceholder.typicode.com/users',
      })
        .then((result) => result)
        .catch((error) => {
          throw new Error(error)
        })
    )
    listaRisultati.forEach((el) => logger.info(el))
  } catch (error) {
    logger.error(error)
  } finally {
    logger.end()
  }
})()
