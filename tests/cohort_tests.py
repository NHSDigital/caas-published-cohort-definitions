"""
See
https://github.com/NHSDigital/pytest-nhsd-apim/blob/main/tests/test_examples.py
for more ideas on how to test the authorization of your API.
"""
import requests
import pytest
import json
from lib.constants import CORRELATION_IDS
from lib import Generators
from lib.api_helpers import published_cohort_library_get_all_request_body, get_by_slug_name_request_body, published_library_get_all_json_file_location


@pytest.mark.functionaltest
def test_for_getall_query(nhsd_apim_proxy_url):
    published_cohort_definitions_response = requests.post(
        f"{nhsd_apim_proxy_url}/api", headers=Generators.generate_target_server_headers("76491414-d0cf-4655-ae20-a4d1368472f3"), json=published_cohort_library_get_all_request_body
    )

    published_cohort_definitions_Response_json = json.dumps(published_cohort_definitions_response.json(), indent=1)
    expected_response_published_library_get_all = json.dumps(
        json.load(published_library_get_all_json_file_location), indent=1)

    published_cohort_definitions_response.status_code == 200
    assert expected_response_published_library_get_all == published_cohort_definitions_Response_json


@pytest.mark.functionaltest
@pytest.mark.parametrize("correlation_id", CORRELATION_IDS)
def test_for_urlslug_query(nhsd_apim_proxy_url, correlation_id):
    url_slug_query_response = requests.post(
        f"{nhsd_apim_proxy_url}/api", headers=Generators.generate_target_server_headers(correlation_id), json=get_by_slug_name_request_body
    )

    url_slug_query_response_json = url_slug_query_response.json()
    assert (url_slug_query_response_json['data']['PublishedCohortLibraryGetBySlugName']['urlSlug'] ==
            'flu-22-to-23')
