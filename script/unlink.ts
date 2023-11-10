/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-11-10 09:39:59
 * @LastEditTime: 2023-11-10 10:29:27
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: unlink处理流程
 * @FilePath: \GeneralBasicForm\script\unlink.ts
 * 
 */
import path from "path";
import fs from 'fs'
import chalk from 'chalk'

const updateMain = () => {
  try {
    const packageTxt = fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8');
    const packageJson = JSON.parse(packageTxt);
    const umdDir = "./dist/index.umd.js"
    const esDir = "./dist/index.mjs"
    packageJson.main = umdDir
    packageJson.module = esDir
    packageJson.exports = {
      ".": {
        "import": esDir,
        "require": umdDir
      }
    }
    packageJson.module = "./dist/index.d.ts"
    packageJson.files = [
      "/dist"
    ]
    const versionData = JSON.stringify(packageJson, null, 2);
    fs.writeFileSync(path.join(__dirname, '../package.json'), versionData, 'utf8');
    console.log(chalk.green.bold('修改入口配置成功！当前入口路径为为：' + umdDir));
  } catch (error) {
    console.log(chalk.red.bold('修改入口配置出错:', error.toString()));
  }

}

updateMain()