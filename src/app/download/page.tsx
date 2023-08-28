import fs from 'fs';
import path from 'path';
import https from 'https';
import { parseString } from 'xml2js';
import { NextApiRequest, NextApiResponse } from 'next';

const downloadFile = (url: string, dest: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, response => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve());
      });
    }).on('error', error => {
      fs.unlink(dest, () => {});
      reject(error.message);
    });
  });
};

const parseXML = (xmlContent: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    parseString(xmlContent, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

const mergeXMLFiles = async (req: NextApiRequest, res: NextApiResponse) => {
  const urls: any[] = [
    "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=23562&bannerid=67587&feedid=1387", // 00 Glade Gaver
    "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=23562&bannerid=94836&feedid=2569", // 01 Møbelkompagniet
    "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=23562&bannerid=57775&feedid=1046", // 02 Roligan
    "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=23562&bannerid=45583&feedid=613" // 03 Coop
  ];

  const folderPath = path.join(process.cwd(), 'xml');
  const jsonFilePath = path.join(process.cwd(), '/public/merged.json');

  try {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    const xmlData = await Promise.all(urls.map(async (url, i) => {
      const fileName = `file${i + 1}.xml`;
      const filePath = path.join(folderPath, fileName);
      await downloadFile(url, filePath);
      console.log(`Downloaded ${fileName} to ${folderPath}`);

      const xmlContent = await fs.promises.readFile(filePath, 'binary');
      const jsonData = await parseXML(xmlContent);
      return jsonData;
    }));

    const mergedData = xmlData.reduce((acc, cur) => {
      const key = Object.keys(cur)[0];
      const newData = Array.isArray(cur[key]) ? cur[key] : [cur[key]];

      if (key === 'produkter') {
        const produktArrays = newData.map((item: { produkt: any; }) => item.produkt);
        const produkter = [].concat(...produktArrays);
        acc[key] = acc[key] ? acc[key].concat(produkter) : produkter;
      } else {
        acc[key] = [...(acc[key] || []), ...newData];
      }

      return acc;
    }, {});

    await fs.promises.writeFile(jsonFilePath, JSON.stringify(mergedData));
    console.log(`Merged data saved to ${jsonFilePath}`);

    res.status(200).json({ message: 'XML files merged and saved successfully' });
  } catch (error) {
    console.error(error);
  }
}

export default mergeXMLFiles;
