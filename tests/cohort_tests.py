"""
See
https://github.com/NHSDigital/pytest-nhsd-apim/blob/main/tests/test_examples.py
for more ideas on how to test the authorization of your API.
"""
import requests
import pytest
import json
from lib import Generators
from lib.constants import CORRELATION_IDS, URL_SLUG
from lib.api_helpers import published_cohort_library_get_all_request_body, published_cohort_library_get_all_expected_response, get_by_slug_name_request_body

expected_response_published_library_get_all = json.load(published_cohort_library_get_all_expected_response)


@pytest.mark.functionaltest
@pytest.mark.parametrize("correlation_id", CORRELATION_IDS)
def test_for_getall_query(nhsd_apim_proxy_url, correlation_id):
    published_cohort_definitions_response = requests.post(
        f"{nhsd_apim_proxy_url}/api",
        headers=Generators.generate_target_server_headers(correlation_id),
        json=published_cohort_library_get_all_request_body
    )

    published_cohort_definitions_Response_json = published_cohort_definitions_response.json()

    published_cohort_definitions_response.status_code == 200
    assert expected_response_published_library_get_all == published_cohort_definitions_Response_json


@pytest.mark.functionaltest
@pytest.mark.parametrize("correlation_id", CORRELATION_IDS)
def test_for_urlslug_query(nhsd_apim_proxy_url, correlation_id):

    url_slug_query_response = requests.post(
        f"{nhsd_apim_proxy_url}/api",
        headers=Generators.generate_target_server_headers(correlation_id), json=get_by_slug_name_request_body(URL_SLUG)
    )

    url_slug_data = url_slug_query_response.json()['data']['PublishedCohortLibraryGetBySlugName']
    assert url_slug_data['urlSlug'] == 'flu-22-to-23'
