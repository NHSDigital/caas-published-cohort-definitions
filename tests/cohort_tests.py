"""
See
https://github.com/NHSDigital/pytest-nhsd-apim/blob/main/tests/test_examples.py
for more ideas on how to test the authorization of your API.
"""
import requests
import pytest
from lib.constants import CORRELATION_IDS


@pytest.mark.functionaltest
@pytest.mark.nhsd_apim_authorization({"access": "application", "level": "level0"})
@pytest.mark.parametrize("correlation_id", CORRELATION_IDS)
def test_for_getall_query(nhsd_apim_proxy_url, correlation_id):
    target_server_headers = {
        "Content-Type": "application/json",
        "x-api-key": "lVlQRHlM4M111q8fnmLBe201HAWMNQJH16SU8Q4C",
        "X-Correlation-ID": correlation_id,
        "X-Request-ID": "b452ba10-6783-449d-b23e-da146ea27140",
    }

    request_body = {
        "query": (
            "query PublishedCohortLibraryGetAll { PublishedCohortLibraryGetAll "
            "{ authors, clinicalAtRiskGroupsText, id, name } }"
        )
    }

    resp = requests.post(
        f"{nhsd_apim_proxy_url}/api", headers=target_server_headers, json=request_body
    )

    assert resp.status_code == 200


@pytest.mark.functionaltest
@pytest.mark.parametrize("correlation_id", CORRELATION_IDS)
def test_for_urlslug_query(nhsd_apim_proxy_url, correlation_id):
    target_server_headers = {
        "Content-Type": "application/json",
        "x-api-key": "lVlQRHlM4M111q8fnmLBe201HAWMNQJH16SU8Q4C",
        "X-Correlation-ID": correlation_id,
        "X-Request-ID": "b452ba10-6783-449d-b23e-da146ea27140",
    }

    request_body = {
        "query": "query Cohort($urlSlug: String!) { PublishedCohortLibraryGetBySlugName(urlSlug: $urlSlug)"
        "{ ... on Cohort { urlSlug}}}",
        "variables": {
            "urlSlug": "covid-19-autumn-booster-vaccinations-2022-to-2023-v1"
        }
    }

    resp = requests.post(
        f"{nhsd_apim_proxy_url}/api", headers=target_server_headers, json=request_body
    )

    respJson = resp.json()
    assert respJson['data']['PublishedCohortLibraryGetBySlugName']['urlSlug'] == 'covid-19-autumn-booster-vaccinations-2022-to-2023-v1'
