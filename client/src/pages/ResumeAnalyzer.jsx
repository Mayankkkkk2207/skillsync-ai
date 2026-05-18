import { useState } from "react";
import axios from "axios";

export default function ResumeAnalyzer() {

  const [file, setFile] = useState(null);

  const [text, setText] = useState("");

  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {

    alert("BUTTON CLICKED");

    console.log("HANDLE UPLOAD RUNNING");

    console.log("CURRENT FILE:", file);

    if (!file) {

      alert("No file selected");

      console.log("NO FILE");

      return;
    }

    try {

      setLoading(true);

      console.log("UPLOAD STARTED");

      const formData = new FormData();

      formData.append("resume", file);

      const res = await axios.post(
        "http://localhost:5000/api/v1/resume/parse",
        formData
      );

      console.log("UPLOAD SUCCESS");

      setText(res.data.extractedText);

      setLoading(false);

    } catch (error) {

      console.error("UPLOAD FAILED", error);

      alert("UPLOAD FAILED");

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-slate-900 text-white p-6">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          Resume Analyzer TEST PAGE
        </h1>

        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">

          <input
  type="file"
  accept=".pdf"
  id="resumeUpload"
  hidden
  onChange={(e) => {

    console.log(
      "FILE SELECTED:",
      e.target.files[0]
    );

    setFile(e.target.files[0]);
  }}
/>

<label
  htmlFor="resumeUpload"
  className="inline-block cursor-pointer bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg"
>
  Choose Resume
</label>

{file && (

  <div className="mt-4">

    <p className="text-green-400 text-sm mb-3">
      Selected: {file.name}
    </p>

    <button
      onClick={handleUpload}
      disabled={loading}
      className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg disabled:opacity-50"
    >
      {loading
        ? "Uploading & Parsing Resume..."
        : "Upload Resume"}
    </button>

  </div>

)}

        </div>

        {text && (

          <div className="mt-8 bg-slate-950 border border-slate-800 rounded-2xl p-6">

            <h2 className="text-2xl font-semibold mb-4">
              Extracted Resume Text
            </h2>

            <div className="max-h-[500px] overflow-y-auto bg-slate-900 p-4 rounded-lg">

              <pre className="whitespace-pre-wrap text-slate-300 text-sm">
                {text.slice(0, 4000)}
              </pre>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}