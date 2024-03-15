/*
 * @Author: guoming1.huang
 * @Date: 2022-05-19 18:09:24
 * @LastEditors: guoming1.huang
 * @LastEditTime: 2022-06-16 11:27:08
 * @FilePath: /shrinkjs/rollup.config.js
 * @Description: 123
 *
 * Copyright (c) 2022 by tumax_guoming.huang, All Rights Reserved.
 */
import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import { dts } from "rollup-plugin-dts";
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import path from "path";

const resolve = (...args) => path.resolve(...args); // 适应不同环境，封装path.resolve，少写一点代码

export default defineConfig([
  {
    input: "./src/main.ts",
    output: {
      file: resolve('./', 'dist/index.js'),
      format: "es",
    },
    plugins: [
      typescript({
        sourceMap: false,
      }),
      commonjs(),
      getBabelOutputPlugin({
        presets:['@babel/preset-env'],
        include: "/src/**"
      }),
      terser()
    ],
  },
  {
    // 生成 .d.ts 类型声明文件
    input: resolve("./src/main.ts"),
    output: {
      file: resolve("./", "dist/index.d.ts"),
      format: "es",
    },
    plugins: [dts()],
  },
]);