"""
See
https://github.com/NHSDigital/pytest-nhsd-apim/blob/main/tests/test_examples.py
for more ideas on how to test the authorization of your API.
"""
import requests
import pytest
from os import getenv
from lib import Generators


@pytest.mark.smoketest
def test_ping(nhsd_apim_proxy_url):
    resp = requests.get(f"{nhsd_apim_proxy_url}/_ping")
    assert resp.status_code == 200


@pytest.mark.smoketest
def test_wait_for_ping(nhsd_apim_proxy_url):
    retries = 0
    resp = requests.get(f"{nhsd_apim_proxy_url}/_ping")
    deployed_commitId = resp.json().get("commitId")

    while (
        deployed_commitId != getenv("SOURCE_COMMIT_ID")
        and retries <= 30
        and resp.status_code == 200
    ):
        resp = requests.get(f"{nhsd_apim_proxy_url}/_ping")
        deployed_commitId = resp.json().get("commitId")
        retries += 1

    if resp.status_code != 200:
        pytest.fail(f"Status code {resp.status_code}, expecting 200")
    elif retries >= 30:
        pytest.fail("Timeout Error - max retries")

    assert deployed_commitId == getenv("SOURCE_COMMIT_ID")


@pytest.mark.smoketest
def test_status(nhsd_apim_proxy_url, status_endpoint_auth_headers):
    resp = requests.get(
        f"{nhsd_apim_proxy_url}/_status", headers=status_endpoint_auth_headers
    )
    assert resp.status_code == 200
    # Make some additional assertions about your status response here!


@pytest.mark.smoketest
def test_wait_for_status(nhsd_apim_proxy_url, status_endpoint_auth_headers):
    retries = 0
    resp = requests.get(
        f"{nhsd_apim_proxy_url}/_status", headers=status_endpoint_auth_headers
    )
    deployed_commitId = resp.json().get("commitId")

    while (
        deployed_commitId != getenv("SOURCE_COMMIT_ID")
        and retries <= 30
        and resp.status_code == 200
        and resp.json().get("version")
    ):
        resp = requests.get(
            f"{nhsd_apim_proxy_url}/_status", headers=status_endpoint_auth_headers
        )
        deployed_commitId = resp.json().get("commitId")
        retries += 1

    if resp.status_code != 200:
        pytest.fail(f"Status code {resp.status_code}, expecting 200")
    elif retries >= 30:
        pytest.fail("Timeout Error - max retries")
    elif not resp.json().get("version"):
        pytest.fail("version not found")

    assert deployed_commitId == getenv("SOURCE_COMMIT_ID")


@pytest.mark.smoketest
def test_for_connection_status(nhsd_apim_proxy_url):

    request_body = {
        "query": (
            "query PublishedCohortLibraryGetAll { PublishedCohortLibraryGetAll "
            "{ authors,"
            "clinicalAtRiskGroupsText,"
            "id,"
            "commissioner,"
            "demographicsText,"
            "description,"
            "disclaimerText,"
            "fixedDateReference,"
            "name,"
            "purpose,"
            "shortName,"
            "urlSlug,"
            "summary } }"
        )
    }

    resp = requests.post(
        f"{nhsd_apim_proxy_url}/api",
        headers=Generators.generate_target_server_headers("df728790-43d9-4e90-ad34-b3c8268a6674"), json=request_body
    )
    assert resp.status_code == 200


@pytest.mark.smoketest
def test_for_response_headers(nhsd_apim_proxy_url):

    request_body = {
        "query": (
            "query PublishedCohortLibraryGetAll { PublishedCohortLibraryGetAll "
            "{ authors,"
            "clinicalAtRiskGroupsText,"
            "id,"
            "commissioner,"
            "demographicsText,"
            "description,"
            "disclaimerText,"
            "fixedDateReference,"
            "name,"
            "purpose,"
            "shortName,"
            "urlSlug,"
            "summary } }"
        )
    }

    resp = requests.post(
        f"{nhsd_apim_proxy_url}/api",
        headers=Generators.generate_target_server_headers("df728790-43d9-4e90-ad34-b3c8268a6674"), json=request_body
    )

    assert (
        "X-Correlation-ID" in resp.headers
    ), "Header 'X-Correlation-ID' not found in response"
    assert "X-Request-ID" in resp.headers, "Header 'X-Request-ID' not found in response"

    assert (
        resp.headers["X-Correlation-ID"] == "df728790-43d9-4e90-ad34-b3c8268a6674"
    ), "Unexpected value for 'X-Correlation-ID'"
    assert (
        resp.headers["X-Request-ID"] == "b452ba10-6783-449d-b23e-da146ea27140"
    ), "Unexpected value for 'X-Request-ID'"
