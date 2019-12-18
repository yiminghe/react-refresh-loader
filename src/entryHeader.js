if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
  require("react-refresh/runtime").injectIntoGlobalHook(window);
}
