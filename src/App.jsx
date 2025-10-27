import { useState, useEffect } from 'react';
import puter from "@heyputer/puter.js";

function App() {
  const [ans, setAns] = useState("...");
  const [resumeText, setResumeText] = useState("");
  const [jdText, setjdText] = useState("");
  const [impr, setimpr] = useState();
  const [just, setjust] = useState();
  let promt=`You are an ATS (Applicant Tracking System) scoring assistant.
        Your sole task is to evaluate a resume against a job description.

        Task:
        1.  Analyze the **Job Description** to identify key skills, experience, and keywords.
        2.  Analyze the **Resume** to see how well it matches those requirements.
        3.  Assign a **strict, practical ATS score** between 0 and 100.
        4.  Provide a **one-sentence justification** for the score.
        5.  Generate a list of 2-3 **actionable improvements** for the resume, based on the job description.

        Scoring Rules:
        * A score of 100 means a perfect match.
        * A score of 0 means zero match.
        * **You must be critical.** Do not "sugarcoat." A resume that is a poor fit for the job *must* receive a very low score (e.g., 10-30). A resume that is a "meh" fit should be in the 40-60 range.

        Output format:
        Return **only** a single, valid JSON object. Do not add any text, explanations, or markdown before or after the JSON.

        JSON Schema:
        {
          "score": <integer>,
          "justification": ["<string>"],
          "improvements": [
            "<string>",
            "<string>"
          ]
        }
        Resume:
        ${resumeText}`;
  const jdpromt=`You are an ATS (Applicant Tracking System) scoring assistant.
        Your sole task is to evaluate a resume against a job description.

        Task:
        1.  Analyze the **Job Description** to identify key skills, experience, and keywords.
        2.  Analyze the **Resume** to see how well it matches those requirements.
        3.  Assign a **strict, practical ATS score** between 0 and 100.
        4.  Provide a **one-sentence justification** for the score.
        5.  Generate a list of 2-3 **actionable improvements** for the resume, based on the job description.

        Scoring Rules:
        * A score of 100 means a perfect match.
        * A score of 0 means zero match.
        * **You must be critical.** Do not "sugarcoat." A resume that is a poor fit for the job *must* receive a very low score (e.g., 10-30). A resume that is a "meh" fit should be in the 40-60 range.

        Output format:
        Return **only** a single, valid JSON object. Do not add any text, explanations, or markdown before or after the JSON.

        JSON Schema:
        {
          "score": <integer>,
          "justification": ["<string>"],
          "improvements": [
            "<string>",
            "<string>"
          ]
        }
        Resume:
        ${resumeText}
        Job Description:
        ${jdText}`;
  const fn = async () => {
    try {
      const promptText = (jdText && jdText.length > 10) ? jdpromt : promt;
      if (!resumeText || resumeText.trim().length < 10) {
  setAns("Please paste a valid resume first.");
  return;
}
      const res = await puter.ai.chat(promptText, {
  temperature: 0,
  // top_p: 1,
}); 
      console.log("API Response:", res); // This log helped you solve it!
      
      if (res && res.message) {
          const jsonString = res.message.content.trim();
          // const jsonString = res.message.content;
          const data = JSON.parse(jsonString); 
          // 3. Get *just the score* from the object
          const score = data.score; 
          // 4. Save only the score to your existing 'ans' state
          // (We convert it to a string just in case, to be safe)
          setAns(String(score));
          setimpr(data.improvements);
          setjust(data.justification);
          // setAns(score);
        } else {
          setAns("Could not retrieve a valid score.");
        }

      } catch (error) {
        console.error("Failed to call the AI service:", error);
        setAns("An error occurred.");
      }
    }
    
    
    return (
      <div>
      <h1>ATS Score</h1>
      <textarea
      rows={10}
      placeholder="Paste your resume here"
      value={resumeText}
      onChange={(e) => setResumeText(e.target.value)}
      // className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-300"
      />
      <textarea
      rows={10}
      placeholder="Paste your JD here"
      value={jdText}
      onChange={(e) => setjdText(e.target.value)}
      // className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-300"
      />
      <button
      onClick={fn}>
        analyze resume
      </button>

      <p>{ans || "Calculating..."}</p>
      {impr && impr.length > 0 && 
    <div>
      <h3>Improvements:</h3>
      <ul>
        {impr.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  }
      {just && just.length > 0 && 
    <div>
      <h3>Justification:</h3>
      <ul>
        {just.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  }
    </div>
  );
}
export default App;
