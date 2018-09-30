import {readdir, stat, access} from 'fs/promises';
import {join, extname} from 'path';
import pMap from 'p-map';
import pPipe from 'p-pipe';
import pFilter from 'p-filter';
import pReflect from 'p-reflect';

const isRarbgFolder = async dir => {
  const stats = await stat(dir);

  if (!stats.isDirectory()) {
    return false;
  }

  const {isFulfilled} = await pReflect(access(join(dir, 'RARBG.txt')));

  return isFulfilled;
};

const getRelevantFiles = files => {
  files = files.filter(file => file.toLowerCase() !== 'sample');

  if (files.length > 3) {
    return;
  }

  const [mkv, ...otherMkvs] = files.filter(file => extname(file) === '.mkv');
  const [srt, ...otherSrts] = files.filter(file => extname(file) === '.srt');

  if (!mkv || otherMkvs.length || otherSrts.length) {
    return;
  }

  return srt ? [mkv, srt] : [mkv];
};

const parseFolder = async path => {
  const allFiles = await readdir(path);

  return {path, files: getRelevantFiles(allFiles)};
};

export default pPipe(
  readdir,
  files => pFilter(files, isRarbgFolder),
  rarbgFolders => pMap(rarbgFolders, parseFolder)
);