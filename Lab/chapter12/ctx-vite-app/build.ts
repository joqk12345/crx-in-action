import * as fs from 'fs'
import * as path from 'path'

export const CRX_OUTDIR = 'build'
// 临时build content script的目录
export const CRX_CONTENT_OUTDIR = '_build_content'
// 临时build background script的目录
export const CRX_BACKGROUND_OUTDIR = '_build_background'

// 拷贝目录文件
export const copyDirectoryRecursive = (
  srcDir: string,
  destDir: string
): void => {
  // 判断目标目录是否存在，不存在则创建
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir)
  }
  const entries = fs.readdirSync(srcDir, { withFileTypes: true })
  // 逐个处理文件和子目录
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name)
    const destPath = path.join(destDir, entry.name)

    if (entry.isDirectory()) {
      // 如果是子目录，递归地拷贝该目录
      copyDirectoryRecursive(srcPath, destPath)
    } else {
      // 如果是文件，直接拷贝文件到目标目录并覆盖同名文件
      fs.copyFileSync(srcPath, destPath)
    }
  }
  //fs.cpSync(srcDir, destDir, { recursive: true })
  // fs.readdirSync(srcDir).forEach((file) => {
  //   const srcPath = path.join(srcDir, file)
  //   const destPath = path.join(destDir, file)

  //   if (fs.lstatSync(srcPath).isDirectory()) {
  //     // 递归复制子目录
  //     copyDirectory(srcPath, destPath)
  //   } else {
  //     // 复制文件
  //     fs.copyFileSync(srcPath, destPath)
  //   }
  // })
}

// 删除目录及文件
export const deleteDirectory = (dir: string): void => {
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach((file) => {
      const curPath = path.join(dir, file)
      if (fs.lstatSync(curPath).isDirectory()) {
        // 递归删除子目录
        deleteDirectory(curPath)
      } else {
        // 删除文件
        fs.unlinkSync(curPath)
      }
    })
    // 删除空目录
    fs.rmdirSync(dir)
  }
}

// 源目录：content script临时生成目录
const contentOutDir = path.resolve(process.cwd(), CRX_CONTENT_OUTDIR)
// 源目录：background script临时生成目录
const backgroundOutDir = path.resolve(process.cwd(), CRX_BACKGROUND_OUTDIR)
// 目标目录：Chrome Extension 最终build目录
const outDir = path.resolve(process.cwd(), CRX_OUTDIR)
// 将复制源目录内的文件和目录全部复制到目标目录中
copyDirectoryRecursive(contentOutDir, outDir)
// copyDirectory(backgroundOutDir, outDir);
// 删除源目录
deleteDirectory(contentOutDir)
// deleteDirectory(backgroundOutDir);
