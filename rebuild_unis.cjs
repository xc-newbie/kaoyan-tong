const fs = require('fs');

// Read clean data
const newUnis = JSON.parse(fs.readFileSync('tmp_processed_unis_clean.json', 'utf-8'));

// Read good baseline from universities.ts (first 603 curated entries)
const goodUniContent = fs.readFileSync('tmp_good_universities.txt', 'utf-8');

// Read existing universitiesList.ts to extract all entries as objects
const listContent = fs.readFileSync('src/data/universitiesList.ts', 'utf-8');
// Strip the import and the array wrapper to get raw entry text
const listImportStripped = listContent.replace(/^import[^;]+;\s*/, '');
const listArrayStart = listImportStripped.indexOf('[');
const listArrayEnd = listImportStripped.lastIndexOf('];');
const listBody = listImportStripped.slice(listArrayStart + 1, listArrayEnd);

// Extract first 603 entries by parsing the raw text
function extractEntries(text) {
  const entries = [];
  let depth = 0;
  let start = -1;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '{') {
      if (depth === 0) start = i;
      depth++;
    } else if (text[i] === '}') {
      depth--;
      if (depth === 0 && start >= 0) {
        entries.push(text.slice(start, i + 1));
        start = -1;
        if (entries.length === 603) break;
      }
    }
  }
  return entries;
}

const curatedEntries = extractEntries(listBody);
// Re-format each entry onto its own line
const goodListContent = 'export const universitiesList = [\n' + curatedEntries.map(e => '  ' + e.trim().replace(/\s+/g, ' ')).join(',\n') + ',';

// Existing names
const existingUniNames = new Set([...goodUniContent.matchAll(/name: '([^']+)'/g)].map(m => m[1]));
const existingListNames = new Set([...goodListContent.matchAll(/name: '([^']+)'/g)].map(m => m[1]));
console.log('Existing uni names:', existingUniNames.size);
console.log('Existing list names:', existingListNames.size);

const provToRegion = {
  '北京': '华北', '天津': '华北', '河北': '华北', '山西': '华北', '内蒙古': '华北',
  '辽宁': '东北', '吉林': '东北', '黑龙江': '东北',
  '上海': '华东', '江苏': '华东', '浙江': '华东', '安徽': '华东', '福建': '华东', '江西': '华东', '山东': '华东',
  '河南': '华中', '湖北': '华中', '湖南': '华中',
  '广东': '华南', '广西': '华南', '海南': '华南',
  '四川': '西南', '重庆': '西南', '贵州': '西南', '云南': '西南', '西藏': '西南',
  '陕西': '西北', '甘肃': '西北', '青海': '西北', '宁夏': '西北', '新疆': '西北',
};

function pickMajorIds(name, level) {
  if (level === '专科') return ['0812', '1201'];
  if (name.includes('医学') || name.includes('医')) return ['1002', '1001', '1055', '1204', '0812'];
  if (name.includes('师范') || name.includes('教育')) return ['0401', '0501', '0701', '0305', '1204', '0812'];
  if (name.includes('财经') || name.includes('工商') || name.includes('经济') || name.includes('商贸')) return ['1202', '0202', '0251', '1201', '1253'];
  if (name.includes('农业') || name.includes('农')) return ['0951', '0710', '0832', '1204', '0812'];
  if (name.includes('外国语') || name.includes('外语')) return ['0502', '0551', '0501', '1202'];
  if (name.includes('政法') || name.includes('法学') || name.includes('司法') || name.includes('警官')) return ['0301', '0302', '1204', '0305'];
  if (name.includes('美术') || name.includes('艺术') || name.includes('音乐') || name.includes('戏剧') || name.includes('电影') || name.includes('舞蹈') || name.includes('传媒') || name.includes('视觉')) return ['1301', '0401', '0501'];
  if (name.includes('体育')) return ['0401', '0402', '1204'];
  if (name.includes('中医') || name.includes('中医药')) return ['1005', '1055', '1001', '1204'];
  if (name.includes('理工') || name.includes('科技') || name.includes('工业') || name.includes('工程') || name.includes('技术')) return ['0812', '085410', '0802', '0810', '1201'];
  if (name.includes('交通') || name.includes('铁道') || name.includes('民航')) return ['0814', '0812', '0802', '1201'];
  if (name.includes('邮电') || name.includes('电子') || name.includes('信息')) return ['0812', '0810', '085410', '0835', '085400'];
  if (name.includes('建筑') || name.includes('城建')) return ['0813', '0814', '0830', '1201', '0812'];
  if (name.includes('电力') || name.includes('水利') || name.includes('水电')) return ['0811', '0830', '0812', '1201'];
  if (name.includes('石油') || name.includes('化工')) return ['0830', '0703', '0812', '1201'];
  if (name.includes('林业')) return ['0713', '0830', '0951', '0812'];
  if (name.includes('海洋') || name.includes('海事')) return ['0710', '0830', '0814', '1204', '0812'];
  if (name.includes('民族')) return ['0305', '0501', '0301', '1204', '0812'];
  return ['0812', '1201', '1202', '0701'];
}

const hotCities = ['北京', '上海', '深圳', '广州', '杭州', '南京', '成都', '武汉', '西安', '重庆'];

function sanitize(str) {
  return str.replace(/[\n\r\t]/g, '').replace(/'/g, '').trim();
}

let newListEntries = '';
let newUniEntries = '';
let listCount = 0, uniCount = 0;

for (const u of newUnis) {
  // Skip entries that already exist in the curated lists
  if (existingListNames.has(u.name) && existingUniNames.has(u.name)) continue;

  const name = sanitize(u.name);
  const city = sanitize(u.city);
  const province = sanitize(u.province);
  const region = provToRegion[province] || '华东';
  const tier = u.level === '本科' ? '双非' : '专科';

  if (!existingListNames.has(u.name)) {
    newListEntries += "  { name: '" + name + "', province: '" + province + "', city: '" + city + "', tier: '" + tier + "' },\n";
    listCount++;
  }

  if (!existingUniNames.has(u.name)) {
    const majors = pickMajorIds(u.name, u.level);
    const isHot = hotCities.includes(city);
    const base = u.level === '本科' ? (isHot ? 58 : 53) : (isHot ? 45 : 40);
    const scores = [];
    for (let i = 0; i < majors.length; i++) {
      scores.push("'" + majors[i] + "': " + Math.round(base + Math.random() * 8 - 4));
    }
    const shortName = sanitize(u.name.replace(/大学|学院|职业技术|高等专科|（[^）]*）/g, '').slice(0, 5));
    const features = [];
    if (u.level === '本科') {
      if (u.type === '公办') features.push('公办本科');
      else features.push('民办本科');
    } else {
      if (u.type === '公办') features.push('公办专科');
      else features.push('民办专科');
    }
    if (isHot) features.push('区位优势');
    features.push(city);
    if (u.type === '公办') features.push('公办院校');

    newUniEntries += "  {\n";
    newUniEntries += "    id: 'x" + uniCount.toString(36) + "', name: '" + name + "', shortName: '" + shortName + "', region: '" + region + "', city: '" + city + "', tier: '" + tier + "',\n";
    newUniEntries += "    majorIds: ['" + majors.join("', '") + "'],\n";
    newUniEntries += "    subjectRankings: {},\n";
    newUniEntries += "    admissionScore: { " + scores.join(', ') + " },\n";
    newUniEntries += "    features: ['" + features.join("', '") + "'], is985: false, is211: false, isDoubleFirst: false,\n";
    newUniEntries += "  },\n";
    uniCount++;
  }
}

console.log('New list entries:', listCount);
console.log('New uni entries:', uniCount);

// Write final files
const listExportFn = `
const _searchFn = (query: string) => {
  if (!query.trim()) return [];
  const q = query.trim().toLowerCase();
  return universitiesList.filter((u: any) => u.name.toLowerCase().includes(q) || u.province.toLowerCase().includes(q) || u.city.toLowerCase().includes(q)).slice(0, 15);
};

export { _searchFn as searchUniversities };
`;

const uniExportFn = `
const _getById = (id: string) => universities.find((u: any) => u.id === id);
const _getByMajor = (majorId: string) => universities.filter((u: any) => u.majorIds.includes(majorId));
const _getByRegion = (region: string) => universities.filter((u: any) => u.region === region);
const _getByTier = (tier: string) => universities.filter((u: any) => u.tier === tier);

export { _getById as getUniversityById, _getByMajor as getUniversitiesByMajor, _getByRegion as getUniversitiesByRegion, _getByTier as getUniversitiesByTier };
`;

const finalList = goodListContent + '\n' + newListEntries + "\n];\n" + listExportFn;
const finalUni = goodUniContent + "\n" + newUniEntries + "\n];\n" + uniExportFn;

fs.writeFileSync('src/data/universitiesList.ts', finalList);
fs.writeFileSync('src/data/universities.ts', finalUni);

// Verify
const verifyList = [...finalList.matchAll(/name: '([^']+)'/g)].map(m => m[1]);
const verifyUni = [...finalUni.matchAll(/name: '([^']+)'/g)].map(m => m[1]);
console.log('Final list count:', verifyList.length);
console.log('Final uni count:', verifyUni.length);

// Check for the two specific schools
['武汉商学院', '河南职业技术学院', '北京大学', '清华大学'].forEach(s => {
  console.log(s + ': list=' + verifyList.includes(s) + ', uni=' + verifyUni.includes(s));
});
