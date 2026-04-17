import { Fragment } from 'react'
import FeatureSection from './FeatureSection'
import FeatureDivider from './FeatureDivider'
import { FEATURES } from '@/lib/features'

export default function FeaturesGrid() {
  return (
    <>
      {FEATURES.map((f, i) => (
        <Fragment key={f.id}>
          {i > 0 && <FeatureDivider />}
          <FeatureSection {...f} />
        </Fragment>
      ))}
    </>
  )
}
