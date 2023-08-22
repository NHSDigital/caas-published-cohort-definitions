"""
The functions from this file will be useful once CAAS-1623 has been implemented
"""
import uuid
from .constants import *


class Generators():

    @staticmethod
    def generate_target_server_headers(correlation_id):
        return {
            "Content-Type": "application/json",
            "x-api-key": "lVlQRHlM4M111q8fnmLBe201HAWMNQJH16SU8Q4C",
            "X-Correlation-ID": correlation_id,
            "X-Request-ID": "b452ba10-6783-449d-b23e-da146ea27140",
        }

    @staticmethod
    def generate_invalid_value_error(pointer):
        return Generators.generate_error(ERROR_INVALID_VALUE, source={
            "pointer": pointer
        })

    @staticmethod
    def generate_missing_value_error(pointer):
        return Generators.generate_error(ERROR_MISSING_VALUE, source={
            "pointer": pointer
        })

    @staticmethod
    def generate_null_value_error(pointer):
        return Generators.generate_error(ERROR_NULL_VALUE, source={
            "pointer": pointer
        })

    @staticmethod
    def generate_duplicate_value_error(pointer):
        return Generators.generate_error(ERROR_DUPLICATE_VALUE, source={
            "pointer": pointer
        })

    @staticmethod
    def generate_too_few_items_error(pointer):
        return Generators.generate_error(ERROR_TOO_FEW_ITEMS, source={
            "pointer": pointer
        })

    @staticmethod
    def generate_access_denied_error():
        return Generators.generate_error(ERROR_ACCESS_DENIED, source={
            "header": "Authorization"
        })

    @staticmethod
    def generate_forbidden_error():
        return Generators.generate_error(ERROR_FORBIDDEN, source={
            "header": "Authorization"
        })

    @staticmethod
    def generate_not_acceptable_error():
        return Generators.generate_error(ERROR_NOT_ACCEPTABLE, source={
            "header": "Accept"
        })

    @staticmethod
    def generate_unsupported_media_error():
        return Generators.generate_error(ERROR_UNSUPPORTED_MEDIA, source={
            "header": "Content-Type"
        })

    @staticmethod
    def generate_no_such_routing_plan_error():
        return Generators.generate_error(ERROR_NO_SUCH_ROUTING_PLAN, source={
            "pointer": "/data/attributes/routingPlanId"
        })

    @staticmethod
    def generate_missing_routing_plan_template_error():
        return Generators.generate_error(ERROR_MISSING_ROUTING_PLAN_TEMPLATE, source={
            "pointer": "/data/attributes/routingPlanId"
        })

    @staticmethod
    def generate_not_found_error():
        return Generators.generate_error(ERROR_NOT_FOUND)

    @staticmethod
    def generate_quota_error():
        return Generators.generate_error(ERROR_QUOTA)

    @staticmethod
    def generate_request_timeout_error():
        return Generators.generate_error(ERROR_REQUEST_TIMEOUT)

    @staticmethod
    def generate_service_timeout_error():
        return Generators.generate_error(ERROR_SERVICE_TIMEOUT)

    @staticmethod
    def generate_error(error, source=None, meta=None):
        ret = {
            "code": error.code,
            "links": error.links,
            "status": error.status,
            "title": error.title,
            "detail": error.detail
        }

        if source:
            ret["source"] = source

        if meta:
            ret["meta"] = meta
        return ret
