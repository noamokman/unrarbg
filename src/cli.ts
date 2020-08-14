import program, {STRING} from 'caporal';
import updateNotifier from 'update-notifier';
import readPkg from 'read-pkg';
import unrarbg from '.';

export default async (argv: string[]) => {
  const pkg = await readPkg();

  const notifier = updateNotifier({pkg});

  program.version(pkg.version);

  if (pkg.description) {
    program.description(pkg.description);
  }

  program
    .argument('<src>', 'The path to the source folder', STRING)
    .argument('<dest>', 'The path to the destination folder', STRING)
    .action(async ({src, dest}, _, logger) => {
      try {
        const res = await unrarbg(src, dest);

        logger.info(res);
      }
      catch (error) {
        logger.error(error);
      }

      notifier.notify();
    });

  program
    .parse(argv);
};