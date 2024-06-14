import { join } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
const main = async () => {
  let url = import.meta.url;
  let __filename = fileURLToPath(url);
  let src = join(__filename, '../dist');
  let dest = join(__filename, '../../');
  let map = new Map();
  let res = await fs.readdir(src);
  res.filter((item) => item !== '.DS_Store').forEach((item) => {
    map.set(join(src, item), join(dest, item));
  });
  for (let [k, v] of map.entries()) {
    if (await fs.pathExists(v)) {
      await fs.remove(v);
    }
    await fs.copy(k, v);
  }
};
main();
