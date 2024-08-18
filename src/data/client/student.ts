import { API_ENDPOINTS } from "./api-endpoints";
import {
  CreateStudentInput,
  QueryOptions,
  Student,
  StudentPaginator,
  StudentQueryOptions,
} from "../../types";
import { crudFactory } from "./curd-factory";
import { HttpClient } from "./http-client";

export const studentClient = {
  ...crudFactory<Student, QueryOptions, CreateStudentInput>(
    API_ENDPOINTS.STUDENTS
  ),
  paginated: ({ name, ...params }: Partial<StudentQueryOptions>) => {
    return HttpClient.get<StudentPaginator>(API_ENDPOINTS.STUDENTS, {
      searchJoin: "and",
      self,
      ...params,
      search: HttpClient.formatSearchParams({ name }),
    });
  },
  by_search: ({ name, ...params }: Partial<StudentQueryOptions>) => {
    return HttpClient.get<StudentPaginator>(API_ENDPOINTS.STUDENTS, {
      searchJoin: "and",
      ...params,
      search: HttpClient.formatSearchParams({
        name,
      }),
    });
  },
};
