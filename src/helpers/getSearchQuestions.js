const searchQuestions = (searchInput, categories, all = false) => {
  if (!searchInput?.trim()) {
    return null;
  }

  let appropriateArrays = [];
  categories?.forEach((category) => {
    category.questions?.forEach((elem) => {
      const lowerCaseQuestion = elem.question.toLowerCase();
      const lowerCaseInput = searchInput.toLowerCase();

      if (lowerCaseQuestion.indexOf(lowerCaseInput) === -1) {
        return null;
      }

      const question = {
        answer: elem.answer,
        question: elem.question,
        _key: elem._key,
        _id: category._id,
        categoryName: category.slug.current,
      };
      appropriateArrays.push(question);
    });
  });

  if (all) {
    return (appropriateArrays = appropriateArrays.filter((elem) => {
      if (elem) {
        count++;
        return elem;
      }
    }));
  }

  let count = 0;
  appropriateArrays = appropriateArrays.filter((elem) => {
    if (elem && count < 3) {
      count++;
      return elem;
    }
  });

  return appropriateArrays;
};

export default searchQuestions;
