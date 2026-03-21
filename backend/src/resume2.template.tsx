import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  renderToBuffer,
} from "@react-pdf/renderer";

const colors = {
  black: "#000000",
  blue: "#1a6bbf",
  gray: "#333333",
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 32,
    paddingBottom: 32,
    paddingLeft: 40,
    paddingRight: 40,
    fontFamily: "Helvetica",
    fontSize: 9,
    color: colors.black,
  },

  // Header
  header: { alignItems: "center", marginBottom: 6 },
  headerName: { fontSize: 17, fontFamily: "Helvetica-Bold" },
  headerTitle: { fontSize: 14, fontFamily: "Helvetica" },
  headerContact: {
    fontSize: 8.5,
    color: colors.gray,
    textAlign: "center",
    marginTop: 2,
  },
  headerLink: { color: colors.blue, textDecoration: "none" },

  // extraContact
  extraContact: {
    width: "100%",
    flexDirection: "row",
    textAlign: "center",
  },

  // Sections
  section: { marginTop: 3 },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
    paddingBottom: 1,
    marginBottom: 4,
  },
  bodyText: { fontSize: 9, lineHeight: 1.5 },

  // Projects / Experience
  itemTitle: { fontSize: 9.5, marginBottom: 2 },
  bullet: { flexDirection: "row", marginBottom: 1.5, paddingLeft: 10 },
  bulletDot: { width: 10, fontSize: 9 },
  bulletText: { flex: 1, fontSize: 9, lineHeight: 1.5 },

  // Skills
  skillsText: { fontSize: 9, color: colors.blue, lineHeight: 1.6 },
});

const Bold = ({ children }: { children: React.ReactNode }) => (
  <Text style={{ fontFamily: "Helvetica-Bold" }}>{children}</Text>
);

const BulletPoint = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.bullet}>
    <Text style={styles.bulletDot}>• </Text>
    <Text style={styles.bulletText}>{children}</Text>
  </View>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <Text style={styles.sectionTitle}>{children}</Text>
);

const ResumeDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "baseline" }}>
          <Text style={styles.headerName}>Kishor Debnath – </Text>
          <Text style={styles.headerTitle}>
            Backend/FullStack JavaScript Developer
          </Text>
        </View>
        <Text style={styles.headerContact}>
          Siliguri/Kolkata, WB, +91 87598 14731,{" "}
          <Link style={styles.headerLink} src="mailto:grishmadev@proton.me">
            grishmadev@proton.me
          </Link>{" "}
          |{" "}
          <Link
            style={styles.headerLink}
            src="https://github.com/vahiyaatProduct9"
          >
            github.com/vahiyaatProduct9
          </Link>{" "}
          |{" "}
          <Link
            style={styles.headerLink}
            src="https://linkedin.com/in/kishor-dih"
          >
            linkedin.com/in/kishor-dih
          </Link>
        </Text>
        <Text style={styles.extraContact}></Text>
      </View>

      {/* Professional Summary */}
      <View style={styles.section}>
        <SectionTitle>Professional Summary</SectionTitle>
        <Text style={styles.bodyText}>
          Self Taught Programmer with Hands on Experience in Modern Stack like
          TypeScript, NodeJS, PostgreSQL, and React. Result Driven with
          experience across personal project and professional internship on
          creating, maintaining and optimizing Solutions. Recent Intern at
          Piston Technologies.
        </Text>
      </View>

      {/* Project Experience */}
      <View style={styles.section}>
        <SectionTitle>Project Experience</SectionTitle>

        <View style={{ marginBottom: 5 }}>
          <View style={{ flexDirection: "row", width: "100%" }}>
            <Text style={styles.itemTitle}>
              1.{"  "}
              <Link
                style={{ color: colors.blue }}
                src="https://github.com/vahiyaatProduct9"
              >
                Ilyafy
              </Link>
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontFamily: "Helvetica" }}>
                {" – An Audio sharing App for long distance couples."}
              </Text>
              <Text style={{ fontFamily: "Helvetica" }}>
                (Dec 2025 – Jan 2026)
              </Text>
            </View>
          </View>
          <BulletPoint>
            Built a music sharing platform for couples allowing them to listen
            to music synchronously using <Bold>Rest APIs & Websocket</Bold> with
            external libraries like <Bold>NewPipeModule</Bold> for music parsing
            & <Bold>yt-dlp</Bold> as backup.
          </BulletPoint>
          <BulletPoint>
            Added Client-side Caching & processing to reduce Server{" "}
            <Bold>CPU usage by ~90%</Bold> and{" "}
            <Bold>network traffic by ~30%</Bold> by offloading the heavy music
            parsing to Client Devices.
          </BulletPoint>
          <BulletPoint>
            Used <Bold>Redis</Bold> for internal socket mappings to minimize
            Server Memory usage.
          </BulletPoint>
          <BulletPoint>
            Engineered a custom <Bold>"Adaptive Bitrate Streaming"</Bold> based
            on Hysteresis method on User's Network latency for maximum User
            Experience.
          </BulletPoint>
          <BulletPoint>
            Supports Offline and Single Mode for Solo Experience.
          </BulletPoint>
        </View>

        <View style={{ marginBottom: 5 }}>
          <View style={{ flexDirection: "row", width: "100%" }}>
            <Text style={styles.itemTitle}>
              2.{"  "}
              <Link style={{ color: colors.blue }} src="#">
                SbziMndi
              </Link>
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontFamily: "Helvetica" }}>
                {' – "soon to be expired" Goods Marketplace – React Native App'}
              </Text>
              <Text style={{ fontFamily: "Helvetica" }}>
                (Aug 2025 – Nov 2025)
              </Text>
            </View>
          </View>
          <BulletPoint>
            Built an Application that lets client buy and sell products that are
            soon to expire at lower price.
          </BulletPoint>
          <BulletPoint>
            Developed an end-to-end Fullstack application with{" "}
            <Bold>Active Notifications</Bold> with less than 1000ms wait period,{" "}
            <Bold>OTP logging & Confirmation System</Bold>,{" "}
            <Bold>Buyer Seller Chatting</Bold> and Checkout Feature.
          </BulletPoint>
          <BulletPoint>
            Integrated <Bold>RazorPay</Bold> handling full order lifecycle
            across multiple product listing.
          </BulletPoint>
        </View>

        <View style={{ marginBottom: 5 }}>
          <View style={{ flexDirection: "row", width: "100%" }}>
            <Text style={styles.itemTitle}>
              3.{"  "}
              <Link style={{ color: colors.blue }} src="#">
                StyleMorph
              </Link>
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontFamily: "Helvetica" }}>
                {" – AI Powered 'Style Transfer' WebApp – ReactJs"}
              </Text>
              <Text style={{ fontFamily: "Helvetica" }}>(Apr 2025)</Text>
            </View>
          </View>
          <BulletPoint>
            Created a Style Transfer Engine using Gemini 2.5 Flash using AI
            Workflows.
          </BulletPoint>
          <BulletPoint>
            Takes in an image and a name. Returns an image of the name with the
            styles of the Image.
          </BulletPoint>
        </View>
      </View>

      {/* Professional Experience */}
      <View style={styles.section}>
        <SectionTitle>Professional Experience</SectionTitle>

        <View style={{ marginBottom: 5 }}>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ ...styles.itemTitle, fontFamily: "Helvetica-Bold" }}>
              1. Piston Technology
            </Text>
            <Text style={{ fontFamily: "Helvetica" }}>
              (Jan 2026 – March 2026)
            </Text>
          </View>
          <BulletPoint>
            Interned at Piston Tech as an{" "}
            <Bold>onsite Junior Backend Developer.</Bold>
          </BulletPoint>
          <BulletPoint>
            Followed <Bold>Agile methodology</Bold> and worked in{" "}
            <Bold>sprints</Bold> to deliver productive results.
          </BulletPoint>
          <BulletPoint>
            Optimized Backend System by cutting fetch times down to{" "}
            <Bold>~50%</Bold> by integrating <Bold>TypeScript</Bold> with{" "}
            <Bold>SQL</Bold> queries and <Bold>Maximize User Experience.</Bold>
          </BulletPoint>
          <BulletPoint>
            Fixed <Bold>Potential Bugs</Bold> and{" "}
            <Bold>Security Vulnerabilities</Bold> alongside learning from other
            developers.
          </BulletPoint>
        </View>

        <View>
          <Text style={{ ...styles.itemTitle, fontFamily: "Helvetica-Bold" }}>
            2. Freelance (Full Stack Restaurant Website)
          </Text>
          <BulletPoint>
            Developed a Full Stack Website for showcasing and Ordering Online
            for a local restaurant.
          </BulletPoint>
          <BulletPoint>
            Used <Bold>Next.Js</Bold> and <Bold>Tailwind CSS</Bold> with{" "}
            <Bold>Bun runtime</Bold> to create Frontend Fast alongside{" "}
            <Bold>AI assistance</Bold>.
          </BulletPoint>
          <BulletPoint>
            Used <Bold>Bun runtime</Bold> with <Bold>Elysia</Bold> Framework to
            deliver maximum RPS.
          </BulletPoint>
          <BulletPoint>
            Designed scalable Database Schema using <Bold>Postgresql</Bold> with
            5+ tables managing menus, orders, users, transactions etc.
          </BulletPoint>
          <BulletPoint>
            Used <Bold>RazorPay</Bold> as its Payment Provider and payment
            verification using <Bold>HMAC</Bold>.
          </BulletPoint>
          <BulletPoint>
            Automatic Deployment to <Bold>Vercel</Bold> using <Bold>CI/CD</Bold>
            .
          </BulletPoint>
        </View>
      </View>

      {/* Skills */}
      <View style={styles.section}>
        <SectionTitle>Skills</SectionTitle>
        <Text style={styles.skillsText}>
          TypeScript, NodeJS, REST API, AI Workflows, React, Docker, React
          Native, MongoDB, PostgreSQL, Prisma, Python, Git, Framer Motion ,
          Express, NestJS, Render, FuseJS, Agile, System Design, Performance
          Optimization, Strategy
        </Text>
      </View>

      {/* Honors */}
      <View style={styles.section}>
        <SectionTitle>Honors & Awards</SectionTitle>
        <BulletPoint>
          <Bold>Winner</Bold> at Tech Adrishta Web Development Category in{" "}
          <Bold>Manipal Institute of Technology</Bold>, 2023.
        </BulletPoint>
        <BulletPoint>
          <Bold>Amazon</Bold>{" "}
          <Link style={{ color: colors.blue }} src="https://amazon.com">
            Fundamentals of Machine Learning
          </Link>
          .
        </BulletPoint>
      </View>

      {/* Soft Skills */}
      <View style={styles.section}>
        <SectionTitle>Soft Skills</SectionTitle>
        <BulletPoint>
          Effective Communicator in client and team settings.
        </BulletPoint>
        <BulletPoint>Adaptable to new tools and workflows.</BulletPoint>
      </View>

      {/* Education */}
      <View style={styles.section}>
        <SectionTitle>Education</SectionTitle>
        <Text style={styles.bodyText}>
          Higher Secondary, Pursuing Computer Programming independently.
        </Text>
      </View>
    </Page>
  </Document>
);

const generateResumePDF = async (): Promise<Buffer> => {
  return await renderToBuffer(<ResumeDocument />);
};

export { generateResumePDF, ResumeDocument };
