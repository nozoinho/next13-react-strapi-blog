import { Post } from "@/interfaces/post";
import Image from "next/image";
import Link from "next/link";

interface Props {
  post: Post;
}

const PageCardImage = ({ post }: Props) => {
  const { title, description, slug, createdAt, image } = post.attributes;
  const { url, width, height } = image.data.attributes.formats.medium;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link href={`blog/${slug}`}>
        <Image // se generan de forma asíncrona (las solicitudes son en segundo plano)
          className="rounded-t-lg"
          src={url}
          alt={`image ${title}`} // prop obligatorio
          width={width} // este campo reserva espacio para la imagen previo a su carga
          height={height} // este campo reserva espacio para la imagen previo a su carga
        />
      </Link>
      <div className="p-5">
        <Link href={`blog/${slug}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <Link
          href={`blog/${slug}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            className="w-3.5 h-3.5 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};
export default PageCardImage;
