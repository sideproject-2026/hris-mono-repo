import { Form, Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@hris/shared-ui"
import ButtonLoading from "@hris/shared-ui/buttons/button-loading"
import { Plus, XIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { hrFormSchema, type HRFormSchemaType } from "../types/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import HRSearchEmployee from "./hr-search-employee"
import DropdownField from "@/components/custom/inputs/DropdownField"
import DatePickerField from "@/components/custom/inputs/DatePickerField"
import TextareaField from "@/components/custom/inputs/TextareaField"
import { StackRow } from "@/components/custom/layouts"
import { Send } from "iconsax-reactjs"
import { useHRFormContext } from "./hr-form-provider"
import DropZoneField from "@/components/custom/inputs/DropZoneField"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "sonner"
import { useHRFormMutation } from "../hooks/getHRForms"
import CollapsibleContainer from "@/components/custom/containers/collapsible-container"


const HRForm = () => {
    const [open, setOpen] = useState(false)
    const { hrInitialData, appointmentInitial } = useHRFormContext()
    const { mutateAsync: createHRFormRequest } = useHRFormMutation()

    const form = useForm<HRFormSchemaType>({
        resolver: zodResolver(hrFormSchema),
        defaultValues: {
            employeeId: '',
            type: undefined,
            dateFiled: new Date(),
            effectivityDate: new Date(),
            description: '',
            rank: undefined,
            designationFrom: null,
            designationTo: null,
            departmentFrom: null,
            departmentTo: null,
            companyFrom: null,
            companyTo: null,
            branchFrom: null,
            branchTo: null,
            attachment: null,
        },
    })

    const type = form.watch("type")

    const onSubmit = async (data: HRFormSchemaType) => {
        try {
            const res = await createHRFormRequest({
                employeeId: data.employeeId!,
                data: data
            })
            if (res) {
                toast.success('HR form request created successfully')
                setOpen(false)
                form.reset()
            }
        } catch (error) {
            console.log(error)
            toast.error('Failed to create HR form request')
        }
    }

    const handleCancel = () => {
        form.reset()
        setOpen(false)
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <ButtonLoading
                    loading={false}
                    text="Create New Request"
                    variant="ghost"
                    className="uppercase font-sans text-sm font-semibold"
                    icon={<Plus />}
                />
            </SheetTrigger>
            <SheetContent className="!max-w-[550px] !w-[95vw]">
                <SheetHeader>
                    <SheetTitle>Create New Employee Action Form Request</SheetTitle>
                    <SheetDescription>Please fillup the required fields to create a new Employee Action Form request</SheetDescription>
                </SheetHeader>
                <ScrollArea className="max-h-[85vh]">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 p-5 -mt-6">

                            <HRSearchEmployee
                                form={form}
                            />
                            <DropdownField
                                control={form.control}
                                name="type"
                                label="Type"
                                placeholder="Select Type"
                                baseClassName="w-full"
                                data={hrInitialData?.appointments}
                            />
                            <StackRow>
                                <DatePickerField
                                    control={form.control}
                                    name="dateFiled"
                                    label="Date Filed"
                                    placeholder="Select Date Filed"
                                    baseClassName="w-full"
                                />
                                <DatePickerField
                                    control={form.control}
                                    name="effectivityDate"
                                    label="Effectivity Date"
                                    placeholder="Select Effectivity Date"
                                    baseClassName="w-full"
                                />
                            </StackRow>
                            <TextareaField
                                control={form.control}
                                name="description"
                                label="Description"
                                placeholder="Enter Description"
                                baseClassName="w-full"
                                rows={4}
                            />
                            <DropdownField
                                control={form.control}
                                name='rank'
                                label="Rank"
                                placeholder="Select Rank"
                                baseClassName="w-full"
                                data={hrInitialData?.employeeRanks}
                            />
                            <DropZoneField
                                control={form.control}
                                name="attachment"
                                label="Attachment"
                                type="file"
                                required
                            />

                            {(type == 1 || type == 4) && (
                                <>
                                    <CollapsibleContainer title="Designation">
                                        <DropdownField
                                            control={form.control}
                                            name='designationFrom'
                                            label="From"
                                            placeholder="Select Designation"
                                            baseClassName="w-full"
                                            data={appointmentInitial?.designations}
                                        />
                                        <DropdownField
                                            control={form.control}
                                            name='designationTo'
                                            label="To"
                                            placeholder="Select Designation"
                                            baseClassName="w-full"
                                            data={appointmentInitial?.designations}
                                        />
                                    </CollapsibleContainer>
                                    <CollapsibleContainer title="Department">
                                        <DropdownField
                                            control={form.control}
                                            name='departmentFrom'
                                            label="From"
                                            placeholder="Select Department"
                                            baseClassName="w-full"
                                            data={appointmentInitial?.departments}
                                        />
                                        <DropdownField
                                            control={form.control}
                                            name='departmentTo'
                                            label="To"
                                            placeholder="Select Department"
                                            baseClassName="w-full"
                                            data={appointmentInitial?.departments}
                                        />
                                    </CollapsibleContainer>
                                    <CollapsibleContainer title="Company">
                                        <DropdownField
                                            control={form.control}
                                            name='companyFrom'
                                            label="From"
                                            placeholder="Select Company"
                                            baseClassName="w-full"
                                            data={appointmentInitial?.companies}
                                        />
                                        <DropdownField
                                            control={form.control}
                                            name='companyTo'
                                            label="To"
                                            placeholder="Select Company"
                                            baseClassName="w-full"
                                            data={appointmentInitial?.companies}
                                        />
                                    </CollapsibleContainer>
                                    <CollapsibleContainer title="Branch">
                                        <DropdownField
                                            control={form.control}
                                            name='branchFrom'
                                            label="From"
                                            placeholder="Select Branch"
                                            baseClassName="w-full"
                                            data={appointmentInitial?.branches}
                                        />
                                        <DropdownField
                                            control={form.control}
                                            name='branchTo'
                                            label="To"
                                            placeholder="Select Branch"
                                            baseClassName="w-full"
                                            data={appointmentInitial?.branches}
                                        />
                                    </CollapsibleContainer>
                                </>
                            )}
                            <StackRow className="gap-1">
                                <ButtonLoading
                                    loading={false}
                                    text="Cancel"
                                    variant="outline"
                                    className="h-11 bg-red-500 text-white"
                                    type="button"
                                    icon={<XIcon />}
                                    onClick={handleCancel}
                                />
                                <ButtonLoading
                                    loading={form.formState.isSubmitting}
                                    text="Submit Request"
                                    variant="outline"
                                    className="h-11"
                                    type="submit"
                                    icon={<Send variant="Bold" size={24} />}
                                />
                            </StackRow>
                        </form>
                    </Form>
                </ScrollArea>
            </SheetContent>
        </Sheet >
    )
}
export default HRForm