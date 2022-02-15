#!/usr/bin/env node
import { Command } from 'commander'
import { blue, green, red } from 'colors'
import { resolve } from 'path'
import { pu, update, push } from './lib/publish'
import { build, dev, init } from './lib/vuepress'
import { GiteeConfig } from './types'

const program = new Command()
// 配置command
program
  .command(`init`)
  .argument('<string>', 'which directory to use')
  .description('初始化配置文件')
  .action((directory: string) => {
    try {
      init(directory)
      //prettier-ignore
      console.log( `${green('success')} init success in ${resolve( process.cwd(), directory)}`)
    } catch (error) {
      console.log(`${red('error')} ${error}`)
    }
  })
program
  .command(`dev`)
  .argument('<string>', 'which directory to use')
  .description('启动本地服务器访问')
  .action((directory: string) => {
    try {
      dev(directory)
    } catch (error) {
      console.log(`${red('error')} error`)
    }
  })

program
  .command(`build`)
  .argument('<string>', 'which directory to use')
  .description('打包成html')
  .action((directory: string) => {
    try {
      build(directory)
    } catch (error) {
      console.log(`${red('error')} error`)
    }
  })

program
  .command(`push`)
  .argument('<string>', 'the platform to push')
  .description('推送note到gitee仓库')
  .option('-d, --directory <path>', '需要推送到gitee仓库的文件夹')
  .action((platform: string, options: GiteeConfig) => {
    try {
      push(platform, options)
    } catch (error) {
      console.log(`${red('error')} error`)
    }
  })

program
  .command(`update`)
  .argument('<string>', 'the platform to publish')
  .description('更新gitee的webpage')
  .action((platform: string, options: GiteeConfig) => {
    try {
      update(platform, options)
    } catch (error) {
      console.log(`${red('error')} error`)
    }
  })

program
  .command(`pu`)
  .argument('<string>', 'the platform to publish')
  .description('发布note到gitee, 包括推送到仓库和更新web')
  .option('-d, --directory <path>', '需要推送到gitee仓库的文件夹')
  .action((platform: string, options: GiteeConfig) => {
    try {
      pu(platform, options)
    } catch (error) {
      console.log(`${red('error')} error`)
    }
  })

// 配置 cli 信息，版本、cli说明等
program.description(blue('FlyNote  代码转换从未如此简单  https://gogocode.io'))

// 接管命令行输入，参数处理
program.parse(process.argv)
