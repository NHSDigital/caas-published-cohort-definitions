
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
    def assert_error(resp, code, error):
        assert resp.status_code == code

        if error is not None:
            # ensure that all errors contain an identifier
            response_errors = resp.json().get("errors")
            assert error == response_errors
