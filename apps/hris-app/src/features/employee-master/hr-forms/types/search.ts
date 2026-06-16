import { PAGINATION_DEFAULTS } from "@/components/custom/grid/types/constants";
import { parseAsInteger } from "nuqs";


export const hrFormSearchInitialParser = {
   pageNumber: parseAsInteger.withDefault(PAGINATION_DEFAULTS.DEFAULT_PAGE_NUMBER),
   pageSize: parseAsInteger.withDefault(PAGINATION_DEFAULTS.DEFAULT_PAGE_SIZE),
}

