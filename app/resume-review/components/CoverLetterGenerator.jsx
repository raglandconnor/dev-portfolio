import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { generateCoverLetter } from "@/actions/cover-letter-generator";

export default function CoverLetterGenerator({
  isOpen,
  onClose,
  resumeText,
  setCoverLetter,
  setAnalysis,
}) {
  const [jobDescription, setJobDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setCoverLetter(null);
    const coverLetter = await generateCoverLetter(resumeText, jobDescription);

    setIsGenerating(false);
    onClose();
    setCoverLetter(coverLetter);
    setAnalysis(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate Cover Letter</DialogTitle>
          <DialogDescription>
            Paste the job description here to generate a tailored cover letter.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            placeholder="Paste job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={6}
          />
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !jobDescription.trim()}
          >
            {isGenerating ? "Generating..." : "Generate Cover Letter"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
