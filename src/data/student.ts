import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_ENDPOINTS } from "./client/api-endpoints";
import { studentClient } from "./client/student";
import {
  GetParams,
  Student,
  StudentPaginator,
  StudentQueryOptions,
} from "../types";
import { mapPaginatorData } from "../utils/data-mappers";
import { toast } from "react-toastify";

export const useStudentsQuery = (
  params: Partial<StudentQueryOptions>,
  options: any = {}
) => {
  const { data, error, isLoading } = useQuery<StudentPaginator, Error>(
    [API_ENDPOINTS.STUDENTS, params],
    ({ queryKey, pageParam }) =>
      studentClient.paginated(Object.assign({}, queryKey[1], pageParam)),
    {
      keepPreviousData: true,
      ...options,
    }
  );

  return {
    students: data?.data ?? [],
    paginatorInfo: mapPaginatorData(data),
    error,
    loading: isLoading,
  };
};

export const useStudentQuery = ({ id }: GetParams) => {
  const { data, error, isLoading } = useQuery<Student, Error>(
    [API_ENDPOINTS.STUDENTS, { id }],
    () => studentClient.get_by_id(id)
  );

  return {
    student: data,
    error,
    loading: isLoading,
  };
};

export const useCreateStudentMutation = () => {
  const queryClient = useQueryClient();
  // const { t } = useTranslation();

  return useMutation(studentClient.create, {
    onSuccess: () => {
      // Router.push(Routes.supplier.list, undefined, {
      //   locale: Config.defaultLanguage,
      // });
      toast.success("Successfully Created");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries([API_ENDPOINTS.STUDENTS]);
    },
    onError: (error: any) => {
      toast.error(error);
    },
  });
};

export const useUpdateStudentMutation = () => {
  // const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation(studentClient.update, {
    onSuccess: async (data) => {
      // Router.push(Routes.supplier.list, undefined, {
      //   locale: Config.defaultLanguage,
      // });
      toast.success("Successfully Updated");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries([API_ENDPOINTS.STUDENTS]);
    },
    onError: (error: any) => {
      toast.error(error);
    },
  });
};

export const useDeleteStudentMutation = () => {
  const queryClient = useQueryClient();
  // const { t } = useTranslation();

  return useMutation(studentClient.delete, {
    onSuccess: () => {
      toast.success("Successfully Deleted");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries([API_ENDPOINTS.STUDENTS]);
    },
  });
};
