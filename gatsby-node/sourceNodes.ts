import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'yaml';
import { SourceNodesArgs } from 'gatsby';
import { Club, Year } from '../types';

export default async function souceNodes({ actions, createNodeId, createContentDigest }: SourceNodesArgs) {
  const { createNode } = actions;

  const clubs: Club[] = yaml.parse(fs.readFileSync(path.resolve(__dirname, '../data/frames/clubs.yml'), 'utf-8'));

  clubs.forEach((data) => {
    const nodeId = createNodeId(`club-${data.slug}`);
    const nodeContent = JSON.stringify(data);
    const nodeMeta = {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `Club`,
        mediaType: `text/html`,
        content: nodeContent,
        contentDigest: createContentDigest(data),
      },
    };

    const node = { ...data, ...nodeMeta };
    createNode(node);
  });

  const years: Year[] = yaml.parse(fs.readFileSync(path.resolve(__dirname, '../data/frames/years.yml'), 'utf-8'));

  years.forEach((data) => {
    const nodeId = createNodeId(`year-${data.year}`);
    const nodeContent = JSON.stringify(data);
    const nodeMeta = {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `Year`,
        mediaType: `text/html`,
        content: nodeContent,
        contentDigest: createContentDigest(data),
      },
    };

    const node = { ...data, ...nodeMeta };
    createNode(node);
  });
}
