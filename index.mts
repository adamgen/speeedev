#!/usr/bin/env node

import { program } from 'commander';

import { Builder } from './lib/Builder.mjs';
import { ProcessRunner } from './lib/ProcessRunner.mjs';
import { getSourceAndDest } from './lib/getSourceAndDest.mjs';

program
  .version('0.0.1')
  .command('watch')
  .argument('<root-path>', 'Project root')
  .description('clone a repository into a newly created directory')
  .action((baseDirectory) => {
    const { source, dest } = getSourceAndDest(baseDirectory);

    const builder = new Builder({ source, dest });
    const runner = new ProcessRunner({ dest });

    builder.onBuild = () => {
      runner.run();
    };
    builder.build();
  });

program.parse();