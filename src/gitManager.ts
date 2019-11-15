import fs from 'fs';
import os from 'os';
import path from 'path';
import 'ignore';
import 'wcwidth';
import * as git from 'isomorphic-git';

// Make temporary directory
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'git-ocr-bot-tmp-'));
console.log(dir);
// Behold - it is empty!
fs.readdirSync(dir);

export async function cloneGit() {
    console.log('start clone')
    await git.clone({
        fs,
        dir,
        url: 'https://github.com/i5heu/Turm',
        ref: 'master',
        singleBranch: true,
    });
    console.log('done')
}