import { VuePressConfig } from '../types/index.d'
import * as ChildProcess from 'child_process'
import * as path from 'path'
import { isDirectory } from '../utils'
import * as fsExtra from 'fs-extra'
import { red } from 'colors'

const dev = async (rDirectory: string) => {
  exec('dev', rDirectory)
}
const build = async (rDirectory: string) => {
  exec('build', rDirectory)
}

const exec = async (type: string, rDirectory: string) => {
  const aDirectroy = path.resolve(process.cwd(), rDirectory)
  console.log('aDirectroy', aDirectroy)
  if (!fsExtra.existsSync(aDirectroy)) {
    console.log(red(`no such directory: ${aDirectroy}`))
    return
  }
  if (!isDirectory(aDirectroy)) {
    console.log(red(`target path is not a directory: ${aDirectroy}`))
    return
  }
  await execCmd(`npx vuepress automenu -f ${aDirectroy}`)
  await execCmd(`npx vuepress ${type} ${aDirectroy}`)
}

const execCmd = (cmd: string) => {
  return new Promise((resolve, reject) => {
    const cp = ChildProcess.exec(
      cmd,
      (
        error: ChildProcess.ExecException | null,
        stdout: string,
        stderr: string
      ) => {
        if (error) {
          reject(error)
          return
        }
        if (stderr) {
          reject(stderr)
          return
        }
        resolve(stdout)
      }
    )
    cp.stdout?.pipe(process.stdout)
    cp.stderr?.pipe(process.stderr)
  })
}

export { dev, build }
