import { ApiRoutes } from "@/types/api-routes";
import { useMutation } from "@tanstack/react-query";
import { employeeDefaultValues, employeeSchema, type IEmployeeModel } from "../../types/employee.schema";
import { request } from "@/lib/http";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { EmployeeModel } from "../../types/model";
import { useEffect } from "react";
import { nullIfEmpty } from "@/lib/utils";
import { mapEmployeeToFormValues } from "../queries/useEmployee";

export const useEmployeeMutation = ({ id, defaultValue,onSuccess,onError }: { 
      id?: string, 
      defaultValue?: EmployeeModel | null, 
      onSuccess?: (response: any) => void, 
      onError?: (error: any) => void }) => {

   const form = useForm<IEmployeeModel>({
       resolver: zodResolver(employeeSchema) as any,
       defaultValues: employeeDefaultValues
   })
   

	const mutation = useMutation({
		mutationFn: async ({ id, data }: { id?: string, data: IEmployeeModel }) => {


			const url = id ? ApiRoutes.EMPLOYEES.BY_ID(id) : ApiRoutes.EMPLOYEES.LIST;
			const method = id ? 'put' : 'post';
			const response = await request[method]<ApiResponse<{ data: string }>>(url, data);
			return response.data;
		}
	})

   const buildPayload = (data: IEmployeeModel) => {
      return {
         type: data.type,
         prefix: data.prefix,
         firstName: data.firstName,
         middleName: data.middleName,
         lastName: data.lastName,
         suffix: data.suffix,
         gender: data.gender,
         maritalStatus: data.maritalStatus,
         birthday: data.birthday,
         religion: nullIfEmpty(data.religion),
         birthPlace: nullIfEmpty(data.birthPlace),
         emailAddress: nullIfEmpty(data.emailAddress),
         phoneNumber: data.phoneNumber,
         mobileNumber: data.mobileNumber,
         nationality: data.nationality,
         region: data.region,
         bloodType: nullIfEmpty(data.bloodType),
         country: data.country,
         spouseName: nullIfEmpty(data.spouseName),
         spouseJobTitle: nullIfEmpty(data.spouseJobTitle),
         spouseCompany: nullIfEmpty(data.spouseCompany),
         spouseBirthday: nullIfEmpty(data.spouseBirthday),
         sssNo: nullIfEmpty(data.sssNo),
         philHealthNo: nullIfEmpty(data.philHealthNo),
         tinNo: nullIfEmpty(data.tinNo),
         pagIbigNo: nullIfEmpty(data.pagIbigNo),
         bankAccountNo: nullIfEmpty(data.bankAccountNo),
         passportNo: nullIfEmpty(data.passportNo),
         passportExpiry: nullIfEmpty(data.passportExpiry),
      }
   }

   const onSubmit = async (data: IEmployeeModel) => {
      try {
         const response = await mutation.mutateAsync({ id, data: buildPayload(data) as IEmployeeModel });
         onSuccess?.(response);
      }
      catch(error) {
         onError?.(error);
      }
   }

   useEffect(() => {
       if (defaultValue) {
         const mapEmployee = mapEmployeeToFormValues(defaultValue)
         
         form.reset(mapEmployee)
       }
     }, [defaultValue])

   return {mutation, form,onSubmit}

}




