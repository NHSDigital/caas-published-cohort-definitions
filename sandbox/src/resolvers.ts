import 'reflect-metadata';
import { Resolver, Query,  Arg, Ctx } from 'type-graphql';
import * as Schema from './schema/typeGraphqlSchema';

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

    return cohortBySlugName || {
        code: '404',
        errorDescription: 'Cohort Not Found',
      };
  }

  @Query((returns) => [Schema.Cohort])
  PublishedCohortLibraryGetAll(
    @Ctx() context: MockserverContext
  ) {
    return context.allCohorts;
  }
}
