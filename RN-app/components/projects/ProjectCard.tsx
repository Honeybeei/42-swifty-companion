import { ProjectUser } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTrigger,
} from "../shared/gluestack-ui/accordion";
import { Badge, BadgeText } from "../shared/gluestack-ui/badge";
import { HStack } from "../shared/gluestack-ui/hstack";
import { ChevronDownIcon } from "../shared/gluestack-ui/icon";
import { Text } from "../shared/gluestack-ui/text";
import { VStack } from "../shared/gluestack-ui/vstack";

interface ProjectCardProps {
  project: ProjectUser;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "finished":
        return "success";
      case "in_progress":
        return "info";
      case "searching_a_group":
        return "warning";
      default:
        return "muted";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "finished":
        return "✅";
      case "in_progress":
        return "🔄";
      case "searching_a_group":
        return "👥";
      default:
        return "📝";
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  const getValidationIcon = () => {
    if (project["validated?"] === true) return "✅";
    if (project["validated?"] === false) return "❌";
    return "⏳";
  };

  return (
    <Accordion variant="unfilled" className="w-full">
      <AccordionItem
        value={`project-${project.id}`}
        className="mb-3 bg-highlight-0 rounded-2xl"
      >
        <AccordionHeader>
          <AccordionTrigger className="py-4">
            <VStack className="flex-1 gap-1">
              <HStack className="gap-2 w-full items-center">
                <Text className="text-lg font-bold text-typography-900 flex-1">
                  {getStatusIcon(project.status)} {project.project.name}
                </Text>
                <Badge
                  action={getStatusColor(project.status)}
                  variant="solid"
                  size="sm"
                >
                  <BadgeText>
                    {project.status.replace("_", " ").toUpperCase()}
                  </BadgeText>
                </Badge>
              </HStack>
              <HStack className="gap-4 w-full flex-wrap">
                {project.final_mark !== null && (
                  <Text className="text-sm text-typography-600">
                    📊 {project.final_mark}/100
                  </Text>
                )}
                <Text className="text-sm text-typography-600">
                  {getValidationIcon()}{" "}
                  {project["validated?"] === null
                    ? "Pending"
                    : project["validated?"]
                    ? "Validated"
                    : "Failed"}
                </Text>
                <Text className="text-sm text-typography-600">
                  🔄 Attempt #{project.occurrence}
                </Text>
              </HStack>
            </VStack>
            <AccordionIcon as={ChevronDownIcon} className="ml-2" />
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          <VStack className="gap-4 px-4 py-2">
            {/* Score Section */}
            <VStack className="bg-highlight-50 p-3 rounded-xl gap-3">
              <Text className="text-typography-800 font-bold text-sm">
                📈 Project Results
              </Text>
              <HStack className="justify-between flex-wrap gap-3">
                <VStack className="items-center gap-1 flex-1 min-w-16">
                  <Text className="text-lg">📊</Text>
                  <Text className="text-sm font-bold text-typography-900">
                    {project.final_mark !== null ? project.final_mark : "N/A"}
                  </Text>
                  <Text className="text-xs text-typography-500">
                    Final Mark
                  </Text>
                </VStack>
                <VStack className="items-center gap-1 flex-1 min-w-16">
                  <Text className="text-lg">{getValidationIcon()}</Text>
                  <Text className="text-sm font-bold text-typography-900">
                    {project["validated?"] === null
                      ? "Pending"
                      : project["validated?"]
                      ? "Yes"
                      : "No"}
                  </Text>
                  <Text className="text-xs text-typography-500">Validated</Text>
                </VStack>
                <VStack className="items-center gap-1 flex-1 min-w-16">
                  <Text className="text-lg">🔄</Text>
                  <Text className="text-sm font-bold text-typography-900">
                    #{project.occurrence}
                  </Text>
                  <Text className="text-xs text-typography-500">Attempt</Text>
                </VStack>
                <VStack className="items-center gap-1 flex-1 min-w-16">
                  <Text className="text-lg">📝</Text>
                  <Text className="text-sm font-bold text-typography-900">
                    {project.marked ? "Yes" : "No"}
                  </Text>
                  <Text className="text-xs text-typography-500">Marked</Text>
                </VStack>
              </HStack>
            </VStack>

            {/* Timeline Section */}
            <VStack className="bg-highlight-50 p-3 rounded-xl gap-2">
              <Text className="text-typography-800 font-bold text-sm">
                📅 Timeline
              </Text>
              <VStack className="gap-2">
                <HStack className="gap-2 items-center">
                  <Text className="text-sm">🚀</Text>
                  <Text className="text-typography-700 text-sm font-medium">
                    Started: {formatDate(project.created_at)}
                  </Text>
                </HStack>
                <HStack className="gap-2 items-center">
                  <Text className="text-sm">📝</Text>
                  <Text className="text-typography-700 text-sm font-medium">
                    Updated: {formatDate(project.updated_at)}
                  </Text>
                </HStack>
                {project.marked_at && (
                  <HStack className="gap-2 items-center">
                    <Text className="text-sm">✅</Text>
                    <Text className="text-typography-700 text-sm font-medium">
                      Marked: {formatDate(project.marked_at)}
                    </Text>
                  </HStack>
                )}
                {project.retriable_at && (
                  <HStack className="gap-2 items-center">
                    <Text className="text-sm">🔄</Text>
                    <Text className="text-typography-700 text-sm font-medium">
                      Retriable: {formatDate(project.retriable_at)}
                    </Text>
                  </HStack>
                )}
              </VStack>
            </VStack>

            {/* Project Details */}
            <VStack className="bg-highlight-50 p-3 rounded-xl gap-2">
              <Text className="text-typography-800 font-bold text-sm">
                ℹ️ Project Details
              </Text>
              <VStack className="gap-1">
                <Text className="text-typography-600 text-sm">
                  Project ID: {project.project.id}
                </Text>
                <Text className="text-typography-600 text-sm">
                  Slug: {project.project.slug}
                </Text>
                {project.current_team_id && (
                  <Text className="text-typography-600 text-sm">
                    Team ID: {project.current_team_id}
                  </Text>
                )}
                <Text className="text-typography-600 text-sm">
                  Cursus IDs: {project.cursus_ids.join(", ")}
                </Text>
                <Text className="text-typography-600 text-sm">
                  Record ID: {project.id}
                </Text>
              </VStack>
            </VStack>
          </VStack>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
