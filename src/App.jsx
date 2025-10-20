import { useState, useEffect } from 'react';
import puter from "@heyputer/puter.js";

function App() {
  const [ans, setAns] = useState("...");
  const [resumeText, setResumeText] = useState("");
  const fn = async () => {
    try {
        const res = await puter.ai.chat(`Check my resume and give ATS score (0-100 score) be practical it is for competetive roles and the reply should be of the form just an integer 0 to 100 nothing else as i would convert to response from sstring to int , for the following resume:${resumeText} `); 
        
        // const res = await puter.ai.chat(`You are an ATS (Applicant Tracking System) scoring assistant.

        // Task:
        // Evaluate the following resume text and assign a practical ATS compatibility score between 0 and 100.
        // Assume the resume is for competitive roles (tech/product/general).

        // Output format:
        // Return only a single integer between 0 and 100.
        // Do not include any words, symbols, or punctuation — just the number.

        // Resume:
        // ${resumeText}`); 
        console.log("API Response:", res); // This log helped you solve it!

        if (res && res.message) {

          const score = res.message.content;
          setAns(score);
        } else {
          setAns("Could not retrieve a valid score.");
        }

      } catch (error) {
        console.error("Failed to call the AI service:", error);
        setAns("An error occurred.");
      }
  }

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const res = await puter.ai.chat("Check my resume and give ATS score (one-word reply)");
  //       console.log("API Response:", res); // This log helped you solve it!

  //       if (res && res.message) {

  //         const score = res.message.content;
  //         setAns(score);
  //       } else {
  //         setAns("Could not retrieve a valid score.");
  //       }

  //     } catch (error) {
  //       console.error("Failed to call the AI service:", error);
  //       setAns("An error occurred.");
  //     }
  //   })();
  // }, []); 

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
      <button
      onClick={fn}>
        analyze resume
      </button>

      <p>{ans || "Calculating..."}</p>
    </div>
  );
}
export default App;