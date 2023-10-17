"""
See
https://github.com/NHSDigital/pytest-nhsd-apim/blob/main/tests/test_examples.py
for more ideas on how to test the authorization of your API.
"""
import requests
import pytest
import os
from lib import Assertions, Generators
from lib.constants import CORRELATION_IDS
from lib.api_helpers import published_cohort_library_get_all_request_body

SANDBOX_URL = os.environ.get("SANDBOX_URL")


@pytest.mark.skip(reason="Sandbox tests are intermittently failing with 503 error")
@pytest.mark.parametrize("correlation_id", CORRELATION_IDS)
def test_404_not_found(correlation_id):
    error_response = requests.post(
        f"{SANDBOX_URL}/invalidurl",
        headers=Generators.generate_target_server_headers(correlation_id),
        json=published_cohort_library_get_all_request_body
    )

    Assertions.assert_error_with_optional_correlation_id(
        error_response,
        404,
        None,
        correlation_id
    )
