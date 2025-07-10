import * as XLSX from 'xlsx';
import { s3Client } from './s3-client';

export async function parseXlsxFromS3(bucket: string, key: string) {
  const s3Object = await s3Client
    .getObject({ Bucket: bucket, Key: key })
    .promise();

  const workbook = XLSX.read(s3Object.Body, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });

  // Garantimos que os campos estão presentes
  return jsonData.map((item: any) => ({
    endToEndId: item.endToEndId,
    value: Number(item.value),
    pixKey: item.pixKey,
    pixKeyType: item.pixKeyType,
    scheduleDate: item.scheduleDate ? new Date(item.scheduleDate) : undefined,
  }));
}
