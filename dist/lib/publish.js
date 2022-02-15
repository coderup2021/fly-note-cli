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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.push = exports.pu = void 0;
const colors_1 = require("colors");
const fs = __importStar(require("fs-extra"));
const userhome_1 = __importDefault(require("userhome"));
const config_1 = require("../config");
const gitee_1 = require("./gitee");
const readPlatConfig = (plat) => {
    const configpath = (0, userhome_1.default)(config_1.CONFIG_DIR_NAME, `${plat}.json`);
    if (!fs.existsSync(configpath)) {
        throw new Error(`config file not found: ${configpath}`);
        return;
    }
    return require(configpath);
};
const pu = (plat, options) => {
    if (plat === 'gitee') {
        console.log('options:', options);
        let config = readPlatConfig(plat);
        config = Object.assign(Object.assign({}, config), options);
        (0, gitee_1.pushToGiteeRepo)(config);
        (0, gitee_1.updateGiteePage)(config);
    }
    else if (plat === 'github') {
    }
    else
        console.log((0, colors_1.red)('unknown platform'));
};
exports.pu = pu;
const update = (plat, options) => {
    if (plat === 'gitee') {
        let config = readPlatConfig(plat);
        config = Object.assign(Object.assign({}, config), options);
        (0, gitee_1.updateGiteePage)(config);
    }
    else if (plat === 'github') {
    }
    else
        console.log((0, colors_1.red)('unknown platform'));
};
exports.update = update;
const push = (plat, options) => {
    if (plat === 'gitee') {
        let config = readPlatConfig(plat);
        config = Object.assign(Object.assign({}, config), options);
        (0, gitee_1.pushToGiteeRepo)(config);
    }
    else if (plat === 'github') {
    }
    else
        console.log((0, colors_1.red)('unknown platform'));
};
exports.push = push;
