export const ItemRemove = (Arr: any, obj: any) => {
  const index = Arr.indexOf(obj);

  return Arr.splice(index, 1);
};
