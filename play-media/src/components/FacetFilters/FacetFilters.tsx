import { FacetFilter } from './FacetFilter';

type FacetFiltersProps = {
  facetFilters: FacetFilter[];
  onChange: (id: string, value: string) => void;
};

export const FacetFilters = ({ facetFilters, onChange }: FacetFiltersProps) => {
  const handleChange = (id: string, value: string) => {
    onChange(id, value);
  };
  return (
    <div className="facet-filters">
      {facetFilters.map((facet) => (
        <FacetFilter
          key={facet.id}
          id={facet.id}
          label={facet.label}
          facets={facet.facets}
          onChange={handleChange}
        />
      ))}
    </div>
  );
};
