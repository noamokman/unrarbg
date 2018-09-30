import {rename} from 'fs/promises';
import {join} from 'path';
import del from 'del';
import pMap from 'p-map';
import readAndParse from './readAndParse';

module.exports = async (src, dest) => {
  const dirs = await readAndParse(src);

  return pMap(dirs, async ({path, files}) => {
    if (!files) {
      return {path, status: 'unknown'};
    }

    await pMap(files, file => rename(join(path, file), join(dest, file)));

    await del(path);

    return {path, status: 'success'};
  });
};