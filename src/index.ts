#!/usr/bin/env node
import { Command } from 'commander'
import { blue } from 'colors'
import { pp, update, push } from './lib/publish'
import { build, dev } from './lib/vuepress'

const program = new Command()
// 配置command
program
  .command(`dev`)
  .argument('<string>', 'which directory to use')
  .description('启动本地服务器访问')
  .action(directory => {
    try {
      dev(directory)
    } catch (error) {
      console.log(error)
    }
  })

program
  .command(`build`)
  .argument('<string>', 'which directory to use')
  .description('打包成html')
  .action(directory => {
    try {
      build(directory)
    } catch (error) {
      console.log(error)
    }
  })

program
  .command(`publish`)
  .argument('<string>', 'the platform to publish')
  .description('更新gitee的webpage')
  .action((platform, options) => {
    try {
      update(platform, options)
    } catch (error) {
      console.log(error)
    }
  })

program
  .command(`push`)
  .argument('<string>', 'the platform to push')
  .description('推送note到gitee仓库')
  .option('-d, --directory <path>', '需要推送到gitee仓库的文件夹')
  .action((platform, options) => {
    try {
      push(platform, options)
    } catch (error) {
      console.log(error)
    }
  })

program
  .command(`pp`)
  .argument('<string>', 'the platform to publish')
  .description('发布note到gitee, 包括推送到仓库和更新web')
  .option('-d, --directory <path>', '需要推送到gitee仓库的文件夹')
  .action((platform, options) => {
    try {
      pp(platform, options)
    } catch (error) {
      console.log(error)
    }
  })

program
  .command(`bpp`)
  .argument('<string>', 'the platform to publish')
  .description('编译成html，发布note到gitee, 包括推送到仓库和更新web')
  .option('-d, --directory <path>', '需要推送到gitee仓库的文件夹')
  .action((platform, options) => {
    try {
      pp(platform, options)
    } catch (error) {
      console.log(error)
    }
  })

// 配置 cli 信息，版本、cli说明等
program.description(blue('FlyNote  代码转换从未如此简单  https://gogocode.io'))

// 接管命令行输入，参数处理
program.parse(process.argv)
console.log(program.opts())
