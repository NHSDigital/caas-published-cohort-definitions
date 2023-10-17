"""
See
https://github.com/NHSDigital/pytest-nhsd-apim/blob/main/tests/test_examples.py
for more ideas on how to test the authorization of your API.
"""
import requests
import pytest
import json
import os
from lib.constants import URL_SLUG_SANDBOX
from lib.api_helpers import (
    published_cohort_library_get_all_request_body,
    sandbox_published_cohort_library_get_all_expected_response,
    get_by_slug_name_request_body)

expected_response_published_library_get_all = json.load(sandbox_published_cohort_library_get_all_expected_response)
SANDBOX_URL = os.environ.get("SANDBOX_URL")


@pytest.mark.skip(reason="Sandbox tests are intermittently failing with 503 error")
def test_for_getall_query():
    published_cohort_definitions_response = requests.post(
        f"{SANDBOX_URL}/api",
        json=published_cohort_library_get_all_request_body
    )

    published_cohort_definitions_Response_json = published_cohort_definitions_response.json()

    assert published_cohort_definitions_response.status_code == 200
    assert expected_response_published_library_get_all == published_cohort_definitions_Response_json


@pytest.mark.skip(reason="Sandbox tests are intermittently failing with 503 error")
def test_for_urlslug_query():

    url_slug_query_response = requests.post(
        f"{SANDBOX_URL}/api",
        json=get_by_slug_name_request_body(URL_SLUG_SANDBOX)
    )

    url_slug_data = url_slug_query_response.json()['data']['PublishedCohortLibraryGetBySlugName']
    assert url_slug_data['urlSlug'] == '22-to-23'
