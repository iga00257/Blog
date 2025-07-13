import Service, { getCallApiFunction } from '../service';

type Params = {
  title: string;
  content: string;
  coverImageUrl: string;
  slug: string;
};

type Response = {
  slug: string;
};

class AddNewPostApi extends Service<Response, Params> {
  constructor(data: Params) {
    super();
    this.name = 'ADD_NEW_POST';
    this.config = {
      url: '/posts/create',
      method: 'POST',
      data,
    };
  }
}

export const addNewPost = async (data: Params): Promise<Response> =>
  getCallApiFunction(new AddNewPostApi(data));
