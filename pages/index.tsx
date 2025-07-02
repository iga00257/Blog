import Post, { parsePost, serializePost } from "../models/post";
import PostCard from "../components/PostCard";
import PageHead from "../components/PageHead";
import SocialLinks from "../components/SocialLinks";
import { getPostsInMongo } from "../services/getPosts";
import { GOOGLE_OAUTH_CLIENT_ID } from "../config.client";
import Link from "next/link";
import cx from "classnames";
import { GetStaticProps } from "next";
import { GRADIENTS } from "../utils/colors";

type Card = { type: "Article"; data: Post; key: string };

export default function (props: { posts: Post[] }) {
  const data = props.posts.map(parsePost);

  const cards: Card[] = data.map((post) => ({
    type: "Article",
    data: post,
    key: post.slug,
  }));

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg text-text-primary dark:text-dark-text-primary transition-colors duration-300">
      <PageHead canonicalUrl="https://yual.in" />
      <div
        className="container 2xl:px-32 px-6 lg:px-12 mx-auto flex
       flex-row py-8 lg:pb-24 flex-wrap"
      >
        <div className="mt-4 lg:mt-12">
          <Link href="/" scroll>
            <div
              className="font-extrabold text-xl lg:text-3xl mb-4 lg:mb-0
        cursor-pointer flex flex-row lg:flex-col items-baseline"
            >
              <p className="mr-2">Derrick Liu</p>
              <p className="text-lg text-primary">Blog</p>
            </div>
          </Link>
          <SocialLinks />
        </div>
        <div
          className="w-full my-16 grid grid-cols-1
           md:grid-cols-2 xl:grid-cols-3 gap-12"
        >
          {cards.map((card, i) => {
            switch (card.type) {
              case "Article":
                return (
                  <div className={cx(i == 0 && "md:col-span-2")} key={card.key}>
                    <PostCard
                      post={card.data}
                      imageClassName={cx(
                        i === 0 && "h-64 lg:h-96",
                        i === 1 && "h-64",
                        i > 1 && "h-48 lg:h-64"
                      )}
                    />
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>
      </div>
      <div
        id="g_id_onload"
        data-auto_select="true"
        data-skip_prompt_cookie="token"
        data-client_id={GOOGLE_OAUTH_CLIENT_ID}
        data-login_uri="/api/login?url=/"
      />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  let postsInMongo: any = await getPostsInMongo();
  postsInMongo = postsInMongo.map(serializePost);
  return {
    props: { posts: postsInMongo },
    revalidate: 10,
  };
};
