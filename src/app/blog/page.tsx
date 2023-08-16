import PageHeader from "@/components/PageHeader";
import { getStrapiURL } from "@/helpers/api-helper";
import { fetchApi } from "@/helpers/fetch-api";
import PageCardImage from "@/components/PageCardImage";
import { Post } from "@/interfaces/post";
import PagePagination from "@/components/PagePagination";

/* const getData = async () => { */
//const url = getStrapiURL("/api/posts");

//const res = await fetch("http://localhost:1337/api/posts");
//const res = await fetch("http://127.0.0.1:1337/api/posts"); // usamos ip local en lugar de localhost
// solicitudes al localhost se usa "http" y NO "https"
// por defecto cuando el fetch se vuelva a ejecutar tomará los datos del caché
// eso implica que el usuario final deba estar reseteando el caché con CTRL+F5
// se tiene dos alternativas:
//const res = await fetch("http://127.0.0.1:1337/api/posts", { next: { cache: "no-store"}}); // tira error de typescript pero la aplicación continua funcionando
/* const res = await fetch(url, {
    next: { revalidate: 60 },
  }); */ // es la cantidad de segundos requeridos para lanzar la solicitud
// si el usuario se va de la página o está navegando por la aplicación o actualiza la pagína
// next verifica si pasó "el número colocado en revalidate" expresado en segundos
// en caso positivo realiza el nuevo fetch a la url, caso contrario no lo hace y toma la información del caché
// sin la adición del objeto next, todas las solicitudes quedarán en caché (se ejecutará una vez)

//const data = res.json();
//console.log(data);
const getData = async (page = 1, pageSize = 2) => {
  const path = "/posts";
  const urlParamsObject = {
    // van los datos que se enviaran como query parameters
    populate: "*",
    sort: {
      createdAt: "asc",
    },
    pagination: {
      page: page,
      pageSize: pageSize,
    },
  };

  const { data, meta } = await fetchApi(path, urlParamsObject);

  return { data, pagination: meta.pagination };
};

interface Props {
  searchParams: {
    page?: string;
  };
}

const Blog = async ({ searchParams }: Props) => {
  const { page } = searchParams;

  let pageNumber = page ? parseInt(page) : 1;

  if (isNaN(pageNumber) || pageNumber < 1) {
    pageNumber = 1;
    console.log("Valor no válido como parámetro de página. Se establece a 1");
  }

  // en Next los componentes tambien pueden ser asincronos
  const { data, pagination } = await getData(pageNumber);

  return (
    <div className="space-y-8">
      {/* <h1>Blog</h1> */}
      <PageHeader text="Latest Posts" />
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      {/* 2 significa 2 tabuladores */}
      <PagePagination pagination={pagination} />
      <div className="grid gap-4">
        {data.map((post: Post) => (
          <PageCardImage key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};
export default Blog;
