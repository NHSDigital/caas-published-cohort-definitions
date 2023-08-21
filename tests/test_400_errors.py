"""
See
https://github.com/NHSDigital/pytest-nhsd-apim/blob/main/tests/test_examples.py
for more ideas on how to test the authorization of your API.
"""
import requests
import pytest
from lib import Assertions
from lib.constants import CORRELATION_IDS


@pytest.mark.functionaltest
@pytest.mark.parametrize("correlation_id", CORRELATION_IDS)
def test_data_invalid(nhsd_apim_proxy_url, correlation_id):
    target_server_headers = {
        "Content-Type": "application/json",
        "x-api-key": "lVlQRHlM4M111q8fnmLBe201HAWMNQJH16SU8Q4C",
        "X-Correlation-ID": correlation_id,
        "X-Request-ID": "b452ba10-6783-449d-b23e-da146ea27140",
    }

    request_body = {
        "query": (
            "query PublishedCohortLibraryGetBySlugName(urlSlug: $urlSlug) {"
            "... on Cohort {"
            "summary} }"
        )
    }

    resp = requests.post(
        f"{nhsd_apim_proxy_url}/api", headers=target_server_headers, json=request_body
    )

    Assertions.assert_error_with_optional_correlation_id(
        resp,
        400,
        [{'message': 'An error occurred'}],
        correlation_id
    )
