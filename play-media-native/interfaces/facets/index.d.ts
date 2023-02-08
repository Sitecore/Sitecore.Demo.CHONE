import { DropdownItem } from "../../components/DropdownPicker/DropdownPicker";

export interface FacetFilter {
  id: string;
  label: string;
  facets: DropdownItem[];
}
