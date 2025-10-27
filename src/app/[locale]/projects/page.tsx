import styles from "./Projects.module.css";
import { projects } from "@/data/projects";
import { getDictionary } from "@/contenti18n/get-dictionary";
import { Locale } from "@/types";

// Correct type with Promise for params
export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  //  Wait for the promise to resolve
  const { locale } = await params;

  //  Load translations for Projects section
  const t = await getDictionary(locale, "projects");

  return (
    <section className={styles.container}>
      {/* Must exist in dictionary: "projectsTitle" */}
      <h2 className={styles.title}>{t.projectsTitle}</h2>

      {/* Loop through portfolio projects */}
      <div className={styles.grid}>
        {projects.map((project) => (
          <a
            key={project.id}
            href={`/${locale}/projects/${project.id}`} // Dynamic slug
            className={styles.card}
          >
            {/* Title based on current locale */}
            <h3>{project.title[locale]}</h3>

            {/* Description based on current locale */}
            <p>{project.description[locale]}</p>

            {/* Tech label translated */}
            <p className={styles.tech}>
              {t.tech}: {project.tech.join(", ")}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
