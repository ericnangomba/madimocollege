// ============================================================================
// MADIMO COLLEGE OF MISSIONS - LEARNING MANAGEMENT SYSTEM (LMS)
// Neo4j Graph Database Schema & Initialization Seed Script
// Launch Cohort: January 2027 (Malawi)
// ============================================================================

// ----------------------------------------------------------------------------
// 1. CONSTRAINTS & INDEXES (Ensuring Uniqueness and Low-Latency Lookups)
// ----------------------------------------------------------------------------

CREATE CONSTRAINT unique_student_id IF NOT EXISTS
FOR (s:Student) REQUIRE s.student_id IS UNIQUE;

CREATE CONSTRAINT unique_student_email IF NOT EXISTS
FOR (s:Student) REQUIRE s.email IS UNIQUE;

CREATE CONSTRAINT unique_course_code IF NOT EXISTS
FOR (c:CourseModule) REQUIRE c.code IS UNIQUE;

CREATE CONSTRAINT unique_lesson_id IF NOT EXISTS
FOR (l:Lesson) REQUIRE l.id IS UNIQUE;

CREATE CONSTRAINT unique_transaction_ref IF NOT EXISTS
FOR (t:Transaction) REQUIRE t.reference_id IS UNIQUE;

CREATE CONSTRAINT unique_lecturer_id IF NOT EXISTS
FOR (lec:Lecturer) REQUIRE lec.staff_id IS UNIQUE;

CREATE CONSTRAINT unique_group_id IF NOT EXISTS
FOR (g:DiscipleshipGroup) REQUIRE g.group_id IS UNIQUE;

CREATE CONSTRAINT unique_dbs_id IF NOT EXISTS
FOR (d:DBSSubmission) REQUIRE d.submission_id IS UNIQUE;

// Indexes for fast querying by level, status, and department
CREATE INDEX idx_course_level IF NOT EXISTS FOR (c:CourseModule) ON (c.level);
CREATE INDEX idx_student_msce IF NOT EXISTS FOR (s:Student) ON (s.msce_verified);
CREATE INDEX idx_transaction_status IF NOT EXISTS FOR (t:Transaction) ON (t.status);

// ----------------------------------------------------------------------------
// 2. ACADEMIC STRUCTURE & THREE FLAGSHIP LAUNCH PROGRAMS (JANUARY 2027)
// ----------------------------------------------------------------------------

// Schools
MERGE (schEdu:AcademicSchool { id: "SCH-EDU", name: "School of Education & Pedagogy" })
MERGE (schLdr:AcademicSchool { id: "SCH-LDR", name: "School of Transformational Leadership" })
MERGE (schMis:AcademicSchool { id: "SCH-MIS", name: "School of Intercultural Studies & Missions" })

// Departments
MERGE (depPed:Department { id: "DEP-PED", name: "Department of Teacher Formation & Pedagogy" })
MERGE (depLead:Department { id: "DEP-LEAD", name: "Department of Educational Governance & Leadership" })
MERGE (depMove:Department { id: "DEP-MOVE", name: "Department of Disciple Making Movements (DMM)" })

MERGE (schEdu)-[:CONTAINS_DEPARTMENT]->(depPed)
MERGE (schLdr)-[:CONTAINS_DEPARTMENT]->(depLead)
MERGE (schMis)-[:CONTAINS_DEPARTMENT]->(depMove)

// Program 1: Certificate in Effective Teaching (MET-101)
MERGE (c1:CourseModule {
  code: "MET-101",
  title: "Certificate in Effective Teaching",
  level: "Certificate",
  school: "School of Education & Pedagogy",
  credits: 12,
  term_fee_mwk: 300000,
  term_fee_usd: 180,
  status: "ACTIVE",
  description: "Equipping Christian teachers with biblical pedagogy, learner psychology, curriculum design, and classroom management for transformed schools."
})
MERGE (depPed)-[:OFFERS_MODULE]->(c1)

// Program 2: Certificate in Educational Leadership (MEL-201)
MERGE (c2:CourseModule {
  code: "MEL-201",
  title: "Certificate in Educational Leadership",
  level: "Certificate",
  school: "School of Transformational Leadership",
  credits: 12,
  term_fee_mwk: 300000,
  term_fee_usd: 180,
  status: "ACTIVE",
  description: "Forming visionary Christian administrators capable of leading primary, secondary, and tertiary institutions with integrity, financial stewardship, and spiritual vitality."
})
MERGE (depLead)-[:OFFERS_MODULE]->(c2)

// Program 3: Certificate in Missions and Disciple-making Movement (MMD-301)
MERGE (c3:CourseModule {
  code: "MMD-301",
  title: "Certificate in Missions and Disciple-making Movement",
  level: "Certificate",
  school: "School of Intercultural Studies & Missions",
  credits: 12,
  term_fee_mwk: 300000,
  term_fee_usd: 180,
  status: "ACTIVE",
  description: "Catalyzing disciple-making movements (DMM) through the KNOW-BE-DO model, tentmaking vocational integration, cross-cultural planting, and Discovery Bible Studies."
})
MERGE (depMove)-[:OFFERS_MODULE]->(c3)

// ----------------------------------------------------------------------------
// 3. LESSON UNITS & DISCOVERY BIBLE STUDY (DBS) ASSIGNMENTS
// ----------------------------------------------------------------------------

MERGE (l1:Lesson {
  id: "LES-MET-01",
  title: "Biblical Foundations of Transformational Teaching",
  order: 1,
  duration_minutes: 45,
  video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  audio_url: "https://actions.google.com/sounds/v1/water/rain_heavy.ogg",
  notes_pdf: "MET-101-Module1-Biblical-Foundations.pdf",
  dbs_passage: "Deuteronomy 6:4-9 & 2 Timothy 2:1-2"
})
MERGE (l2:Lesson {
  id: "LES-MET-02",
  title: "The KNOW-BE-DO Pedagogical Framework in Practice",
  order: 2,
  duration_minutes: 50,
  video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  audio_url: "https://actions.google.com/sounds/v1/water/rain_heavy.ogg",
  notes_pdf: "MET-101-Module2-Know-Be-Do-Pedagogy.pdf",
  dbs_passage: "Luke 6:40 & Ezra 7:10"
})
MERGE (l3:Lesson {
  id: "LES-MET-03",
  title: "Classroom Management and Restorative Discipline",
  order: 3,
  duration_minutes: 40,
  video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  audio_url: "https://actions.google.com/sounds/v1/water/rain_heavy.ogg",
  notes_pdf: "MET-101-Module3-Restorative-Discipline.pdf",
  dbs_passage: "Colossians 3:12-17"
})

MERGE (c1)-[:HAS_LESSON { order: 1 }]->(l1)
MERGE (c1)-[:HAS_LESSON { order: 2 }]->(l2)
MERGE (c1)-[:HAS_LESSON { order: 3 }]->(l3)

// Lessons for MMD-301
MERGE (l4:Lesson {
  id: "LES-MMD-01",
  title: "The Theology of Missions & The Great Commission",
  order: 1,
  duration_minutes: 45,
  video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  audio_url: "https://actions.google.com/sounds/v1/water/rain_heavy.ogg",
  notes_pdf: "MMD-301-Module1-Great-Commission.pdf",
  dbs_passage: "Matthew 28:18-20 & Acts 1:8"
})
MERGE (l5:Lesson {
  id: "LES-MMD-02",
  title: "Discovery Bible Study (DBS) Mechanics & Multiplying Groups",
  order: 2,
  duration_minutes: 55,
  video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  audio_url: "https://actions.google.com/sounds/v1/water/rain_heavy.ogg",
  notes_pdf: "MMD-301-Module2-DBS-Mechanics.pdf",
  dbs_passage: "Luke 10:1-11 (Person of Peace)"
})

MERGE (c3)-[:HAS_LESSON { order: 1 }]->(l4)
MERGE (c3)-[:HAS_LESSON { order: 2 }]->(l5)

// ----------------------------------------------------------------------------
// 4. FACULTY & MENTORS
// ----------------------------------------------------------------------------

MERGE (lec1:Lecturer {
  staff_id: "STF-108",
  full_name: "Dr. Chimwemwe Banda",
  email: "c.banda@madimo.ac.mw",
  department: "Teacher Formation & Pedagogy",
  title: "Senior Lecturer & Dean of Academics",
  specialization: "Biblical Pedagogy & Discipleship Mentorship"
})

MERGE (lec2:Lecturer {
  staff_id: "STF-204",
  full_name: "Rev. Patrick Gondwe",
  email: "p.gondwe@madimo.ac.mw",
  department: "Disciple Making Movements",
  title: "Head of Missions & Field Discipleship",
  specialization: "Tentmaking Mobilization & DMM"
})

// ----------------------------------------------------------------------------
// 5. DISCIPLESHIP GROUPS (HOLISTIC FORMATION COHORTS)
// ----------------------------------------------------------------------------

MERGE (grp1:DiscipleshipGroup {
  group_id: "GRP-LIL-01",
  name: "Living Waters Discipleship Cohort (Lilongwe)",
  meeting_schedule: "Tuesdays at 18:00 CAT",
  meet_url: "https://meet.google.com/mad-disc-01"
})
MERGE (grp1)-[:LED_BY]->(lec1)

// ----------------------------------------------------------------------------
// 6. SAMPLE STUDENTS & ENROLLMENT (JANUARY 2027 COHORT)
// ----------------------------------------------------------------------------

MERGE (s1:Student {
  student_id: "MAD-2027-042",
  first_name: "Grace",
  last_name: "Phiri",
  email: "grace.phiri@student.madimo.ac.mw",
  phone: "+265 991 234 567",
  msce_verified: true,
  scholarship_active: true, // 50% discount applies (Fee: MWK 150,000)
  district: "Dedza, Malawi",
  calling: "Christian Primary School Headmistress & Church Planter",
  created_at: "2026-09-01T08:30:00Z"
})

// Student 1 Enrolled in MET-101 (Fully Paid & Unlocked) and MMD-301 (Awaiting Term Fee)
MERGE (s1)-[:ENROLLED_IN { status: "ACTIVE", enrolled_at: "2026-09-01", progress_pct: 65 }]->(c1)
MERGE (s1)-[:ENROLLED_IN { status: "LOCKED_UNPAID", enrolled_at: "2026-09-01", progress_pct: 0 }]->(c3)
MERGE (s1)-[:MENTORED_BY]->(lec1)
MERGE (s1)-[:PARTICIPATES_IN]->(grp1)

// Transactions for Grace Phiri
MERGE (tx1:Transaction {
  reference_id: "AIRTEL-MW-9827341",
  student_id: "MAD-2027-042",
  amount: 150000,
  currency: "MWK",
  gateway: "AirtelMoney",
  phone_or_card: "+265 991 234 567",
  status: "COMPLETED",
  timestamp: "2026-09-02T10:15:22Z",
  verified_by: "FIN-002"
})
MERGE (s1)-[:PAID_FOR]->(tx1)
MERGE (tx1)-[:APPLIED_TO]->(c1)

// DBS Submission from Grace Phiri
MERGE (dbs1:DBSSubmission {
  submission_id: "DBS-2027-001",
  passage: "Deuteronomy 6:4-9",
  know_reflection: "God demands undivided loyalty and total love from all of our heart, soul, and strength. He establishes families and teachers as the primary conduits of intergenerational truth.",
  be_reflection: "My heart has sometimes treated curriculum as merely cognitive transfer. God calls me to first internalize His words in my own character before imparting them to learners.",
  do_action: "I will gather the teachers at our community school this Friday to begin our daily devotion modeling this text.",
  share_target: "My assistant teacher Sister Mercy and our village pastor.",
  grade: "A",
  feedback: "Deeply reflective Grace. Your integration of personal obedience with school leadership reflects the true heart of the DO pillar.",
  submitted_at: "2026-09-05T14:20:00Z"
})
MERGE (s1)-[:SUBMITTED]->(dbs1)
MERGE (dbs1)-[:FOR_LESSON]->(l1)

// ============================================================================
// 7. KEY SYSTEM CYPHER QUERIES (BUSINESS LOGIC ENGINE)
// ============================================================================

// Query A: Check Student Module Access Gating (Lock/Unlock Engine)
// MATCH (s:Student { student_id: $student_id })-[:ENROLLED_IN]->(c:CourseModule { code: $course_code })
// OPTIONAL MATCH (s)-[:PAID_FOR]->(t:Transaction)-[:APPLIED_TO]->(c)
// WHERE t.status = "COMPLETED"
// WITH s, c, coalesce(sum(t.amount), 0) AS total_paid,
//      CASE WHEN s.scholarship_active THEN c.term_fee_mwk * 0.5 ELSE c.term_fee_mwk END AS required_fee
// RETURN c.code AS course_code,
//        c.title AS course_title,
//        total_paid,
//        required_fee,
//        (total_paid >= required_fee) AS is_unlocked;

// Query B: Discipleship Group Roster & Spiritual Formation Tracker
// MATCH (lec:Lecturer { staff_id: $staff_id })<-[:LED_BY]-(g:DiscipleshipGroup)<-[:PARTICIPATES_IN]-(s:Student)
// OPTIONAL MATCH (s)-[:SUBMITTED]->(dbs:DBSSubmission)
// RETURN g.name AS group_name,
//        s.student_id AS student_id,
//        s.first_name + ' ' + s.last_name AS student_name,
//        count(dbs) AS completed_dbs_count;

// Query C: Finance Admin Reconciliation Ledger
// MATCH (s:Student)-[:PAID_FOR]->(t:Transaction)-[:APPLIED_TO]->(c:CourseModule)
// RETURN t.reference_id AS ref,
//        s.student_id AS student_id,
//        s.first_name + ' ' + s.last_name AS student_name,
//        c.code AS module_code,
//        t.amount AS amount,
//        t.currency AS currency,
//        t.gateway AS gateway,
//        t.status AS status,
//        t.timestamp AS timestamp
// ORDER BY t.timestamp DESC;
