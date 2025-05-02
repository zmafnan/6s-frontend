"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Card, Title, Text, Stack, Group, Badge, Image, Button, Paper, SimpleGrid } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import jsPDF from "jspdf"
import api from "../../services/api"
import { IconDownload } from "@tabler/icons-react"

export default function ProductionAuditPreview() {
  const { id } = useParams()
  const [audit, setAudit] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAudit = async () => {
      try {
        const response = await api.get(`/production-audits/${id}`)
        setAudit(response.data)
      } catch (error) {
        notifications.show({
          title: "Error",
          message: "Failed to fetch audit data",
          color: "red",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchAudit()
  }, [id])


  if (loading || !audit) {
    return <Text>Loading...</Text>
  }

  const ScoreSection = ({ title, score, description }) => (
    <Paper shadow="xs" p="md" mb="md">
      <Title order={4} mb="xs">
        {title}
      </Title>
      <Text size="sm" c="dimmed" mb="md">
        {description}
      </Text>
      <Badge size="lg" color={score >= 4 ? "green" : score >= 3 ? "yellow" : "red"}>
        {score}
      </Badge>
    </Paper>
  )

  // Helper function to get the base URL from the API URL
  const getBaseUrl = () => {
    const fullUrl = api.defaults.baseURL
    return fullUrl.endsWith("/api") ? fullUrl.slice(0, -4) : fullUrl
  }

  const downloadPdf = () => {
  // create href to download PDF use api  audit-report-pdf/:id
    const baseUrl = getBaseUrl()
    const pdfUrl = `${baseUrl}/api/audit-report-pdf/${id}/production`
    window.open(pdfUrl, "_blank")
  }
  return (
    <Card shadow="sm" padding="lg">
      <Group justify="space-between" mb="xl">
        <Title order={2}>Audit Report</Title>
        <Button leftSection={<IconDownload size={14} />} onClick={downloadPdf}>
          Download PDF
        </Button>
      </Group>

      <div id="pdf-content">
        <Stack spacing="xl">
          <Card withBorder>
            <Title order={3} mb="md">
              Audit Information
            </Title>
            <Stack>
              <Group>
                <Text fw={500}>Department:</Text>
                <Text>{audit.Department?.name}</Text>
              </Group>
              <Group>
                <Text fw={500}>Audit Date:</Text>
                <Text>{new Date(audit.audit_date).toLocaleDateString()}</Text>
              </Group>
              <Group>
                <Text fw={500}>Auditor:</Text>
                <Text>{audit.auditor_name}</Text>
              </Group>
              <Group>
                <Text fw={500}>Lean Facilitator:</Text>
                <Text>{audit.lean_facilitator_name}</Text>
              </Group>
            </Stack>
          </Card>

          <Card withBorder>
            <Title order={3} mb="md">
              Scores
            </Title>
            <Stack>
              <ScoreSection
                title="1. SORT"
                score={audit.sort_score}
                description="Pisahkan dan hilangkan segala sesuatu yang tidak diperlukan di area kerja"
              />
              <ScoreSection
                title="2. SET IN ORDER"
                score={audit.set_in_order_score}
                description="Susun dan tempatkan dokumen dan perlengkapan kerja pada tempatnya"
              />
              <ScoreSection
                title="3. SHINE"
                score={audit.shine_score}
                description="Susun dan tempatkan dokumen dan perlengkapan kerja pada tempatnya"
              />
              <ScoreSection
                title="4. STANDARDIZE"
                score={audit.standardize_score}
                description="Susun dan tempatkan dokumen dan perlengkapan kerja pada tempatnya"
              />
              <ScoreSection
                title="5. SUSTAIN"
                score={audit.sustain_score}
                description="Susun dan tempatkan dokumen dan perlengkapan kerja pada tempatnya"
              />
              <ScoreSection
                title="6. SAFETY"
                score={audit.safety_score}
                description="Susun dan tempatkan dokumen dan perlengkapan kerja pada tempatnya"
              />

              <Paper shadow="xs" p="md">
                <Title order={3}>Final Score</Title>
                <Badge size="xl" color={audit.final_score >= 4 ? "green" : audit.final_score >= 3 ? "yellow" : "red"}>
                  {(
                    (audit.sort_score +
                      audit.set_in_order_score +
                      audit.shine_score +
                      audit.standardize_score +
                      audit.sustain_score +
                      audit.safety_score) /
                    6
                  ).toFixed(2)}
                </Badge>
              </Paper>
            </Stack>
          </Card>

          <Card withBorder>
            <Title order={3} mb="md">
              Findings
            </Title>
            <Stack>
              <div>
                <Text fw={500} mb="xs">
                  Previous Findings:
                </Text>
                <Text>{audit.previous_findings}</Text>
              </div>
              <div>
                <Text fw={500} mb="xs">
                  Current Findings:
                </Text>
                <Text>{audit.current_findings}</Text>
              </div>
            </Stack>
          </Card>

          <Card withBorder>
            <Title order={3} mb="md">
              Photos
            </Title>
            <SimpleGrid cols={2} spacing="md">
              {(() => {
                try {
                  // Safely parse photo URLs
                  const photoUrls =
                    typeof audit.photo_url === "string" ? JSON.parse(audit.photo_url || "[]") : audit.photo_url || []

                  console.log("Photo URLs:", photoUrls) // Debug log

                  // Get the base URL for the backend
                  const baseUrl = getBaseUrl()

                  return photoUrls.map((url, index) => (
                    <div key={index}>
                      <Image
                        src={`${baseUrl}${url}` || "/placeholder.svg"}
                        alt={`Finding ${index + 1}`}
                        radius="md"
                        onError={(e) => {
                          console.error(`Failed to load image: ${baseUrl}${url}`)
                          e.target.src = "/placeholder.svg" // Fallback image
                        }}
                      />
                      <Text size="sm" mt="xs" c="dimmed">
                        Finding {index + 1}
                      </Text>
                    </div>
                  ))
                } catch (error) {
                  console.error("Error displaying photos:", error)
                  return <Text c="red">Error displaying photos</Text>
                }
              })()}
            </SimpleGrid>
          </Card>

          <Card withBorder>
            <Title order={3} mb="md">
              Signatures
            </Title>
            <Group grow>
              {audit.auditor_signature && (
                <div>
                  <Text fw={500} mb="xs">
                    Auditor:
                  </Text>
                  <Image
                    src={audit.auditor_signature || "/placeholder.svg"}
                    alt="Auditor Signature"
                    style={{ border: "1px solid #eee" }}
                  />
                </div>
              )}
              {audit.facilitator_signature && (
                <div>
                  <Text fw={500} mb="xs">
                    Facilitator:
                  </Text>
                  <Image
                    src={audit.facilitator_signature || "/placeholder.svg"}
                    alt="Facilitator Signature"
                    style={{ border: "1px solid #eee" }}
                  />
                </div>
              )}
              {audit.department_signature && (
                <div>
                  <Text fw={500} mb="xs">
                    Department Head:
                  </Text>
                  <Image
                    src={audit.department_signature || "/placeholder.svg"}
                    alt="Department Head Signature"
                    style={{ border: "1px solid #eee" }}
                  />
                </div>
              )}
            </Group>
          </Card>
        </Stack>
      </div>
    </Card>
  )
}
