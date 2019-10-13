import {promises} from 'fs';
import {join} from 'path';
import rimraf from 'rimraf';
import pify from 'pify';
import pMap from 'p-map';
import readAndParse from './readAndParse';

const rimrafP = pify(rimraf);

export default async (src: string, dest: string) => {
  const dirs = await readAndParse(src);

  return pMap(dirs, async ({path, files}) => {
    if (!files) {
      return {path, status: 'unknown'};
    }

    await pMap(files, file => promises.rename(join(path, file), join(dest, file)));

    await rimrafP(path, {disableGlob: true});

    return {path, status: 'success'};
  });
};