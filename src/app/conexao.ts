import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

/**
 * chave: chave da API
 * tipo_chat: pré definido
 */
interface ConexaoParams {
  chave: string;
  tipo_chat: string;
}

/**
 * 
 * @param {chave} chave de acesso a API
 * @returns 
 */
const criarConexao = ({ chave, tipo_chat }: ConexaoParams) => {

  const genAI = new GoogleGenerativeAI(chave);
  const model = genAI.getGenerativeModel({ model: tipo_chat });

  //ser bem criativo
  const generationConfig = {
    temperature: 1,
    maxOutputTokens: 8192,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [],
  });

  return chat
}

export default criarConexao; 