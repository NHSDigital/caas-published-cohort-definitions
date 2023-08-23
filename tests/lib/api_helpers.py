published_cohort_library_get_all_request_body = {
    "query": (
        "query PublishedCohortLibraryGetAll { PublishedCohortLibraryGetAll "
        "{ authors,"
        "clinicalAtRiskGroupsText,"
        "id,"
        "commissioner,"
        "demographicsText,"
        "description,"
        "disclaimerText,"
        "fixedDateReference,"
        "name,"
        "purpose,"
        "shortName,"
        "urlSlug,"
        "summary } }"
    )
}


def get_by_slug_name_request_body(url_slug):
    return {
        "query": "query Cohort($urlSlug: String!) { PublishedCohortLibraryGetBySlugName(urlSlug: $urlSlug)"
        "{ ... on Cohort { urlSlug}}}",
        "variables": {
            "urlSlug": url_slug
        }
    }


published_cohort_library_get_all_expected_response = open(
    './tests/lib/published_cohort_library_get_all_expected_results.json')
