import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface StudyPoint {
  number: number
  text: string
  category: string
}

const studyPoints: StudyPoint[] = [
  // Sleep Physiology & Hormones
  {
    number: 1,
    text: "Growth hormone surge occurs predominantly during early slow-wave sleep (Stage N3)",
    category: "sleep",
  },
  {
    number: 2,
    text: "Cortisol nadir occurs during early non-REM sleep, then rises through the night, peaking before awakening",
    category: "sleep",
  },
  {
    number: 3,
    text: "REM sleep onset latency is approximately 90 minutes after sleep onset in normal architecture",
    category: "sleep",
  },
  {
    number: 4,
    text: "Normal sleep latency for healthy adults is 15-20 minutes; longer suggests insomnia",
    category: "sleep",
  },
  {
    number: 5,
    text: "REM rebound occurs after stimulant cessation (except modafinil), reflecting homeostatic pressure",
    category: "sleep",
  },
  { number: 6, text: "Testosterone peak occurs during mid-sleep hours", category: "sleep" },
  { number: 7, text: "Melatonin secretion begins at darkness onset to facilitate sleep", category: "sleep" },

  // EEG Rhythms & Clinical Correlates
  {
    number: 8,
    text: "Alpha rhythm (8-13 Hz) is the dominant rhythm when eyes are closed and patient is relaxed",
    category: "eeg",
  },
  {
    number: 9,
    text: "Beta activity (>13 Hz) is promoted by benzodiazepines and represents fast activity",
    category: "eeg",
  },
  { number: 10, text: "Delta waves (<4 Hz) characterize deep sleep stages in adults", category: "eeg" },
  { number: 11, text: "3 Hz spike-and-wave complexes are pathognomonic for absence seizures", category: "eeg" },
  {
    number: 12,
    text: "Periodic sharp-wave complexes (1 Hz) are classic EEG findings in Creutzfeldt-Jakob disease",
    category: "eeg",
  },
  { number: 13, text: "Theta waves (4-7.5 Hz) occur in drowsiness and light sleep", category: "eeg" },
  {
    number: 14,
    text: "Mu rhythm (8-12 Hz) occurs over sensorimotor cortex and is blocked by movement",
    category: "eeg",
  },
  { number: 15, text: "Triphasic waves (1.5-3 Hz) are seen in hepatic encephalopathy", category: "eeg" },

  // Membrane Potentials & Ion Distribution
  {
    number: 16,
    text: "Intracellular K⁺ is highest at rest - potassium concentration is greater inside than outside the cell",
    category: "membrane",
  },
  { number: 17, text: "Resting potential of neurons is approximately -70 mV", category: "membrane" },
  { number: 18, text: "Action potential threshold is approximately -55 mV", category: "membrane" },
  {
    number: 19,
    text: "Depolarization is caused by Na⁺ influx through voltage-gated sodium channels",
    category: "membrane",
  },
  {
    number: 20,
    text: "Hyperpolarization occurs via Cl⁻ influx making the membrane more negative",
    category: "membrane",
  },
  { number: 21, text: "Repolarization occurs via K⁺ efflux to restore resting potential", category: "membrane" },
  {
    number: 22,
    text: "Na⁺/K⁺ ATPase maintains gradients by exporting 3 Na⁺ and importing 2 K⁺ using ATP",
    category: "membrane",
  },

  // Neurotransmitter Systems
  { number: 23, text: "Glutamate is the primary excitatory amino acid in the CNS", category: "neurotransmitter" },
  { number: 24, text: "GABA is the major inhibitory neurotransmitter in the brain", category: "neurotransmitter" },
  { number: 25, text: "Tryptophan is the amino acid precursor of serotonin (5-HT)", category: "neurotransmitter" },
  {
    number: 26,
    text: "Tyrosine hydroxylase is the rate-limiting enzyme in dopamine synthesis",
    category: "neurotransmitter",
  },
  {
    number: 27,
    text: "Choline acetyltransferase synthesizes acetylcholine from choline and acetyl-CoA",
    category: "neurotransmitter",
  },
  {
    number: 28,
    text: "Monoamine oxidase degrades serotonin and catecholamines (dopamine, norepinephrine)",
    category: "neurotransmitter",
  },
  {
    number: 29,
    text: "NMDA receptor activation is essential for long-term potentiation (LTP)",
    category: "neurotransmitter",
  },
  {
    number: 30,
    text: "Nicotinic receptors are stimulated by nicotine and mediate fast cholinergic transmission",
    category: "neurotransmitter",
  },

  // Hypothalamic-Pituitary Axis
  {
    number: 31,
    text: "CRH (Corticotropin-releasing hormone) from hypothalamus stimulates pituitary ACTH secretion",
    category: "hormones",
  },
  { number: 32, text: "ACTH stimulates cortisol release from the adrenal cortex", category: "hormones" },
  {
    number: 33,
    text: "Dexamethasone suppresses ACTH in healthy individuals via negative feedback",
    category: "hormones",
  },
  {
    number: 34,
    text: "PTSD is paradoxically associated with low cortisol levels due to altered HPA feedback",
    category: "hormones",
  },
  { number: 35, text: "Depression (especially melancholic) often shows high cortisol levels", category: "hormones" },
  { number: 36, text: "Growth hormone peaks during slow-wave (Stage N3) sleep", category: "hormones" },
  { number: 37, text: "Prolactin increases during slow-wave sleep", category: "hormones" },

  // Circadian & Sleep Regulators
  {
    number: 38,
    text: "Suprachiasmatic nucleus (SCN) is the master circadian pacemaker in the hypothalamus",
    category: "circadian",
  },
  {
    number: 39,
    text: "Melatonin is secreted by the pineal gland and rises at dusk to facilitate sleep onset",
    category: "circadian",
  },
  { number: 40, text: "Orexin neurons stabilize wakefulness; their loss causes narcolepsy", category: "circadian" },
  {
    number: 41,
    text: "VLPO GABA neurons (ventrolateral preoptic nucleus) actively promote sleep",
    category: "circadian",
  },
  { number: 42, text: "Serotonin & norepinephrine inhibit orexin neurons", category: "circadian" },
  { number: 43, text: "Acetylcholine peaks during REM sleep", category: "circadian" },
  { number: 44, text: "Histamine levels are highest during Stage 2 NREM sleep", category: "circadian" },
  { number: 45, text: "Dopamine promotes arousal and wakefulness", category: "circadian" },

  // Drug Effects on EEG & Sleep
  { number: 46, text: "Benzodiazepines increase beta activity (>13 Hz) on EEG", category: "drugs" },
  { number: 47, text: "Antipsychotics decrease beta and increase slow waves on EEG", category: "drugs" },
  { number: 48, text: "Benzodiazepines reduce REM latency (increase time to first REM episode)", category: "drugs" },
  { number: 49, text: "Benzodiazepines reduce Stage 1 sleep (light sleep)", category: "drugs" },
  { number: 50, text: "Benzodiazepines reduce slow-wave sleep (Stage N3)", category: "drugs" },
  { number: 51, text: "Benzodiazepines increase Stage 2 sleep (maintenance sleep)", category: "drugs" },
  { number: 52, text: "Stimulant withdrawal (methylphenidate) causes REM rebound", category: "drugs" },

  // Neuroanatomical Correlates
  {
    number: 53,
    text: "Postcentral gyrus contains primary somatosensory cortex (Brodmann areas 3,1,2)",
    category: "anatomy",
  },
  { number: 54, text: "Precentral gyrus contains primary motor cortex", category: "anatomy" },
  {
    number: 55,
    text: "Orbitofrontal cortex lesions cause social disinhibition and forced utilization behavior",
    category: "anatomy",
  },
  { number: 56, text: "Ventromedial hypothalamus regulates satiety", category: "anatomy" },
  {
    number: 57,
    text: "Angular gyrus lesions cause acalculia and finger agnosia (Gerstmann syndrome)",
    category: "anatomy",
  },
  { number: 58, text: "Fusiform gyrus is specialized for face recognition", category: "anatomy" },
  {
    number: 59,
    text: "Nucleus basalis of Meynert provides cholinergic projections to cortex and hippocampus",
    category: "anatomy",
  },
  {
    number: 60,
    text: "Entorhinal cortex shows early amyloid/tangle pathology in Alzheimer's disease",
    category: "anatomy",
  },

  // Neuroendocrine Control & Sleep Disorders
  { number: 61, text: "Hypocretin (orexin) deficiency underlies narcolepsy with cataplexy", category: "hormones" },
  { number: 62, text: "Hypercortisolemia is associated with psychotic/melancholic depression", category: "hormones" },
  { number: 63, text: "Low cortisol shortly after trauma predicts PTSD vulnerability", category: "hormones" },
  { number: 64, text: "Elevated ACTH & CRH are seen in major depression", category: "hormones" },
  { number: 65, text: "α2-adrenergic receptors show elevation (upregulation) post-ECT", category: "hormones" },

  // Basal Ganglia & Movement Disorders
  {
    number: 66,
    text: "Substantia nigra degeneration causes dopamine loss leading to Parkinson's disease",
    category: "anatomy",
  },
  {
    number: 67,
    text: "Subthalamic nucleus lesion causes hemiballismus (violent flinging movements)",
    category: "anatomy",
  },
  {
    number: 68,
    text: "Caudate atrophy is characteristic of Huntington's disease and causes chorea",
    category: "anatomy",
  },
  {
    number: 69,
    text: "Lentiform nucleus dysfunction (putamen-globus pallidus) is implicated in OCD circuits",
    category: "anatomy",
  },
  { number: 70, text: "Dopamine loss causes resting tremor, bradykinesia, and rigidity", category: "anatomy" },
  {
    number: 71,
    text: "rTMS (repetitive transcranial magnetic stimulation) can improve dystonic symptoms",
    category: "anatomy",
  },

  // Neurodegenerative Pathology
  {
    number: 72,
    text: "Neurofibrillary tangles of hyperphosphorylated tau are seen in Alzheimer's and other tauopathies",
    category: "anatomy",
  },
  { number: 73, text: "Extracellular amyloid plaques are hallmarks of Alzheimer's disease", category: "anatomy" },
  {
    number: 74,
    text: "Lewy bodies rich in α-synuclein are found in Parkinson's and Lewy body dementia",
    category: "anatomy",
  },
  {
    number: 75,
    text: "Pick bodies are tau-positive inclusions in frontotemporal lobar degeneration",
    category: "anatomy",
  },
  {
    number: 76,
    text: "Hirano bodies are rod-shaped actin inclusions found in Alzheimer's dementia",
    category: "anatomy",
  },
  {
    number: 77,
    text: "Spongiform vacuolation of neuropil is characteristic of prion diseases (CJD)",
    category: "anatomy",
  },
  {
    number: 78,
    text: "Rosenthal fibers are astrocytic, eosinophilic inclusions in Alexander disease",
    category: "anatomy",
  },
  { number: 79, text: "Ballooned (Pick) neurons are seen in frontotemporal dementia", category: "anatomy" },

  // Neurotransmitter Pathways & Disorders
  {
    number: 80,
    text: "Tuberoinfundibular DA pathway controls prolactin; blockade causes hyperprolactinemia",
    category: "neurotransmitter",
  },
  {
    number: 81,
    text: "Mesolimbic DA pathway is implicated in reward and positive symptoms of psychosis",
    category: "neurotransmitter",
  },
  { number: 82, text: "Mesocortical DA pathway regulates executive function", category: "neurotransmitter" },
  {
    number: 83,
    text: "Nigrostriatal DA pathway regulates movement; disruption causes parkinsonian side effects",
    category: "neurotransmitter",
  },
  { number: 84, text: "Locus coeruleus NE pathway regulates arousal and attention", category: "neurotransmitter" },
  {
    number: 85,
    text: "Raphe serotonin pathway projects to cortex and influences mood and sleep",
    category: "neurotransmitter",
  },
  {
    number: 86,
    text: "Nucleus basalis ACh pathway provides cortical activation affecting attention and memory",
    category: "neurotransmitter",
  },
  { number: 87, text: "Hypothalamic GABA pathway induces sleep", category: "neurotransmitter" },

  // Neurodevelopment & Embryology
  {
    number: 88,
    text: "Telencephalon gives rise to cerebral hemispheres (cortex and basal ganglia)",
    category: "anatomy",
  },
  { number: 89, text: "Diencephalon becomes the thalamus and hypothalamus", category: "anatomy" },
  { number: 90, text: "Mesencephalon develops into midbrain structures", category: "anatomy" },
  { number: 91, text: "Metencephalon forms the pons and cerebellum", category: "anatomy" },
  { number: 92, text: "Myelencephalon becomes the medulla oblongata", category: "anatomy" },
  { number: 93, text: "Neural crest gives rise to peripheral neurons and glia", category: "anatomy" },
  { number: 94, text: "Neural tube forms CNS neurons and glia", category: "anatomy" },
  {
    number: 95,
    text: "Cavum septum pellucidum is a midline variant separating lateral ventricles",
    category: "anatomy",
  },

  // Cerebellar Function & Lesions
  {
    number: 96,
    text: "Dysdiadochokinesia is impaired rapid alternating movements (pronate-supinate)",
    category: "anatomy",
  },
  { number: 97, text: "Dysmetria causes overshoot/undershoot on finger-nose-finger testing", category: "anatomy" },
  { number: 98, text: "Intention tremor is oscillation during movement, worsening near target", category: "anatomy" },
  { number: 99, text: "Truncal ataxia causes wide-based gait due to vermis damage", category: "anatomy" },
  {
    number: 100,
    text: "Pendular reflexes show slow, oscillatory deep tendon reflexes in cerebellar lesions",
    category: "anatomy",
  },
]

const sections = [
  { title: "Sleep Physiology & Hormones", category: "sleep", color: "border-l-blue-600" },
  { title: "EEG Rhythms & Clinical Correlates", category: "eeg", color: "border-l-green-500" },
  { title: "Membrane Potentials & Ion Distribution", category: "membrane", color: "border-l-red-500" },
  { title: "Neurotransmitter Systems", category: "neurotransmitter", color: "border-l-orange-500" },
  { title: "Hypothalamic-Pituitary Axis", category: "hormones", color: "border-l-emerald-400" },
  { title: "Circadian & Sleep Regulators", category: "circadian", color: "border-l-purple-500" },
  { title: "Drug Effects on EEG & Sleep", category: "drugs", color: "border-l-red-600" },
  { title: "Neuroanatomical Correlates", category: "anatomy", color: "border-l-gray-700" },
]

export default function NeurologySection1() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 p-5">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white p-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-lg">
            Dr. Nonso's High-Yield Neurology Points
          </h1>
          <p className="text-xl mb-3 opacity-90">The Complete Doctor Academy - Revision Essentials</p>
          <div className="inline-flex items-center bg-red-500 text-white px-6 py-3 rounded-full font-bold text-lg">
            Section 1: Points 1-100
            <Badge className="ml-3 bg-cyan-400 text-white hover:bg-cyan-500">FREE</Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {sections.map((section) => {
            const sectionPoints = studyPoints.filter((point) => point.category === section.category)

            return (
              <div key={section.category} className="mb-12">
                <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 rounded-2xl text-center mb-6 shadow-lg">
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {sectionPoints.map((point) => (
                    <Card
                      key={point.number}
                      className={`border-l-4 ${section.color} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-800 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {point.number}
                          </div>
                          <div className="text-sm leading-relaxed text-gray-700">
                            <span
                              dangerouslySetInnerHTML={{
                                __html: point.text.replace(
                                  /\*\*(.*?)\*\*/g,
                                  '<strong class="text-blue-800">$1</strong>',
                                ),
                              }}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="bg-gray-800 text-white p-6 text-center">
          <p className="font-bold mb-1">The Complete Doctor Academy - Where Simplicity meets Excellence</p>
          <p className="text-sm mb-2">By Dr. Chinonso Stanley Ezeanyika | Section 1: Points 1-100 (FREE)</p>
          <p className="text-sm">🎓 Next: Section 2 (Points 101-200) & Section 3 (Points 201-300) - Premium Content</p>
        </div>
      </div>
    </div>
  )
}
