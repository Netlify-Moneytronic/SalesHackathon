import Company from './company'
import DateComponent from './date'
import ExperienceTitle from './experience-title'

export default function ExperienceHeader({ title, startDate, endDate, company }) {
  return (
    <>
      <ExperienceTitle>{title}</ExperienceTitle>
      <div className="max-w-2xl mx-auto">
        <div className="hidden md:block md:mb-12">
          {company && <Company name={company.name} picture={company.logo} />}
        </div>
        <div className="mb-6 text-lg">
          <DateComponent startDateString={startDate} endDateString={endDate} />
        </div>
      </div>
    </>
  )
}
