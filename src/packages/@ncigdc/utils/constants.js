// @flow

export const DATA_CATEGORIES = {
  SEQ: { full: "Raw Sequencing Data", abbr: "Seq" },
  EXP: { full: "Transcriptome Profiling", abbr: "Exp" },
  SNV: { full: "Simple Nucleotide Variation", abbr: "SNV" },
  CNV: { full: "Copy Number Variation", abbr: "CNV" },
  METH: { full: "DNA Methylation", abbr: "Meth" },
  CLINICAL: { full: "Clinical", abbr: "Clinical" },
  BIOSPECIMEN: { full: "Biospecimen", abbr: "Bio" }
};

export const DATA_TYPES = {
  GEQ: { full: "Gene Expression Quantification", abbr: "GEQ" }
};

export const EXPERIMENTAL_STRATEGIES = [
  "Genotyping Array",
  "Gene Expression Array",
  "Exon Array",
  "miRNA Expression Array",
  "Methylation Array",
  "CGH Array",
  "MSI-Mono-Dinucleotide Assay",
  "WGS",
  "WGA",
  "WXS",
  "RNA-Seq",
  "miRNA-Seq",
  "ncRNA-Seq",
  "WCS",
  "CLONE",
  "POOLCLONE",
  "AMPLICON",
  "CLONEEND",
  "FINISHING",
  "ChIP-Seq",
  "MNase-Seq",
  "DNase-Hypersensitivity",
  "Bisulfite-Seq",
  "EST",
  "FL-cDNA",
  "CTS",
  "MRE-Seq",
  "MeDIP-Seq",
  "MBD-Seq",
  "Tn-Seq",
  "FAIRE-seq",
  "SELEX",
  "RIP-Seq",
  "ChIA-PET",
  "DNA-Seq",
  "Total RNA-Seq",
  "VALIDATION",
  "OTHER"
].map(n => n.toLowerCase());

export const SEARCH_FIELDS = [
  // project
  "project_id",
  "disease_type",
  "primary_site",
  "name",

  // case
  "case_id",
  "submitter_id",

  // biospecimen
  "aliquot_ids",
  "submitter_aliquot_ids",
  "analyte_ids",
  "submitter_analyte_ids",
  "portion_ids",
  "submitter_portion_ids",
  "sample_ids",
  "submitter_sample_ids",
  "slide_ids",
  "submitter_slide_ids",

  // file
  "file_id",
  "file_name",
  "submitter_id",
  "data_category",
  "data_type",
  "experimental_strategy",
  "md5sum",
  "cases.case_id",

  // annotation
  "annotation_id",
  "entity_id",
  "entity_submitter_id",

  // gene
  "symbol",
  "synonyms",
  "gene_id",
  "transcripts.translation_id",
  "transcripts.id",
  "external_db_ids.entrez_gene",
  "external_db_ids.hgnc",
  "external_db_ids.omim_gene",
  "external_db_ids.uniprotkb_swissprot",
  "cytoband",

  // ssm
  "ssm_id",
  "genomic_dna_change",
  "consequence.transcript.gene.symbol",
  "consequence.transcript.aa_change"
];