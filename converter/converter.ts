import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'yaml';
import { csvParse } from 'd3';
import { Club, Dict } from '../types';

const clubs: Club[] = yaml.parse(fs.readFileSync(path.resolve('./data/frames/clubs.yml'), 'utf8'));
const dict: Dict = yaml.parse(fs.readFileSync(path.resolve('./data/frames/dict.yml'), 'utf8'));
const stringFileds = ['name', 'fullname', 'id', 'category', 'license'];
const outDir = path.resolve('./data/dataset');

function converter(file: string) {
  const src = fs.readFileSync(file, 'utf8');
  const data = csvParse(src, (row) => {
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
  data.forEach((datum) => {
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
