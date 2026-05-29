import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import type { EmployeeFilterSchemaTypes } from '../types/schema'
import { employeeFilterSchema } from '../types/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import DropdownField from '@/components/custom/inputs/DropdownField'
import { FilterSearch } from 'iconsax-reactjs'
import { useQuery } from '@tanstack/react-query'
import { employeeInitialQueryOptions } from '../hooks/useEmployee'
import ButtonLoading from '@/components/custom/buttons/button-loading'
import { useQueryStates } from 'nuqs'
import { employeeSearchInitialParser } from '../types/search'
import { StackRow } from '@/components/custom/layouts'
import { XIcon } from 'lucide-react'
import { InputField } from '@/components/custom/inputs'

const EmployeeFilter = () => {
  const { data: initialData } = useQuery(employeeInitialQueryOptions())
  const [searchParams, setSearchParams] = useQueryStates(
    employeeSearchInitialParser,
  )

  const updatedDepartments = initialData?.departments?.map((department) => ({
    ...department,
    text: department.text,
    value: department.text,
  }))

  const updatedCompanies = initialData?.companies?.map((company) => ({
    ...company,
    text: company.text,
    value: company.text,
  }))

  const updatedBranches = initialData?.branches?.map((branch) => ({
    ...branch,
    text: branch.text,
    value: branch.text,
  }))

  const form = useForm<EmployeeFilterSchemaTypes>({
    resolver: zodResolver(employeeFilterSchema) as any,
    defaultValues: {
      fieldName: searchParams?.fieldName || 'name',
      fieldValue: searchParams?.fieldValue || '',
      employeeClass: searchParams?.employeeClass || null,
      employeeType: searchParams?.employeeType || null,
      company: searchParams?.company || '',
      branch: searchParams?.branch || '',
      department: searchParams?.department || '',
    },
  })

  const handleSubmit = (data: EmployeeFilterSchemaTypes) => {
    setSearchParams((prev) => ({
      ...prev,
      ...data,
    }))
  }

  const handleClearFilter = () => {
    form.reset()
    setSearchParams({
      fieldName: 'name',
      fieldValue: '',
      employeeClass: null,
      employeeType: null,
      company: '',
      branch: '',
      department: '',
    })
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="font-sans text-sm uppercase font-semibold"
        >
          <FilterSearch size={18} color="#004663" variant="Bold" />
          Filter
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:w-[400px] md:w-[600px]">
        <SheetHeader>
          <SheetTitle>Employee Filter</SheetTitle>
          <SheetDescription>
            Filter employees by type, classification, company, branch, and
            department.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-2 p-3 -mt-5"
          >
            <DropdownField
              control={form.control}
              name="fieldName"
              label="Field"
              data={[{ text: 'Name', value: 'name' }]}
            />
            <InputField
              control={form.control}
              name="fieldValue"
              label="Search"
              placeholder="Search"
            />
            <DropdownField
              control={form.control}
              name="employeeType"
              label="Type"
              data={initialData?.types}
              placeholder="Type"
            />
            <DropdownField
              control={form.control}
              name="employeeClass"
              label="Classification"
              data={initialData?.classes}
              placeholder="Classification"
            />
            <DropdownField
              control={form.control}
              name="department"
              label="Department"
              data={updatedDepartments}
              placeholder="Department"
            />
            <DropdownField
              control={form.control}
              name="company"
              label="Company"
              data={updatedCompanies}
              placeholder="Company"
            />
            <DropdownField
              control={form.control}
              name="branch"
              label="Branch"
              data={updatedBranches}
              placeholder="Branch"
            />
            <StackRow>
              <Button
                className="w-fit h-10 uppercase"
                variant="destructive"
                type="button"
                onClick={handleClearFilter}
              >
                <XIcon />
                Clear
              </Button>
              <ButtonLoading
                loading={form.formState.isSubmitting}
                type="submit"
                className="w-fit h-10"
                textLoading="Filtering..."
                text="Apply Filter"
                icon={<FilterSearch size={18} color="#004663" variant="Bold" />}
                variant="outline"
              />
            </StackRow>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}

export default EmployeeFilter
