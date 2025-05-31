export const loadQuizImage = async (imageKey: string) => {
  try {
    const image = await import(`../assets/quiz-images/${imageKey}.png`);
    return image.default;
  } catch (error) {
    console.error(`Quiz image not found: ${imageKey}`, error);
    return null;
  }
};
