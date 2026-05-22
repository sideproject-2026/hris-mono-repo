export const REQUEST_FORMS = [
    {
        value: 1,
        text: 'OT'
    },
    {
        value: 2,
        text: 'LEAVE'
    },
    {
        value: 3,
        text: 'OFFICIAL_BUSINESS'
    },
    {
        value: 4,
        text: 'TIME_REQUEST'
    },
    {
        value: 5,
        text: 'CHANGE_SHIFT'
    }
]

export const getRequestFormText = (text: string) => {
    switch (text) {
        case 'OT':
            return 'Overtime Request'
        case 'LEAVE':
            return 'Leave Request'
        case 'OFFICIAL_BUSINESS':
            return 'Official Business Request'
        case 'TIME_REQUEST':
            return 'DTR Correction'
        case 'CHANGE_SHIFT':
            return 'Change Schedule'
        default:
            return text
    }
}

export const getDialogType = (text: string) => {
    const textLower = text.toLowerCase();

    switch (true) {
        case textLower.includes('leave'):
            return 'leave';
        case textLower.includes('business') || textLower.includes('official'):
            return 'official-business';
        case textLower.includes('overtime'):
            return 'overtime';
        default:
            return textLower; // fallback
    }
};

export const EVENTS_HOLIDAYS = [
    {
        name: 'New Year',
        date: '2026-01-01',
        type: 'Holiday'
    },
    {
        name: 'Chinise New Year',
        date: '2026-01-29',
        type: 'Special Holiday'
    },
    {
        name: 'Company Mass',
        date: '2026-01-30',
        type: 'Event'
    }
]

