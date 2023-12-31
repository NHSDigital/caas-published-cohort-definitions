"""
See
https://github.com/NHSDigital/pytest-nhsd-apim/blob/main/tests/test_examples.py
for more ideas on how to test the authorization of your API.
"""
import requests
import pytest
from lib import Assertions
from lib.constants import CORRELATION_IDS, METHODS

FORBIDDEN_TOKEN = {
    "Authorization": "Bearer ClientNotRecognised"
}


@pytest.mark.functionaltest
@pytest.mark.parametrize("correlation_id", CORRELATION_IDS)
@pytest.mark.parametrize("method", METHODS)
def test_403_forbidden(nhsd_apim_proxy_url, correlation_id, method):
    error_response = getattr(requests, method)(f"{nhsd_apim_proxy_url}", headers={
        **FORBIDDEN_TOKEN,
        "X-Correlation-Id": correlation_id
    })

    Assertions.assert_error_with_optional_correlation_id(
        error_response,
        403,
        None,
        correlation_id
    )
