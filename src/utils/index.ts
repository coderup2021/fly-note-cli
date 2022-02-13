import * as fsExtra from 'fs-extra'

const isDirectory = (dirPath: string) => {
  let flag = true
  const stat = fsExtra.statSync(dirPath)
  if (!stat.isDirectory()) flag = false
  return flag
}

export { isDirectory }
