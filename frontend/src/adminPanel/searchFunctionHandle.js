export const searchFunctionHandle = async (data, title, search) => {
  const filter = await data?.filter((item) => {
    if (search !== "") {
      // console.log(item.productName.toLowerCase().includes(search.toLowerCase()))
      return item?.title.toLowerCase().includes(search.toLowerCase());
    }
  });
  console.log(filter, "searchFunctionHandle");
};
