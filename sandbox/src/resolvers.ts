/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
/* eslint-disable sonarjs/no-identical-functions */
import 'reflect-metadata';
import { Resolver, Query, Mutation, Arg, Ctx, Int } from 'type-graphql';
import * as Schema from './schema/typeGraphqlSchema';
import { v4 as uuidv4 } from 'uuid';
import { nanoid } from './nanoid';

export interface MockserverContext {
  allCohorts: Schema.Cohort[];
}

@Resolver((of) => Schema.Cohort)
export class CohortResolver {
  @Query((returns) => Schema.CohortSearchResultUnion)
  PublishedCohortLibraryGetBySlugName(
    @Arg('urlSlug', () => String) urlSlug: string,
    @Ctx() context: MockserverContext
  ): Partial<typeof Schema.CohortSearchResultUnion> {
    const cohortBySlugName = context.allCohorts.find(
      (cohort) => cohort.urlSlug === urlSlug
    );
    return cohortBySlugName || { code: 'error' };
  }

  @Query((returns) => [Schema.Cohort])
  PublishedCohortLibraryGetAll(
    @Ctx() context: MockserverContext
  ): Schema.Cohort[] {
    return context.allCohorts;
  }
}

// @Resolver((of) => Schema.ConditionGroup)
// export class ConditionGroupResolver {
//   @Query((returns) => Schema.ConditionGroupSearchResultUnion)
//   async PublishedConditionGroupLibraryGetBySlugName(
//     @Arg('urlSlug', () => String) urlSlug: string,
//     @Ctx() context: MockserverContext
//   ): Promise<typeof Schema.ConditionGroupSearchResultUnion> {
//     const conditionGroupBySlugName = context.allConditionGroups.find(
//       (conditionGroup) => conditionGroup.urlSlug === urlSlug
//     );
//     return conditionGroupBySlugName || { code: 'error' };
//   }

//   @Query((returns) => [Schema.ConditionGroup])
//   async PublishedConditionGroupLibraryGetAll(
//     @Ctx() context: MockserverContext
//   ) {
//     return context.allConditionGroups;
//   }
// }

// @Resolver((of) => Schema.Dataset)
// export class DatasetResolver {
//   @Query((returns) => [Schema.Dataset])
//   async PublishedDatasetsGetAll(
//     @Ctx() context: MockserverContext
//   ): Promise<Schema.Dataset[]> {
//     return context.allDatasets;
//   }

//   @Query((returns) => [Schema.DatasetsSearchResultUnion])
//   async DatasetsGetByCohortUrlSlug(
//     @Arg('urlSlug', () => String) urlSlug: string,
//     @Ctx() context: MockserverContext
//   ): Promise<Schema.Dataset[]> {
//     return context.allDatasets;
//   }
// }

// @Resolver((of) => Schema.ActivityLog)
// export class ActivityLogResolver {
//   @Query((returns) => Schema.ActivityLogSearchResultUnion)
//   async ActivityLogGetLastUpdatedDateById(
//     @Arg('activityLogId', () => String) activityLogId: string,
//     @Ctx() context: MockserverContext
//   ): Promise<typeof Schema.ActivityLogSearchResultUnion> {
//     return context.allActivityLogs[0];
//   }

//   @Query((returns) => Schema.ActivityLogSearchResultUnion)
//   async ActivityLogGetLatestByCohortId(
//     @Arg('cohortId', () => String) cohortId: string,
//     @Ctx() context: MockserverContext
//   ): Promise<typeof Schema.ActivityLogSearchResultUnion> {
//     return context.allActivityLogs[0];
//   }
// }
