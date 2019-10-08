import fs from 'fs';
import os from 'os';
import path from 'path';
import 'ignore';
import 'wcwidth';
import * as git from 'isomorphic-git';

// Make temporary directory
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-'));
console.log(dir);
// Behold - it is empty!
fs.readdirSync(dir);

export async function cloneGit() {
    console.log('stasrt clone')
    await git.clone({
        fs,
        dir,
        url: 'https://github.com/isomorphic-git/isomorphic-git',
        ref: 'master',
        singleBranch: true,
    });
    console.log('done')
}