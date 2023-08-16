import PageHeader from "@/components/PageHeader";
import { fetchApi } from "@/helpers/fetch-api";
import { formatDate } from "@/helpers/format-data-helper";
import { Post } from "@/interfaces/post";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

const getData = async (slug = "") => {
  const path = "/posts";
  const urlParamsObject = {
    // van los datos que se enviaran como query parameters
    populate: "image",
    filters: {
      slug: slug,
    },
    /* sort: {
      createdAt: "asc",
    }, */
    /* pagination: {
      page: page,
      pageSize: pageSize,
    }, */
  };

  const { data } = await fetchApi(path, urlParamsObject);

  return data[0];
};

interface Props {
  params: {
    slug: string;
  };
}

const Slug = async ({ params }: Props) => {
  const { slug } = params;
  const post: Post = await getData(slug);

  if (!post) {
    return notFound(); // no necesita el return
  }

  const { title, description, body, createdAt, image } = post.attributes;
  const { url, width, height } = image.data.attributes.formats.medium;

  return (
    <div className="space-y-8">
      {/* separa elementos verticalemnte haciendo un margen */}
      <PageHeader text={title} />
      <p className="text-gray-500">{formatDate(createdAt)}</p>
      <Image
        className="rounded-t-lg"
        src={url}
        alt={`image ${title}`}
        width={width}
        height={height}
      />
      <p className="mb-3 text-gray-500 dark:text-gray-400 first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:mr-3 first-letter:float-left">
        {description}
      </p>
      {/* <p className="mb-3 text-gray-500 dark:text-gray-400 first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:mr-3 first-letter:float-left">
        {body}
      </p> */}
      <div className="prose">
        <MDXRemote source={body} />
      </div>
      {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
    </div>
  );
};
export default Slug;
