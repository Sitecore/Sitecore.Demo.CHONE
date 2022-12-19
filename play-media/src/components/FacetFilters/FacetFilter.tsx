import { ChangeEvent } from 'react';
import { camelize } from '../../helpers/textHelper';

type FacetFilterProps = FacetFilter & {
  onChange: (id: string, value: string) => void;
};

export interface FacetFilter {
  id: string;
  label: string;
  facets: FacetItem[];
}

export interface FacetItem {
  name: string | undefined;
  id: string | undefined;
}

export const FacetFilter = ({ id, label, facets, onChange }: FacetFilterProps) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(id, event.target.value);
  };

  return (
    <div className="facet-filter">
      <label htmlFor={id}>{label}</label>
      <select name={camelize(label)} id={id} onChange={handleChange}>
        <option value="">All</option>
        {facets.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};
