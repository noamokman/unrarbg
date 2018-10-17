import program, {STRING} from 'caporal';
import updateNotifier from 'update-notifier';
import pkg from '../package.json';
import unrarbg from '.';

const notifier = updateNotifier({pkg});

program.version(pkg.version)
  .description(pkg.description)
  .argument('<src>', 'The path to the source folder', STRING)
  .argument('<dest>', 'The path to the destination folder', STRING)
  .action(async ({src, dest}, options, logger) => {
    try {
      const res = await unrarbg(src, dest);

      logger.info(res);
    }
    catch (error) {
      logger.error(error);
    }

    notifier.notify();
  });

export default argv => {
  program
    .parse(argv);
};