FROM prom/prometheus:v3.2.1

COPY prometheus.yml /etc/prometheus/prometheus.yml
COPY prometheus-entrypoint.sh /prometheus-entrypoint.sh

ENTRYPOINT ["/bin/sh", "/prometheus-entrypoint.sh"]

