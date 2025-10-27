import { getDictionary } from "@/contenti18n/get-dictionary";
import { projects } from "@/data/projects";
import { Locale } from "@/types";

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ locale: Locale; id: string }>;
}) {
  //  Esperamos la promesa
  const { locale, id } = await params;

  const t = await getDictionary(locale, "projects");

  const project = projects.find((p) => p.id === id);

  if (!project) return <p>{t.empty}</p>;

  return (
    <main style={{ padding: "2rem" }}>
      <h2>{project.title[locale]}</h2>
      <p style={{ margin: "1rem 0" }}>{project.description[locale]}</p>

      <p>
        <strong>{t.tech}:</strong> {project.tech.join(", ")}
      </p>

      <div style={{ marginTop: "1rem" }}>
        {project.repo && (
          <a href={project.repo} target="_blank" rel="noopener noreferrer">
            {t.repo}
          </a>
        )}
        {project.repo && project.live && " | "}
        {project.live && (
          <a href={project.live} target="_blank" rel="noopener noreferrer">
            {t.live}
          </a>
        )}
      </div>

      <a
        href={`/${locale}/projects`}
        style={{ display: "block", marginTop: "2rem" }}
      >
        ⬅ {t.back}
      </a>
    </main>
  );
}
