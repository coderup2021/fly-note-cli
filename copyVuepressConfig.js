#!/usr/bin/env node

require('fs-extra').copySync('./src/.vuepress', 'dist/.vuepress')
