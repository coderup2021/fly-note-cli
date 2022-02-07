#!/usr/bin/env node
import { Command } from 'commander'
import { blue } from 'colors'
import publish from './lib/publish'

const program = new Command()
// 配置command
program
  .command(`publish`)
  .argument('<string>', 'the platform to publish')
  .description('发布note到某个平台')
  .option('-d, --directory <path>', '需要推送到gitee仓库的文件夹')
  .action((platform, options) => {
    console.log('platform', platform)
    console.log('options', options)
    try {
      publish(platform, options)
    } catch (error) {
      console.log(error)
    }
  })

// 配置 cli 信息，版本、cli说明等
program.description(blue('FlyNote  代码转换从未如此简单  https://gogocode.io'))

// 接管命令行输入，参数处理
program.parse(process.argv)
console.log(program.opts())
