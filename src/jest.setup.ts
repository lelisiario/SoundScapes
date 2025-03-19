// jest.setup.ts
Object.defineProperty(HTMLMediaElement.prototype, 'load', {
    configurable: true,
    value: () => {
      // You can log or do nothing here
    },
  });
  
  Object.defineProperty(HTMLMediaElement.prototype, 'play', {
    configurable: true,
    value: () => Promise.resolve(),
  });
  