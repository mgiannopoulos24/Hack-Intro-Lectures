const quizImageModules = import.meta.glob<string>('../assets/quiz-images/*.{png,jpg}', {
  query: '?url',
  import: 'default',
});

export const loadQuizImage = async (imageKey: string) => {
  for (const ext of ['.png', '.jpg']) {
    const path = `../assets/quiz-images/${imageKey}${ext}`;
    const loader = quizImageModules[path];
    if (loader) {
      return await loader();
    }
  }
  console.error(`Quiz image not found: ${imageKey} (tried .png and .jpg)`);
  return null;
};
