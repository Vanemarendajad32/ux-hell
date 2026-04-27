set -eu

PASS_FILE="/etc/prometheus/secrets/prometheus_basic_auth_password"

if [ -z "${PROMETHEUS_BASIC_AUTH_PASSWORD:-}" ]; then
  echo "PROMETHEUS_BASIC_AUTH_PASSWORD is not set" >&2
  exit 1
fi

mkdir -p "$(dirname "$PASS_FILE")"
umask 077
printf "%s" "$PROMETHEUS_BASIC_AUTH_PASSWORD" > "$PASS_FILE"

exec /bin/prometheus \
  --config.file=/etc/prometheus/prometheus.yml \
  --storage.tsdb.path=/prometheus \
  --web.enable-lifecycle

