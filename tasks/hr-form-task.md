### Task
Create an entry for HR Form. The hr-form or employee action request should be filled whenever there is some update in employee on transfer,hire,promotion. 


### Structure
```json
{
  "type": 0,
  "effectiveDate": "2026-06-10",
  "justification": "string",
  "attachment": "string",
  "details": [
    {
      "employeeId": "string",
      "dateHired": "2026-06-10",
      "regularDate": "2026-06-10",
      "probationStart": "2026-06-10",
      "probationEnd": "2026-06-10",
      "designationId": "string",
      "rank": null,
      "companyId": "string",
      "branchId": "string",
      "departmentId": "string",
      "managerId": "string",
      "resignationType": null,
      "lastWorkingDay": "2026-06-10",
      "isEligibleForRehire": true
    }
  ]
}
```

### Note
- the hr form folder module located on ./apps/hris-app/src/routes/_app/hr-forms
- Type is `NewHire=0,ProbationExtension=1,Regularization=2,Transfer=3,EndOfService=4,ChangeDesignation=5`
- create an enum.ts and use it on schema.
- use the current design