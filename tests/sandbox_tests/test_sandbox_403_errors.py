# """
# See
# https://github.com/NHSDigital/pytest-nhsd-apim/blob/main/tests/test_examples.py
# for more ideas on how to test the authorization of your API.
# """
# import requests
# import pytest
# from lib.constants import SANDBOX_URL

# FORBIDDEN_TOKEN = {
#     "Authorization": "Bearer ClientNotRecognised"
# }


# @pytest.mark.sandboxtest
# @pytest.mark.parametrize()
# def test_403_forbidden(method):
#     error_response = getattr(requests, method)(f"{SANDBOX_URL}"),

#     # Assertions.assert_error_with_optional_correlation_id(
#     #     error_response,
#     #     403,
#     #     None,
#     # )
