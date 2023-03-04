export function createCallbackManager() {
  const callbacks: any[] = [];

  function addCallback(cb: any) {
    callbacks.push(cb);
    return () => {
      removeCallback(cb);
    };
  }

  function removeCallback(cb: any) {
    const index = callbacks.indexOf(cb);
    if (index !== -1) {
      callbacks.splice(index, 1);
    }
  }

  function runCallbacks(...args: any[]) {
    callbacks.forEach((callback) => {
      callback(...args);
    });
  }

  function hasCallback(cb: any) {
    return callbacks.indexOf(cb);
  }

  function hasCallbacks() {
    return Boolean(callbacks.length);
  }

  return {
    runCallbacks,
    addCallback,
    removeCallback,
    hasCallbacks,
    hasCallback,
    callbacks
  };
}

export type CallbackManager = ReturnType<typeof createCallbackManager>;
