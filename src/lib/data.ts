import { CourseModule, Student, Transaction, DBSSubmission, DiscipleshipGroup, StudentApplication, UserProfile } from './types';

export const INITIAL_PROGRAMS: CourseModule[] = [
  {
    code: 'MET-101',
    title: 'Certificate in Effective Teaching',
    level: 'Certificate',
    school: 'School of Education & Pedagogy',
    department: 'Teacher Formation & Pedagogy',
    credits: 12,
    term_fee_mwk: 300000,
    term_fee_usd: 180,
    launch_cohort: 'January 2027',
    status: 'ACTIVE',
    badge_color: 'bg-amber-100 text-amber-900 border-amber-300',
    description: 'Transforming classroom instruction into a ministry of excellence. Equips primary and secondary educators in Malawi and Africa with student-centered pedagogical methodologies, biblical integration, classroom management, and formative assessment.',
    prerequisites: 'MSCE (Malawi School Certificate of Education) with at least 4 credits including English and Mathematics, or international equivalent.',
    learning_outcomes: [
      'Master the KNOW-BE-DO framework for holistic learner transformation.',
      'Design engaging, low-cost instructional materials suitable for African rural and urban classrooms.',
      'Implement restorative discipline and foster Christ-honoring learning environments.',
      'Execute formative assessment techniques that address individual learning paces.'
    ],
    lecturer: {
      staff_id: 'STF-108',
      name: 'Dr. Chimwemwe Banda',
      title: 'Senior Lecturer in Christian Pedagogy',
      email: 'c.banda@madimo.ac.mw'
    },
    lessons: [
      {
        id: 'LES-MET-01',
        module_code: 'MET-101',
        order: 1,
        title: 'Biblical Foundations of Transformational Teaching',
        duration_minutes: 45,
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        low_bandwidth_audio_url: 'https://actions.google.com/sounds/v1/water/rain_heavy.ogg',
        notes_pdf_title: 'MET-101-Unit1-Biblical-Foundations.pdf',
        notes_content: `### 1.1 The Teacher as Under-Shepherd
In Christian education, teaching is not mere cognitive transmission; it is the spiritual stewardship of the human mind and heart. Jesus modeled incarnational teaching—living among the learners, engaging their worldview, and drawing out divine principles from daily life (birds of the air, lilies of the field).

### 1.2 The Imago Dei in Every Learner
Every student in your classroom bears the image of God (Genesis 1:26-27). This fundamental truth demands:
- Unconditional dignity regardless of academic speed or socio-economic background.
- High expectations grounded in God's creative potential.
- Rejection of humiliating or punitive disciplinary tactics.

### 1.3 Key Pedagogical Principles
1. **Connection precedes Correction**: Build relational capital before demanding rigorous compliance.
2. **Scaffolding**: Provide structured support that is gradually removed as the learner gains mastery.
3. **Multi-sensory engagement**: Integrate visual, auditory, and kinesthetic modalities even without electricity.`,
        dbs_passage: 'Deuteronomy 6:4-9 & 2 Timothy 2:1-2',
        dbs_context: 'Moses instructs the covenant community of Israel on intergenerational transmission of divine knowledge, while Paul commands Timothy to entrust truth to faithful men who will teach others also.'
      },
      {
        id: 'LES-MET-02',
        module_code: 'MET-101',
        order: 2,
        title: 'The KNOW-BE-DO Pedagogical Framework in Practice',
        duration_minutes: 50,
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        low_bandwidth_audio_url: 'https://actions.google.com/sounds/v1/water/rain_heavy.ogg',
        notes_pdf_title: 'MET-101-Unit2-Know-Be-Do-Pedagogy.pdf',
        notes_content: `### 2.1 The Three Pillars of Holistic Formation
Madimo College structures all learning through three non-negotiable dimensions:
- **KNOW (The Mind)**: Sound biblical, theoretical, and disciplinary mastery. No intellectual shortcuts.
- **BE (The Heart & Character)**: Christlikeness, humility, resilience, and emotional intelligence.
- **DO (The Hands & Practice)**: Measurable, repeatable pedagogical and vocational competencies.

### 2.2 Designing Lesson Objectives with the Triad
When preparing your term lesson plans, each lesson must articulate:
- Cognitive Objective (What will students explain or solve?)
- Affective Objective (What attitude or value will be nurtured?)
- Behavioral Objective (What will students produce, demonstrate, or serve?)`,
        dbs_passage: 'Luke 6:40 & Ezra 7:10',
        dbs_context: 'Jesus teaches that a disciple, when fully trained, will be like their master. Ezra sets his heart first to study the law of the Lord, then to do it, and then to teach it.'
      },
      {
        id: 'LES-MET-03',
        module_code: 'MET-101',
        order: 3,
        title: 'Classroom Management & Restorative Community',
        duration_minutes: 40,
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        low_bandwidth_audio_url: 'https://actions.google.com/sounds/v1/water/rain_heavy.ogg',
        notes_pdf_title: 'MET-101-Unit3-Restorative-Discipline.pdf',
        notes_content: `### 3.1 Moving Beyond Retribution
Traditional classrooms often rely on fear and public embarrassment. In the Kingdom of God, discipline is *discipleship* (Hebrews 12:11).

### 3.2 Concrete Practices for Malawian Classrooms
- Establishing collaborative class covenants at term start.
- Using restorative circles for peer conflict resolution.
- Creating classroom roles (Peace monitor, resource steward, hospitality coordinator).`,
        dbs_passage: 'Colossians 3:12-17',
        dbs_context: 'Paul outlines the garment of the believer: compassionate hearts, kindness, humility, meekness, and patience, bearing with one another and forgiving.'
      }
    ]
  },
  {
    code: 'MEL-201',
    title: 'Certificate in Educational Leadership',
    level: 'Certificate',
    school: 'School of Transformational Leadership',
    department: 'Educational Governance & Leadership',
    credits: 12,
    term_fee_mwk: 300000,
    term_fee_usd: 180,
    launch_cohort: 'January 2027',
    status: 'ACTIVE',
    badge_color: 'bg-blue-100 text-blue-900 border-blue-300',
    description: 'Empowering school headteachers, education coordinators, and church leaders to govern educational institutions with strategic excellence, biblical integrity, financial transparency, and staff empowerment.',
    prerequisites: 'MSCE Certificate + at least 1 year of teaching or community leadership experience.',
    learning_outcomes: [
      'Formulate strategic school development plans aligned with national education guidelines.',
      'Implement zero-leakage financial controls and transparent community accounting.',
      'Lead teacher appraisal, instructional coaching, and mentorship programs.',
      'Cultivate resilient community and stakeholder partnerships.'
    ],
    lecturer: {
      staff_id: 'STF-112',
      name: 'Dr. Joyce Kachale',
      title: 'Dean of Educational Governance',
      email: 'j.kachale@madimo.ac.mw'
    },
    lessons: [
      {
        id: 'LES-MEL-01',
        module_code: 'MEL-201',
        order: 1,
        title: 'The Servant-Leader Paradigm in Institutional Governance',
        duration_minutes: 48,
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        low_bandwidth_audio_url: 'https://actions.google.com/sounds/v1/water/rain_heavy.ogg',
        notes_pdf_title: 'MEL-201-Unit1-Servant-Leadership.pdf',
        notes_content: `### 1.1 Inverting the Pyramidal Hierarchy
Worldly leadership exerts authority from above (Mark 10:42-45). Christ defines leadership as willing self-emptying and service. A school headteacher exists to clear hurdles for classroom teachers and students.

### 1.2 Institutional Integrity & Stewardship
In African institutions, corruption and opaque budgeting erode public trust. Madimo leaders establish open book accounting, dual-signatory financial protocols, and annual community stakeholder meetings.`,
        dbs_passage: 'Mark 10:42-45 & Nehemiah 5:14-19',
        dbs_context: 'Jesus teaches the disciples about true greatness through servanthood, while Nehemiah exemplifies radical financial integrity by refusing the governor food allowance out of the fear of God.'
      }
    ]
  },
  {
    code: 'MMD-301',
    title: 'Certificate in Missions & Disciple-making Movement',
    level: 'Certificate',
    school: 'School of Intercultural Studies & Missions',
    department: 'Disciple Making Movements (DMM)',
    credits: 12,
    term_fee_mwk: 300000,
    term_fee_usd: 180,
    launch_cohort: 'January 2027',
    status: 'ACTIVE',
    badge_color: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    description: 'Mobilizing tentmaking professionals to ignite multiplying disciple-making movements (DMM). Integrates vocational skills (teaching, agriculture, health) with Discovery Bible Studies (DBS) to reach unreached people groups across Africa.',
    prerequisites: 'MSCE Certificate + pastoral or church elder recommendation.',
    learning_outcomes: [
      'Execute the Discovery Bible Study (DBS) methodology for rapid spiritual multiplication.',
      'Identify and engage the biblical "Person of Peace" in target communities.',
      'Synthesize professional marketplace tentmaking with intentional church planting.',
      'Lead indigenous discovery groups that reproduce to 4th generation disciples.'
    ],
    lecturer: {
      staff_id: 'STF-204',
      name: 'Rev. Patrick Gondwe',
      title: 'Head of Missions Mobilization & DMM',
      email: 'p.gondwe@madimo.ac.mw'
    },
    lessons: [
      {
        id: 'LES-MMD-01',
        module_code: 'MMD-301',
        order: 1,
        title: 'The Great Commission and the Disciple-Making Paradigm',
        duration_minutes: 46,
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        low_bandwidth_audio_url: 'https://actions.google.com/sounds/v1/water/rain_heavy.ogg',
        notes_pdf_title: 'MMD-301-Unit1-Great-Commission.pdf',
        notes_content: `### 1.1 The Command to Make Disciples, Not Just Converts
Matthew 28:18-20 contains a single imperative verb: *make disciples* (matheteusate). Going, baptizing, and teaching to obey are participles describing how the primary mission is accomplished.

### 1.2 The Tentmaking Dynamic (The Apostle Paul Model)
Paul labored with his hands as a tentmaker (Acts 18:3) to avoid placing an economic burden on young churches and to model a sustainable work ethic. Today, Christian educators and professionals are Africa's most potent cross-border missionaries.`,
        dbs_passage: 'Matthew 28:18-20 & Acts 1:8',
        dbs_context: 'The risen Christ commissions His followers with all cosmic authority, promising His perpetual presence as the Holy Spirit empowers global witness.'
      },
      {
        id: 'LES-MMD-02',
        module_code: 'MMD-301',
        order: 2,
        title: 'Discovery Bible Study (DBS) Mechanics & Multiplying Groups',
        duration_minutes: 52,
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
        low_bandwidth_audio_url: 'https://actions.google.com/sounds/v1/water/rain_heavy.ogg',
        notes_pdf_title: 'MMD-301-Unit2-DBS-Mechanics.pdf',
        notes_content: `### 2.1 The Four Simple Questions of DBS
DBS shifts the center of gravity from the expert teacher to the Holy Spirit speaking directly through Scripture:
1. What does this passage say about God / Jesus?
2. What does it say about people / our condition?
3. If this is God's word, what will I do differently this week? (Obedience Statement)
4. Who will I share this story with? (Multiplication Statement)

### 2.2 Finding the Person of Peace
Based on Luke 10, a Person of Peace is receptive to your presence, hospitable, and has an existing network of influence through whom the gospel enters a community.`,
        dbs_passage: 'Luke 10:1-11 & 2 Timothy 2:2',
        dbs_context: 'Jesus sends the seventy-two into the harvest with urgent simplicity, instructing them to stay in the home of the person of peace.'
      }
    ]
  }
];

export const INITIAL_STUDENT: Student = {
  student_id: 'MAD-2027-042',
  first_name: 'Grace',
  last_name: 'Phiri',
  email: 'grace.phiri@student.madimo.ac.mw',
  phone: '+265 991 234 567',
  district: 'Dedza',
  country: 'Malawi',
  msce_verified: true,
  scholarship_active: true, // 50% discount applies (Certificate fee: MWK 150,000)
  discipleship_group_id: 'GRP-LIL-01',
  discipleship_group_name: 'Living Waters Discipleship Cohort',
  mentor_name: 'Dr. Chimwemwe Banda',
  calling_statement: 'Christian primary school headmistress passionate about integrating biblical values with literacy in rural Dedza villages.',
  created_at: '2026-09-01T08:30:00Z'
};

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    reference_id: 'AIRTEL-MW-9827341',
    student_id: 'MAD-2027-042',
    student_name: 'Grace Phiri',
    module_code: 'MET-101',
    module_title: 'Certificate in Effective Teaching',
    amount: 150000,
    currency: 'MWK',
    gateway: 'AirtelMoney',
    phone_or_card: '+265 991 234 567',
    status: 'COMPLETED',
    timestamp: '2026-09-02T10:15:22Z',
    verified_by: 'FIN-002',
    notes: 'Term 1 tuition fee (50% scholarship active applied)'
  },
  {
    reference_id: 'TNM-MP-4581290',
    student_id: 'MAD-2027-018',
    student_name: 'Blessings Chirwa',
    module_code: 'MEL-201',
    module_title: 'Certificate in Educational Leadership',
    amount: 300000,
    currency: 'MWK',
    gateway: 'TNMMpamba',
    phone_or_card: '+265 888 765 432',
    status: 'COMPLETED',
    timestamp: '2026-09-04T16:40:11Z',
    verified_by: 'FIN-002',
    notes: 'Full term fee paid via TNM Mpamba'
  },
  {
    reference_id: 'STRIPE-CH-7749102',
    student_id: 'MAD-2027-099',
    student_name: 'Kwame Asante',
    module_code: 'MMD-301',
    module_title: 'Certificate in Missions and Disciple-making Movement',
    amount: 180,
    currency: 'USD',
    gateway: 'Stripe',
    phone_or_card: 'Visa **** 4242',
    status: 'COMPLETED',
    timestamp: '2026-09-05T09:12:05Z',
    verified_by: 'SYSTEM_WEBHOOK',
    notes: 'International card payment (Ghana)'
  }
];

export const INITIAL_DBS_SUBMISSIONS: DBSSubmission[] = [
  {
    submission_id: 'DBS-2027-001',
    student_id: 'MAD-2027-042',
    student_name: 'Grace Phiri',
    module_code: 'MET-101',
    lesson_id: 'LES-MET-01',
    passage: 'Deuteronomy 6:4-9 & 2 Timothy 2:1-2',
    know_reflection: 'God demands undivided devotion with all our heart, soul, and might. He delegates educational responsibility primarily to parents and teachers to pass down His laws diligently through normal daily conversations.',
    be_reflection: 'I have often viewed my teaching role as merely preparing children for state examinations. This passage convicts me that my character and spiritual posture before God must precede my lesson delivery.',
    do_action: 'Starting this Friday morning, I will gather my 6 assistant primary school teachers in Dedza to start our 15-minute morning devotion using this exact passage.',
    share_target: 'My deputy headmistress Sister Mercy and our local village church pastor.',
    grade: 'A',
    feedback: 'Exceptional submission Grace. Your articulation of the DO obedience step is concrete, timely, and leads directly into multiplication.',
    graded_by: 'Dr. Chimwemwe Banda',
    submitted_at: '2026-09-05T14:20:00Z'
  }
];

export const INITIAL_DISCIPLESHIP_GROUPS: DiscipleshipGroup[] = [
  {
    group_id: 'GRP-LIL-01',
    name: 'Living Waters Discipleship Cohort',
    mentor_id: 'STF-108',
    mentor_name: 'Dr. Chimwemwe Banda',
    schedule: 'Every Tuesday at 18:00 CAT',
    meet_url: 'https://meet.google.com/mad-disc-01',
    weekly_theme: 'Cultivating the Mind of Christ in the Rural Classroom',
    prayer_requests: [
      {
        id: 'PR-1',
        student_name: 'Grace Phiri',
        request: 'Pray for wisdom as our Dedza school constructs a new community chalkboard and prayer circle.',
        date: '2026-09-06'
      },
      {
        id: 'PR-2',
        student_name: 'Blessings Chirwa',
        request: 'Prayer for outreach to 12 unchurched youth in Mzuzu during holiday coaching.',
        date: '2026-09-07'
      }
    ]
  }
];

export const DEMO_USERS: Record<string, UserProfile> = {
  guest: {
    id: 'USR-GUEST',
    name: 'Prospective Visitor',
    email: 'admissions@madimo.ac.mw',
    role: 'guest',
    title: 'Prospective Student / Public Explorer'
  },
  student: {
    id: 'MAD-2027-042',
    name: 'Grace Phiri',
    email: 'grace.phiri@student.madimo.ac.mw',
    role: 'student',
    title: 'Enrolled Student (Dedza Cohort)'
  },
  lecturer: {
    id: 'STF-108',
    name: 'Dr. Chimwemwe Banda',
    email: 'c.banda@madimo.ac.mw',
    role: 'lecturer',
    title: 'Senior Lecturer & Discipleship Mentor'
  },
  finance: {
    id: 'FIN-002',
    name: 'Ethel Mwale',
    email: 'e.mwale@madimo.ac.mw',
    role: 'finance',
    title: 'Bursar & Finance Administrator'
  },
  admin: {
    id: 'ADM-001',
    name: 'Kondwani Tembo',
    email: 'k.tembo@madimo.ac.mw',
    role: 'admin',
    title: 'Director of Academic Systems'
  }
};
