import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface StudyPoint {
  number: number
  text: string
  category: string
}

const studyPoints: StudyPoint[] = [
  // Spinal Cord Syndromes
  {
    number: 201,
    text: "Brown-Séquard syndrome causes ipsilateral motor loss with contralateral pain/temperature loss",
    category: "spinal",
  },
  {
    number: 202,
    text: "Tabes dorsalis involves dorsal column degeneration (syphilis-related)",
    category: "spinal",
  },
  {
    number: 203,
    text: "Anterior cord syndrome causes motor & pain loss while sparing vibration",
    category: "spinal",
  },
  {
    number: 204,
    text: "Central cord syndrome produces cape distribution pain/temperature loss",
    category: "spinal",
  },
  {
    number: 205,
    text: "Posterior cord lesion affects only proprioception and vibration",
    category: "spinal",
  },
  {
    number: 206,
    text: "Subacute combined degeneration (B12 deficiency) affects posterior columns + corticospinal tracts",
    category: "spinal",
  },
  {
    number: 207,
    text: "Syringomyelia causes central cavitation with junctional analgesia",
    category: "spinal",
  },
  {
    number: 208,
    text: "Cauda equina syndrome produces LMN signs with saddle anesthesia",
    category: "spinal",
  },

  // Neurodevelopmental Milestones
  { number: 209, text: "Social smile appears by 2 months of age", category: "development" },
  { number: 210, text: "Head control develops by 4 months when pulled to sit", category: "development" },
  { number: 211, text: "Sitting unsupported is achieved by 6 months", category: "development" },
  { number: 212, text: "Crawling typically begins by 9 months", category: "development" },
  { number: 213, text: 'First words ("mama," "dada") emerge by 12 months', category: "development" },
  { number: 214, text: "Walking independently occurs by 18 months", category: "development" },
  { number: 215, text: "Stranger anxiety develops around 8 months", category: "development" },
  { number: 216, text: "Pincer grasp (thumb-index finger) develops by 10 months", category: "development" },

  // Ischemic Stroke Syndromes
  {
    number: 217,
    text: "Middle cerebral artery stroke causes contralateral face/arm > leg weakness",
    category: "stroke",
  },
  {
    number: 218,
    text: "Anterior cerebral artery stroke causes contralateral leg > arm weakness",
    category: "stroke",
  },
  {
    number: 219,
    text: "Posterior cerebral artery stroke causes contralateral homonymous hemianopia",
    category: "stroke",
  },
  { number: 220, text: "Lacunar infarct of internal capsule causes pure motor hemiparesis", category: "stroke" },
  {
    number: 221,
    text: "Watershed zone infarcts cause proximal limb weakness and transcortical deficits",
    category: "stroke",
  },
  { number: 222, text: "Thalamic stroke produces hemisensory loss", category: "stroke" },
  { number: 223, text: "Cerebellar artery stroke causes ataxia and dysmetria", category: "stroke" },

  // Movement Disorders
  { number: 224, text: "Essential tremor is a benign action tremor with familial tendency", category: "movement" },
  { number: 225, text: "Cerebellar intention tremor worsens during dysmetric movements", category: "movement" },
  { number: 226, text: "Wilson's disease involves copper deposition in basal ganglia", category: "movement" },
  {
    number: 227,
    text: "Dystonia involves co-contraction of agonist and antagonist muscles",
    category: "movement",
  },
  { number: 228, text: "Chorea gravidarum is transient chorea during pregnancy", category: "movement" },
  { number: 229, text: "GABAergic striatal neuron loss underlies Huntington's chorea", category: "movement" },

  // Sleep Physiology & Disorders
  { number: 230, text: "REM sleep is characterized by atonia and vivid dreaming", category: "sleep-disorders" },
  { number: 231, text: "N1 sleep shows theta waves and is the lightest sleep stage", category: "sleep-disorders" },
  { number: 232, text: "N2 sleep is marked by sleep spindles and K-complexes", category: "sleep-disorders" },
  {
    number: 233,
    text: "N3 sleep shows slow-wave delta activity with growth hormone surge",
    category: "sleep-disorders",
  },
  { number: 234, text: "Sleep apnea causes hypoxia and daytime somnolence", category: "sleep-disorders" },
  { number: 235, text: "Restless legs syndrome involves periodic limb movements", category: "sleep-disorders" },

  // Dementia Subtypes
  { number: 236, text: "Vascular dementia shows stepwise decline with infarcts", category: "dementia" },
  { number: 237, text: "Lewy body dementia contains α-synuclein inclusions", category: "dementia" },
  {
    number: 238,
    text: "CJD (Creutzfeldt-Jakob) shows spongiform vacuolation and prion protein",
    category: "dementia",
  },
  { number: 239, text: "Wernicke-Korsakoff syndrome involves mammillary body hemorrhage", category: "dementia" },
  { number: 240, text: "Pick disease shows Pick bodies and ballooned neurons", category: "dementia" },
  { number: 241, text: "Binswanger's disease involves subcortical leukoencephalopathy", category: "dementia" },

  // Neuromuscular Disorders
  {
    number: 242,
    text: "Myasthenia gravis involves anti-AChR antibodies causing fatigable weakness",
    category: "neuromuscular",
  },
  {
    number: 243,
    text: "Lambert-Eaton syndrome involves presynaptic Ca²⁺ channel antibodies",
    category: "neuromuscular",
  },
  {
    number: 244,
    text: "Guillain-Barré syndrome is demyelinating peripheral polyneuropathy",
    category: "neuromuscular",
  },
  {
    number: 245,
    text: "Duchenne muscular dystrophy involves dystrophin deficiency and Gowers' sign",
    category: "neuromuscular",
  },
  { number: 246, text: "Polymyositis causes proximal inflammation with elevated CK", category: "neuromuscular" },
  { number: 247, text: "Botulism blocks presynaptic ACh release", category: "neuromuscular" },
  {
    number: 248,
    text: "Charcot-Marie-Tooth disease is hereditary motor-sensory neuropathy",
    category: "neuromuscular",
  },
  {
    number: 249,
    text: "Amyotrophic lateral sclerosis shows combined UMN and LMN signs",
    category: "neuromuscular",
  },

  // Neuroendocrine Axes
  {
    number: 250,
    text: "Cushing's syndrome shows high cortisol with moon facies and buffalo hump",
    category: "endocrine",
  },
  {
    number: 251,
    text: "Addison's disease causes hyponatremia, hyperkalemia, and weight loss",
    category: "endocrine",
  },
  {
    number: 252,
    text: "SIADH produces hyponatremia with concentrated urine and euvolemia",
    category: "endocrine",
  },
  { number: 253, text: "Diabetes insipidus causes polyuria with low urine osmolality", category: "endocrine" },
  {
    number: 254,
    text: "Acromegaly involves GH excess with elevated IGF-1 and enlarged extremities",
    category: "endocrine",
  },
  {
    number: 255,
    text: "Hypothyroidism causes bradycardia, cold intolerance, and elevated TSH",
    category: "endocrine",
  },
  {
    number: 256,
    text: "Hyperthyroidism causes tachycardia, heat intolerance, and decreased TSH",
    category: "endocrine",
  },
  {
    number: 257,
    text: "Conn's syndrome involves hyperaldosteronism with hypertension and hypokalemia",
    category: "endocrine",
  },

  // Pain Pathways
  { number: 258, text: "Spinothalamic tract carries pain and temperature to thalamus", category: "pain" },
  { number: 259, text: "Dorsal column pathway carries fine touch and proprioception", category: "pain" },
  { number: 260, text: "Spinoreticular tract provides alerting arousal to pain", category: "pain" },
  { number: 261, text: "Periaqueductal gray mediates endogenous opioid release", category: "pain" },
  {
    number: 262,
    text: "Mu opioid receptor provides supraspinal analgesia but causes respiratory depression",
    category: "pain",
  },
  { number: 263, text: "NSAIDs work via COX inhibition to decrease prostaglandins", category: "pain" },
  { number: 264, text: "Trigeminal lemniscus is the primary face pain pathway", category: "pain" },
  { number: 265, text: "Gate control theory explains how Aβ fiber stimulation inhibits pain", category: "pain" },

  // Autoimmune Neurology
  {
    number: 266,
    text: "Multiple sclerosis involves CNS demyelination with perivenular plaques",
    category: "autoimmune",
  },
  {
    number: 267,
    text: "Neuromyelitis optica involves anti-AQP4 antibodies with optic neuritis and myelitis",
    category: "autoimmune",
  },
  { number: 268, text: "NMOSD shows longitudinally extensive transverse myelitis", category: "autoimmune" },
  {
    number: 269,
    text: "CIDP is chronic inflammatory demyelinating polyneuropathy >2 months",
    category: "autoimmune",
  },
  {
    number: 270,
    text: "ADEM is acute disseminated encephalomyelitis following infection",
    category: "autoimmune",
  },
  {
    number: 271,
    text: "Paraneoplastic limbic encephalitis involves anti-Hu and anti-Ma2 antibodies",
    category: "autoimmune",
  },

  // Toxic Encephalopathies
  {
    number: 272,
    text: "Wernicke's encephalopathy involves thiamine deficiency affecting mammillary bodies",
    category: "toxic",
  },
  { number: 273, text: "Hepatic encephalopathy causes asterixis with elevated ammonia", category: "toxic" },
  { number: 274, text: "Uremic encephalopathy is dialysis-dependent cognitive impairment", category: "toxic" },
  {
    number: 275,
    text: "Hyperglycemic nonketotic coma causes focal deficits with hyperosmolality",
    category: "toxic",
  },
  { number: 276, text: "Hyponatremic cerebral edema causes seizures and confusion", category: "toxic" },
  { number: 277, text: "Carbon monoxide poisoning causes bilateral globus pallidus lesions", category: "toxic" },
  {
    number: 278,
    text: "Methylmercury poisoning causes visual field constriction and cerebellar signs",
    category: "toxic",
  },
  { number: 279, text: "Lead poisoning causes cognitive deficits with wrist and foot drop", category: "toxic" },

  // Advanced Cerebellar & Brainstem
  {
    number: 280,
    text: "Hypotonia is reduced muscle tone characteristic of cerebellar lesions",
    category: "cerebellar",
  },
  { number: 281, text: "Cerebellar dysarthria produces scanning, slurred speech patterns", category: "cerebellar" },
  {
    number: 282,
    text: "Cerebellar nystagmus is a classic ocular sign of cerebellar dysfunction",
    category: "cerebellar",
  },
  { number: 283, text: "Subfalcine herniation compresses ACA causing leg weakness", category: "cerebellar" },
  { number: 284, text: "Tonsillar herniation into foramen magnum causes respiratory arrest", category: "cerebellar" },
  {
    number: 285,
    text: "Upward transtentorial herniation compresses midbrain causing vertical gaze palsy",
    category: "cerebellar",
  },
  { number: 286, text: "Transcalvarial herniation occurs through skull fractures", category: "cerebellar" },
  { number: 287, text: "Intraventricular hemorrhage involves bleeding into ventricles", category: "cerebellar" },
  { number: 288, text: "Cerebellar dysmetria causes past-pointing on finger-to-nose testing", category: "cerebellar" },
  { number: 289, text: "Cerebellar tremor is kinetic, increasing during purposeful movement", category: "cerebellar" },
  { number: 290, text: "Vermian lesions primarily affect truncal stability and gait", category: "cerebellar" },
  { number: 291, text: "Hemispheric cerebellar lesions cause ipsilateral limb ataxia", category: "cerebellar" },
  {
    number: 292,
    text: "Cerebellar cognitive syndrome includes executive dysfunction and language deficits",
    category: "cerebellar",
  },
  {
    number: 293,
    text: "Opsoclonus-myoclonus syndrome involves chaotic eye movements with myoclonus",
    category: "cerebellar",
  },
  { number: 294, text: "Cerebellar mutism can occur after posterior fossa surgery", category: "cerebellar" },
  {
    number: 295,
    text: "Parinaud syndrome involves dorsal midbrain lesions affecting vertical gaze",
    category: "cerebellar",
  },
  { number: 296, text: "Internuclear ophthalmoplegia results from MLF lesions", category: "cerebellar" },
  { number: 297, text: "One-and-a-half syndrome combines INO with horizontal gaze palsy", category: "cerebellar" },
  { number: 298, text: "Weber syndrome involves CN III palsy with contralateral hemiparesis", category: "cerebellar" },
  { number: 299, text: "Benedikt syndrome combines CN III palsy with contralateral tremor", category: "cerebellar" },
  { number: 300, text: "Claude syndrome involves CN III palsy with ipsilateral ataxia", category: "cerebellar" },
]

const sections = [
  { title: "Spinal Cord Syndromes & Tracts", category: "spinal", color: "border-l-blue-400" },
  { title: "Neurodevelopmental Milestones", category: "development", color: "border-l-indigo-400" },
  { title: "Ischemic Stroke Syndromes", category: "stroke", color: "border-l-pink-400" },
  { title: "Movement Disorders & Pathophysiology", category: "movement", color: "border-l-yellow-400" },
  { title: "Sleep Physiology & Sleep Disorders", category: "sleep-disorders", color: "border-l-purple-500" },
  { title: "Dementia Subtypes & Pathology", category: "dementia", color: "border-l-orange-500" },
  { title: "Neuromuscular Disorders & Myopathies", category: "neuromuscular", color: "border-l-emerald-500" },
  { title: "Neuroendocrine Axes & Disorders", category: "endocrine", color: "border-l-cyan-500" },
  { title: "Pain Pathways & Analgesia", category: "pain", color: "border-l-red-400" },
  { title: "Autoimmune Neurology", category: "autoimmune", color: "border-l-sky-400" },
  { title: "Neurotoxic & Metabolic Encephalopathies", category: "toxic", color: "border-l-amber-400" },
  { title: "Advanced Cerebellar & Brainstem Concepts", category: "cerebellar", color: "border-l-teal-400" },
]

export default function NeurologySection3() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 via-gray-600 to-gray-500 p-5">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-lg">
            Dr. Nonso's High-Yield Neurology Points
          </h1>
          <p className="text-xl mb-3 opacity-90">The Complete Doctor Academy - Master's Edition</p>
          <div className="inline-flex items-center bg-yellow-400 text-gray-800 px-6 py-3 rounded-full font-bold text-lg">
            Section 3: Points 201-300
            <Badge className="ml-3 bg-gradient-to-r from-pink-400 to-yellow-400 text-white hover:from-pink-500 hover:to-yellow-500">
              FINAL
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {sections.map((section) => {
            const sectionPoints = studyPoints.filter((point) => point.category === section.category)

            return (
              <div key={section.category} className="mb-12">
                <div className="bg-gradient-to-r from-cyan-500 to-sky-400 text-white p-4 rounded-2xl text-center mb-6 shadow-lg">
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
                          <div className="bg-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {point.number}
                          </div>
                          <div className="text-sm leading-relaxed text-gray-700">
                            <span
                              dangerouslySetInnerHTML={{
                                __html: point.text.replace(
                                  /\*\*(.*?)\*\*/g,
                                  '<strong class="text-emerald-600">$1</strong>',
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

        {/* Congratulatory Footer */}
        <div className="bg-gray-800 text-white p-8 text-center">
          <p className="text-2xl font-bold mb-2 text-yellow-400">
            🎉 CONGRATULATIONS! You've mastered all 300 High-Yield Neurology Points! 🎉
          </p>
          <p className="font-bold mb-2 text-lg">The Complete Doctor Academy - Where Simplicity meets Excellence</p>
          <p className="text-sm mb-2">By Dr. Chinonso Stanley Ezeanyika | Complete Neurology Mastery Achieved!</p>
          <p className="text-yellow-300 font-semibold">✨ Ready to excel in your neurology examinations ✨</p>
        </div>
      </div>
    </div>
  )
}
