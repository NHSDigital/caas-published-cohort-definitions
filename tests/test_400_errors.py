"""
See
https://github.com/NHSDigital/pytest-nhsd-apim/blob/main/tests/test_examples.py
for more ideas on how to test the authorization of your API.
"""
import requests
import pytest
from lib import Generators, Assertions
from lib.constants import CORRELATION_IDS


@pytest.mark.functionaltest
@pytest.mark.parametrize("correlation_id", CORRELATION_IDS)
def test_data_invalid(nhsd_apim_proxy_url, correlation_id):
    invalid_request_body = {
        "query": (
            "query PublishedCohortLibraryGetBySlugName(urlSlug: $urlSlug) {"
            "... on Cohort {"
            "summary} }"
        )
    }

    error_response = requests.post(
        f"{nhsd_apim_proxy_url}/api",
        headers=Generators.generate_target_server_headers(correlation_id), json=invalid_request_body
    )

    Assertions.assert_error_with_optional_correlation_id(
        error_response,
        400,
        [{'message': 'An error occurred'}],
        correlation_id
    )
