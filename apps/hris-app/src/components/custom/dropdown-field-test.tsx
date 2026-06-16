import { useForm } from 'react-hook-form'
import { Button, DropdownField, Form } from '@hris/shared-ui'

type ObjectValue = { code: number; strCode: string }

type TestFormValues = {
  intValue: number | null
  stringValue: string
  objectValue: ObjectValue | null
}

const intData = [
  { value: 0, text: 'Probationary (0)' },
  { value: 1, text: 'Regular (1)' },
  { value: 2, text: 'Cadet (2)' },
  { value: 3, text: 'ProjectBased (3)' },
]

const stringData = [
  { value: 'a', text: 'Option A' },
  { value: 'b', text: 'Option B' },
  { value: 'c', text: 'Option C' },
]

const objectData = [
  { value: { code: 1, strCode: 'Regular' }, text: 'Regular (object)' },
  { value: { code: 2, strCode: 'Cadet' }, text: 'Cadet (object)' },
]

const describe = (value: unknown) => {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  return `${JSON.stringify(value)}  (typeof: ${typeof value})`
}

const DropdownFieldTest = () => {
  const form = useForm<TestFormValues>({
    defaultValues: {
      intValue: 1,
      stringValue: 'b',
      objectValue: null,
    },
  })

  const values = form.watch()

  return (
    <Form {...form}>
      <div className="max-w-xl space-y-6 p-6">
        <h1 className="text-lg font-semibold">DropdownField value test</h1>

        <DropdownField
          control={form.control}
          name="intValue"
          label="Int value (valueType='int', default 1 — trigger should show 'Regular (1)')"
          valueType="int"
          data={intData}
          placeholder="Select int"
        />

        <DropdownField
          control={form.control}
          name="stringValue"
          label="String value (default valueType, default 'b' — should show 'Option B')"
          data={stringData}
          placeholder="Select string"
        />

        <DropdownField
          control={form.control}
          name="objectValue"
          label="Object value (valueType='object')"
          valueType="object"
          data={objectData}
          placeholder="Select object"
        />

        <pre className="rounded-md border bg-muted p-4 text-sm">
          {[
            `intValue:    ${describe(values.intValue)}`,
            `stringValue: ${describe(values.stringValue)}`,
            `objectValue: ${describe(values.objectValue)}`,
          ].join('\n')}
        </pre>

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              form.reset({
                intValue: 2,
                stringValue: 'c',
                objectValue: { code: 1, strCode: 'Regular' },
              })
            }
          >
            Reset (int=2, string='c', object=Regular)
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              form.reset({ intValue: null, stringValue: '', objectValue: null })
            }
          >
            Reset to empty
          </Button>
        </div>
      </div>
    </Form>
  )
}

export default DropdownFieldTest
