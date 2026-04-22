import NewspostsService from "../services/newsposts.service.js";

const mapNewspostResponse = (newspost) => ({
  id: newspost.id,
  title: newspost.title,
  text: newspost.text,
  createdAt: newspost.createdAt,
  author: newspost.author
    ? {
        email: newspost.author.email,
      }
    : null,
});

class NewspostsController {
  static async getAll(req, res, next) {
    try {
      const params = {
        page: Number(req.query.page),
        size: Number(req.query.size),
      };

      const newsposts = await NewspostsService.getAll(params);
      res.json(newsposts.map(mapNewspostResponse));
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;

      const newspost = await NewspostsService.getById(id);

      if (!newspost) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.json(mapNewspostResponse(newspost));
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const newspost = await NewspostsService.create({
        ...req.body,
        author: req.user,
      });
      res.status(201).json(mapNewspostResponse(newspost));
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;

      const updated = await NewspostsService.update(id, req.body);

      if (!updated) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.json(mapNewspostResponse(updated));
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      const deletedPost = await NewspostsService.delete(req.params.id);

      if (!deletedPost) {
        return res.status(404).json({ message: "Not found" });
      }

      res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
      next(err);
    }
  }

  static getError(req, res, next) {
    try {
      NewspostsService.getError();
    } catch (error) {
      next(error);
    }
  }
}

export default NewspostsController;
