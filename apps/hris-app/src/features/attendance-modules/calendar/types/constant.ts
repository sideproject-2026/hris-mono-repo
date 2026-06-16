export const DEFAULT_YEAR = new Date().getFullYear()

export const formatHolidayTypeText = (types: SelectionItem<string>[] | undefined) => {
 
  if (!types || !Array.isArray(types)) return [];

  const labelMap: Record<string, string> = {
    "Regular": "REGULAR",
    "SpecialWorking": "SPECIAL WORKING",
    "SpecialNonWorking": "SPECIAL NON-WORKING",
    "SpecialHoliday": "SPECIAL HOLIDAY",
  };

  return types.map(item => ({
    ...item,
    text: labelMap[item.text] || item.text
  }));
};

export const getDisplayTextHoliday = (text: string) =>
    text === 'Regular'
        ? 'REGULAR'
        : text === 'SpecialWorking'
            ? 'SPECIAL WORKING'
            : text === 'SpecialNonWorking'
                ? 'SPECIAL NON-WORKING'
                : text === 'SpecialHoliday'
                    ? 'SPECIAL HOLIDAY'
                        : text;