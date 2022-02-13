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
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = exports.dev = void 0;
const ChildProcess = __importStar(require("child_process"));
const path = __importStar(require("path"));
const utils_1 = require("../utils");
const fsExtra = __importStar(require("fs-extra"));
const colors_1 = require("colors");
const dev = (rDirectory) => __awaiter(void 0, void 0, void 0, function* () {
    exec('dev', rDirectory);
});
exports.dev = dev;
const build = (rDirectory) => __awaiter(void 0, void 0, void 0, function* () {
    exec('build', rDirectory);
});
exports.build = build;
const exec = (type, rDirectory) => __awaiter(void 0, void 0, void 0, function* () {
    const aDirectroy = path.resolve(process.cwd(), rDirectory);
    console.log('aDirectroy', aDirectroy);
    if (!fsExtra.existsSync(aDirectroy)) {
        console.log((0, colors_1.red)(`no such directory: ${aDirectroy}`));
        return;
    }
    if (!(0, utils_1.isDirectory)(aDirectroy)) {
        console.log((0, colors_1.red)(`target path is not a directory: ${aDirectroy}`));
        return;
    }
    yield execCmd(`npx vuepress automenu -f ${aDirectroy}`);
    yield execCmd(`npx vuepress ${type} ${aDirectroy}`);
});
const execCmd = (cmd) => {
    return new Promise((resolve, reject) => {
        var _a, _b;
        let cp = ChildProcess.exec(cmd, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            if (stderr) {
                reject(stderr);
                return;
            }
            resolve(stdout);
        });
        (_a = cp.stdout) === null || _a === void 0 ? void 0 : _a.pipe(process.stdout);
        (_b = cp.stderr) === null || _b === void 0 ? void 0 : _b.pipe(process.stderr);
    });
};
