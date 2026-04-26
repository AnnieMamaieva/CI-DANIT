
import NewspostsService from "../services/newsposts.service.js";
import NewspostsRepository from "../repositories/newsposts.repository.js";
import NewspostsServiceError from "../errors/NewspostsServiceError.js";

jest.mock("../repositories/newsposts.repository.js", () => ({
  __esModule: true,
  default: {
    getAll: jest.fn(),
    create: jest.fn(),
    getById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("NewspostsService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getAll should return all newsposts", async () => {
    const posts = [{ id: 1, title: "Test post" }];

    NewspostsRepository.getAll.mockResolvedValue(posts);

    const result = await NewspostsService.getAll({ page: 0, size: 10 });

    expect(NewspostsRepository.getAll).toHaveBeenCalledWith({
      page: 0,
      size: 10,
    });
    expect(result).toEqual(posts);
  });

  test("create should create a newspost", async () => {
    const author = { id: 1, email: "test@test.com" };
    const data = { title: "New post", text: "Content", author };

    const repositoryData = {
      header: "New post",
      text: "Content",
      author,
    };

    const createdPost = { id: 1, ...repositoryData };

    NewspostsRepository.create.mockResolvedValue(createdPost);

    const result = await NewspostsService.create(data);

    expect(NewspostsRepository.create).toHaveBeenCalledWith(repositoryData);
    expect(result).toEqual(createdPost);
  });

  test("getById should return newspost by id", async () => {
    const post = { id: 1, title: "Test post" };

    NewspostsRepository.getById.mockResolvedValue(post);

    const result = await NewspostsService.getById(1);

    expect(NewspostsRepository.getById).toHaveBeenCalledWith(1);
    expect(result).toEqual(post);
  });

  test("update should update newspost", async () => {
    const data = { title: "Updated" };
    const updatedPost = { id: 1, title: "Updated" };

    NewspostsRepository.update.mockResolvedValue(updatedPost);

    const result = await NewspostsService.update(1, data);

    expect(NewspostsRepository.update).toHaveBeenCalledWith(1, data);
    expect(result).toEqual(updatedPost);
  });

  test("delete should delete newspost", async () => {
    const deletedPost = { id: 1 };

    NewspostsRepository.delete.mockResolvedValue(deletedPost);

    const result = await NewspostsService.delete(1);

    expect(NewspostsRepository.delete).toHaveBeenCalledWith(1);
    expect(result).toEqual(deletedPost);
  });

  test("getError should throw NewspostsServiceError", () => {
    expect(() => NewspostsService.getError()).toThrow(NewspostsServiceError);
  });
});
