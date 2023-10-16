"""
See
https://github.com/NHSDigital/pytest-nhsd-apim/blob/main/tests/test_examples.py
for more ideas on how to test the authorization of your API.
"""
import requests
import pytest
from lib import Assertions
from lib.constants import SANDBOX_URL, METHODS

FORBIDDEN_TOKEN = {
    "Authorization": "Bearer ClientNotRecognised"
}


@pytest.mark.skip(reason="Sandbox tests are intermittently failing with 503 error")
@pytest.mark.parametrize("method", METHODS)
def test_403_forbidden(method):
    error_response = getattr(requests, method)(f"{SANDBOX_URL}"),

    Assertions.assert_error(
        error_response,
        403,
        None,
    )
