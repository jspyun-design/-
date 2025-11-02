
import { GoogleGenAI, Type } from "@google/genai";
import { Task } from '../types';

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const suggestTasks = async (projectName: string): Promise<Pick<Task, 'description'>[]> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY is not configured.");
  }
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are a project management assistant. For a project titled '${projectName}', generate a list of 5 to 7 common tasks. Respond ONLY in JSON format. The JSON should be an array of objects, where each object has a 'description' key with the task description as a string. Example: [{"description": "Define project scope"}, {"description": "Create wireframes"}]`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              description: {
                type: Type.STRING,
                description: 'The description of the task.',
              },
            },
            required: ['description'],
          },
        },
      },
    });

    const jsonText = response.text.trim();
    const tasks = JSON.parse(jsonText);

    if (Array.isArray(tasks) && tasks.every(t => typeof t.description === 'string')) {
        return tasks;
    } else {
        throw new Error("Invalid format for suggested tasks.");
    }

  } catch (error) {
    console.error("Error suggesting tasks:", error);
    throw new Error("Failed to get task suggestions from AI.");
  }
};
