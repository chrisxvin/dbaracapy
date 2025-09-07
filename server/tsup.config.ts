import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/**/*.{ts,js}"],
    outDir: "bin",
    format: ["esm"], // 使用 ESModule 模式
    sourcemap: false, // 可选：是否生成 sourcemap
    clean: true, // 构建前清理 bin 目录
    tsconfig: "tsconfig.json", // 指定 tsconfig 文件
});
