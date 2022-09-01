/* global jest beforeAll test expect */
import PostService from "../../src/services/post";
import PostRepository from "../../src/repository/post";
import CategoryRepository from "../../src/repository/category";
import { Post } from "../../src/models/post";
import { Category } from "../../src/models/category";
jest.mock("../../src/models/post");
jest.mock("../../src/models/category");



const mockPostFindAll = Post.findAll as jest.MockedFunction<
  typeof Post.findAll
>;

let postService;
beforeAll(() => {
  postService = new PostService(PostRepository, CategoryRepository);
});

it("Post service", () => {
  test("[positive] fetch all posts", async () => {
    const posts = [
      {
        id: "50cf2fe4-e176-47bf-b9e3-4c2a73cb5c86",
        title: "post 1",
        content: "content post 1",
        status: "No published",
      },
      {
        id: "49cf2fe4-e176-47bf-b9e3-4c2a73cb5c86",
        title: "post 2",
        content: "content post 2",
        status: "No published",
      },
    ] as any;
    //jest.spyOn(Category, 'hasMany')
    mockPostFindAll.mockResolvedValue(posts);
    const resp = await postService.getPosts();
    expect(resp).toEqual(posts);
    expect(mockPostFindAll).toHaveBeenCalledWith({
      attributes: ["id", "title", "content", "status"],
    });
  });
});
