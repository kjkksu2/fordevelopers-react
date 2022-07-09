const curry = (f) => {
  return (...args) =>
    args.length === 1 ? (...a) => f(...args, ...a) : f(...args);
};

export const map = curry((f, iter) => {
  const res = [];

  for (const a of iter) {
    res.push(f(a));
  }

  return res;
});

export const filter = curry((f, iter) => {
  const res = [];

  for (const a of iter) {
    if (f(a)) res.push(a);
  }

  return res;
});

export const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  } else {
    iter = iter[Symbol.iterator]();
  }

  for (const a of iter) {
    acc = f(acc, a);
  }

  return acc;
});

export const go = (...iter) => reduce((a, f) => f(a), iter);

export const pipe = (...fs) => {
  return (iter) => go(iter, ...fs);
};
