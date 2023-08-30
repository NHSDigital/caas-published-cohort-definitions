import os


class Generators():

    @staticmethod
    def generate_target_server_headers(correlation_id):
        return {
            "Content-Type": "application/json",
            "x-api-key": os.environ.get("INTEGRATION_API_KEY"),
            "X-Correlation-ID": correlation_id,
            "X-Request-ID": "b452ba10-6783-449d-b23e-da146ea27140",
        }
