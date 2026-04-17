import FeatureSection from './FeatureSection'
import { FEATURES } from '@/lib/features'

export default function FeaturesGrid() {
  return (
    <>
      {FEATURES.map((f) => (
        <FeatureSection key={f.id} {...f} />
      ))}
    </>
  )
}
