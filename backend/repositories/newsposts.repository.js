import AppDataSource from "../db/data_source.js";

class NewspostsRepository {
  static async getAll(params) {
    const page = Number(params.page) || 0;
    const size = Number(params.size) || 10;
    const newspostsRepository = AppDataSource.getRepository("Newspost");
    return await newspostsRepository.find({
      skip: page * size,
      take: size,
    });
  }
  static async create(data) {
    const newspostsRepository = AppDataSource.getRepository("Newspost");
    return await newspostsRepository.save(data);
  }
  static async getById(id) {
    const newspostsRepository = AppDataSource.getRepository("Newspost");
    return await newspostsRepository.findOneBy({ id: Number(id) });
  }
  static async update(id, data) {
    const newspostsRepository = AppDataSource.getRepository("Newspost");

    const newspost = await newspostsRepository.findOneBy({
      id: Number(id),
    });

    if (!newspost) {
      return null;
    }

    Object.assign(newspost, data);

    return await newspostsRepository.save(newspost);
  }

  static async delete(id) {
    const newspostsRepository = AppDataSource.getRepository("Newspost");
    const newspost = await newspostsRepository.findOne({
      where: { id: Number(id) },
    });

    if (!newspost) {
      return null;
    }

    await newspostsRepository.remove(newspost);
    return newspost;
  }
}

export default NewspostsRepository;
