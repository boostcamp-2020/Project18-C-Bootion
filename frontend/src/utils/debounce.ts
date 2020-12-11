export const debounce = (func: any, delay: number) => {
  let timer: any;
  return function rtn(this: any, ...args: any[]) {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => func.apply(context, args), delay);
  };
};
