
import { ModelPersona } from './types';

export const MODEL_PERSONAS: ModelPersona[] = [
  {
    id: 'vn-model-1',
    name: 'Linh',
    thumbnail: 'https://picsum.photos/seed/vn1/400/600',
    description: 'Người mẫu nữ Việt Nam 24 tuổi, khuôn mặt trái xoan mềm mại, tóc đen thẳng ngang vai, tông da ấm tự nhiên. Thân hình cân đối, mảnh khảnh, cao 165cm.'
  },
  {
    id: 'vn-model-2',
    name: 'Mai',
    thumbnail: 'https://picsum.photos/seed/vn2/400/600',
    description: 'Người mẫu nữ Việt Nam 26 tuổi, gò má cao, tóc đen dài gợn sóng, vẻ đẹp cổ điển thanh lịch. Thân hình thanh mảnh, cao 168cm.'
  }
];

export const SYSTEM_PROMPT_TEMPLATE = `
Generate a high-end commercial fashion e-commerce photo.
MODEL SPECIFICATIONS:
- Same Vietnamese female model: [MODEL_DESCRIPTION]
- Consistent face identity and facial features.
- Same body shape, same height, realistic feminine body.
- Natural Vietnamese skin tone, realistic skin texture.
- Natural human anatomy, correct hands with five fingers.

CLOTHING SPECIFICATIONS:
- The model is wearing the EXACT clothing shown in the uploaded reference image.
- Accurate clothing structure, correct neckline, sleeves, and hem.
- Correct clothing proportions, realistic fabric folds and thickness.
- Product clarity is the top priority; clothing must be fully visible and undistorted.

COMPOSITION & FRAMING (MANDATORY):
- FULL BODY COMPOSITION IS MANDATORY.
- The ENTIRE body must be visible including head, torso, legs, ankles, and FEET.
- ABSOLUTELY NO CROPPING of legs or feet.
- The camera must frame the model from HEAD TO TOE.
- Center the model in the frame with balanced vertical composition.
- Aspect ratio: 9:16.

SCENE & LIGHTING SPECIFICATIONS:
- Pose: [POSE_INSTRUCTION].
- Interaction: [PROP_INTERACTION_INSTRUCTION].
- Camera angle: [CAMERA_ANGLE].
- Professional fashion studio lighting: [LIGHTING_INSTRUCTION].
- Lighting must vary naturally, creating dimensional highlights and natural shadow depth.
- Clean studio background, minimal props.
- Realistic, high quality, sharp focus.

NEGATIVE CONSTRAINTS (CRITICAL):
- NO CROPPED LEGS, NO CROPPED FEET, NO CROPPED ANKLES.
- NO HALF-BODY SHOTS, NO EXTREME CLOSE-UPS.
- ABSOLUTELY NO TEXT OR TYPOGRAPHY IN THE IMAGE.
- NO LOGOS, NO WATERMARKS, NO SYMBOLS.
- NO OVERLAYS, NO GRAPHICS.
- NO BODY RESHAPING, NO EXAGGERATED PROPORTIONS.
- NO DISTRACTING BACKGROUND ELEMENTS.
- NO DRAMATIC ARTISTIC LIGHTING THAT OBSCURES THE PRODUCT.
`;

export const CAMERA_ANGLES = [
  'Toàn thân chính diện (Front View)',
  'Góc nghiêng 30-45 độ (3/4 View)',
  'Góc ngang mắt (Eye Level)',
  'Góc thấp nhẹ (Slight Low Angle)'
];

export const STUDIO_PROPS = [
  'Không có (Tối giản)',
  'Ghế studio hiện đại',
  'Bục gỗ hình khối',
  'Sofa tối giản',
  'Bệ đá marble'
];

export const LIGHTING_STYLES = [
  'Ngẫu nhiên (Tự nhiên)',
  'Ánh sáng định hướng mềm (Soft Directional)',
  'Ánh sáng tạt (Side Lighting) tạo khối',
  'Độ tương phản nhẹ (Gentle Contrast)',
  'Ánh sáng thương mại cao cấp (High-End Commercial)'
];

export const POSES = [
  'Đứng thẳng tự nhiên (Standing naturally)',
  'Chuyển động đi bộ nhẹ (Slight walking motion)',
  'Dồn trọng tâm tự nhiên (Natural weight shift)',
  'Ngồi thanh lịch (Seated elegantly)'
];
