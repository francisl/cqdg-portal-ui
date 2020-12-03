import t from '@cqdg/locales/intl';

const presetFilters = [
  {
    title: t('facet.study.name'),
    field: 'study.short_name_keyword',
    full: 'study.short_name_keyword',
    type: 'keyword',
  },
  {
    title: t('facet.study.domain'),
    field: 'study.domain',
    full: 'study.domain',
    type: 'keyword',
  },
  {
    title: t('facet.gender'),
    field: 'gender',
    full: 'gender',
    type: 'keyword',
  },
  {
    title: t('facet.ethnicity'),
    field: 'ethnicity',
    full: 'ethnicity',
    type: 'keyword',
  },
  {
    title: t('facet.age.at.recruitment'),
    field: 'age_at_recruitment',
    full: 'age_at_recruitment',
    type: 'long',
  },
  {
    title: t('facet.age.at.diagnosis'),
    field: 'diagnoses.age_at_diagnosis',
    full: 'diagnoses.age_at_diagnosis',
    type: 'long',
  },
  {
    title: t('facet.vital.status'),
    field: 'vital_status',
    full: 'vital_status',
    type: 'keyword',
  },
  {
    title: t('facet.icd.category'),
    field: 'diagnoses.icd_category_keyword',
    full: 'diagnoses.icd_category_keyword',
    type: 'keyword',
  },
  {
    title: t('facet.mondo.term'),
    field: 'diagnoses.mondo_term_keyword',
    full: 'diagnoses.mondo_term_keyword',
    type: 'keyword',
  },
  {
    title: t('facet.hpo.category'),
    field: 'phenotypes.hpo_category_keyword',
    full: 'phenotypes.hpo_category_keyword',
    type: 'keyword',
  },
  {
    title: t('facet.hpo.term'),
    field: 'phenotypes.hpo_term_keyword',
    full: 'phenotypes.hpo_term_keyword',
    type: 'keyword',
  },
];

export default presetFilters;
