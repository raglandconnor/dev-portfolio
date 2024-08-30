import { NextResponse } from "next/server";
import * as pdfjs from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.mjs";

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export async function POST(req) {
  // load the worker module with this path
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await pdfjs.getDocument(new Uint8Array(arrayBuffer)).promise;

  // Use for loop to extract text from each page
  let extractedText = "";
  for (let i = 1; i <= pdfDoc.numPages; i++) {
    const page = await pdfDoc.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map((item) => item.str).join(" ");
    extractedText += pageText + "\n";
  }

  return NextResponse.json({ extractedText });
}
