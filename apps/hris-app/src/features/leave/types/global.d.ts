declare type LeaveTypes = {
    id: string
    employeeId: number
    employeeName: string
    picture: string
    leaveBalances: LeaveBalance[]
    leaveStockCards: LeaveStockCard[]
}

declare type LeaveBalance = {
    leaveEntitlement: number
    description: string
    balance: number
    used: number
    opening: number
}

declare type LeaveStockCard = {
    date: string
    referenceNo: string
    leaveEntitlement: string
    stockType: string
    quantity: number
    remarks: string
}

declare type LeaveInitial = {
    entitlements: SelectionItem[]
    stockType: SelectionItem[]
}