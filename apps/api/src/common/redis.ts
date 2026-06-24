import type { RedisOptions } from "ioredis";

export function redisConnectionFromUrl(rawUrl: string): RedisOptions {
  const url = new URL(rawUrl);
  const connection: RedisOptions = {
    host: url.hostname,
    port: url.port ? Number(url.port) : 6379
  };

  if (url.password) connection.password = url.password;

  return connection;
}
