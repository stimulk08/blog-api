/* eslint-disable max-len */
import createHttpError from 'http-errors';
import { Request, Response, Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { Post } from '../models/post';
import IContoller from '../Types/IController';
import authTokenMiddleware from '../middlewares/authToken';

export default class PostController implements IContoller {
  public readonly path = '/api/posts';

  public readonly router = Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.use(this.path, authTokenMiddleware);
    this.router.get(this.path, expressAsyncHandler(PostController.getPosts));
    this.router.get(`${this.path}/:id`, expressAsyncHandler(PostController.getPost));
    this.router.post(this.path, expressAsyncHandler(PostController.createPost));
    this.router.put(`${this.path}/:id`, expressAsyncHandler(PostController.updatePost));
    this.router.delete(`${this.path}/:id`, expressAsyncHandler(PostController.deletePost));
  }

  private static async getPosts(req: Request, res: Response) {
    const posts = await Post.findAll();
    res.status(200).json({ posts });
  }

  private static async getPost(req: Request, res: Response) {
    const post = await Post.findByPk(req.params.id);
    if (!post) throw createHttpError(404, 'Post not found');

    res.status(200).json(post);
  }

  private static async createPost(req: Request, res: Response) {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  }

  private static async updatePost(req: Request, res: Response) {
    const post = await Post.findByPk(req.params.id);
    if (!post) throw createHttpError(404, 'Post not Found');

    await Post.update(req.body, { where: { id: req.params.id } });
    res.sendStatus(204);
  }

  private static async deletePost(req: Request, res: Response) {
    const post = await Post.findByPk(req.params.id);
    if (!post) throw createHttpError(404, 'Post not Found');

    await Post.destroy({ where: { id: req.params.id } });
    res.sendStatus(204);
  }
}
