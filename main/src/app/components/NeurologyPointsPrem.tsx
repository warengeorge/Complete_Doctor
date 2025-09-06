import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface StudyPoint {
  number: number
  text: string
  category: string
}

const studyPoints: StudyPoint[] = [
  // Sleep & EEG Disorders
  {
    number: 101,
    text: "K-complex is a transient high-amplitude biphasic wave hallmark of Stage 2 NREM sleep",
    category: "sleep",
  },
  {
    number: 102,
    text: "Sleep spindles are 12-14 Hz waxing-waning rhythms characteristic of N2 sleep",
    category: "sleep",
  },
  { number: 103, text: "Sawtooth waves are EEG signatures that precede REM sleep", category: "sleep" },
  {
    number: 104,
    text: "SOREMPs (Sleep onset REM periods) are early REM intrusions seen in narcolepsy",
    category: "sleep",
  },
  { number: 105, text: "REM without atonia leads to REM behavior disorder with dream enactment", category: "sleep" },
  {
    number: 106,
    text: "Infant EEG shows predominant 3.5 Hz delta waves when awake (irregular slow waves)",
    category: "sleep",
  },
  { number: 107, text: "Theta bursts appear in drowsiness as transitional EEG patterns", category: "sleep" },

  // Visual Pathways
  {
    number: 108,
    text: "Optic chiasm compression by pituitary adenoma causes bitemporal hemianopia",
    category: "visual",
  },
  { number: 109, text: "Optic nerve lesion causes monocular blindness (prechiasmal lesion)", category: "visual" },
  { number: 110, text: "Lateral geniculate nucleus lesion causes all-field visual reduction", category: "visual" },
  {
    number: 111,
    text: 'Meyer\'s loop lesion (temporal lobe) causes contralateral superior quadrantanopia ("pie in the sky")',
    category: "visual",
  },
  {
    number: 112,
    text: 'Parietal optic radiation lesion causes inferior quadrantanopia ("pie on the floor")',
    category: "visual",
  },
  {
    number: 113,
    text: "Occipital cortex lesion causes homonymous hemianopia with macular sparing",
    category: "visual",
  },
  { number: 114, text: "Occipitoparietal lesion can cause visual neglect syndrome", category: "visual" },

  // Frontal Lobe
  { number: 115, text: "Go-No-Go test assesses inhibition of inappropriate responses", category: "frontal" },
  { number: 116, text: "Wisconsin Card Sorting tests set-shifting and cognitive flexibility", category: "frontal" },
  { number: 117, text: "Hayling sentence test evaluates response initiation and inhibition", category: "frontal" },
  {
    number: 118,
    text: "Stroop color-word test measures interference control and cognitive inhibition",
    category: "frontal",
  },
  { number: 119, text: "Verbal fluency (letters) tests phonemic search and frontal retrieval", category: "frontal" },
  { number: 120, text: "Category fluency (animals) assesses semantic retrieval", category: "frontal" },
  { number: 121, text: "Tower of London test evaluates planning and problem-solving", category: "frontal" },
  {
    number: 122,
    text: "Behavioural variant FTD primarily causes personality changes and disinhibition",
    category: "frontal",
  },

  // Memory
  { number: 123, text: "Episodic memory loss in Korsakoff syndrome with intact procedural memory", category: "memory" },
  {
    number: 124,
    text: "Procedural memory remains intact in Korsakoff syndrome (skill learning preserved)",
    category: "memory",
  },
  { number: 125, text: "Semantic memory loss is characteristic of semantic dementia", category: "memory" },
  {
    number: 126,
    text: "Anterograde amnesia results from hippocampal damage (cannot form new memories)",
    category: "memory",
  },
  { number: 127, text: "Retrograde autobiographical loss occurs in dissociative fugue", category: "memory" },
  {
    number: 128,
    text: "Transcortical motor aphasia shows intact repetition despite speech impairment",
    category: "memory",
  },
  { number: 129, text: "Pure alexia results from corpus callosum + occipital lesions", category: "memory" },
  { number: 130, text: "Ribot's law states that older memories are spared in retrograde amnesia", category: "memory" },

  // Vascular
  { number: 131, text: "PCA infarct causes alexia without agraphia (can't read but can write)", category: "vascular" },
  { number: 132, text: "MCA superior division stroke causes Broca's aphasia (expressive)", category: "vascular" },
  { number: 133, text: "MCA inferior division stroke causes Wernicke's aphasia (receptive)", category: "vascular" },
  { number: 134, text: "ACA stroke causes leg weakness and abulia (lack of motivation)", category: "vascular" },
  { number: 135, text: "PICA infarct causes Wallenberg syndrome (lateral medullary syndrome)", category: "vascular" },
  {
    number: 136,
    text: "AChA infarct (anterior choroidal artery) can cause hemichorea-hemiballismus",
    category: "vascular",
  },
  { number: 137, text: "Basilar artery stroke causes locked-in syndrome", category: "vascular" },
  { number: 138, text: "AComm aneurysm can cause visual field defects", category: "vascular" },

  // CSF
  { number: 139, text: "Foramen of Monro connects lateral ventricles to third ventricle", category: "csf" },
  {
    number: 140,
    text: "Aqueduct of Sylvius is the narrow channel between third and fourth ventricles",
    category: "csf",
  },
  {
    number: 141,
    text: "Foramina of Luschka & Magendie are fourth ventricle exits to subarachnoid space",
    category: "csf",
  },
  { number: 142, text: "Arachnoid granulations are sites of CSF absorption", category: "csf" },
  {
    number: 143,
    text: "Communicating hydrocephalus involves impaired CSF absorption with patent ventricles",
    category: "csf",
  },
  { number: 144, text: "Non-communicating hydrocephalus results from ventricular obstruction", category: "csf" },
  {
    number: 145,
    text: "Normal pressure hydrocephalus presents with gait apraxia, dementia, urinary incontinence",
    category: "csf",
  },
  { number: 146, text: "Subarachnoid hemorrhage blocks arachnoid granulations, raising CSF protein", category: "csf" },

  // Cranial Nerves
  { number: 147, text: 'Oculomotor (III) palsy causes "down-and-out" eye, ptosis, dilated pupil', category: "cranial" },
  { number: 148, text: "Trochlear (IV) palsy causes vertical diplopia when looking down", category: "cranial" },
  { number: 149, text: "Trigeminal (V) motor lesion causes loss of jaw jerk reflex", category: "cranial" },
  { number: 150, text: "Abducens (VI) palsy causes medial deviation and horizontal diplopia", category: "cranial" },
  {
    number: 151,
    text: "Facial (VII) lesion causes upper and lower facial paralysis on the same side",
    category: "cranial",
  },
  { number: 152, text: "Glossopharyngeal (IX) lesion causes absent gag reflex", category: "cranial" },
  { number: 153, text: "Vagus (X) lesion causes uvula deviation away from the lesion", category: "cranial" },
  { number: 154, text: "Hypoglossal (XII) lesion causes tongue deviation toward the lesion side", category: "cranial" },

  // Glial Cells
  { number: 155, text: "Astrocytes maintain blood-brain barrier and neurotransmitter uptake", category: "glia" },
  { number: 156, text: "Oligodendrocytes provide CNS myelination", category: "glia" },
  { number: 157, text: "Schwann cells provide PNS myelination", category: "glia" },
  { number: 158, text: "Microglia act as CNS macrophages for phagocytosis of debris", category: "glia" },
  { number: 159, text: "Ependymal cells produce CSF and regulate its flow", category: "glia" },
  { number: 160, text: "Reactive gliosis forms scar tissue after CNS injury", category: "glia" },
  { number: 161, text: "Microglial nodules are pathognomonic for HIV encephalitis", category: "glia" },

  // Autonomic
  { number: 162, text: "Horner's syndrome causes ptosis, miosis, and anhidrosis", category: "autonomic" },
  { number: 163, text: "Pancoast tumor compresses sympathetic chain causing Horner's syndrome", category: "autonomic" },
  { number: 164, text: "Adie pupil results from parasympathetic lesion to iris sphincter", category: "autonomic" },
  { number: 165, text: "Autonomic dysreflexia occurs with spinal lesions above T6", category: "autonomic" },
  { number: 166, text: "Orthostatic hypotension results from baroreflex failure", category: "autonomic" },
  { number: 167, text: "Harlequin sign shows facial autonomic asymmetry", category: "autonomic" },
  {
    number: 168,
    text: "Guillain-Barré autonomic variant affects peripheral autonomic function",
    category: "autonomic",
  },
  { number: 169, text: "Ross syndrome combines segmental anhidrosis with tonic pupil", category: "autonomic" },

  // Synaptic
  {
    number: 170,
    text: "NMDA receptor requires both glycine co-agonist and voltage relief of Mg²⁺ block",
    category: "synaptic",
  },
  { number: 171, text: "AMPA receptor mediates fast excitatory neurotransmission", category: "synaptic" },
  { number: 172, text: "GABA_A receptor is an ionotropic Cl⁻ channel for fast inhibition", category: "synaptic" },
  { number: 173, text: "GABA_B receptor is metabotropic and G-protein coupled", category: "synaptic" },
  { number: 174, text: "Nicotinic ACh receptor is a ligand-gated cation channel", category: "synaptic" },
  { number: 175, text: "Muscarinic ACh receptor is metabotropic GPCR", category: "synaptic" },
  { number: 176, text: "Beta-adrenergic receptor activates G_s to increase cAMP", category: "synaptic" },
  { number: 177, text: "D2 dopamine receptor activates G_i to decrease cAMP", category: "synaptic" },

  // Molecular
  { number: 178, text: "APP α-secretase cleavage prevents Aβ formation (protective pathway)", category: "molecular" },
  { number: 179, text: "APP β- and γ-secretase generate pathogenic Aβ peptides", category: "molecular" },
  { number: 180, text: "APOE ε4 allele increases Alzheimer's disease risk", category: "molecular" },
  { number: 181, text: "Tau gene mutations cause frontotemporal dementia", category: "molecular" },
  { number: 182, text: "Huntingtin CAG expansion causes Huntington's disease", category: "molecular" },
  { number: 183, text: "PRNP mutations cause familial Creutzfeldt-Jakob disease", category: "molecular" },
  { number: 184, text: "SOD1 mutations cause familial amyotrophic lateral sclerosis", category: "molecular" },
  { number: 185, text: "PARK2 parkin mutations cause early-onset Parkinson's disease", category: "molecular" },

  // Imaging
  { number: 186, text: "Bat-wing ventricles result from caudate atrophy in Huntington's disease", category: "imaging" },
  { number: 187, text: "Knife-edge cortical atrophy is characteristic of Pick disease", category: "imaging" },
  { number: 188, text: "Hippocampal volume loss is an early sign of Alzheimer's disease", category: "imaging" },
  {
    number: 189,
    text: "Periventricular white matter hyperintensities indicate small-vessel disease",
    category: "imaging",
  },
  { number: 190, text: "Ring-enhancing lesion suggests abscess or metastasis", category: "imaging" },
  { number: 191, text: '"Hot nose" sign on SPECT indicates brain death', category: "imaging" },
  { number: 192, text: '"Face of the giant panda" sign is pathognomonic for Wilson\'s disease', category: "imaging" },
  {
    number: 193,
    text: "Cerebellar atrophy in posterior fossa suggests alcoholic cerebellar degeneration",
    category: "imaging",
  },

  // Epilepsy
  {
    number: 194,
    text: "Hypsarrhythmia is chaotic high-voltage delta with multifocal spikes in infantile spasms",
    category: "epilepsy",
  },
  { number: 195, text: "Focal slowing on EEG indicates structural lesion", category: "epilepsy" },
  { number: 196, text: "Temporal intermittent rhythmic delta suggests limbic dysfunction", category: "epilepsy" },
  { number: 197, text: "Generalized delta when awake indicates diffuse encephalopathy", category: "epilepsy" },
  { number: 198, text: "Alpha blockade on eye opening is a normal EEG finding", category: "epilepsy" },

  // Herniation
  {
    number: 199,
    text: "Uncal herniation causes ipsilateral CN III palsy with fixed dilated pupil",
    category: "herniation",
  },
  {
    number: 200,
    text: "Central transtentorial herniation causes small reactive pupils then extensor posturing",
    category: "herniation",
  },
]

const sections = [
  { title: "Sleep & EEG Disorders", category: "sleep", color: "border-l-purple-500" },
  { title: "Visual Pathways & Lesions", category: "visual", color: "border-l-emerald-500" },
  { title: "Frontal Lobe Syndromes & Testing", category: "frontal", color: "border-l-orange-500" },
  { title: "Memory Types & Amnesias", category: "memory", color: "border-l-yellow-500" },
  { title: "Cerebrovascular Syndromes", category: "vascular", color: "border-l-pink-500" },
  { title: "CSF Circulation & Hydrocephalus", category: "csf", color: "border-l-cyan-500" },
  { title: "Cranial Nerve Lesions", category: "cranial", color: "border-l-rose-400" },
  { title: "Glial Cell Functions & Pathology", category: "glia", color: "border-l-blue-400" },
  { title: "Autonomic Nervous System Syndromes", category: "autonomic", color: "border-l-indigo-400" },
  { title: "Synaptic Transmission & Receptors", category: "synaptic", color: "border-l-sky-400" },
  { title: "Molecular & Genetic Neurology", category: "molecular", color: "border-l-red-400" },
  { title: "Neuroimaging Patterns", category: "imaging", color: "border-l-teal-400" },
  { title: "Epilepsy & EEG Features", category: "epilepsy", color: "border-l-amber-400" },
  { title: "Brain Herniation Syndromes", category: "herniation", color: "border-l-gray-500" },
]

export default function NeurologyStudyGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-400 via-red-500 to-orange-500 p-5">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-600 to-yellow-500 text-white p-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-lg">
            Dr. Nonso's High-Yield Neurology Points
          </h1>
          <p className="text-xl mb-3 opacity-90">The Complete Doctor Academy - Advanced Revision</p>
          <div className="inline-flex items-center bg-gray-800 text-white px-6 py-3 rounded-full font-bold text-lg">
            Section 2: Points 101-200
            <Badge className="ml-3 bg-gradient-to-r from-orange-200 to-orange-300 text-red-700 hover:from-orange-300 hover:to-orange-400">
              PREMIUM
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {sections.map((section) => {
            const sectionPoints = studyPoints.filter((point) => point.category === section.category)

            return (
              <div key={section.category} className="mb-12">
                <div className="bg-gradient-to-r from-pink-400 to-pink-600 text-white p-4 rounded-2xl text-center mb-6 shadow-lg">
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
                          <div className="bg-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {point.number}
                          </div>
                          <div className="text-sm leading-relaxed text-gray-700">
                            <span
                              dangerouslySetInnerHTML={{
                                __html: point.text.replace(
                                  /\*\*(.*?)\*\*/g,
                                  '<strong class="text-pink-600">$1</strong>',
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
          <p className="text-sm mb-2">By Dr. Chinonso Stanley Ezeanyika | Section 2: Points 101-200 (PREMIUM)</p>
          <p className="text-sm">🎓 Up Next: Section 3 (Points 201-300) - Final Premium Content</p>
        </div>
      </div>
    </div>
  )
}
