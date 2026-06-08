import { ApiRoutes } from "@/types/api-routes";
import { useMutation } from "@tanstack/react-query";
import { employeeDefaultValues, employeeSchema, type IEmployeeModel } from "../../types/employee.schema";
import { request } from "@/lib/http";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { EmployeeModel } from "../../types/model";
import { useEffect } from "react";

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

   const onSubmit = async (data: IEmployeeModel) => {
      try {
         const response = await mutation.mutateAsync({id, data});
         onSuccess?.(response);
      }
      catch(error) {
         onError?.(error);
         
      }
   }

   useEffect(() => {
       if (defaultValue) {
         form.reset({
           type: defaultValue.type.code,
           prefix: defaultValue.prefix,
           lastName: defaultValue.lastName,
           firstName: defaultValue.firstName,
           middleName: defaultValue.middleName,
           suffix: defaultValue.suffix,
           gender: defaultValue.gender.code,
           maritalStatus: defaultValue.maritalStatus.code,
           birthday: defaultValue.birthday,
           religion: defaultValue.religion,
           birthPlace: defaultValue.birthPlace,
           emailAddress: defaultValue.personalEmailAddress,
           phoneNumber: defaultValue.phoneNumber,
           mobileNumber: defaultValue.mobileNumber,
           nationality: defaultValue.nationality,
           region: defaultValue.region,
           bloodType: defaultValue.bloodType,
           country: defaultValue.country,
           spouseName: defaultValue.spouseFullName,
           spouseJobTitle: defaultValue.spouseJobTitle,
           spouseCompany: defaultValue.spouseCompany,
           spouseBirthday: defaultValue.spouseBirthday,
           sssNo: defaultValue.sssNo,
           philHealthNo: defaultValue.philhealthNo,
           tinNo: defaultValue.tinNo,
           pagIbigNo: defaultValue.pagIbiNo,
           bankAccountNo: defaultValue.bankAccountNo,
           passportNo: defaultValue.passportNo,
           passportExpiry: defaultValue.passportExpiry,
         })
       }
     }, [defaultValue])

   return {mutation, form,onSubmit}

}




