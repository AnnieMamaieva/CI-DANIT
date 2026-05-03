import NewspostsRepository from "../repositories/newsposts.repository.js";
import NewspostsServiceError from "../errors/NewspostsServiceError.js";
import NotificationService from "./notification.service.js";
class NewspostsService {
  static async getAll(params) {
    try {
      return await NewspostsRepository.getAll(params);
    } catch (err) {
      throw new NewspostsServiceError("Failed to load  all news posts");
    }
  }
  static async create(data) {
    try {
      const newspostData = {
        header: data.title,
        text: data.text,
        author: data.author,
      };
      const createdPost = await NewspostsRepository.create(newspostData);
      await NotificationService.notifyNewPost(createdPost, data.io);
      return createdPost;
    } catch (err) {
      console.error("REAL CREATE ERROR:", err);
      throw new NewspostsServiceError("Failed to create newspost");
    }
  }
  static async getById(id) {
    try {
      return await NewspostsRepository.getById(id);
    } catch (err) {
      throw new NewspostsServiceError("Failed to load a lot news post by id ");
    }
  }
  static async update(id, data) {
    try {
      return await NewspostsRepository.update(id, data);
    } catch (err) {
      throw new NewspostsServiceError("Failed to update newspost");
    }
  }
  static async delete(id) {
    try {
      return await NewspostsRepository.delete(id);
    } catch (err) {
      throw new NewspostsServiceError("Failed to delete newspost");
    }
  }
  static getError() {
    throw new NewspostsServiceError("Demo service error");
  }
}

export default NewspostsService;
