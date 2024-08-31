import { GetParams, PaginatorInfo } from "../../types";
import { HttpClient } from "./http-client";

interface LanguageParam {
  language: string;
}

export function crudFactory<Type, QueryParams extends LanguageParam, InputType>(
  endpoint: string
) {
  return {
    all(params: QueryParams) {
      return HttpClient.get<Type[]>(endpoint, params);
    },
    paginated(params: QueryParams) {
      return HttpClient.get<PaginatorInfo<Type>>(endpoint, params);
    },
    get({ slug, language }: GetParams) {
      return HttpClient.get<Type>(`${endpoint}/${slug}`, { language });
    },
    get_by_id(id: string ) {
      return HttpClient.get<Type>(`${endpoint}/${id}`);
    },
    create(data: InputType) {
      return HttpClient.post<Type>(endpoint, data);
    },
    update({ id, ...input }: Partial<InputType> & { id: string }) {
      return HttpClient.put<Type>(`${endpoint}/${id}`, input);
    },
    delete({ id }: { id: string }) {
      console.log("Delete in CRUD", id)
      return HttpClient.delete<boolean>(`${endpoint}/delete/${id}`);
    },
  };
}
