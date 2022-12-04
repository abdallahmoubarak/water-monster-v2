export default function filter({ list, value, searchFields }: filterTypes) {
  return list.filter((item) => {
    return searchFields.some((key) => {
      return item[key.toLowerCase()]
        ?.toLowerCase()
        .includes(value?.toLowerCase());
    });
  });
}
type filterTypes = {
  list: { [key: string]: string }[];
  value: string;
  searchFields: string[];
};
