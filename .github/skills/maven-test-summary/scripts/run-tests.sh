#!/usr/bin/env bash
set -euo pipefail
TEST="${1:-}"
MVN="mvn"; [ -x ./mvnw ] && MVN="./mvnw"
if [ -n "$TEST" ]; then "$MVN" -Dtest="$TEST" test; else "$MVN" test; fi
