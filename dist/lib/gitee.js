"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pushToGiteeRepo = exports.updateGiteePage = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const pushToGiteeRepo = (config) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('config:::', config);
    console.log('process.cwd()', process.cwd());
});
exports.pushToGiteeRepo = pushToGiteeRepo;
const updateGiteePage = (config) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch();
    let res = null;
    const page = yield browser.newPage();
    res = yield page.goto('https://gitee.com/login');
    yield page.setViewport({ width: 1080, height: 960 });
    yield page.screenshot({ path: 'screenshort1.png' });
    res = yield page.type('#user_login', config.username);
    res = yield page.type('#user_password', config.password, {
        delay: 500
    });
    yield page.screenshot({ path: 'screenshort2.png' });
    yield Promise.all([
        page.click('input[type=submit]'),
        page.waitForNavigation()
    ]);
    yield page.screenshot({ path: 'screenshort3.png' });
    yield Promise.all([
        page.goto(config.giteeUpdateUrl),
        page.waitForNavigation()
    ]);
    yield page.screenshot({ path: 'screenshort4.png' });
    page.on('dialog', (dialog) => __awaiter(void 0, void 0, void 0, function* () {
        dialog.accept();
        yield page.screenshot({ path: 'screenshort6.png' });
    }));
    yield Promise.all([page.click('.update_deploy')]);
    yield page.screenshot({ path: 'screenshort5.png' });
    yield page.waitForTimeout(2000);
    let deploying = false;
    let count = 0;
    while ((deploying = !!(yield page.$('#pages_deploying')))) {
        console.log(`check loop, ${count}s`);
        count += 2;
        yield page.waitForTimeout(2000);
    }
    console.log('发布更新完成.');
});
exports.updateGiteePage = updateGiteePage;
