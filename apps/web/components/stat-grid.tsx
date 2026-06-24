type Stat = {
  label: string;
  value: string;
  detail: string;
};

export function StatGrid({ stats }: { stats: Stat[] }) {
  return (
    <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <article key={stat.label} className="rounded-md border border-line bg-white p-4">
          <p className="text-sm font-medium text-zinc-500">{stat.label}</p>
          <p className="mt-2 text-2xl font-semibold">{stat.value}</p>
          <p className="mt-1 text-sm text-zinc-600">{stat.detail}</p>
        </article>
      ))}
    </section>
  );
}
