import ExperiencePreview from './experience-preview'

export default function ExperienceList({ experiences }) {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {experiences.map((experience) => (
          <ExperiencePreview
            key={experience.slug}
            title={experience.jobTitle}
            endDate={experience.endDate}
            startDate={experience.startDate}
            company={experience.company}
            slug={experience.slug}
            excerpt={experience.excerpt}
          />
        ))}
      </div>
    </section>
  )
}
