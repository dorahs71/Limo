export const handlePopularList = (data, allUser) => {
  let userArr = [];

  if (data !== '') {
    let newList = data
      .sort(function (a, b) {
        return a.collect.length - b.collect.length;
      })
      .reverse()
      .slice(0, 4);
    newList.map((list) => {
      const authorData = allUser.find((x) => x.uid === list.authorId);
      userArr.push(authorData);
      return authorData;
    });

    let popularListArr = newList.map((item, i) =>
      Object.assign({}, item, userArr[i])
    );
    return popularListArr;
  }
};
