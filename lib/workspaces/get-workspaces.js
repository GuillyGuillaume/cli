const { resolve } = require('path')
const mapWorkspaces = require('@npmcli/map-workspaces')
const minimatch = require('minimatch')
const rpj = require('read-package-json-fast')

// Returns an Map of paths to workspaces indexed by workspace name
// { foo => '/path/to/foo' }
const getWorkspaces = async (filters, { path, relativeFrom }) => {
  // TODO we need a better error to be bubbled up here if this rpj call fails
  const pkg = await rpj(resolve(path, 'package.json'))
  const workspaces = await mapWorkspaces({ cwd: path, pkg })
  let res = new Map()
  if (!filters.length) {
    res = new Map([...res, ...workspaces])
  }

  for (const filterArg of filters) {
    for (const [workspaceName, workspacePath] of workspaces.entries()) {
      if (filterArg === workspaceName
        || resolve(relativeFrom || path, filterArg) === workspacePath
        || minimatch(workspacePath, `${resolve(relativeFrom || path, filterArg)}/*`)) {
        res.set(workspaceName, workspacePath)
      }
    }
  }

  if (!res.size) {
    let msg = '!'
    if (filters.length) {
      msg = `:\n ${filters.reduce(
        (res, filterArg) => `${res} --workspace=${filterArg}`, '')}`
    }

    throw new Error(`No workspaces found${msg}`)
  }

  return res
}

module.exports = getWorkspaces
