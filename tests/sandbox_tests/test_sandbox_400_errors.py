"""
See
https://github.com/NHSDigital/pytest-nhsd-apim/blob/main/tests/test_examples.py
for more ideas on how to test the authorization of your API.
"""
import requests
import pytest
from lib import Generators
from lib.constants import CORRELATION_IDS, SANDBOX_URL


@pytest.mark.sandboxtest
@pytest.mark.parametrize("correlation_id", CORRELATION_IDS)
def test_data_invalid(correlation_id):
    invalid_request_body = {
        "query": (
            "query PublishedCohortLibraryGetBySlugName(urlSlug: $urlSlug) {"
            "... on Cohort {"
            "summary} }"
        )
    }

    error_response = requests.post(
        f"{SANDBOX_URL}/api",
        headers=Generators.generate_target_server_headers(correlation_id), json=invalid_request_body
    )
    # Assertions.assert_error_with_optional_correlation_id(
    #     error_response,
    #     400,
    #     [{'message': 'An error occurred'}],
    #     correlation_id
    # )
