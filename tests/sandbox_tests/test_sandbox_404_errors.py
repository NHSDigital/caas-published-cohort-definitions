# """
# See
# https://github.com/NHSDigital/pytest-nhsd-apim/blob/main/tests/test_examples.py
# for more ideas on how to test the authorization of your API.
# """
# import requests
# import pytest
# from lib.constants import METHODS, SANDBOX_URL


# @pytest.mark.functionaltest
# @pytest.mark.parametrize("method", METHODS)
# def test_404_not_found(method):
#     error_response = getattr(requests, method)(
#         f"{SANDBOX_URL}/invalidurl",
#     )

#     # Assertions.assert_error_with_optional_correlation_id(
#     #     error_response,
#     #     404,
#     #     None
# )
