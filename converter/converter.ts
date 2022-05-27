import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'yaml';
import { Club, Dict } from '../types';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const d3 = require('d3').default;

const clubs: Club[] = yaml.parse(fs.readFileSync(path.resolve('./data/frames/clubs.yml'), 'utf8'));
const dict: Dict = yaml.parse(fs.readFileSync(path.resolve('./data/frames/dict.yml'), 'utf8'));
const stringFileds = ['name', 'fullname', 'id', 'category', 'license'];
const outDir = path.resolve('./data/dataset');

function converter(file: string) {
  const src = fs.readFileSync(file, 'utf8');
  const data = d3.csvParse(src, (row: Record<string, string>) => {
    const club = clubs[clubs.map(({ id }) => id).indexOf(row.id as string)];
    const obj: Record<string, unknown> = {
      slug: club.slug,
      name: club.short_name,
    };
    const dictList = Object.entries(dict);
    dictList.forEach(([key, value]) => {
      if (typeof row?.[value] !== 'string') return;
      if (row[value] === 'Null') return;

      if (stringFileds.includes(key)) {
        obj[key] = row[value];
      } else {
        obj[key] = parseFloat(row[value] ?? '0');
      }
    });
    /*
    for (const key in dict) {
      if (!row.hasOwnProperty([dict[key]])) continue;
      if (row[dict[key]] === 'Null') continue;
      obj[key] = stringFileds.includes(key) ? row[dict[key]] : parseFloat(row[dict[key]]);
    }
    */
    obj.id = `${club.slug}${obj.year}`;
    obj.fullname = club.name;

    return obj;
  });
  data.forEach((datum: Record<string, unknown>) => {
    const { slug, year } = datum;
    const dirPath = path.join(outDir, slug as string);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }
    fs.writeFile(path.join(dirPath, `${year}.yml`), yaml.stringify(datum), (err) => {
      if (err) throw err;
      console.log(slug, year, 'export');
    });
  });
}

export default converter;
