import fs from 'fs'
import path from 'path'

const pipe =
  (...fns: Array<(x: any) => any>) =>
  (x: any) =>
    fns.reduce((v, f) => f(v), x)

const flattenArray = (input: unknown[]): string[] =>
  input.reduce<string[]>(
    (acc, item) => [...acc, ...(Array.isArray(item) ? item : [item as string])],
    []
  )

const map =
  (fn: (x: any) => any) =>
  (input: any[]): any[] =>
    input.map(fn)

const walkDir = (fullPath: string): string | string[] => {
  return fs.statSync(fullPath).isFile() ? fullPath : getAllFilesRecursively(fullPath)
}

const pathJoinPrefix = (prefix: string) => (extraPath: string) => path.join(prefix, extraPath)

const getAllFilesRecursively = (folder: string): string[] =>
  pipe(fs.readdirSync, map(pipe(pathJoinPrefix(folder), walkDir)), flattenArray)(folder)

export default getAllFilesRecursively
