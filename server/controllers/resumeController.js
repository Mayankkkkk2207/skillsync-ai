import { createRequire } from "module";

const require = createRequire(import.meta.url);

const pdf = require("pdf-parse");

export const parseResume = async (req, res) => {

  try {

    if (!req.file) {

      return res.status(400).json({
        message: "No file uploaded",
      });

    }

    const data = await pdf(req.file.buffer);

    res.status(200).json({
      extractedText: data.text,
    });

  } catch (error) {

    console.error(
      "Resume parsing failed",
      error
    );

    res.status(500).json({
      message: "Resume parsing failed",
    });

  }
};