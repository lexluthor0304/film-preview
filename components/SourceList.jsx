export default function SourceList({ sources, title = "Sources and further reading" }) {
  if (!sources?.length) {
    return null;
  }

  return (
    <section>
      <h2>{title}</h2>
      <ul>
        {sources.map((source) => (
          <li key={source.url}>
            <a href={source.url} rel="noopener noreferrer">
              {source.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
