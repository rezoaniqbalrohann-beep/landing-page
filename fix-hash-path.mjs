import fs from 'node:fs';
import { execSync } from 'node:child_process';

const cwd = process.cwd();
if (cwd.includes('#') && process.platform === 'win32') {
  try {
    const shortCwd = execSync('cmd /c "for %I in (.) do @echo %~sI"', {
      encoding: 'utf-8',
    }).trim();

    if (shortCwd && !shortCwd.includes('#')) {
      const shortSlash = shortCwd.replace(/\\/g, '/');
      const longSlash = cwd.replace(/\\/g, '/');

      const replaceLong = (val) => {
        if (typeof val !== 'string') return val;
        return val
          .replaceAll(cwd, shortCwd)
          .replaceAll(longSlash, shortSlash);
      };

      const origRealpathSync = fs.realpathSync;
      const patchedRealpathSync = function (p, options) {
        return replaceLong(origRealpathSync.call(fs, p, options));
      };
      patchedRealpathSync.native = function (p, options) {
        return replaceLong(origRealpathSync.native.call(fs, p, options));
      };
      fs.realpathSync = patchedRealpathSync;

      const origRealpathAsync = fs.realpath;
      const patchedRealpathAsync = function (p, options, callback) {
        if (typeof options === 'function') {
          callback = options;
          options = undefined;
        }
        return origRealpathAsync.call(fs, p, options, (err, resolvedPath) => {
          callback(err, replaceLong(resolvedPath));
        });
      };
      patchedRealpathAsync.native = function (p, options, callback) {
        if (typeof options === 'function') {
          callback = options;
          options = undefined;
        }
        return origRealpathAsync.native.call(
          fs,
          p,
          options,
          (err, resolvedPath) => {
            callback(err, replaceLong(resolvedPath));
          }
        );
      };
      fs.realpath = patchedRealpathAsync;

      const origPromisesRealpath = fs.promises.realpath;
      fs.promises.realpath = async function (p, options) {
        const res = await origPromisesRealpath.call(fs.promises, p, options);
        return replaceLong(res);
      };

      process.chdir(shortCwd);
    }
  } catch {
    // Fallback if short path resolution is unavailable
  }
}
