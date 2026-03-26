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
import type { AIResponse } from "@/types/ai.types";

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
  headerName: { fontFamily: "Helvetica-Bold" },
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

const BulletPoint = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.bullet}>
    <Text style={styles.bulletDot}>• </Text>
    <Text style={styles.bulletText}>{children}</Text>
  </View>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <Text style={styles.sectionTitle}>{children}</Text>
);

const ResumeDocument = ({ data }: { data: AIResponse }) => {
  const getDisplayName = (name: string) => {
    if (name.length > 25) {
      const parts = name.trim().split(/\s+/);
      if (parts.length > 1) {
        const firstName = parts[0];
        const lastInitial = parts[parts.length - 1]![0];
        return `${firstName} ${lastInitial}.`;
      }
    }
    return name;
  };

  const displayName = getDisplayName(data.name);
  const nameFontSize =
    data.name.length > 30 ? 13 : data.name.length > 20 ? 15 : 17;

  const formatUrl = (url: string, prefix: string) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `${prefix}${url}`;
  };

  const cleanUrl = (url: string) => {
    return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <Text style={[styles.headerName, { fontSize: nameFontSize }]}>
              {displayName} –{" "}
            </Text>
            <Text style={styles.headerTitle}>{data.job_title}</Text>
          </View>
          <Text style={styles.headerContact}>
            {[data.address, data.phone].filter(Boolean).join(", ")}
            {data.email && (
              <>
                {[data.address, data.phone].some(Boolean) ? ", " : ""}
                <Link style={styles.headerLink} src={`mailto:${data.email}`}>
                  {data.email}
                </Link>
              </>
            )}
            {data.github && (
              <>
                {", "}
                <Link
                  style={styles.headerLink}
                  src={formatUrl(data.github, "https://github.com/")}
                >
                  {cleanUrl(data.github)}
                </Link>
              </>
            )}
            {data.linkedin && (
              <>
                {", "}
                <Link
                  style={styles.headerLink}
                  src={formatUrl(data.linkedin, "https://linkedin.com/in/")}
                >
                  {cleanUrl(data.linkedin)}
                </Link>
              </>
            )}
            {data.website && (
              <>
                {", "}
                <Link
                  style={styles.headerLink}
                  src={formatUrl(data.website, "https://")}
                >
                  {cleanUrl(data.website)}
                </Link>
              </>
            )}
          </Text>
        </View>

        {/* Professional Summary */}
        {data.professional_summary && (
          <View style={styles.section}>
            <SectionTitle>Professional Summary</SectionTitle>
            <Text style={styles.bodyText}>{data.professional_summary}</Text>
          </View>
        )}

        {/* Project Experience */}
        {data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            <SectionTitle>Project Experience</SectionTitle>
            {data.projects.map((item, index) => (
              <View key={index} style={{ marginBottom: 5 }}>
                <View style={{ flexDirection: "row", width: "100%" }}>
                  <Text style={styles.itemTitle}>
                    {index + 1}.{"  "}
                    <Text style={{ fontFamily: "Helvetica-Bold" }}>
                      {item.title}
                    </Text>
                  </Text>
                </View>
                {item.points.map((point, pIndex) => (
                  <BulletPoint key={pIndex}>{point}</BulletPoint>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Professional Experience */}
        {data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            <SectionTitle>Professional Experience</SectionTitle>
            {data.experience.map((item, index) => (
              <View key={index} style={{ marginBottom: 5 }}>
                <View style={{ flexDirection: "row", width: "100%" }}>
                  <Text style={styles.itemTitle}>
                    {index + 1}.{"  "}
                    <Text style={{ fontFamily: "Helvetica-Bold" }}>
                      {item.title}
                    </Text>
                  </Text>
                </View>
                {item.points.map((point, pIndex) => (
                  <BulletPoint key={pIndex}>{point}</BulletPoint>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <View style={styles.section}>
            <SectionTitle>Skills</SectionTitle>
            <Text style={styles.skillsText}>{data.skills.join(", ")}</Text>
          </View>
        )}

        {/* Honors */}
        {data.honors && data.honors.length > 0 && (
          <View style={styles.section}>
            <SectionTitle>Honors & Awards</SectionTitle>
            {data.honors.map((honor, index) => (
              <BulletPoint key={index}>{honor}</BulletPoint>
            ))}
          </View>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <View style={styles.section}>
            <SectionTitle>Education</SectionTitle>
            {data.education.map((edu, index) => (
              <Text key={index} style={styles.bodyText}>
                {edu}
              </Text>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

// Default data for development/placeholder
const placeholderData: AIResponse = {
  name: "Kishor Dih",
  job_title: "Full Stack Developer",
  address: "Indian Ocean",
  phone: "+91 12312 31231",
  email: "grishmadev@proton.me",
  github: "vahiyaatProduct9",
  linkedin: "kishor-dih",
  professional_summary:
    "Self Taught Programmer with Hands on Experience in Modern Stack like TypeScript, NodeJS, PostgreSQL, and React. Result Driven with experience across personal project and professional internship on creating, maintaining and optimizing Solutions.",
  skills: [
    "TypeScript",
    "NodeJS",
    "REST API",
    "AI Workflows",
    "React",
    "Docker",
    "React Native",
    "MongoDB",
    "PostgreSQL",
    "Prisma",
    "Python",
    "Git",
    "Framer Motion",
    "Express",
    "NestJS",
    "Render",
    "FuseJS",
    "Agile",
    "System Design",
    "Performance Optimization",
    "Strategy",
  ],
  education: ["Higher Secondary, Pursuing Computer Programming independently."],
  projects: [
    {
      title: "Ilyafy – An Audio sharing App for long distance couples.",
      points: [
        "Built a music sharing platform for couples allowing them to listen to music synchronously using Rest APIs & Websocket.",
        "Added Client-side Caching & processing to reduce Server CPU usage by ~90% and network traffic by ~30%.",
        "Used Redis for internal socket mappings to minimize Server Memory usage.",
        "Engineered a custom 'Adaptive Bitrate Streaming' based on Hysteresis method.",
      ],
    },
  ],
  experience: [
    {
      title: "Piston Technology - Junior Backend Developer Intern",
      points: [
        "Interned at Piston Tech as an onsite Junior Backend Developer.",
        "Followed Agile methodology and worked in sprints to deliver productive results.",
        "Optimized Backend System by cutting fetch times down to ~50%.",
      ],
    },
  ],
  honors: [
    "Winner at Tech Adrishta Web Development Category in Manipal Institute of Technology, 2023.",
  ],
  ats_score_before: 66,
  ats_score_after: 74,
  changes_made: [
    "Some changes were made to the resume to improve the AI's understanding of the job description.",
    "The AI's understanding of the job description was improved by analyzing the resume's structure and content.",
    "The AI's understanding of the job description was improved by analyzing the resume's structure and content.",
  ],
};

const generateResumePDF = async (
  data: AIResponse = placeholderData,
): Promise<Buffer> => {
  return await renderToBuffer(<ResumeDocument data={data} />);
};

export { generateResumePDF, ResumeDocument };
