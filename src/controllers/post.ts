import { Request, Response, Router } from 'express';
import { Post } from '../models/post';
import IContoller from '../Types/IController';

export default class PostController implements IContoller {
  public readonly path = '/api/posts';

  public readonly router = Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get(this.path, PostController.getPosts);
    this.router.get(`${this.path}/:id`, PostController.getPost);
    this.router.post(this.path, PostController.createPost);
    this.router.put(`${this.path}/:id`, PostController.updatePost);
  }

  private static async getPosts(req: Request, res: Response) {
    const posts = await Post.findAll();
    res.status(200).json({ posts });
  }

  private static async getPost(req: Request, res: Response) {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    res.status(200).json(post);
  }

  private static async createPost(req: Request, res: Response) {
    let post = req.body;
    const result = await Post.create(post);
    post = result.getDataValue('id') as Post;
    res.status(201).json(post);
  }

  private static async updatePost(req: Request, res: Response) {
    const post = req.body as Post;
    await Post.update(post, { where: { id: req.params.id } });
    res.sendStatus(204);
  }
}
