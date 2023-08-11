# """
# See
# https://github.com/NHSDigital/pytest-nhsd-apim/blob/main/tests/test_examples.py
# for more ideas on how to test the authorization of your API.
# """
# import requests
# import pytest
# from lib import Assertions
# from lib.constants import CORRELATION_IDS, TOKENS, METHODS, INT_URL

# # unable to generate 401 error needs further investigation


# @pytest.mark.functionaltest
# @pytest.mark.parametrize('invalid_token', TOKENS)
# @pytest.mark.parametrize("correlation_id", CORRELATION_IDS)
# @pytest.mark.parametrize("method", METHODS)
# def test_401_invalid(invalid_token, method, correlation_id):
#     resp = getattr(requests, method)(INT_URL, headers={
#         "Authorization": invalid_token,
#         "X-Correlation-Id": correlation_id
#     })

#     Assertions.assert_error_with_optional_correlation_id(
#         resp,
#         401,
#         correlation_id
#     )
