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
        "urlSlug": "flu-22-to-23"
    }
}

published_library_get_all_json_file_location = open('./tests/lib/publishedCohortLibraryGetAll.json')
