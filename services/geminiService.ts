
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT_TEMPLATE } from "../constants";

const getAIClient = (customKey?: string) => {
  // Use user provided key if available, otherwise fallback to system key
  const apiKey = customKey || process.env.API_KEY || '';
  return new GoogleGenAI({ apiKey });
};

export const generateFashionImage = async (
  clothingImageBase64: string,
  modelDescription: string,
  cameraAngle: string,
  props: string,
  lightingStyle: string,
  pose: string,
  customApiKey?: string
): Promise<string> => {
  const ai = getAIClient(customApiKey);
  
  // Xử lý logic đạo cụ và tương tác (đảm bảo không che khuất trang phục)
  const isNoProps = props === 'Không có (Tối giản)';
  const propInstruction = isNoProps
    ? 'Minimal clean studio background with NO props. The background must be absolutely empty.'
    : `The model is NATURALLY INTERACTING with a minimal studio prop: ${props}. She is using it for support (sitting, leaning, or resting an arm) in a way that does NOT hide or block any part of the clothing. The ${props} is fully visible within the full-body frame.`;

  // Ép buộc hiển thị bàn chân ngay cả khi ngồi
  const poseInstruction = `${pose}. CRITICAL: Even if in a sitting or walking pose, the ENTIRE body including feet and shoes must be clearly visible on the floor within the frame. No cropping of the lower body.`;

  // Xử lý logic ánh sáng
  let lightingInstruction = '';
  switch (lightingStyle) {
    case 'Ánh sáng định hướng mềm (Soft Directional)':
      lightingInstruction = 'Soft directional studio lighting from the side-front, creating dimensional highlights while maintaining full visibility of garment details.';
      break;
    case 'Ánh sáng tạt (Side Lighting) tạo khối':
      lightingInstruction = 'Professional side lighting that creates soft shadows to define the body shape and fabric folds, adding realistic depth.';
      break;
    case 'Độ tương phản nhẹ (Gentle Contrast)':
      lightingInstruction = 'Commercial lighting with gentle contrast between light and shadow, highlighting the fabric texture without losing detail in the dark areas.';
      break;
    case 'Ánh sáng thương mại cao cấp (High-End Commercial)':
      lightingInstruction = 'Sophisticated high-end e-commerce lighting setup, clean and flattering with subtle rim light to separate the model from the background.';
      break;
    default:
      const lightingVariations = [
        'Dynamic mix of soft directional light and subtle side fill.',
        'Natural studio window-style lighting with soft transitions.',
        'Three-point commercial lighting setup with clear dimensional highlights.',
        'Balanced soft box lighting that ensures even but dimensional product visibility.'
      ];
      lightingInstruction = lightingVariations[Math.floor(Math.random() * lightingVariations.length)];
  }

  const prompt = SYSTEM_PROMPT_TEMPLATE
    .replace('[MODEL_DESCRIPTION]', modelDescription)
    .replace('[CAMERA_ANGLE]', cameraAngle)
    .replace('[POSE_INSTRUCTION]', poseInstruction)
    .replace('[PROP_INTERACTION_INSTRUCTION]', propInstruction)
    .replace('[LIGHTING_INSTRUCTION]', lightingInstruction);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: clothingImageBase64.split(',')[1],
              mimeType: 'image/png',
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "9:16"
        }
      }
    });

    let imageUrl = '';
    const candidates = response.candidates;
    if (candidates && candidates.length > 0 && candidates[0].content && candidates[0].content.parts) {
      for (const part of candidates[0].content.parts) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (!imageUrl) {
      throw new Error("Không nhận được dữ liệu hình ảnh từ mô hình AI.");
    }

    return imageUrl;
  } catch (error) {
    console.error("Image generation failed:", error);
    throw error;
  }
};
