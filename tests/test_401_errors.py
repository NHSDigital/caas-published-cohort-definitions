# """
# See
# https://github.com/NHSDigital/pytest-nhsd-apim/blob/main/tests/test_examples.py
# for more ideas on how to test the authorization of your API.
# """
# import requests
# import pytest
# from lib import Assertions
# from lib.constants import *

# # unable to generate 401 error needs further investigation


# @pytest.mark.functionaltest
# @pytest.mark.parametrize("correlation_id", CORRELATION_IDS)
# def test_401_invalid(invalid_token, method, correlation_id):
#     resp = getattr(requests, method)(INT_URL, headers={
#         "Authorization": 'test',
#         "X-Correlation-Id": correlation_id
#     })

#     print(resp.status_code, 'yyyyy')

# Assertions.assert_error_with_optional_correlation_id(
#     resp,
#     401,
#     [{'message': 'An error occurred'}],
#     correlation_id
# )

# @pytest.mark.functionaltest
# @pytest.mark.parametrize('invalid_token', TOKENS)
# @pytest.mark.parametrize("correlation_id", CORRELATION_IDS)
# @pytest.mark.parametrize("method", METHODS)
# def test_401_invalid(nhsd_apim_proxy_url, invalid_token, correlation_id, method):
#     resp = getattr(requests, method)(f"{nhsd_apim_proxy_url}", headers={
#         "Authorization": invalid_token,
#         "X-Correlation-Id": correlation_id
#     })

#     print(resp.status_code, 'yyyyy')

# Assertions.assert_error_with_optional_correlation_id(
#     resp,
#     401,
#     correlation_id
# )
