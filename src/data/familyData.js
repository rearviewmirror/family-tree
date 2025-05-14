import Papa from 'papaparse';
import raw from './familyTree.csv?raw'; // Vite-specific way to import raw text

const data = Papa.parse(raw, {
  header: true,
  skipEmptyLines: true,
}).data;

const familyTree = buildTreeFromFlatData(data);
export default familyTree;

function buildTreeFromFlatData(data) {
  const map = {};
  const roots = [];

  data.forEach((row) => {
    const id = row.id;
    const parentId = row.parentId;

    const node = {
      id,
      name: row.name,
      nameBn: row.nameBn,
      photo: row.photo,
      social: row.social,
      children: [],
    };

    map[id] = node;

    if (parentId) {
      if (!map[parentId]) {
        map[parentId] = { children: [] };
      }
      map[parentId].children.push(node);
    } else {
      roots.push(node);
    }
  });

  return roots.length === 1 ? roots[0] : { name: "Root", children: roots };
}
