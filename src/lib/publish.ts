import { red } from 'colors'
import * as fs from 'fs-extra'
import userHome from 'userhome'
import { CONFIG_DIR_NAME } from '../config'
import { GiteeConfig } from '../types/index.d'
import { updateGiteePage, pushToGiteeRepo } from './gitee'

const readPlatConfig = (plat: string) => {
  const configpath = userHome(CONFIG_DIR_NAME, `${plat}.json`)
  if (!fs.existsSync(configpath)) {
    throw new Error(`config file not found: ${configpath}`)
    return
  }
  return require(configpath)
}
const pu = (plat: string, options: any) => {
  if (plat === 'gitee') {
    console.log('options:', options)
    let config: GiteeConfig = readPlatConfig(plat)
    config = { ...config, ...options }
    pushToGiteeRepo(config)
    updateGiteePage(config)
  } else if (plat === 'github') {
  } else console.log(red('unknown platform'))
}

const update = (plat: string, options: any) => {
  if (plat === 'gitee') {
    let config: GiteeConfig = readPlatConfig(plat)
    config = { ...config, ...options }
    updateGiteePage(config)
  } else if (plat === 'github') {
  } else console.log(red('unknown platform'))
}

const push = (plat: string, options: any) => {
  if (plat === 'gitee') {
    let config: GiteeConfig = readPlatConfig(plat)
    config = { ...config, ...options }
    pushToGiteeRepo(config)
  } else if (plat === 'github') {
  } else console.log(red('unknown platform'))
}
export { pu, push, update }
