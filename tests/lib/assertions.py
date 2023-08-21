from .constants import *


class Assertions():
    @staticmethod
    def assert_error_with_optional_correlation_id(resp, code, error, correlation_id):
        assert resp.status_code == code

        if error is not None:
            # ensure that all errors contain an identifier
            response_errors = resp.json().get("errors")
            assert error == response_errors

        assert resp.headers.get("X-Correlation-Id") == correlation_id

    @staticmethod
    def assert_cors_response(resp, website):
        assert resp.status_code == 200
        assert resp.headers.get("Access-Control-Allow-Origin") == website
        assert resp.headers.get("Access-Control-Allow-Methods") == CORS_METHODS
        assert resp.headers.get("Access-Control-Max-Age") == CORS_MAX_AGE
        assert resp.headers.get("Access-Control-Allow-Headers") == CORS_ALLOW_HEADERS

    @staticmethod
    def assert_cors_headers(resp, website):
        assert resp.headers.get("Access-Control-Allow-Origin") == website
        assert resp.headers.get("Access-Control-Expose-Headers") == CORS_EXPOSE_HEADERS
