"""
See
https://github.com/NHSDigital/pytest-nhsd-apim/blob/main/tests/test_examples.py
for more ideas on how to test the authorization of your API.
"""
import requests
import pytest
import os
from lib import Assertions
from lib.constants import METHODS

SANDBOX_URL = os.environ.get("SANDBOX_URL")


@pytest.mark.skip(reason="Sandbox tests are intermittently failing with 503 error")
@pytest.mark.parametrize("method", METHODS)
def test_404_not_found(method):
    error_response = getattr(requests, method)(f"{SANDBOX_URL}/invalidurl")

    Assertions.assert_error(
        error_response,
        404,
        None,
    )
