import { resolve } from 'path'
import fs from 'fs'

export const getUserPackageJson = () => {
  const path = resolve(process.cwd(), 'package.json')
  if (fs.existsSync(path)) {
    return JSON.parse(fs.readFileSync(path))
  }
  return {}
}

export const getRepositoryUrlFromPackageJson = pkg => pkg.repository || 'none'
export const buildVersionFromPackageJson = pkg => `${pkg.name} ${pkg.version}`

