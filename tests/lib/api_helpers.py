from lib.constants import URL_SLUG

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

get_by_slug_name_request_body = {
    "query": "query Cohort($urlSlug: String!) { PublishedCohortLibraryGetBySlugName(urlSlug: $urlSlug)"
    "{ ... on Cohort { urlSlug}}}",
    "variables": {
        "urlSlug": URL_SLUG
    }
}

published_cohort_library_get_all_expected_response = open(
    './tests/lib/published_cohort_library_get_all_expected_results.json')
