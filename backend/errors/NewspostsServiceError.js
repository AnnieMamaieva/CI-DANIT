class NewspostsServiceError extends Error {
  constructor(message) {
    super(message);
    this.name = "NewspostsServiceError";
  }
}

export default NewspostsServiceError;