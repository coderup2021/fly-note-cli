#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const colors_1 = require("colors");
const publish_1 = __importDefault(require("./lib/publish"));
const program = new commander_1.Command();
// 配置command
program
    .command(`publish`)
    .argument('<string>', 'the platform to publish')
    .description('发布note到某个平台')
    .option('-d, --directory <path>', '需要推送到gitee仓库的文件夹')
    .action((platform, options) => {
    console.log('platform', platform);
    console.log('options', options);
    try {
        (0, publish_1.default)(platform, options);
    }
    catch (error) {
        console.log(error);
    }
});
// 配置 cli 信息，版本、cli说明等
program.description((0, colors_1.blue)('FlyNote  代码转换从未如此简单  https://gogocode.io'));
// 接管命令行输入，参数处理
program.parse(process.argv);
console.log(program.opts());
