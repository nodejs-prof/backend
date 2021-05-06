const auditMethod = (target, name, descriptor) => {
  const original = descriptor.value;
  if (typeof original === "function") {
    descriptor.value = function (...args) {
      try {
        const result = original.apply(this, args);

        return result;
      } catch (e) {
        throw e;
      }
    };
  }
  return descriptor;
};

export { auditMethod };
