import { exportResumeToPdf } from './pdfExport';

export const LIVE_PREVIEW_SHEET_ID = 'resume-a4-preview';

export const exportLivePreviewPdf = async (studentName, showToast) => {
  showToast?.('Printer dialog mein Destination: Save as PDF select karo', 'info');
  await exportResumeToPdf(LIVE_PREVIEW_SHEET_ID, studentName || 'Student');
};
