const { GoogleGenerativeAI } = require("@google/generative-ai");

require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);

async function listModels() {
  try {
    const result = await genAI.listModels();
    console.log("AVAILABLE MODELS:");
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error("ERROR:", err);
  }
}

listModels();
