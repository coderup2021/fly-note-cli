import { GiteeConfig } from '../types/index.d'
import puppeteer from 'puppeteer'
import * as path from 'path'
import { $ } from 'zx'
import dayjs from 'dayjs'

const pushToGiteeRepo = async (config: GiteeConfig) => {
  const dir = path.resolve(process.cwd(), config.directory)
  await $`cd ${dir}`
  await $`git init`
  await $`git remote add origin ${config.giteeRepo}`
  await $`git add .`
  await $`git commit -m "commit @ ${dayjs().format('YYYY-MM-DD HH:mm:ss')}"`
  await $`git push -u origin master -f`
  return
}
const updateGiteePage = async (config: GiteeConfig) => {
  const browser: puppeteer.Browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://gitee.com/login')
  await page.setViewport({ height: 960, width: 1080 })
  await page.screenshot({ path: 'screenshort1.png' })
  await page.type('#user_login', config.username)
  await page.type('#user_password', config.password, {
    delay: 500
  })
  await page.screenshot({ path: 'screenshort2.png' })
  await Promise.all([
    page.click('input[type=submit]'),
    page.waitForNavigation()
  ])
  await page.screenshot({ path: 'screenshort3.png' })
  await Promise.all([
    page.goto(config.giteeUpdateUrl),
    page.waitForNavigation()
  ])
  await page.screenshot({ path: 'screenshort4.png' })
  page.on('dialog', async dialog => {
    dialog.accept()
    await page.screenshot({ path: 'screenshort6.png' })
  })
  await Promise.all([page.click('.update_deploy')])
  await page.screenshot({ path: 'screenshort5.png' })
  await page.waitForTimeout(2000)
  let count = 0
  while (await page.$('#pages_deploying')) {
    console.log(`check loop, ${count}s`)
    count += 2
    await page.waitForTimeout(2000)
  }
  console.log('发布更新完成.')
}
export { updateGiteePage, pushToGiteeRepo }
