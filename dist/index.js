#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const colors_1 = require("colors");
const path_1 = require("path");
const publish_1 = require("./lib/publish");
const vuepress_1 = require("./lib/vuepress");
const program = new commander_1.Command();
// 配置command
program
    .command(`init`)
    .argument('<string>', 'which directory to use')
    .description('初始化配置文件')
    .action((directory) => {
    try {
        (0, vuepress_1.init)(directory);
        //prettier-ignore
        console.log(`${(0, colors_1.green)('success')} init success in ${(0, path_1.resolve)(process.cwd(), directory)}`);
    }
    catch (error) {
        console.log(`${(0, colors_1.red)('error')} ${error}`);
    }
});
program
    .command(`dev`)
    .argument('<string>', 'which directory to use')
    .description('启动本地服务器访问')
    .action((directory) => {
    try {
        (0, vuepress_1.dev)(directory);
    }
    catch (error) {
        console.log(`${(0, colors_1.red)('error')} error`);
    }
});
program
    .command(`build`)
    .argument('<string>', 'which directory to use')
    .description('打包成html')
    .action((directory) => {
    try {
        (0, vuepress_1.build)(directory);
    }
    catch (error) {
        console.log(`${(0, colors_1.red)('error')} error`);
    }
});
program
    .command(`push`)
    .argument('<string>', 'the platform to push')
    .description('推送note到gitee仓库')
    .option('-d, --directory <path>', '需要推送到gitee仓库的文件夹')
    .action((platform, options) => {
    try {
        (0, publish_1.push)(platform, options);
    }
    catch (error) {
        console.log(`${(0, colors_1.red)('error')} error`);
    }
});
program
    .command(`update`)
    .argument('<string>', 'the platform to publish')
    .description('更新gitee的webpage')
    .action((platform, options) => {
    try {
        (0, publish_1.update)(platform, options);
    }
    catch (error) {
        console.log(`${(0, colors_1.red)('error')} error`);
    }
});
program
    .command(`pu`)
    .argument('<string>', 'the platform to publish')
    .description('发布note到gitee, 包括推送到仓库和更新web')
    .option('-d, --directory <path>', '需要推送到gitee仓库的文件夹')
    .action((platform, options) => {
    try {
        (0, publish_1.pu)(platform, options);
    }
    catch (error) {
        console.log(`${(0, colors_1.red)('error')} error`);
    }
});
// 配置 cli 信息，版本、cli说明等
program.description((0, colors_1.blue)('FlyNote  代码转换从未如此简单  https://gogocode.io'));
// 接管命令行输入，参数处理
program.parse(process.argv);
