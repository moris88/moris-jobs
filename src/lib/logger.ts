/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import colors from 'colors'
import fs from 'fs'

export default class Logger {
  private startDate!: number
  private endDate!: number

  private getDateNow = (): string => {
    const date = new Date()
    const dataString = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    return dataString
  }

  private calcTime = (): string => {
    const diff = this.endDate - this.startDate

    if (diff === 0) return ''

    const second = diff / 1000
    if (second < 60) return `(${second} sec.)`

    const minute = Math.round(second / 60)
    if (minute < 60) return `(${minute} min.)`

    const hours = Math.round(minute / 60)
    return `(${hours} hours)`
  }

  start = () => {
    this.startDate = Date.now()
    console.log(
      colors.bgCyan(colors.black(`${this.getDateNow()} Esecuzione iniziata`))
    )
    this.writeLog(`${this.getDateNow()} Esecuzione iniziata`)
  }

  end = () => {
    this.endDate = Date.now()
    console.log(
      colors.bgCyan(colors.black(`${this.getDateNow()} Esecuzione terminata`))
    )
    this.writeLog(`${this.getDateNow()} Esecuzione terminata`)
    const time = this.calcTime()
    if (time !== '')
      console.log(colors.bgGreen(colors.black(`Esecuzione in ${time}`)))
  }

  info = (obj: any): void => {
    if (typeof obj === 'string') {
      console.log(colors.cyan(`${this.getDateNow()} ${obj}`))
      this.writeLog(`${this.getDateNow()} ${obj}`)
    } else {
      console.log(colors.cyan(`${this.getDateNow()} ${JSON.stringify(obj)}`))
      this.writeLog(`${this.getDateNow()} ${JSON.stringify(obj)}`)
    }
  }

  warn = (obj: any): void => {
    if (typeof obj === 'string') {
      console.log(
        colors.bgYellow(colors.white(`${this.getDateNow()} WARNING! ${obj}`))
      )
      this.writeLog(`${this.getDateNow()} WARNING! ${obj}`)
    } else {
      console.log(
        colors.bgYellow(
          colors.white(`${this.getDateNow()} WARNING! ${JSON.stringify(obj)}`)
        )
      )
      this.writeLog(`${this.getDateNow()} WARNING! ${JSON.stringify(obj)}`)
    }
  }

  error = (obj: any): void => {
    if (typeof obj === 'string') {
      console.log(
        colors.bgRed(colors.white(`${this.getDateNow()} ERROR! ${obj}`))
      )
      this.writeLog(`${this.getDateNow()} ERROR! ${obj}`)
    } else {
      console.log(
        colors.bgRed(
          colors.white(`${this.getDateNow()} ERROR! ${JSON.stringify(obj)}`)
        )
      )
      this.writeLog(`${this.getDateNow()} ERROR! ${JSON.stringify(obj)}`)
    }
  }

  print = (obj: any): void => {
    if (typeof obj === 'string') {
      console.log(`${this.getDateNow()} ${obj}`)
      this.writeLog(`${this.getDateNow()} ${obj}`)
    } else {
      console.log(`${this.getDateNow()} ${JSON.stringify(obj)}`)
      this.writeLog(`${this.getDateNow()} ${JSON.stringify(obj)}`)
    }
  }

  private writeLog(text: string): void {
    fs.writeFileSync('./log/info.log', text + '\n', {
      encoding: 'utf8',
      flag: 'a+',
    })
  }
}
