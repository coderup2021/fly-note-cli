import { GiteeConfig } from '../types/index.d'
import puppeteer from 'puppeteer'
import * as path from 'path'
import { $, cd } from 'zx'
import dayjs from 'dayjs'
import ora from 'ora'

const pushToGiteeRepo = async (config: GiteeConfig) => {
  const dir = path.resolve(process.cwd(), config.directory)
  cd(dir)
  await $`git init`
  await $`git config user.email ${config.gitEmail}`
  await $`git config user.name ${config.gitUserName}`
  await $`git remote add origin ${config.giteeRepo}`
  await $`git add .`
  await $`git commit -m "commit @ ${dayjs().format('YYYY-MM-DD HH:mm:ss')}"`
  await $`git push -u origin master -f`
  await $`rm -rf .git`
  cd('..')
  await $`rm -rf ${dir}`
}
const updateGiteePage = async (config: GiteeConfig) => {
  const spinner = ora('start update gitee page').start()
  const browser: puppeteer.Browser = await puppeteer.launch()
  try {
    const page = await browser.newPage()
    await page.goto('https://gitee.com/login')
    await page.setViewport({ height: 960, width: 1080 })
    await page.type('#user_login', config.username)
    await page.type('#user_password', config.password, {
      delay: 500
    })
    await Promise.all([
      page.click('input[type=submit]'),
      page.waitForNavigation()
    ])
    await Promise.all([
      page.goto(config.giteeUpdateUrl),
      page.waitForNavigation()
    ])
    page.on('dialog', async dialog => {
      dialog.accept()
    })
    await Promise.all([page.click('.update_deploy')])
    await page.waitForTimeout(2000)
    while (await page.$('#pages_deploying')) {
      console.log('+')
      await page.waitForTimeout(2000)
    }
    spinner.succeed('Update Success')
    process.exit()
  } catch (error) {
    console.error('error', error)
    spinner.fail('Update Fail. try again!')
    updateGiteePage(config)
  }
}
export { updateGiteePage, pushToGiteeRepo }
