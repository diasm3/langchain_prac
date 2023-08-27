// @ts-expect-error moduleResolution:nodenext issue 54523
import { OpenAI } from "langchain/llms/openai";
// @ts-ignore
import { PromptTemplate, ChatPromptTemplate, SystemMessagePromptTemplate, AIMessagePromptTemplate, HumanMessagePromptTemplate} from "langchain/prompts";

import * as dotenv from "dotenv";
dotenv.config();
const template = `
      [예시 문장]
      - 치킨은 살 안쪄요. 살은 내가 쪄요.
      - 치킨을 맛있게 먹는 101가지 방법. 101번 먹는다.

      [음식 정보]
      - {food} : {description}

      위 정보는 모두 음식 '{food}'에 관련된 내용입니다. [예시 문장]은 '치킨'을 가지고 만든 마케팅 문구입니다.
      당신은 음식회사 마케터입니다. 다양한 음식 중 하나를 선택해야하는 고객에게 '{food}' 추천 메시지를 전송해야 합니다.
      [예시 문장]과 [음식 정보]를 참고하여 다음 조건을 만족하면서 '{food}'을 권유하는 짧은 메시지 5개를 리스트 형식으로 생성해주세요. 리스트는 '-' 단위로 구분되어야 합니다.
      - 문장의 길이는 42자 이하로 작성
      - 메시지를 받는 사람은 배달음식을 주로 시킴
      - 고객이 흥미를 느낄 수 있도록 발랄한 어투로 작성
     `

const promptExcute = async () => {
  const noInputPrompt = new PromptTemplate({
    inputVariables: ["food", "description"],
    template ,
  });

  const values = {
    name: "John",
    age: 25,
    email: "john@example.com",
  };
  const formattedNoInputPrompt = await noInputPrompt.format({
    food: "pizza",
    description: ["pizza"],
  });

  const prompt = PromptTemplate.fromTemplate(
    `You are a naming consultant for new companies.
  What is a good name for a company that makes {product}?`
  );
  
  const formattedPrompt = await prompt.format({
    product: "colorful socks",
  });


  const systemMessagePrompt = SystemMessagePromptTemplate.fromTemplate(template);
const humanTemplate = "{text}";
const humanMessagePrompt = HumanMessagePromptTemplate.fromTemplate(humanTemplate);

  console.log(values);
  console.log(formattedNoInputPrompt);
};

promptExcute();

// const llm = new OpenAI({
//   temperature: 0.9,
//   openAIApiKey: process.env.OPENAI_API_KEY,
// });

// const openAiTest = async () => {
//   const result = await llm.predict("내가 지금 한는 코딩을 요약해줘c");
//   console.log(result);
// };

// openAiTest();
