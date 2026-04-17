import { Fragment } from 'react'
import FeatureSection from './FeatureSection'
import FeatureDivider from './FeatureDivider'
import ChapterBreak from './ChapterBreak'
import { FEATURES } from '@/lib/features'

export default function FeaturesGrid() {
  return (
    <>
      {FEATURES.map((f, i) => (
        <Fragment key={f.id}>
          {i === 3 ? <ChapterBreak /> : i > 0 && <FeatureDivider />}
          <FeatureSection {...f} />
        </Fragment>
      ))}
    </>
  )
}
