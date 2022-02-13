"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const path = __importStar(require("path"));
const zx_1 = require("zx");
const dayjs_1 = __importDefault(require("dayjs"));
const pushToGiteeRepo = (config) => __awaiter(void 0, void 0, void 0, function* () {
    const dir = path.resolve(process.cwd(), config.directory);
    (0, zx_1.cd)(dir);
    // await $`ls`
    yield (0, zx_1.$) `git init`;
    yield (0, zx_1.$) `git config user.email ${config.gitEmail}`;
    yield (0, zx_1.$) `git config user.name ${config.gitUserName}`;
    yield (0, zx_1.$) `git remote add origin ${config.giteeRepo}`;
    yield (0, zx_1.$) `git add .`;
    yield (0, zx_1.$) `git commit -m "commit @ ${(0, dayjs_1.default)().format('YYYY-MM-DD HH:mm:ss')}"`;
    yield (0, zx_1.$) `git push -u origin master -f`;
    yield (0, zx_1.$) `rm -rf .git`;
    (0, zx_1.cd)('..');
    yield (0, zx_1.$) `rm -rf ${dir}`;
});
exports.pushToGiteeRepo = pushToGiteeRepo;
const updateGiteePage = (config) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch();
    const page = yield browser.newPage();
    yield page.goto('https://gitee.com/login');
    yield page.setViewport({ height: 960, width: 1080 });
    yield page.screenshot({ path: 'screenshort1.png' });
    yield page.type('#user_login', config.username);
    yield page.type('#user_password', config.password, {
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
    let count = 0;
    while (yield page.$('#pages_deploying')) {
        console.log(`check loop, ${count}s`);
        count += 2;
        yield page.waitForTimeout(2000);
    }
    console.log('发布更新完成.');
});
exports.updateGiteePage = updateGiteePage;
