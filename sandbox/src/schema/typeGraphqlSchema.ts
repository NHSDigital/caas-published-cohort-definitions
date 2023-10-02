/* eslint-disable max-classes-per-file, @typescript-eslint/no-unused-vars, import/no-relative-packages */
import 'reflect-metadata';
import {
  Field,
  ID,
  ObjectType,
  Int,
  createUnionType,
  InputType,
} from 'type-graphql';
import { Min } from 'class-validator';

@ObjectType({
  description:
    'Coding Systems include, SNOMED, ICD-10, OPCS etc. A coding system provides codes for representing Clinical Terms.',
})
export class CodeSystem {
  @Field((type) => String, {
    description: 'The UUID used to identify the Coding System in the backend',
  })
  id!: string;

  @Field((type) => String, {
    description: 'The name of the coding system',
  })
  name!: string;
}

@InputType({
  description:
    'Coding Systems include, SNOMED, ICD-10, OPCS etc. A coding system provides codes for representing Clinical Terms.',
})
export class CodeSystemInput {
  @Field((type) => String, {
    description: 'The name of the coding system',
  })
  name!: string;
}

@ObjectType({
  description:
    'A Code is an individual clinical term. It might be a SNOMED code or an ICD-10 code etc.',
})
export class Code {
  @Field((type) => String, {})
  id!: string;

  @Field((type) => String, {
    description: 'A description of this clinical term',
  })
  shortDescription!: string;

  @Field((type) => String, {
    description: 'The value representing the clinical term',
  })
  value!: string;

  @Field((type) => CodeSystem, {
    description:
      'Coding Systems include, SNOMED, ICD-10, OPCS etc. A coding system provides codes for representing Clinical Terms.',
  })
  codeSystem!: CodeSystem;

  codeListId?: string;
}

@InputType({
  description:
    'A Code is an individual clinical term. It might be a SNOMED code or an ICD-10 code etc.',
})
export class CodeInput {
  @Field((type) => String, {
    description: 'A description of this clinical term',
  })
  shortDescription!: string;

  @Field((type) => String, {
    description: 'The value representing the clinical term',
  })
  value!: string;

  @Field((type) => CodeSystemInput, {
    description:
      'Coding Systems include, SNOMED, ICD-10, OPCS etc. A coding system provides codes for representing Clinical Terms.',
  })
  codeSystem!: CodeSystemInput;
}

@ObjectType({
  description:
    'A Code List aggregates individual Codes into logical groupings of codes. These are used to identify patients to be included in a Cohort (and in some instances people to be excluded)',
})
export class CodeList {
  @Field((type) => String, {
    description: 'The UUID used to identify the Code List in the backend',
  })
  id!: string;

  @Field((type) => String, {
    description:
      'A text description used to describe the Code List - Note: this is used when articulating business logic in Explorer',
  })
  shortDescription!: string;

  @Field((type) => String, {
    description:
      'If this Code List is a PCD Refset then this holds the Cluster ID e.g. AST_COD',
    nullable: true,
  })
  clusterName?: string;

  @Field((type) => [Code], {
    description:
      'A Code is an individual clinical term. It might be a SNOMED code or an ICD-10 code etc.',
    nullable: true,
  })
  codes?: Code[];

  @Field((type) => CodeSystem, {
    description:
      'Coding Systems include, SNOMED, ICD-10, OPCS etc. A coding system provides codes for representing Clinical Terms.',
    nullable: true,
  })
  codeSystem!: CodeSystem;
}

@InputType({
  description:
    'A Code List aggregates individual Codes into logical groupings of codes. These are used to identify patients to be included in a Cohort (and in some instances people to be excluded)',
})
export class CodeListInput {
  @Field((type) => String, {
    description: 'The UUID used to identify the Code List in the backend',
  })
  id!: string;

  @Field((type) => String, {
    description:
      'A text description used to describe the Code List - Note: this is used when articulating business logic in Explorer',
    nullable: true,
  })
  shortDescription!: string;

  @Field((type) => String, {
    description:
      'If this Code List is a PCD Refset then this holds the Cluster ID e.g. AST_COD',
    nullable: true,
  })
  clusterName?: string;

  @Field((type) => [CodeInput], {
    description:
      'A Code is an individual clinical term. It might be a SNOMED code or an ICD-10 code etc.',
    nullable: true,
  })
  codes?: CodeInput[];

  @Field((type) => CodeSystemInput, {
    description:
      'Coding Systems include, SNOMED, ICD-10, OPCS etc. A coding system provides codes for representing Clinical Terms.',
    nullable: true,
  })
  codeSystem!: CodeSystemInput;
}

@ObjectType({
  description:
    'This constrains the people identified to be within certain age limits. This might be used to find people over 5 years of age.',
})
export class PatientAgeConstraint {
  @Field((type) => Int, {
    description: 'The minimum age of a person to be eligible for inclusion',
    nullable: true,
  })
  @Min(0)
  minAgeMonths?: number;

  @Field((type) => Int, {
    description: 'The maximum age of a person to be eligible for inclusion',
    nullable: true,
  })
  @Min(0)
  maxAgeMonths?: number;
}

@InputType({
  description:
    'This constrains the people identified to be within certain age limits. This might be used to find people over 5 years of age.',
})
export class PatientAgeConstraintInput {
  @Field((type) => Int, {
    description: 'The minimum age of a person to be eligible for inclusion',
    nullable: true,
  })
  @Min(0)
  minAgeMonths?: number;

  @Field((type) => Int, {
    description: 'The maximum age of a person to be eligible for inclusion',
    nullable: true,
  })
  @Min(0)
  maxAgeMonths?: number;
}

@ObjectType({
  description: 'Dataset',
})
export class Dataset {
  @Field((type) => String, {})
  id!: string;

  @Field((type) => String, {
    description: 'Dataset - name',
    nullable: true,
  })
  name?: string;

  @Field((type) => String, {
    description: 'Dataset - description',
    nullable: true,
  })
  description?: string;

  @Field((type) => String, {
    description: 'Dataset - acronym',
    nullable: true,
  })
  acronym?: string;

  @Field((type) => String, {
    description: 'Dataset - url',
    nullable: true,
  })
  url?: string;
}

export class DatasetInclusion {
  id!: string;

  dataset?: Dataset;
}

@InputType({
  description: 'Dataset',
})
export class DatasetInput {
  @Field((type) => String, {})
  id!: string;

  @Field((type) => String, {
    description: 'Dataset - name',
    nullable: true,
  })
  name?: string;

  @Field((type) => String, {
    description: 'Dataset - description',
    nullable: true,
  })
  description?: string;

  @Field((type) => String, {
    description: 'Dataset - acronym',
    nullable: true,
  })
  acronym?: string;

  @Field((type) => String, {
    description: 'Dataset - urlSlug',
    nullable: true,
  })
  urlSlug?: string;
}

@ObjectType({
  description:
    'This constrains the date when the patient journal event occurred. This might be to identify people who had a certain treatment in the last two years.',
})
export class EventDateConstraint {
  @Field((type) => Int, {
    description:
      'The recorded journal event must have been within the previous N months',
    nullable: true,
  })
  @Min(0)
  withinLastMonths?: number;

  @Field((type) => Int, {
    description:
      'The recorded journal event must have been no earlier than this date relative to the Cohort fixed date',
    nullable: true,
  })
  @Min(0)
  relativeEarliestTime?: number;

  @Field((type) => Int, {
    description:
      'The recorded journal event must have been no later than this date relative to the Cohort fixed date',
    nullable: true,
  })
  @Min(0)
  relativeLatestTime?: number;

  @Field((type) => Date, {
    description:
      'The recorded journal event must have been no earlier than this fixed date',
    nullable: true,
  })
  fixedEarliestDate?: Date;

  @Field((type) => Date, {
    description:
      'The recorded journal event must have been no later than this fixed date',
    nullable: true,
  })
  fixedLatestDate?: Date;

  id!: string;
}

@InputType({
  description:
    'This constrains the date when the patient journal event occurred. This might be to identify people who had a certain treatment in the last two years.',
})
export class EventDateConstraintInput {
  @Field((type) => Int, {
    description:
      'The recorded journal event must have been within the previous N months',
    nullable: true,
  })
  @Min(0)
  withinLastMonths?: number;

  @Field((type) => Int, {
    description:
      'The recorded journal event must have been no earlier than this date relative to the Cohort fixed date',
    nullable: true,
  })
  @Min(0)
  relativeEarliestTime?: number;

  @Field((type) => Int, {
    description:
      'The recorded journal event must have been no later than this date relative to the Cohort fixed date',
    nullable: true,
  })
  @Min(0)
  relativeLatestTime?: number;

  @Field((type) => Date, {
    description:
      'The recorded journal event must have been no earlier than this fixed date',
    nullable: true,
  })
  fixedEarliestDate?: Date;

  @Field((type) => Date, {
    description:
      'The recorded journal event must have been no later than this fixed date',
    nullable: true,
  })
  fixedLatestDate?: Date;
}

@ObjectType({
  description: `This constrains the number of times an event within the patient journal has occurred.
  This might be to identify people who have had a treatment at least 4 times.`,
})
export class EventCountConstraint {
  @Field((type) => Int, {
    description:
      'The event, or events must have occurred at least this number of times',
  })
  @Min(0)
  count!: number;

  id!: string;
}
@InputType({
  description: `This constrains the number of times an event within the patient journal has occurred.
  This might be to identify people who have had a treatment at least 4 times.`,
})
export class EventCountConstraintInput {
  @Field((type) => Int, {
    description:
      'The event, or events must have occurred at least this number of times',
  })
  @Min(0)
  count!: number;

  id!: string;
}

@ObjectType({
  description: 'PreCoordinatedConstraintType',
})
export class PreCoordinatedConstraintType {
  @Field((type) => String, {})
  id!: string;

  @Field((type) => String, {})
  name!: string;

  @Field((type) => String, {})
  rulesetText!: string;
}

@InputType({
  description: `PreCoordinatedConstraintTypeInput`,
})
export class PreCoordinatedConstraintTypeInput {
  @Field((type) => String, { nullable: true })
  id!: string;

  @Field((type) => String, { nullable: true })
  name!: string;

  @Field((type) => String, { nullable: true })
  rulesetText!: string;
}

@ObjectType({
  description:
    'Some conditions do not fit well in the model and are handled as special cases. This included Morbid Obesity. The terms pre and post coordinated can be read about here https://blog.clinicalarchitecture.com/informatics-lingo-pre-and-post-coordinated-terms',
})
export class PreCoordinatedConstraint {
  @Field((type) => String, {})
  id!: string;

  @Field((type) => PreCoordinatedConstraintType, {
    description: 'PreCoordinatedConstraintType',
  })
  preCoordinatedConstraintType!: PreCoordinatedConstraintType;
}

@InputType({
  description:
    'Some conditions do not fit well in the model and are handled as special cases. This included Morbid Obesity. The terms pre and post coordinated can be read about here https://blog.clinicalarchitecture.com/informatics-lingo-pre-and-post-coordinated-terms',
})
export class PreCoordinatedConstraintInput {
  @Field((type) => PreCoordinatedConstraintTypeInput, {
    description: 'PreCoordinatedConstraintType',
  })
  preCoordinatedConstraintType!: PreCoordinatedConstraintTypeInput;
}

@ObjectType({
  description:
    "A Rule composes a collection of Code Lists with a number of 'constraints' (e.g. people over 5 years of age) which act together to control which people are captured.",
})
export class Rule {
  @Field((type) => String, {})
  id!: string;

  @Field((type) => [CodeList], {
    description:
      'A Code List aggregates individual Codes into logical groupings of codes. These are used to identify patients to be included in a Cohort (and in some instances people to be excluded)',
    nullable: true,
  })
  codeListInclusions?: CodeList[];

  @Field((type) => [CodeList], {
    description:
      'A Code List aggregates individual Codes into logical groupings of codes. These are used to identify patients to be included in a Cohort (and in some instances people to be excluded)',
    nullable: true,
  })
  codeListsResolving?: CodeList[];

  @Field((type) => [PatientAgeConstraint], {
    description:
      'This constrains the people identified to be within certain age limits. This might be used to find people over 5 years of age.',
    nullable: true,
  })
  patientAgeConstraints?: PatientAgeConstraint[];

  @Field((type) => EventDateConstraint, {
    description:
      'This constrains the date when the patient journal event occurred. This might be to identify people who had a certain treatment in the last two years.',
    nullable: true,
  })
  eventDateConstraint?: EventDateConstraint|null; // Added \null because the annotations don't appear to be being picked up correctly.

  @Field((type) => EventCountConstraint, {
    description: `This constrains the number of times an event within the patient journal has occurred.
    This might be to identify people who have had a treatment at least 4 times.`,
    nullable: true,
  })
  eventCountConstraint?: EventCountConstraint|null; // Added \null because the annotations don't appear to be being picked up correctly.

  @Field((type) => [PreCoordinatedConstraint], {
    description:
      'Some conditions do not fit well in the model and are handled as special cases. This included Morbid Obesity. The terms pre and post coordinated can be read about here https://blog.clinicalarchitecture.com/informatics-lingo-pre-and-post-coordinated-terms',
    nullable: true,
  })
  preCoordinatedConstraints?: PreCoordinatedConstraint[];

  @Field((type) => [Dataset], {
    description: 'Rule - Dataset',
    nullable: true,
  })
  datasets?: Dataset[];

  @Field((type) => [Dataset], {
    description: 'Rule - DatasetInclusion',
    nullable: true,
  })
  datasetInclusion?: DatasetInclusion[];

  codeLists?: CodeList[];
}

@InputType({
  description:
    "A Rule composes a collection of Code Lists with a number of 'constraints' (e.g. people over 5 years of age) which act together to control which people are captured.",
})
export class RuleInput {
  @Field((type) => [CodeListInput], {
    description:
      'A Code List aggregates individual Codes into logical groupings of codes. These are used to identify patients to be included in a Cohort (and in some instances people to be excluded)',
    nullable: true,
  })
  codeListInclusions?: CodeListInput[];

  @Field((type) => [CodeListInput], {
    description:
      'A Code List aggregates individual Codes into logical groupings of codes. These are used to identify patients to be included in a Cohort (and in some instances people to be excluded)',
    nullable: true,
  })
  codeListsResolving?: CodeListInput[];

  @Field((type) => [PatientAgeConstraintInput], {
    description:
      'This constrains the people identified to be within certain age limits. This might be used to find people over 5 years of age.',
    nullable: true,
  })
  patientAgeConstraints?: PatientAgeConstraintInput[];

  @Field((type) => EventDateConstraintInput, {
    description:
      'This constrains the date when the patient journal event occurred. This might be to identify people who had a certain treatment in the last two years.',
    nullable: true,
  })
  eventDateConstraint?: EventDateConstraintInput;

  @Field((type) => EventCountConstraintInput, {
    description: `This constrains the number of times an event within the patient journal has occurred.
    This might be to identify people who have had a treatment at least 4 times.`,
    nullable: true,
  })
  eventCountConstraint?: EventCountConstraintInput;

  @Field((type) => [PreCoordinatedConstraintInput], {
    description:
      'Some conditions do not fit well in the model and are handled as special cases. This included Morbid Obesity. The terms pre and post coordinated can be read about here https://blog.clinicalarchitecture.com/informatics-lingo-pre-and-post-coordinated-terms',
    nullable: true,
  })
  preCoordinatedConstraints?: PreCoordinatedConstraintInput[];

  @Field((type) => [DatasetInput], {
    description: 'Rule - Dataset',
    nullable: true,
  })
  datasets?: DatasetInput[];

  @Field((type) => [DatasetInput], {
    description: 'Rule - DatasetInclusion',
    nullable: true,
  })
  datasetInclusion?: DatasetInput[];
}

@ObjectType({
  description:
    "A Rule Set is a logical entity which composes 'Rules' with either a logical AND or OR. It allows more complex rules to be created.",
})
export class Ruleset {
  @Field((type) => String, {})
  id!: string;

  @Field((type) => Boolean, {
    description:
      'Shows whether the associated rules should be logically ANDed or ORed together',
    nullable: true,
  })
  logicallyAndRules?: boolean;

  @Field((type) => [Rule], {
    description:
      "A Rule composes a collection of Code Lists with a number of 'constraints' (e.g. people over 5 years of age) which act together to control which people are captured.",
    nullable: true,
  })
  rules?: Rule[];
}

@InputType({
  description:
    "A Rule Set is a logical entity which composes 'Rules' with either a logical AND or OR. It allows more complex rules to be created.",
})
export class RulesetInput {
  @Field((type) => Boolean, {
    description:
      'Shows whether the associated rules should be logically ANDed or ORed together',
    nullable: true,
  })
  logicallyAndRules?: boolean;

  @Field((type) => [RuleInput], {
    description:
      "A Rule composes a collection of Code Lists with a number of 'constraints' (e.g. people over 5 years of age) which act together to control which people are captured.",
    nullable: true,
  })
  rules?: RuleInput[];
}

@ObjectType({
  description: `A Condition represents a focused set of clinical 'conditions' such as
  "Asthma that requires continuous or repeated use of inhaled or systemic steroids."
  This is often used in Clinical Policy to more clearly identify the scope of a Condition Group.
  A Condition is Composed of multiple Rule Sets which contain the specific business rules used to identify people that have this Condition.
  The 'non-digital-pathway' attribute identifies limitations of the Rules in the Rulesets to capture people that have this condition.`,
})
export class Condition {
  @Field((type) => String, {
    description: 'The UUID used to identify the Condition in the backend',
  })
  id!: string;

  @Field((type) => String, {
    description:
      'A description of the Condition, often informed by related Policy',
    nullable: true,
  })
  description?: string;

  @Field((type) => String, {
    description:
      'Groups of people identified by the related Policy but failed to be digitally captured for any reason',
    nullable: true,
  })
  nonDigitalPathwayText?: string;

  @Field((type) => [Ruleset], {
    description:
      "A Rule Set is a logical entity which composes 'Rules' with either a logical AND or OR. It allows more complex rules to be created.",
    nullable: true,
  })
  rulesets?: Ruleset[];

  conditionGroupId!: string;
}

@InputType({
  description: `A Condition represents a focused set of clinical 'conditions' such as
  "Asthma that requires continuous or repeated use of inhaled steroids or systemic steroids."
  This is often used in Clinical Policy to more clearly identify the scope of a Condition Group.
  A Condition is Composed of multiple Rule Sets which contain the specific business rules used to identify people that have this Condition.
  The 'non-digital-pathway' attribute identifies limitations of the Rules in the Rulesets to capture people that have this condition.`,
})
export class ConditionInput {
  @Field((type) => String, {
    description: 'The UUID used to identify the Condition in the backend',
    nullable: true,
  })
  id!: string;

  @Field((type) => String, {
    description:
      'A description of the Condition, often informed by related Policy',
    nullable: true,
  })
  description?: string;

  @Field((type) => String, {
    description:
      'Groups of people identified by the related Policy but failed to be digitally captured for any reason',
    nullable: true,
  })
  nonDigitalPathwayText?: string;

  @Field((type) => [RulesetInput], {
    description:
      "A Rule Set is a logical entity which composes 'Rules' with either a logical AND or OR. It allows more complex rules to be created.",
    nullable: true,
  })
  rulesets?: RulesetInput[];
}

@ObjectType({
  description: `A Condition Group brings together a number of related Conditions into one high level concept
  such as 'Chronic Heart Disease'. It doesn't have many attributes of it's own but does have multiple Conditions.
  Clinical Policy often uses Condition Groups to articulate who should belong to a Cohort.`,
})
export class ConditionGroup {
  @Field((type) => ID, {
    description: 'The UUID used to identify the Condition Group in the backend',
  })
  id!: string;

  @Field((type) => String, {
    description:
      'The last time this condition group was changed as an ISO string',
  })
  lastUpdated?: string;

  @Field((type) => String, {
    description: 'Text to display in condition group page title',
  })
  name!: string;

  @Field((type) => String, {
    description:
      "Text to display in Explorer in the 'Non Digital Pathway Overview' section",
  })
  nonDigitalPathwayOverview!: string;

  @Field((type) => String, {
    description:
      "Text to display in Explorer in the 'Rule Logic Overview' section",
  })
  ruleLogicOverview!: string;

  @Field((type) => String, {
    description:
      'A URL friendly name for this Condition Group for use on Web Page URLs',
  })
  urlSlug!: string;

  @Field((type) => String, {
    description:
      'Summary field to the ConditionGroup. When this is encountered the CG Page can just display the summary text and skip any other content',
    nullable: true,
  })
  summary?: string|null; // Added \null because the annotations don't appear to be being picked up correctly.

  @Field((type) => [Condition], {
    description: `A Condition represents a focused set of clinical 'conditions' such as
    "Asthma that requires continuous or repeated use of inhaled or systemic steroids."
    This is often used in Clinical Policy to more clearly identify the scope of a Condition Group.
    A Condition is Composed of multiple Rule Sets which contain the specific business rules used to identify people that have this Condition.
    The 'non-digital-pathway' attribute identifies limitations of the Rules in the Rulesets to capture people that have this condition.`,
    nullable: true,
  })
  conditions?: Condition[];

  description?: string;

  publishedState?: string;
}

@InputType({
  description: `A Condition Group brings together a number of related Conditions into one high level concept
  such as 'Chronic Heart Disease'. It doesn't have many attributes of it's own but does have multiple Conditions.
  Clinical Policy often uses Condition Groups to articulate who should belong to a Cohort.`,
})
export class ConditionGroupInput {
  @Field((type) => ID, {
    description: 'The UUID used to identify the Condition Group in the backend',
    nullable: true,
  })
  id?: string;

  @Field((type) => String, {
    description: 'Text to display in condition group page title',
  })
  name!: string;

  @Field((type) => String, {
    description:
      "Text to display in Explorer in the 'Non Digital Pathway Overview' section",
  })
  nonDigitalPathwayOverview!: string;

  @Field((type) => String, {
    description:
      "Text to display in Explorer in the 'Rule Logic Overview' section",
  })
  ruleLogicOverview!: string;

  @Field((type) => String, {
    description:
      'A URL friendly name for this Condition Group for use on Web Page URLs',
  })
  urlSlug!: string;

  @Field((type) => [ConditionInput], {
    description: `A Condition represents a focused set of clinical 'conditions' such as
    "Asthma that requires continuous or repeated use of inhaled steroids or systemic steroids."
    This is often used in Clinical Policy to more clearly identify the scope of a Condition Group.
    A Condition is Composed of multiple Rule Sets which contain the specific business rules used to identify people that have this Condition.
    The 'non-digital-pathway' attribute identifies limitations of the Rules in the Rulesets to capture people that have this condition.`,
    nullable: true,
  })
  conditions!: ConditionInput[];
}

@ObjectType({
  description: `At the top the level the Cohort element captures elements of the Cohort such as its name,
  commissioner and a summary of what the cohort is. A Cohort has multiple Condition Groups.
  It may also have some age constraint which applies to the whole Cohort.`,
})
export class Cohort {
  @Field((type) => String, {
    description:
      'The individuals or groups responsible for creating the cohort',
  })
  authors!: string;

  @Field((type) => String, {
    description:
      "Text to display in Explorer in the 'Clinical at risk groups' section",
  })
  clinicalAtRiskGroupsText!: string;

  @Field((type) => ID, {
    description: 'The UUID used to identify the cohort in the backend',
  })
  id!: string;

  @Field((type) => String, {
    description: 'The individual or group that commissioned this Cohort',
  })
  commissioner!: string;

  @Field((type) => String, {
    description: "Text to display in Explorer in the 'Demographics' section",
  })
  demographicsText!: string;

  @Field((type) => String, {
    description: 'A verbose description of what this Cohort is',
  })
  description!: string;

  @Field((type) => String, {
    description: "Text to display in Explorer in the 'Disclaimer' section",
  })
  disclaimerText!: string;

  @Field((type) => String, {
    description:
      'A date specific to this Cohort which Event Date Constraints in the business logic are in reference to',
    nullable: true,
  })
  fixedDateReference?: string|null; // Added \null because the annotations don't appear to be being picked up correctly.

  @Field((type) => String, {
    description: 'The last time this cohort was changed as an ISO string',
  })
  lastUpdated?: string;

  @Field((type) => String, {
    description: 'The full name for this Cohort',
  })
  name!: string;

  @Field((type) => String, {
    description: 'The purpose of this Cohort',
  })
  purpose!: string;

  @Field((type) => String, {
    description: 'A shortened name for this Cohort',
  })
  shortName!: string;

  @Field((type) => String, {
    description: 'A short summary description for this Cohort',
  })
  summary!: string;

  @Field((type) => String, {
    description: 'A URL friendly name for this Cohort for use on Web Page URLs',
  })
  urlSlug!: string;

  @Field((type) => [ConditionGroup], {
    description: `A Condition Group brings together a number of related Conditions into one high level concept
    such as 'Chronic Heart Disease'. It doesn't have many attributes of it's own but does have multiple Conditions.
    Clinical Policy often uses Condition Groups to articulate who should belong to a Cohort.`,
    nullable: true,
  })
  conditionGroups?: ConditionGroup[];

  @Field((type) => PatientAgeConstraint, {
    description:
      'This constrains the people identified to be within certain age limits. This might be used to find people over 5 years of age.',
    nullable: true,
  })
  patientAgeConstraint?: PatientAgeConstraint|null; // Added \null because the annotations don't appear to be being picked up correctly.

  curatedDataPublishedState?: string;
}

@ObjectType({
  description:
    "Patient medical journals record when people are diagnosed with a condition but also when they no longer have a condition. This is referred to as 'Resolved' codes. This constraint excludes people when a condition has been resolved by the presence of a Resolved code after the respective Diagnosis code. It references a Code List defining the codes which resolve the condition.",
})
export class ResolvedConstraint {
  @Field((type) => String, {})
  id!: string;

  codeList!: CodeList;
}

@ObjectType()
export class ApprovalWorkflowSupportingInfo {
  @Field((type) => ID)
  id!: string;

  @Field((type) => Int)
  @Min(0)
  version!: number;

  @Field((type) => String)
  comment!: string;

  @Field((type) => Boolean, { nullable: true })
  informationGovernanceApprovalReceived?: boolean;

  @Field((type) => Boolean, { nullable: true })
  clinicalSafetyDocumentationApprovalReceived?: boolean;

  @Field((type) => Boolean, { nullable: true })
  clinicalSafetyGroupApprovalReceived?: boolean;

  @Field((type) => Boolean, { nullable: true })
  liveServicesApprovalReceived?: boolean;
}

@ObjectType()
export class ApprovalWorkflow {
  @Field((type) => ID)
  id!: string;

  @Field((type) => String)
  urlSlug!: string;

  @Field((type) => ID, { nullable: true })
  activityLogId?: string;

  @Field((type) => ID, { nullable: true })
  cohortRootId?: string;

  @Field((type) => ID, { nullable: true })
  cohortVersionId?: string;

  @Field((type) => ApprovalWorkflowSupportingInfo, { nullable: true })
  approvalWorkflowSupportingInfo?: ApprovalWorkflowSupportingInfo;
}

@ObjectType()
export class ActivityLog {
  @Field((type) => ID)
  id!: string;

  @Field((type) => String)
  who!: string;

  @Field((type) => Date)
  when!: Date;

  @Field((type) => String)
  type!: string;

  @Field((type) => String)
  comment!: string;
}

@ObjectType()
export class ApprovalState {
  @Field((type) => ID)
  id!: string;

  @Field((type) => String) // Must be this, how do we create a custom field type for typeGraphQL?
  name!: string;

  @Field((type) => String)
  description!: string;
}

@ObjectType()
export class PublishedState {
  @Field((type) => ID)
  id!: string;

  @Field((type) => String)
  name!: string;

  @Field((type) => String)
  description!: string;
}

@ObjectType({
  description: 'Describes why an API request has failed',
})
export class ErrorDescription {
  @Field((type) => String, {
    description: 'A numeric code for the failure type',
    nullable: true,
  })
  code?: string;

  @Field((type) => String, {
    description: 'Used to help identify messages which caused this error',
    nullable: true,
  })
  correlationId?: string;

  @Field((type) => String, {
    description: 'A description of the failure',
    nullable: true,
  })
  errorDescription?: string;
}

export const CohortSearchResultUnion = createUnionType({
  name: 'CohortSearchResult', // the name of the GraphQL union
  types: () => [Cohort, ErrorDescription] as const, // function that returns tuple of object types classes
  // our implementation of detecting returned object type
  resolveType: (value) => {
    if ('code' in value) {
      return ErrorDescription;
    }
    return 'Cohort';
  },
});

export const orphanedType = [
  PreCoordinatedConstraint,
  ResolvedConstraint,
  EventCountConstraint,
  EventDateConstraint,
  PatientAgeConstraint,
  Ruleset,
  Rule,
  CodeList,
  Code,
  Condition,
  ConditionGroup,
  ActivityLog,
];
