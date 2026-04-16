export function fakeAsync(fn) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        fn();
        resolve();
      } catch (err) {
        reject(err);
      }
    }, 1000);
  });
}
