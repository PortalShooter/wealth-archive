const getArticlesByCategory = (searchInput, category) => {

  if (!searchInput?.trim()) {
    return null;
  }

  let appropriateArrays = [];

  category.articles.forEach(article => {
    const lowerCaseQuestion = article.title.toLowerCase();
    const lowerCaseInput = searchInput.toLowerCase();

    if (lowerCaseQuestion.indexOf(lowerCaseInput) === -1) {
      return null;
    }
    appropriateArrays.push(article);
  })

  return appropriateArrays;
};

export default getArticlesByCategory;
