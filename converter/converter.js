const fs = require('fs');
const path = require('path');
const yaml = require('yaml');
const { csvParse } = require('d3-dsv');

const clubs = yaml.parse(fs.readFileSync(path.resolve('./data/frames/clubs.yml'), 'utf8'));
const dict = yaml.parse(fs.readFileSync(path.resolve('./data/frames/dict.yml'), 'utf8'));
const stringFileds = ['name', 'fullname', 'id', 'category', 'license'];
const outDir = path.resolve('./data/dataset');

module.exports = function converter(file) {
  const src = fs.readFileSync(file, 'utf8');
  const data = csvParse(src, (row) => {
    const club = clubs[clubs.map(({ id }) => id).indexOf(row.id)];
    const obj = {
      slug: club.slug,
      name: club.short_name,
    };

    for (const key in dict) {
      if (!row.hasOwnProperty([dict[key]])) continue;
      if (row[dict[key]] === 'Null') continue;
      obj[key] = stringFileds.includes(key) ? row[dict[key]] : parseFloat(row[dict[key]]);
    }
    obj.id = `${club.slug}${obj.year}`;
    obj.fullname = club.name;

    return obj;
  });
  data.forEach((datum) => {
    const { slug, year } = datum;
    const dirPath = path.join(outDir, slug);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }
    fs.writeFile(path.join(dirPath, `${year}.yml`), yaml.stringify(datum), (err) => {
      if (err) throw err;
      console.log(slug, year, 'export');
    });
  });
};
