import * as ChildProcess from 'child_process'
import * as path from 'path'
import { isDirectory } from '../utils'
import * as fsExtra from 'fs-extra'

const init = async (rDirectory: string) => {
  const aDirectroy = path.resolve(process.cwd(), rDirectory)
  if (!fsExtra.existsSync(aDirectroy)) {
    throw new Error(`no such directory: ${aDirectroy}`)
    return
  }
  if (!isDirectory(aDirectroy)) {
    throw new Error(`target path is not a directory: ${aDirectroy}`)
    return
  }
  fsExtra.copySync(
    path.resolve(__dirname, '../.vuepress'),
    `${aDirectroy}/.vuepress`
  )
}
const dev = async (rDirectory: string) => {
  exec('dev', rDirectory)
}
const build = async (rDirectory: string) => {
  exec('build', rDirectory)
}

const exec = async (type: string, rDirectory: string) => {
  const aDirectroy = path.resolve(process.cwd(), rDirectory)
  if (!fsExtra.existsSync(aDirectroy)) {
    throw new Error(`no such directory: ${aDirectroy}`)
    return
  }
  if (!isDirectory(aDirectroy)) {
    throw new Error(`target path is not a directory: ${aDirectroy}`)
    return
  }
  //prettier-ignore
  const vuepressPath = path.resolve( __dirname, '../../node_modules/.bin/vuepress')
  await execCmd(`${vuepressPath} automenu ${aDirectroy} -f`)
  await execCmd(`${vuepressPath} ${type} ${aDirectroy}`)
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
          console.log('error', error)
          reject(error)
          return
        }
        if (stderr) {
          console.log('stderr', stderr)
          reject(stderr)
          return
        }
        resolve(stdout)
      }
    )
    cp.stdout?.pipe(process.stdout)
    cp.stderr?.pipe(process.stderr)
    cp.stdin?.pipe(process.stdin)
  })
}

export { dev, build, init }
