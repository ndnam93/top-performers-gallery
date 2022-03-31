import {FILTER_OPTIONS} from "./constants";

export const getFilterValueLabel = (filterKey, values = null) => {
  if (!FILTER_OPTIONS[filterKey]) return null;

  const labels = _.concat(values).map(value => FILTER_OPTIONS[filterKey]?.find(option => option.key == value)?.label);
  const labelStr = _.join(_.compact(labels), ', ');
  if (labelStr) return labelStr;

  if (values === null) {
    // Return the first option's label
    return _.first(FILTER_OPTIONS[filterKey])?.label;
  }

  return null;
}

export const rejectInvalidFilters = filters => {
  const newFilters = {};
  for (const key in filters) {
    if (_.isArray(filters[key])) {
      newFilters[key] = filters[key].filter(value => getFilterValueLabel(key, value));
    } else if (getFilterValueLabel(key, filters[key])) {
      newFilters[key] = filters[key];
    }
  }

  return newFilters;
}

export const isEmptyFilter = value => _.isArray(value) && _.isEmpty(value) || _.isNil(value);
