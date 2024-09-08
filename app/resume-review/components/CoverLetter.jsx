import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { jsPDF } from "jspdf";

export default function CoverLetter({ coverLetterText }) {
  const [text, setText] = useState(coverLetterText);
  const textareaRef = useRef(null);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const downloadAsPDF = () => {
    const content = textareaRef.current.value;
    const pdf = new jsPDF({
      unit: "in",
      format: "letter",
      orientation: "portrait",
    });

    // Set font
    pdf.setFont("Arial");
    pdf.setFontSize(12);

    // Split the content into lines
    const lines = pdf.splitTextToSize(content, 7.5);

    // Add text to PDF
    pdf.text(lines, 0.5, 1); // Start at (0.5, 0.5) for margins

    // Save the PDF
    pdf.save("cover_letter.pdf");
  };

  return (
    <Card className="w-full my-8">
      <CardHeader>
        <CardTitle>Generated Cover Letter</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          ref={textareaRef}
          value={text}
          onChange={handleTextChange}
          className="w-full h-96 mb-4"
        />

        <Button onClick={downloadAsPDF}>Download as PDF</Button>
      </CardContent>
    </Card>
  );
}
