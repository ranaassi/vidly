import _ from "lodash";
//pagination on clientSide completly
//diffrent from serverSide
export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  //convert items to lodash-object
  //to apply chain methods
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
}
